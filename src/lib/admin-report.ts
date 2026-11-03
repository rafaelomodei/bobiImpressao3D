import "server-only";
import { WORLDS } from "@/content";
import {
  buildReport,
  type AssessmentRow,
  type AttemptRow,
  type Catalog,
  type EventRow,
  type LedgerRow,
  type ProfileRow,
  type ProgressRow,
  type Report,
} from "@/lib/game/analytics";
import { createAdminClient } from "@/lib/supabase/admin";

export const PERIODS = [7, 30, 90] as const;
export type Period = (typeof PERIODS)[number];

const PAGE = 1000;

/** O PostgREST devolve no máximo 1000 linhas por chamada: pagina até acabar. */
async function fetchAll<T>(
  run: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>,
): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await run(from, from + PAGE - 1);
    if (error) throw new Error(`Falha ao carregar relatório: ${error.message}`);
    rows.push(...((data ?? []) as T[]));
    if (!data || data.length < PAGE) return rows;
  }
}

const CATALOG: Catalog = {
  lessons: WORLDS.flatMap((w) =>
    w.lessons.map((l) => ({
      id: l.id,
      label: `L${String(l.number).padStart(2, "0")} · ${l.title}`,
      world: w.number,
      activities: l.activities.map((a) => ({ id: a.id, title: a.title })),
    })),
  ),
  assessments: WORLDS.map((w) => ({
    id: w.assessment.id,
    label: `AV0${w.number} · ${w.assessment.title}`,
    questions: w.assessment.questions.map((q) => ({ id: q.id, title: q.title })),
  })),
};

/** Relatório do painel administrativo (DD026). Lido com a chave secreta, só após requireAdmin. */
export async function loadReport(days: Period): Promise<Report & { since: string; generatedAt: string }> {
  const db = createAdminClient();
  const now = new Date();
  const since = new Date(now.getTime() - days * 86400_000).toISOString();

  const [profiles, attempts, events, progress, assessments, ledger] = await Promise.all([
    fetchAll<ProfileRow>((a, b) => db.from("profiles").select("user_id, nickname, birth_date, created_at").order("created_at").range(a, b)),
    fetchAll<AttemptRow>((a, b) =>
      db
        .from("activity_attempts")
        .select("user_id, context_id, activity_id, attempt_no, is_correct, hint_used, is_review, duration_ms, created_at")
        .gte("created_at", since)
        .order("id")
        .range(a, b),
    ),
    fetchAll<EventRow>((a, b) =>
      db
        .from("session_events")
        .select("user_id, event, context_id, activity_id, after_error, created_at")
        .gte("created_at", since)
        .order("id")
        .range(a, b),
    ),
    fetchAll<ProgressRow>((a, b) =>
      db.from("lesson_progress").select("user_id, lesson_id, first_completed_at").order("user_id").order("lesson_id").range(a, b),
    ),
    fetchAll<AssessmentRow>((a, b) =>
      db
        .from("assessment_attempts")
        .select("user_id, assessment_id, status, score, passed, started_at")
        .gte("started_at", since)
        .order("id")
        .range(a, b),
    ),
    fetchAll<LedgerRow>((a, b) => db.from("wallet_ledger").select("user_id, xp").order("id").range(a, b)),
  ]);

  const report = buildReport({ since, now, profiles, attempts, events, progress, assessments, ledger, catalog: CATALOG });
  return { ...report, since, generatedAt: now.toISOString() };
}
