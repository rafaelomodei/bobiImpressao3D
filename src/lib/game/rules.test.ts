import { describe, expect, it } from "vitest";
import { computePathStates, computeStreak, weekStart, xpAfterErrors, type PathNode } from "./rules";
import { cornerResult, levelingScenario, printMinutes, ITEMS } from "./workshop-catalog";

const L = (n: number, world: number): PathNode => ({ kind: "lesson", id: `L${n}`, slug: `l${n}`, number: n, title: "", world });
const AV = (world: number): PathNode => ({ kind: "assessment", id: `AV${world}`, slug: `av${world}`, title: "", world });
const path = [L(1, 1), L(2, 1), AV(1), L(3, 2), AV(2)];

describe("desbloqueio sequencial (DD003)", () => {
  it("só a primeira lição começa liberada", () => {
    expect(computePathStates(path, new Set(), new Set())).toEqual(["available", "locked", "locked", "locked", "locked"]);
  });
  it("avaliação exige todas as lições do mundo e libera o próximo mundo", () => {
    expect(computePathStates(path, new Set(["L1", "L2"]), new Set())).toEqual(["completed", "completed", "available", "locked", "locked"]);
    expect(computePathStates(path, new Set(["L1", "L2"]), new Set(["AV1"]))[3]).toBe("available");
  });
});

describe("sequência e semana (DD005)", () => {
  it("conta dias consecutivos até hoje ou ontem", () => {
    expect(computeStreak(["2026-11-01", "2026-11-02", "2026-11-03"], "2026-11-03")).toBe(3);
    expect(computeStreak(["2026-11-01", "2026-11-02"], "2026-11-03")).toBe(2);
    expect(computeStreak(["2026-11-01"], "2026-11-03")).toBe(0);
  });
  it("semana começa na segunda", () => {
    expect(weekStart("2026-11-03")).toBe("2026-11-02"); // terça → segunda
    expect(weekStart("2026-11-08")).toBe("2026-11-02"); // domingo → segunda anterior
  });
});

describe("oficina (DD021)", () => {
  it("tempo de fabricação fica entre 2 e 15 min", () => {
    for (const i of ITEMS) for (const up of [[], ["mesa-ajustada"]]) {
      const m = printMinutes(i, up);
      expect(m).toBeGreaterThanOrEqual(2);
      expect(m).toBeLessThanOrEqual(15);
    }
  });
  it("cenário de nivelamento nunca começa todo nivelado", () => {
    for (let s = 0; s < 20; s++) expect(Object.values(levelingScenario(s)).some((v) => cornerResult(v) !== "ok")).toBe(true);
  });
});

describe("xpAfterErrors (DD023)", () => {
  it("desconta 10% do XP base por erro", () => {
    expect([0, 1, 2, 3, 5].map((e) => xpAfterErrors(20, e))).toEqual([20, 18, 16, 14, 10]);
  });
  it("nunca fica abaixo de 25% do XP base", () => {
    expect(xpAfterErrors(20, 8)).toBe(5);
    expect(xpAfterErrors(20, 50)).toBe(5);
    expect(xpAfterErrors(5, 20)).toBe(2);
  });
  it("avaliação: uma questão errada vale 27 de 30", () => {
    expect(xpAfterErrors(30, 1)).toBe(27);
  });
});
