import { describe, expect, it } from "vitest";
import { buildReport, median, retentionAfterError, type AttemptRow, type EventRow } from "./analytics";

const L = "BOBI-M01-L01";
const t0 = new Date("2026-11-02T13:00:00Z").getTime();
const at = (min: number) => new Date(t0 + min * 60_000).toISOString();

function attempt(user: string, min: number, correct: boolean, extra: Partial<AttemptRow> = {}): AttemptRow {
  return {
    user_id: user,
    context_id: L,
    activity_id: "A01",
    attempt_no: 1,
    is_correct: correct,
    hint_used: false,
    is_review: false,
    duration_ms: 5000,
    created_at: at(min),
    ...extra,
  };
}
function event(user: string, min: number, kind: EventRow["event"], afterError = false): EventRow {
  return { user_id: user, event: kind, context_id: L, activity_id: "A01", after_error: afterError, created_at: at(min) };
}
const now = new Date(t0 + 3 * 86400_000);

describe("median", () => {
  it("ímpar, par e vazio", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(3);
    expect(median([])).toBeNull();
  });
});

describe("retentionAfterError", () => {
  it("errou e tentou de novo na hora = continuou e recuperou", () => {
    const r = retentionAfterError([attempt("u", 0, false), attempt("u", 1, true, { attempt_no: 2 })], [], now);
    expect(r).toMatchObject({ errors: 1, continued: 1, returned: 0, gone: 0, recovered: 1 });
  });

  it("errou, saiu pelo X e voltou no dia seguinte = saiu e voltou (botão)", () => {
    const r = retentionAfterError(
      [attempt("u", 0, false), attempt("u", 1500, true, { attempt_no: 2 })],
      [event("u", 1, "activity_exit", true), event("u", 1499, "activity_open")],
      now,
    );
    expect(r).toMatchObject({ continued: 0, returned: 1, gone: 0, exitKinds: { button: 1, app: 0, idle: 0 } });
    expect(r.medianReturnMs).toBe(1499 * 60_000);
  });

  it("errou e fechou o app sem voltar = não voltou (app)", () => {
    const r = retentionAfterError([attempt("u", 0, false)], [event("u", 2, "app_left", true)], now);
    expect(r).toMatchObject({ gone: 1, exitKinds: { app: 1 } });
  });

  it("trocou de app por poucos minutos e respondeu = continuou", () => {
    const r = retentionAfterError(
      [attempt("u", 0, false), attempt("u", 5, true, { attempt_no: 2 })],
      [event("u", 1, "app_left", true)],
      now,
    );
    expect(r.continued).toBe(1);
  });

  it("parou de responder por mais de 30 min sem aviso = saída por inatividade", () => {
    const r = retentionAfterError([attempt("u", 0, false), attempt("u", 90, true, { attempt_no: 2 })], [], now);
    expect(r).toMatchObject({ returned: 1, exitKinds: { idle: 1 } });
  });

  it("ignora erros de avaliação (sem feedback imediato)", () => {
    const r = retentionAfterError([attempt("u", 0, false, { context_id: "BOBI-M01-AV01", activity_id: "Q01" })], [], now);
    expect(r.errors).toBe(0);
  });
});

describe("buildReport", () => {
  it("conta só jogadores com perfil e calcula acerto de primeira", () => {
    const report = buildReport({
      since: at(-60),
      now,
      profiles: [{ user_id: "u", nickname: "ana", birth_date: "2000-01-01", created_at: at(-10) }],
      attempts: [attempt("u", 0, false), attempt("u", 1, true, { attempt_no: 2 }), attempt("admin", 0, true)],
      events: [],
      progress: [{ user_id: "u", lesson_id: L, first_completed_at: at(2) }],
      assessments: [],
      ledger: [{ user_id: "u", xp: 18 }],
      catalog: { lessons: [{ id: L, label: "L01", world: 1, activities: [{ id: "A01", title: "Reconhecer" }] }], assessments: [] },
    });
    expect(report.kpis).toMatchObject({ players: 1, activePlayers: 1, answers: 2, lessonsCompleted: 1, firstTryRate: 0 });
    expect(report.lessons[0]).toMatchObject({ started: 1, completed: 1, errorsPerPlayer: 1 });
    expect(report.players[0]).toMatchObject({ nickname: "ana", adult: true, xp: 18, lessonsCompleted: 1 });
  });
});
