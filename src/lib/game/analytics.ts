/**
 * Indicadores do painel administrativo (DD026, RF039). Funções puras: recebem as
 * linhas do banco já filtradas pelo período e devolvem os números do relatório.
 * Testadas em analytics.test.ts.
 */
import { addDays, dayInSaoPaulo } from "./rules";

export type AttemptRow = {
  user_id: string;
  context_id: string;
  activity_id: string;
  attempt_no: number;
  is_correct: boolean;
  hint_used: boolean;
  is_review: boolean;
  duration_ms: number | null;
  created_at: string;
};

export type EventRow = {
  user_id: string;
  event: "activity_open" | "activity_exit" | "app_left";
  context_id: string;
  activity_id: string | null;
  after_error: boolean;
  created_at: string;
};

export type ProgressRow = { user_id: string; lesson_id: string; first_completed_at: string | null };
export type AssessmentRow = {
  user_id: string;
  assessment_id: string;
  status: "in_progress" | "finished";
  score: number | null;
  passed: boolean | null;
  started_at: string;
};
export type ProfileRow = { user_id: string; nickname: string; birth_date: string; created_at: string };
export type LedgerRow = { user_id: string; xp: number };

/** Catálogo de nomes para exibir (vem do conteúdo). */
export type Catalog = {
  lessons: { id: string; label: string; world: number; activities: { id: string; title: string }[] }[];
  assessments: { id: string; label: string; questions: { id: string; title: string }[] }[];
};

export type AnalyticsInput = {
  since: string; // ISO
  now: Date;
  profiles: ProfileRow[];
  attempts: AttemptRow[];
  events: EventRow[];
  progress: ProgressRow[];
  assessments: AssessmentRow[];
  ledger: LedgerRow[];
  catalog: Catalog;
};

/** Depois de um erro, quanto tempo sem responder conta como "saiu" (pausa longa). */
export const RETURN_GAP_MS = 30 * 60 * 1000;

export const isLessonContext = (id: string) => /-L\d{2}$/.test(id);

export function median(values: number[]): number | null {
  if (!values.length) return null;
  const s = [...values].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

const share = (part: number, total: number) => (total > 0 ? part / total : null);
const ms = (iso: string) => new Date(iso).getTime();

/* ------------------------------------------------------------------------- */
/* Retenção após erro                                                          */
/* ------------------------------------------------------------------------- */

export type AfterErrorOutcome = "continued" | "returned" | "gone";
export type ExitKind = "button" | "app" | "idle";

export type RetentionAfterError = {
  errors: number;
  /** Respondeu de novo em até 30 min, sem sair. */
  continued: number;
  /** Saiu (botão, fechou o app ou pausa longa) e voltou depois. */
  returned: number;
  /** Saiu e não voltou até agora. */
  gone: number;
  /** Erros que depois viraram acerto na mesma atividade. */
  recovered: number;
  /** Como saiu, entre os que saíram (returned + gone). */
  exitKinds: Record<ExitKind, number>;
  /** Mediana do tempo até voltar, entre os que voltaram. */
  medianReturnMs: number | null;
};

type Item = { t: number; kind: "attempt"; a: AttemptRow } | { t: number; kind: "event"; e: EventRow };

/**
 * Para cada resposta errada em lição, olha o que a pessoa fez em seguida:
 * continuou tentando, saiu e voltou, ou saiu e não voltou.
 */
export function retentionAfterError(attempts: AttemptRow[], events: EventRow[], now: Date): RetentionAfterError {
  const byUser = new Map<string, Item[]>();
  const push = (u: string, it: Item) => (byUser.get(u) ?? byUser.set(u, []).get(u)!).push(it);
  for (const a of attempts) push(a.user_id, { t: ms(a.created_at), kind: "attempt", a });
  for (const e of events) push(e.user_id, { t: ms(e.created_at), kind: "event", e });

  const out: RetentionAfterError = {
    errors: 0,
    continued: 0,
    returned: 0,
    gone: 0,
    recovered: 0,
    exitKinds: { button: 0, app: 0, idle: 0 },
    medianReturnMs: null,
  };
  const returnTimes: number[] = [];

  for (const items of byUser.values()) {
    items.sort((x, y) => x.t - y.t || (x.kind === "attempt" ? -1 : 1));
    items.forEach((it, i) => {
      if (it.kind !== "attempt" || it.a.is_correct || !isLessonContext(it.a.context_id)) return;
      out.errors++;
      const later = items.slice(i + 1);
      if (later.some((n) => n.kind === "attempt" && n.a.is_correct && n.a.context_id === it.a.context_id && n.a.activity_id === it.a.activity_id))
        out.recovered++;

      const nextActivity = later.find((n) => n.kind === "attempt" || n.e.event === "activity_open");
      const exitEvent = later.find(
        (n): n is Extract<Item, { kind: "event" }> =>
          n.kind === "event" && n.e.event !== "activity_open" && (!nextActivity || n.t <= nextActivity.t),
      );
      const gap = (nextActivity?.t ?? now.getTime()) - it.t;
      if (nextActivity && !exitEvent && gap <= RETURN_GAP_MS) {
        out.continued++;
        return;
      }
      const kind: ExitKind = !exitEvent ? "idle" : exitEvent.e.event === "activity_exit" ? "button" : "app";
      // Saiu do app rapidinho (trocou de app) e voltou em menos de 30 min: conta como continuar.
      if (nextActivity && kind === "app" && gap <= RETURN_GAP_MS && nextActivity.kind === "attempt") {
        out.continued++;
        return;
      }
      out.exitKinds[kind]++;
      if (nextActivity) {
        out.returned++;
        returnTimes.push(nextActivity.t - it.t);
      } else out.gone++;
    });
  }
  out.medianReturnMs = median(returnTimes);
  return out;
}

/* ------------------------------------------------------------------------- */
/* Relatório completo                                                          */
/* ------------------------------------------------------------------------- */

export type DayPoint = { day: string; activeUsers: number; answers: number };

export type LessonStats = {
  id: string;
  label: string;
  world: number;
  started: number;
  completed: number;
  firstTryRate: number | null;
  errorsPerPlayer: number | null;
  medianMs: number | null;
  exits: number;
};

export type ActivityStats = {
  contextId: string;
  contextLabel: string;
  activityId: string;
  title: string;
  players: number;
  firstTryErrorRate: number;
  medianMs: number | null;
  hintRate: number | null;
};

export type AssessmentStats = {
  id: string;
  label: string;
  finished: number;
  passRate: number | null;
  avgScore: number | null;
  hardest: { title: string; correctRate: number } | null;
};

export type PlayerStats = {
  nickname: string;
  adult: boolean;
  createdAt: string;
  lastSeen: string | null;
  lessonsCompleted: number;
  xp: number;
  answers: number;
  firstTryRate: number | null;
};

export type ExitSpot = { contextLabel: string; activity: string; count: number; afterError: number };

export type Report = {
  kpis: {
    players: number;
    newPlayers: number;
    activePlayers: number;
    lessonsCompleted: number;
    answers: number;
    firstTryRate: number | null;
    medianAnswerMs: number | null;
    hintRate: number | null;
    assessmentPassRate: number | null;
  };
  daily: DayPoint[];
  retention: RetentionAfterError;
  exits: { total: number; afterError: number; button: number; app: number; spots: ExitSpot[] };
  lessons: LessonStats[];
  hardest: ActivityStats[];
  assessments: AssessmentStats[];
  players: PlayerStats[];
};

export function buildReport(input: AnalyticsInput): Report {
  const { since, now, profiles, catalog } = input;
  const players = new Set(profiles.map((p) => p.user_id));
  // Só contas de jogador (com perfil): administradores e contas sem onboarding ficam fora.
  const attempts = input.attempts.filter((a) => players.has(a.user_id));
  const events = input.events.filter((e) => players.has(e.user_id));
  const lessonAttempts = attempts.filter((a) => isLessonContext(a.context_id));
  const firstTries = lessonAttempts.filter((a) => a.attempt_no === 1 && !a.is_review);
  const durations = attempts.map((a) => a.duration_ms).filter((d): d is number => d !== null);

  // Dica: oferecida a partir da 3ª tentativa (depois de dois erros, DD006).
  const key = (a: AttemptRow) => `${a.user_id}|${a.context_id}|${a.activity_id}`;
  const offered = new Set(lessonAttempts.filter((a) => a.attempt_no > 2).map(key));
  const hinted = new Set(lessonAttempts.filter((a) => a.hint_used).map(key));

  const finishedAssessments = input.assessments.filter((a) => a.status === "finished" && players.has(a.user_id));
  const completedInPeriod = input.progress.filter(
    (p) => p.first_completed_at && p.first_completed_at >= since && players.has(p.user_id),
  );

  const active = new Set([...attempts.map((a) => a.user_id), ...events.map((e) => e.user_id)]);

  // Atividade diária (dia em America/Sao_Paulo, DD005).
  const firstDay = dayInSaoPaulo(new Date(since));
  const today = dayInSaoPaulo(now);
  const daily = new Map<string, { users: Set<string>; answers: number }>();
  for (let d = firstDay; d <= today; d = addDays(d, 1)) daily.set(d, { users: new Set(), answers: 0 });
  for (const a of attempts) {
    const slot = daily.get(dayInSaoPaulo(new Date(a.created_at)));
    if (slot) {
      slot.users.add(a.user_id);
      slot.answers++;
    }
  }
  for (const e of events) daily.get(dayInSaoPaulo(new Date(e.created_at)))?.users.add(e.user_id);

  // Saídas no meio da atividade.
  const exitEvents = events.filter((e) => e.event !== "activity_open");
  const activityTitle = new Map<string, string>();
  const contextLabel = new Map<string, string>();
  for (const l of catalog.lessons) {
    contextLabel.set(l.id, l.label);
    for (const a of l.activities) activityTitle.set(`${l.id}|${a.id}`, a.title);
  }
  for (const av of catalog.assessments) {
    contextLabel.set(av.id, av.label);
    for (const q of av.questions) activityTitle.set(`${av.id}|${q.id}`, q.title);
  }
  const spots = new Map<string, ExitSpot>();
  for (const e of exitEvents) {
    const k = `${e.context_id}|${e.activity_id ?? ""}`;
    const s =
      spots.get(k) ??
      spots
        .set(k, {
          contextLabel: contextLabel.get(e.context_id) ?? e.context_id,
          activity: e.activity_id ? (activityTitle.get(k) ?? e.activity_id) : "Abertura (antes da 1ª atividade)",
          count: 0,
          afterError: 0,
        })
        .get(k)!;
    s.count++;
    if (e.after_error) s.afterError++;
  }

  // Por lição.
  const lessons: LessonStats[] = catalog.lessons.map((l) => {
    const la = lessonAttempts.filter((a) => a.context_id === l.id);
    const started = new Set(la.map((a) => a.user_id)).size;
    const ft = la.filter((a) => a.attempt_no === 1 && !a.is_review);
    const errors = la.filter((a) => !a.is_correct).length;
    return {
      id: l.id,
      label: l.label,
      world: l.world,
      started,
      completed: completedInPeriod.filter((p) => p.lesson_id === l.id).length,
      firstTryRate: share(ft.filter((a) => a.is_correct).length, ft.length),
      errorsPerPlayer: started ? errors / started : null,
      medianMs: median(la.map((a) => a.duration_ms).filter((d): d is number => d !== null)),
      exits: exitEvents.filter((e) => e.context_id === l.id).length,
    };
  });

  // Atividades mais difíceis: maior taxa de erro na 1ª tentativa (mínimo de 2 jogadores).
  const byActivity = new Map<string, AttemptRow[]>();
  for (const a of lessonAttempts) {
    const k = `${a.context_id}|${a.activity_id}`;
    (byActivity.get(k) ?? byActivity.set(k, []).get(k)!).push(a);
  }
  const hardest: ActivityStats[] = [...byActivity.entries()]
    .map(([k, rows]) => {
      const [contextId, activityId] = k.split("|");
      const ft = rows.filter((a) => a.attempt_no === 1 && !a.is_review);
      const offeredHere = new Set(rows.filter((a) => a.attempt_no > 2).map(key));
      const hintedHere = new Set(rows.filter((a) => a.hint_used).map(key));
      return {
        contextId,
        contextLabel: contextLabel.get(contextId) ?? contextId,
        activityId,
        title: activityTitle.get(k) ?? activityId,
        players: ft.length,
        firstTryErrorRate: ft.length ? ft.filter((a) => !a.is_correct).length / ft.length : 0,
        medianMs: median(rows.map((a) => a.duration_ms).filter((d): d is number => d !== null)),
        hintRate: share(hintedHere.size, offeredHere.size),
      };
    })
    .filter((s) => s.players >= 2 && s.firstTryErrorRate > 0)
    .sort((a, b) => b.firstTryErrorRate - a.firstTryErrorRate || b.players - a.players)
    .slice(0, 8);

  // Avaliações de domínio.
  const assessments: AssessmentStats[] = catalog.assessments.map((av) => {
    const fin = finishedAssessments.filter((a) => a.assessment_id === av.id);
    const qa = attempts.filter((a) => a.context_id === av.id);
    const perQ = av.questions
      .map((q) => {
        const rows = qa.filter((a) => a.activity_id === q.id);
        return { title: q.title, total: rows.length, correctRate: rows.length ? rows.filter((r) => r.is_correct).length / rows.length : 1 };
      })
      .filter((q) => q.total > 0)
      .sort((a, b) => a.correctRate - b.correctRate);
    return {
      id: av.id,
      label: av.label,
      finished: fin.length,
      passRate: share(fin.filter((a) => a.passed).length, fin.length),
      avgScore: fin.length ? fin.reduce((s, a) => s + (a.score ?? 0), 0) / fin.length : null,
      hardest: perQ[0] ? { title: perQ[0].title, correctRate: perQ[0].correctRate } : null,
    };
  });

  // Jogadores.
  const xpByUser = new Map<string, number>();
  for (const r of input.ledger) xpByUser.set(r.user_id, (xpByUser.get(r.user_id) ?? 0) + r.xp);
  const lastSeen = new Map<string, string>();
  for (const r of [...attempts, ...events]) if ((lastSeen.get(r.user_id) ?? "") < r.created_at) lastSeen.set(r.user_id, r.created_at);
  // Nascidos até esta data têm 18 anos ou mais hoje (DD015).
  const adultCut = `${Number(today.slice(0, 4)) - 18}${today.slice(4)}`;
  const playerStats: PlayerStats[] = profiles
    .map((p) => {
      const own = attempts.filter((a) => a.user_id === p.user_id);
      const ft = own.filter((a) => a.attempt_no === 1 && !a.is_review && isLessonContext(a.context_id));
      return {
        nickname: p.nickname,
        adult: p.birth_date <= adultCut,
        createdAt: p.created_at,
        lastSeen: lastSeen.get(p.user_id) ?? null,
        lessonsCompleted: input.progress.filter((r) => r.user_id === p.user_id && r.first_completed_at).length,
        xp: xpByUser.get(p.user_id) ?? 0,
        answers: own.length,
        firstTryRate: share(ft.filter((a) => a.is_correct).length, ft.length),
      };
    })
    .sort((a, b) => (b.lastSeen ?? "").localeCompare(a.lastSeen ?? "") || b.xp - a.xp);

  return {
    kpis: {
      players: profiles.length,
      newPlayers: profiles.filter((p) => p.created_at >= since).length,
      activePlayers: active.size,
      lessonsCompleted: completedInPeriod.length,
      answers: attempts.length,
      firstTryRate: share(firstTries.filter((a) => a.is_correct).length, firstTries.length),
      medianAnswerMs: median(durations),
      hintRate: share([...hinted].filter((k) => offered.has(k)).length, offered.size),
      assessmentPassRate: share(finishedAssessments.filter((a) => a.passed).length, finishedAssessments.length),
    },
    daily: [...daily.entries()].map(([day, v]) => ({ day, activeUsers: v.users.size, answers: v.answers })),
    retention: retentionAfterError(lessonAttempts, events, now),
    exits: {
      total: exitEvents.length,
      afterError: exitEvents.filter((e) => e.after_error).length,
      button: exitEvents.filter((e) => e.event === "activity_exit").length,
      app: exitEvents.filter((e) => e.event === "app_left").length,
      spots: [...spots.values()].sort((a, b) => b.count - a.count).slice(0, 8),
    },
    lessons,
    hardest,
    assessments,
    players: playerStats,
  };
}
