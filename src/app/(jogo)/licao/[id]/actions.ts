"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { CONTENT_VERSION, PATH, findLesson } from "@/content";
import { gradeActivity } from "@/content/engine";
import type { Answer } from "@/content/public-types";
import { requireUserId } from "@/lib/dal";
import { HINT_AFTER_ERRORS, REWARDS, dayInSaoPaulo, xpAfterErrors } from "@/lib/game/rules";
import {
  checkLease,
  claimLease,
  getPlayerSnapshot,
  grantReward,
  nodeState,
  registerDailyStudy,
  releaseLease,
} from "@/lib/game/server";
import { cleanDuration, exitInfoSchema, logSessionEvent, type ExitInfo } from "@/lib/game/telemetry";
import { createAdminClient } from "@/lib/supabase/admin";

const answerSchema: z.ZodType<Answer> = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("choice"), optionId: z.string().max(4) }),
  z.object({ kind: z.literal("matching"), pairs: z.record(z.string().max(16), z.string().max(16)) }),
  z.object({ kind: z.literal("ordering"), order: z.array(z.string().max(16)).max(8) }),
]);
const deviceSchema = z.string().regex(/^[a-zA-Z0-9-]{8,64}$/);

export type BeginResult =
  | { ok: true; currentStep: number; isReview: boolean }
  | { ok: false; reason: "conflict" | "locked" | "not-found" };

/** Abre (ou retoma) a lição neste aparelho. `force` confirma a transferência (RF043). */
export async function beginLesson(slug: string, deviceId: string, force = false): Promise<BeginResult> {
  const userId = await requireUserId();
  const found = findLesson(slug);
  if (!found || !deviceSchema.safeParse(deviceId).success) return { ok: false, reason: "not-found" };
  const { lesson } = found;

  const snapshot = await getPlayerSnapshot(userId);
  if (nodeState(snapshot, lesson.id) === "locked") return { ok: false, reason: "locked" };

  const db = createAdminClient();
  const lease = await claimLease(db, userId, deviceId, lesson.id, force);
  if (!lease.ok) return { ok: false, reason: "conflict" };
  after(() => logSessionEvent(db, userId, "activity_open", { contextId: lesson.id }));

  const row = snapshot.progress.get(lesson.id);
  if (!row) {
    await db.from("lesson_progress").insert({ user_id: userId, lesson_id: lesson.id, content_version: CONTENT_VERSION });
    return { ok: true, currentStep: 0, isReview: false };
  }
  // Lição concluída e sem revisão em curso: começa uma revisão (RF014).
  if (row.status === "completed" && !row.is_review) {
    await db
      .from("lesson_progress")
      .update({ is_review: true, current_step: 0, run_started_at: new Date().toISOString(), content_version: CONTENT_VERSION, updated_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("lesson_id", lesson.id);
    return { ok: true, currentStep: 0, isReview: true };
  }
  return { ok: true, currentStep: Math.min(row.current_step, lesson.activities.length - 1), isReview: row.is_review };
}

export type Completion = {
  xp: number;
  /** XP cheio da conclusão, antes do desconto por erros (DD023). */
  baseXp: number;
  errors: number;
  fios: number;
  firstTime: boolean;
  dailyGoal: { xp: number; fios: number } | null;
  nextSlug: string | null;
  unlockedWorkshop: boolean;
};

export type SubmitResult =
  | {
      ok: true;
      correct: boolean;
      feedback: string;
      wrongIds?: string[];
      /** Dica após dois erros (DD006). */
      hint?: string;
      completion?: Completion;
    }
  | { ok: false; reason: "lease-lost" | "stale" | "invalid" | "offline"; currentStep?: number };

export async function submitLessonAnswer(input: {
  slug: string;
  activityId: string;
  answer: Answer;
  hintUsed: boolean;
  deviceId: string;
  /** Tempo desde que a atividade (ou a nova tentativa) apareceu na tela (DD026). */
  durationMs?: number;
}): Promise<SubmitResult> {
  const userId = await requireUserId();
  const found = findLesson(input.slug);
  const answer = answerSchema.safeParse(input.answer);
  if (!found || !answer.success || !deviceSchema.safeParse(input.deviceId).success) return { ok: false, reason: "invalid" };
  const { lesson } = found;
  const db = createAdminClient();

  const [leaseOk, { data: row }] = await Promise.all([
    checkLease(db, userId, input.deviceId),
    db
      .from("lesson_progress")
      .select("current_step, status, is_review, first_completed_at, run_started_at, completions")
      .eq("user_id", userId)
      .eq("lesson_id", lesson.id)
      .maybeSingle(),
  ]);
  if (!leaseOk) return { ok: false, reason: "lease-lost" };
  if (!row) return { ok: false, reason: "stale", currentStep: 0 };
  const index = lesson.activities.findIndex((a) => a.id === input.activityId);
  if (index !== row.current_step) return { ok: false, reason: "stale", currentStep: row.current_step };

  const activity = lesson.activities[index];
  const grade = gradeActivity(activity, answer.data, lesson.id);

  const { count } = await db
    .from("activity_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("context_id", lesson.id)
    .eq("activity_id", activity.id)
    .gte("created_at", row.run_started_at);
  const attemptNo = (count ?? 0) + 1;
  await db.from("activity_attempts").insert({
    user_id: userId,
    context_id: lesson.id,
    activity_id: activity.id,
    content_version: CONTENT_VERSION,
    attempt_no: attemptNo,
    is_correct: grade.correct,
    hint_used: input.hintUsed,
    is_review: row.is_review,
    answer: answer.data,
    duration_ms: cleanDuration(input.durationMs),
  });

  if (!grade.correct) {
    const wrongs = attemptNo; // todas as tentativas anteriores desta rodada foram erros
    return {
      ok: true,
      correct: false,
      feedback: grade.feedback,
      wrongIds: grade.wrongIds,
      hint: wrongs >= HINT_AFTER_ERRORS ? activity.hint : undefined,
    };
  }

  const nextStep = row.current_step + 1;
  const finished = nextStep >= lesson.activities.length;
  const now = new Date().toISOString();
  // Avanço condicional: evita dupla conclusão por reenvio concorrente (RNF017).
  const { data: advanced } = await db
    .from("lesson_progress")
    .update(
      finished
        ? {
            current_step: 0,
            status: "completed",
            is_review: false,
            first_completed_at: row.first_completed_at ?? now,
            last_completed_at: now,
            completions: (row.completions ?? 0) + 1,
            updated_at: now,
          }
        : { current_step: nextStep, updated_at: now },
    )
    .eq("user_id", userId)
    .eq("lesson_id", lesson.id)
    .eq("current_step", row.current_step)
    .select("lesson_id");
  if (!advanced?.length) return { ok: false, reason: "stale" };

  revalidatePath("/trilha");
  if (!finished) return { ok: true, correct: true, feedback: grade.feedback };

  const [completion] = await Promise.all([
    completeLesson(userId, lesson.id, !row.first_completed_at, row.run_started_at),
    releaseLease(db, userId, input.deviceId),
  ]);
  return { ok: true, correct: true, feedback: grade.feedback, completion };
}

async function completeLesson(
  userId: string,
  lessonId: string,
  firstTime: boolean,
  runStartedAt: string,
): Promise<Completion> {
  const db = createAdminClient();
  // Erros desta rodada (desde o início da lição ou da revisão) descontam XP (DD023).
  const { count } = await db
    .from("activity_attempts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("context_id", lessonId)
    .eq("is_correct", false)
    .gte("created_at", runStartedAt);
  const errors = count ?? 0;
  const base = firstTime ? REWARDS.lessonFirst : REWARDS.lessonReviewDaily;
  const earned = { xp: xpAfterErrors(base.xp, errors), fios: base.fios };
  const eventKey = firstTime ? `lesson:${lessonId}:first` : `review:${lessonId}:${dayInSaoPaulo()}`;
  const reason = `${firstTime ? "Primeira conclusão" : "Revisão"} ${lessonId} (${errors} erro${errors === 1 ? "" : "s"})`;
  const reward = grantReward(db, userId, eventKey, earned, reason).then((ok) => (ok ? earned : { xp: 0, fios: 0 }));
  const [{ xp, fios }, dailyGoal] = await Promise.all([reward, registerDailyStudy(db, userId)]);

  const idx = PATH.findIndex((n) => n.id === lessonId);
  const next = PATH[idx + 1];
  return {
    xp,
    baseXp: xp > 0 ? base.xp : 0,
    errors,
    fios,
    firstTime,
    dailyGoal,
    nextSlug: next ? next.slug : null,
    unlockedWorkshop: firstTime && lessonId === "BOBI-M01-L01",
  };
}

/** Renovação periódica da reserva (DD008). */
export async function renewLease(deviceId: string): Promise<boolean> {
  const userId = await requireUserId();
  if (!deviceSchema.safeParse(deviceId).success) return false;
  return checkLease(createAdminClient(), userId, deviceId);
}

/** Saída pelo botão (X). `info` registra onde a pessoa saiu e se foi logo após um erro (DD026). */
export async function leaveActivity(deviceId: string, info?: ExitInfo): Promise<void> {
  const userId = await requireUserId();
  if (!deviceSchema.safeParse(deviceId).success) return;
  const db = createAdminClient();
  const exit = exitInfoSchema.safeParse(info);
  await Promise.all([
    releaseLease(db, userId, deviceId),
    exit.success ? logSessionEvent(db, userId, "activity_exit", exit.data) : undefined,
  ]);
}

