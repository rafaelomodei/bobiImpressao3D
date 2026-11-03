"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CONTENT_VERSION, WORLDS, findAssessment } from "@/content";
import { gradeActivity } from "@/content/engine";
import type { Answer } from "@/content/public-types";
import { requireUserId } from "@/lib/dal";
import { REWARDS, xpAfterErrors } from "@/lib/game/rules";
import { checkLease, claimLease, getPlayerSnapshot, grantReward, nodeState, releaseLease } from "@/lib/game/server";
import { createAdminClient } from "@/lib/supabase/admin";

const answerSchema: z.ZodType<Answer> = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("choice"), optionId: z.string().max(4) }),
  z.object({ kind: z.literal("matching"), pairs: z.record(z.string().max(16), z.string().max(16)) }),
  z.object({ kind: z.literal("ordering"), order: z.array(z.string().max(16)).max(8) }),
]);
const deviceSchema = z.string().regex(/^[a-zA-Z0-9-]{8,64}$/);

type StoredAnswers = Record<string, { answer: Answer; correct: boolean }>;

export type AssessmentResult = {
  score: number;
  total: number;
  passed: boolean;
  firstPass: boolean;
  xp: number;
  baseXp: number;
  fios: number;
  unlockedWorld: string | null;
  questions: {
    id: string;
    title: string;
    correct: boolean;
    explanation: string;
    review: { slug: string; title: string }[];
  }[];
};

export type BeginAssessmentResult =
  | { ok: true; answered: string[] }
  | { ok: false; reason: "conflict" | "locked" | "not-found" };

export async function beginAssessment(slug: string, deviceId: string, force = false): Promise<BeginAssessmentResult> {
  const userId = await requireUserId();
  const found = findAssessment(slug);
  if (!found || !deviceSchema.safeParse(deviceId).success) return { ok: false, reason: "not-found" };
  const snapshot = await getPlayerSnapshot(userId);
  if (nodeState(snapshot, found.assessment.id) === "locked") return { ok: false, reason: "locked" };

  const db = createAdminClient();
  const lease = await claimLease(db, userId, deviceId, found.assessment.id, force);
  if (!lease.ok) return { ok: false, reason: "conflict" };

  const { data: open } = await db
    .from("assessment_attempts")
    .select("answers")
    .eq("user_id", userId)
    .eq("assessment_id", found.assessment.id)
    .eq("status", "in_progress")
    .maybeSingle();
  if (open) return { ok: true, answered: Object.keys(open.answers as StoredAnswers) };

  await db
    .from("assessment_attempts")
    .insert({ user_id: userId, assessment_id: found.assessment.id, content_version: CONTENT_VERSION });
  return { ok: true, answered: [] };
}

export type AssessmentSubmit =
  | { ok: true; finished: false }
  | { ok: true; finished: true; result: AssessmentResult }
  | { ok: false; reason: "lease-lost" | "invalid" | "stale" };

/** Registra a resposta sem revelar se está certa; o resultado vem no final (ficha AV). */
export async function submitAssessmentAnswer(input: {
  slug: string;
  questionId: string;
  answer: Answer;
  deviceId: string;
}): Promise<AssessmentSubmit> {
  const userId = await requireUserId();
  const found = findAssessment(input.slug);
  const answer = answerSchema.safeParse(input.answer);
  if (!found || !answer.success || !deviceSchema.safeParse(input.deviceId).success) return { ok: false, reason: "invalid" };
  const { assessment } = found;
  const question = assessment.questions.find((q) => q.id === input.questionId);
  if (!question) return { ok: false, reason: "invalid" };

  const db = createAdminClient();
  if (!(await checkLease(db, userId, input.deviceId))) return { ok: false, reason: "lease-lost" };

  const { data: open } = await db
    .from("assessment_attempts")
    .select("id, answers")
    .eq("user_id", userId)
    .eq("assessment_id", assessment.id)
    .eq("status", "in_progress")
    .maybeSingle();
  if (!open) return { ok: false, reason: "stale" };

  const answers = { ...(open.answers as StoredAnswers) };
  if (!answers[question.id]) {
    const grade = gradeActivity(question, answer.data, assessment.id);
    answers[question.id] = { answer: answer.data, correct: grade.correct };
    await db.from("assessment_attempts").update({ answers }).eq("id", open.id);
    await db.from("activity_attempts").insert({
      user_id: userId,
      context_id: assessment.id,
      activity_id: question.id,
      content_version: CONTENT_VERSION,
      attempt_no: 1,
      is_correct: grade.correct,
      answer: answer.data,
    });
  }

  if (Object.keys(answers).length < assessment.questions.length) return { ok: true, finished: false };

  // Finalização condicional: só uma requisição fecha a tentativa (RNF017).
  const score = assessment.questions.filter((q) => answers[q.id]?.correct).length;
  const passed = score >= assessment.passMin;
  const { data: closed } = await db
    .from("assessment_attempts")
    .update({ status: "finished", score, passed, finished_at: new Date().toISOString() })
    .eq("id", open.id)
    .eq("status", "in_progress")
    .select("id");
  if (!closed?.length) return { ok: false, reason: "stale" };

  let xp = 0,
    fios = 0,
    firstPass = false;
  const errors = assessment.questions.length - score;
  if (passed) {
    // Cada questão errada desconta XP, como nas lições (DD023).
    const earned = {
      xp: xpAfterErrors(REWARDS.assessmentFirstPass.xp, errors),
      fios: REWARDS.assessmentFirstPass.fios,
    };
    firstPass = await grantReward(
      db,
      userId,
      `assessment:${assessment.id}:first`,
      earned,
      `Primeira aprovação ${assessment.id} (${score}/${assessment.questions.length})`,
    );
    if (firstPass) {
      xp = earned.xp;
      fios = earned.fios;
    }
  }
  await releaseLease(db, userId, input.deviceId);
  revalidatePath("/trilha");

  const wIdx = WORLDS.findIndex((w) => w.assessment.id === assessment.id);
  const nextWorld = WORLDS[wIdx + 1];
  const lessonsById = new Map(WORLDS.flatMap((w) => w.lessons).map((l) => [l.id, l]));

  return {
    ok: true,
    finished: true,
    result: {
      score,
      total: assessment.questions.length,
      passed,
      firstPass,
      xp,
      baseXp: firstPass ? REWARDS.assessmentFirstPass.xp : 0,
      fios,
      unlockedWorld: passed && firstPass && nextWorld ? `Mundo ${nextWorld.number} · ${nextWorld.title}` : null,
      questions: assessment.questions.map((q) => ({
        id: q.id,
        title: q.title,
        correct: Boolean(answers[q.id]?.correct),
        explanation: q.reviewExplanation ?? q.successFeedback,
        review: (q.reviewLessonIds ?? [])
          .map((id) => lessonsById.get(id))
          .filter((l) => l !== undefined)
          .map((l) => ({ slug: l.slug, title: `L${String(l.number).padStart(2, "0")} · ${l.title}` })),
      })),
    },
  };
}
