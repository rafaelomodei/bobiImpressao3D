import "server-only";
import { cache } from "react";
import { PATH } from "@/content";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  LEASE_TTL_MS,
  REWARDS,
  computePathStates,
  computeStreak,
  dayInSaoPaulo,
  weekStart,
  type NodeState,
  type PathNode,
} from "./rules";

export type Db = ReturnType<typeof createAdminClient>;

export type LessonProgressRow = {
  lesson_id: string;
  current_step: number;
  status: "in_progress" | "completed";
  is_review: boolean;
  first_completed_at: string | null;
  run_started_at: string;
};

export type PlayerSnapshot = {
  xp: number;
  fios: number;
  weekXp: number;
  streak: number;
  goalMetToday: boolean;
  completedLessons: Set<string>;
  passedAssessments: Set<string>;
  progress: Map<string, LessonProgressRow>;
  path: { node: PathNode; state: NodeState; inProgress: boolean }[];
};

/** Estado do jogador, calculado no servidor a partir do banco (fonte de verdade). */
export const getPlayerSnapshot = cache(async (userId: string): Promise<PlayerSnapshot> => {
  const db = createAdminClient();
  const today = dayInSaoPaulo();
  const [progressRes, ledgerRes, daysRes, passRes] = await Promise.all([
    db
      .from("lesson_progress")
      .select("lesson_id, current_step, status, is_review, first_completed_at, run_started_at")
      .eq("user_id", userId),
    db.from("wallet_ledger").select("xp, fios, competitive_xp, day").eq("user_id", userId),
    db
      .from("daily_activity")
      .select("day")
      .eq("user_id", userId)
      .eq("goal_met", true)
      .gte("day", dayInSaoPaulo(new Date(Date.now() - 400 * 86400_000))),
    db.from("assessment_attempts").select("assessment_id").eq("user_id", userId).eq("passed", true),
  ]);
  for (const r of [progressRes, ledgerRes, daysRes, passRes])
    if (r.error) throw new Error(`Falha ao carregar progresso: ${r.error.message}`);

  const progress = new Map((progressRes.data as LessonProgressRow[]).map((r) => [r.lesson_id, r]));
  const completedLessons = new Set(
    [...progress.values()].filter((r) => r.first_completed_at).map((r) => r.lesson_id),
  );
  const passedAssessments = new Set((passRes.data ?? []).map((r) => r.assessment_id as string));
  const ws = weekStart(today);
  let xp = 0,
    fios = 0,
    weekXp = 0;
  for (const r of ledgerRes.data ?? []) {
    xp += r.xp;
    fios += r.fios;
    if (r.day >= ws) weekXp += r.competitive_xp;
  }
  const goalDays = (daysRes.data ?? []).map((r) => r.day as string);
  const states = computePathStates(PATH, completedLessons, passedAssessments);

  return {
    xp,
    fios,
    weekXp,
    streak: computeStreak(goalDays, today),
    goalMetToday: goalDays.includes(today),
    completedLessons,
    passedAssessments,
    progress,
    path: PATH.map((node, i) => {
      const p = node.kind === "lesson" ? progress.get(node.id) : undefined;
      const inProgress = Boolean(p && p.current_step > 0 && (p.status === "in_progress" || p.is_review));
      return { node, state: states[i], inProgress };
    }),
  };
});

export function nodeState(snapshot: PlayerSnapshot, id: string): NodeState {
  return snapshot.path.find((p) => p.node.id === id)?.state ?? "locked";
}

/* ------------------------------------------------------------------------- */
/* Carteira (RNF013): cada recompensa tem chave idempotente única.           */
/* ------------------------------------------------------------------------- */

export async function grantReward(
  db: Db,
  userId: string,
  eventKey: string,
  reward: { xp: number; fios: number },
  reason: string,
): Promise<boolean> {
  const { data, error } = await db
    .from("wallet_ledger")
    .upsert(
      {
        user_id: userId,
        event_key: eventKey,
        xp: reward.xp,
        fios: reward.fios,
        competitive_xp: Math.max(0, reward.xp),
        reason,
        day: dayInSaoPaulo(),
      },
      { onConflict: "user_id,event_key", ignoreDuplicates: true },
    )
    .select("id");
  if (error) throw new Error(`Falha ao registrar recompensa: ${error.message}`);
  return (data?.length ?? 0) > 0;
}

/** Gasto de Fios (oficina): lançamento negativo, sem XP. Falha se o saldo não cobre. */
export async function spendFios(db: Db, userId: string, eventKey: string, amount: number, reason: string) {
  if (amount <= 0) return true;
  const { data, error } = await db.from("wallet_ledger").select("fios").eq("user_id", userId);
  if (error) throw new Error(error.message);
  const balance = (data ?? []).reduce((s, r) => s + r.fios, 0);
  if (balance < amount) return false;
  const { error: insErr } = await db
    .from("wallet_ledger")
    .insert({ user_id: userId, event_key: eventKey, xp: 0, fios: -amount, competitive_xp: 0, reason, day: dayInSaoPaulo() });
  if (insErr) throw new Error(insErr.message);
  return true;
}

/** Lição ou revisão válida cumpre a meta diária (PD006). Retorna a recompensa concedida. */
export async function registerDailyStudy(db: Db, userId: string): Promise<{ xp: number; fios: number } | null> {
  const day = dayInSaoPaulo();
  const { data: existing } = await db
    .from("daily_activity")
    .select("lessons, goal_met")
    .eq("user_id", userId)
    .eq("day", day)
    .maybeSingle();
  await db
    .from("daily_activity")
    .upsert({ user_id: userId, day, lessons: (existing?.lessons ?? 0) + 1, goal_met: true });
  const granted = await grantReward(db, userId, `daily:${day}`, REWARDS.dailyGoal, "Meta diária cumprida");
  return granted ? REWARDS.dailyGoal : null;
}

/* ------------------------------------------------------------------------- */
/* Reserva de atividade (DD008, RF043)                                        */
/* ------------------------------------------------------------------------- */

export type LeaseResult = { ok: true } | { ok: false; conflict: true };

export async function claimLease(
  db: Db,
  userId: string,
  deviceId: string,
  contextId: string,
  force: boolean,
): Promise<LeaseResult> {
  const { data } = await db.from("activity_leases").select("device_id, expires_at").eq("user_id", userId).maybeSingle();
  const now = Date.now();
  const busy = data && data.device_id !== deviceId && new Date(data.expires_at).getTime() > now;
  if (busy && !force) return { ok: false, conflict: true };
  const { error } = await db.from("activity_leases").upsert({
    user_id: userId,
    device_id: deviceId,
    context_id: contextId,
    expires_at: new Date(now + LEASE_TTL_MS).toISOString(),
    updated_at: new Date(now).toISOString(),
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}

/** Confirma que este aparelho ainda detém a reserva; renova o prazo. */
export async function checkLease(db: Db, userId: string, deviceId: string): Promise<boolean> {
  const now = Date.now();
  const { data } = await db
    .from("activity_leases")
    .update({ expires_at: new Date(now + LEASE_TTL_MS).toISOString(), updated_at: new Date(now).toISOString() })
    .eq("user_id", userId)
    .eq("device_id", deviceId)
    .select("user_id");
  return (data?.length ?? 0) > 0;
}

export async function releaseLease(db: Db, userId: string, deviceId: string) {
  await db.from("activity_leases").delete().eq("user_id", userId).eq("device_id", deviceId);
}
