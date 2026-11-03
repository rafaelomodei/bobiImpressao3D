import { describe, expect, it } from "vitest";
import { findTerms, wrongAnswerTexts } from "./explain";
import { GLOSSARY } from "./glossary";
import { activity, assetEntry, world } from "./schema";
import { ASSETS as CORE } from "./assets/core";
import { ASSETS as A1 } from "./assets/m1";
import { ASSETS as A2 } from "./assets/m2";
import { ASSETS as A3 } from "./assets/m3";
import m1 from "./mundos/m1";
import m2 from "./mundos/m2";
import m3 from "./mundos/m3";

const ids = (texts: string[]) => findTerms(texts).map((t) => t.id);

describe("findTerms (DD027)", () => {
  it("reconhece siglas só em maiúsculas e palavras sem diferenciar caixa", () => {
    expect(ids(["A impressora FDM usa Filamento"])).toEqual(["fdm", "filamento"]);
    expect(ids(["fdm em minúsculas não é sigla"])).toEqual([]);
  });

  it("prefere a expressão mais longa no mesmo trecho", () => {
    expect(ids(["A primeira camada não grudou"])).toEqual(["primeira-camada"]);
    expect(ids(["A primeira camada e as outras camadas"])).toEqual(["primeira-camada", "camada"]);
  });

  it("casa palavra inteira, com acentos", () => {
    expect(ids(["mesas e bicos"])).toEqual(["bico"]); // "mesas" não é forma cadastrada
    expect(ids(["mesa de impressão"])).toEqual(["mesa"]);
    expect(ids(["resinado"])).toEqual([]);
  });

  it("termo genérico só entra quando há pouco termo específico", () => {
    expect(ids(["Qual mostra uma impressão 3D? Uma máquina corta material de um bloco."])).toEqual(["impressao-3d", "fabricacao-subtrativa"]);
    expect(ids(["impressão 3D com filamento PLA no bico"])).toEqual(["filamento", "pla", "bico"]);
  });

  it("ordena pelo texto mais relevante e limita a 4", () => {
    const r = ids(["Você marcou SLA", "FDM, PLA, bico, extrusor e carretel"]);
    expect(r[0]).toBe("sla");
    expect(r).toHaveLength(4);
  });

  it("textos do erro começam pela alternativa marcada e o feedback", () => {
    const a = activity.parse(m1.lessons[0].activities[0]);
    if (a.type !== "multiple_choice" && a.type !== "visual_diagnosis") throw new Error("esperava escolha");
    const wrong = a.options.find((o) => o.id !== a.correctOptionId)!;
    const texts = wrongAnswerTexts(a, { kind: "choice", optionId: wrong.id }, wrong.feedback);
    expect(texts[0]).toContain(wrong.text);
    expect(texts[1]).toBe(a.statement);
  });
});

describe("casos reais", () => {
  it("L01 A01: marcar a máquina que corta explica impressão 3D e fabricação subtrativa", () => {
    const a = activity.parse(m1.lessons[0].activities[0]);
    if (a.type !== "multiple_choice") throw new Error("esperava múltipla escolha");
    const b = a.options.find((o) => o.id === "b")!;
    expect(findTerms(wrongAnswerTexts(a, { kind: "choice", optionId: "b" }, b.feedback)).map((t) => t.id)).toEqual([
      "fabricacao-subtrativa",
      "impressao-3d",
    ]);
  });
});

describe("glossário", () => {
  const catalog = new Set([...CORE, ...A1, ...A2, ...A3].map((a) => assetEntry.parse(a).id));
  const content = JSON.stringify([m1, m2, m3].map((w) => world.parse(w)));

  it("definições curtas e ilustrações que existem no catálogo", () => {
    for (const g of GLOSSARY) {
      expect(g.definition.length, g.id).toBeLessThanOrEqual(200);
      if (g.assetId) expect(catalog.has(g.assetId), `${g.id} → ${g.assetId}`).toBe(true);
    }
  });

  it("todo termo aparece em algum conteúdo (sem verbete morto)", () => {
    const found = new Set(findTerms([content], 99).map((t) => t.id));
    const lower = content.toLowerCase();
    for (const g of GLOSSARY) {
      // Genéricos saem do resultado quando há termos específicos; basta aparecerem no texto.
      const ok = g.generic ? (g.match.words ?? []).some((w) => lower.includes(w.toLowerCase())) : found.has(g.id);
      expect(ok, g.id).toBe(true);
    }
  });

  it("toda atividade de lição com termo técnico recebe pelo menos uma explicação", () => {
    let withTerms = 0,
      total = 0;
    for (const w of [m1, m2, m3])
      for (const l of world.parse(w).lessons)
        for (const a of l.activities) {
          total++;
          if (findTerms(wrongAnswerTexts(a, { kind: "ordering", order: [] }, "")).length) withTerms++;
        }
    expect(withTerms / total).toBeGreaterThan(0.7);
  });
});
