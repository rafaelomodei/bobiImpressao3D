/**
 * Regras de gamificação homologadas (PD006) e padrões propostos (DD005, DD006, DD008).
 * Puras: usadas pelo servidor e pelos testes.
 */

export const REWARDS = {
  lessonFirst: { xp: 20, fios: 10 },
  lessonReviewDaily: { xp: 5, fios: 0 },
  assessmentFirstPass: { xp: 30, fios: 15 },
  dailyGoal: { xp: 10, fios: 5 },
} as const;

/** DD006: dica após dois erros. */
export const HINT_AFTER_ERRORS = 2;

/** DD008: reserva expira após 2 min sem renovação; renovar a cada 30 s. */
export const LEASE_TTL_MS = 2 * 60 * 1000;
export const LEASE_RENEW_MS = 30 * 1000;

/** Nó da trilha, na ordem do currículo. */
export type PathNode =
  | { kind: "lesson"; id: string; slug: string; number: number; title: string; world: number }
  | { kind: "assessment"; id: string; slug: string; title: string; world: number };

export type NodeState = "locked" | "available" | "completed";

/**
 * DD003: desbloqueio sequencial. Lição liberada quando a anterior foi concluída;
 * a primeira lição de um mundo exige a aprovação na avaliação do mundo anterior;
 * a avaliação exige as oito lições do mundo.
 */
export function computePathStates(
  nodes: PathNode[],
  completedLessons: Set<string>,
  passedAssessments: Set<string>,
): NodeState[] {
  const states: NodeState[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i];
    const done = n.kind === "lesson" ? completedLessons.has(n.id) : passedAssessments.has(n.id);
    if (done) {
      states.push("completed");
      continue;
    }
    if (i === 0) {
      states.push("available");
      continue;
    }
    if (n.kind === "assessment") {
      const worldLessons = nodes.filter((m) => m.kind === "lesson" && m.world === n.world);
      states.push(worldLessons.every((m) => completedLessons.has(m.id)) ? "available" : "locked");
      continue;
    }
    states.push(states[i - 1] === "completed" ? "available" : "locked");
  }
  return states;
}

/** Data (YYYY-MM-DD) em America/Sao_Paulo (DD005). */
export function dayInSaoPaulo(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(day: string, delta: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

/** Segunda-feira da semana de `day` (DD005: semana de segunda a domingo). */
export function weekStart(day: string): string {
  const d = new Date(`${day}T12:00:00Z`);
  const dow = (d.getUTCDay() + 6) % 7; // 0 = segunda
  return addDays(day, -dow);
}

/**
 * Sequência de estudos: dias consecutivos com meta cumprida terminando hoje,
 * ou ontem se hoje ainda não foi cumprida (perder a sequência não apaga progresso).
 */
export function computeStreak(goalDays: string[], today: string): number {
  const set = new Set(goalDays);
  let cursor = set.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
