import { describe, expect, it } from "vitest";
import { activity } from "./schema";
import { gradeActivity, toPublicActivity } from "./engine";
import { l01 } from "./mundos/m1/l01";

const acts = l01.activities.map((a) => activity.parse(a));
const [mc, match, order] = acts;

describe("projeção pública (DD001/DD018)", () => {
  it("não envia gabarito nem feedback", () => {
    const json = JSON.stringify(acts.map((a) => toPublicActivity(a, l01.id)));
    expect(json).not.toContain("correctOptionId");
    expect(json).not.toContain("feedback");
    expect(json).not.toContain('"hint"');
  });
  it("ordenação não chega na ordem certa e usa ids opacos", () => {
    const pub = toPublicActivity(order, l01.id);
    if (pub.type !== "ordering" || order.type !== "ordering") throw new Error();
    expect(pub.items.map((i) => i.text)).not.toEqual(order.items.map((i) => i.text));
    expect(pub.items.every((i) => i.id.startsWith("x"))).toBe(true);
  });
});

describe("correção", () => {
  it("múltipla escolha devolve feedback da alternativa", () => {
    expect(gradeActivity(mc, { kind: "choice", optionId: "a" }, l01.id).correct).toBe(true);
    const wrong = gradeActivity(mc, { kind: "choice", optionId: "b" }, l01.id);
    expect(wrong.correct).toBe(false);
    expect(wrong.feedback).toMatch(/retira material/);
  });
  it("associação aponta os pares errados", () => {
    const pub = toPublicActivity(match, l01.id);
    if (pub.type !== "matching" || match.type !== "matching") throw new Error();
    const rightOf = (text: string) => pub.right.find((r) => r.text === text)!.id;
    const ok = Object.fromEntries(match.pairs.map((p) => [p.id, rightOf(p.right)]));
    expect(gradeActivity(match, { kind: "matching", pairs: ok }, l01.id).correct).toBe(true);
    const swapped = { ...ok, p1: ok.p2, p2: ok.p1 };
    expect(gradeActivity(match, { kind: "matching", pairs: swapped }, l01.id).wrongIds).toEqual(["p1", "p2"]);
  });
  it("ordenação só vale com a sequência inteira", () => {
    const pub = toPublicActivity(order, l01.id);
    if (pub.type !== "ordering" || order.type !== "ordering") throw new Error();
    const idOf = (t: string) => pub.items.find((i) => i.text === t)!.id;
    const right = order.items.map((i) => idOf(i.text));
    expect(gradeActivity(order, { kind: "ordering", order: right }, l01.id).correct).toBe(true);
    expect(gradeActivity(order, { kind: "ordering", order: [...right].reverse() }, l01.id).correct).toBe(false);
  });
});
