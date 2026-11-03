/**
 * Explicação dos termos no ciclo de erro (DD027). Função pura, testada em explain.test.ts.
 */
import type { Activity } from "./schema";
import type { Answer } from "./public-types";
import { GLOSSARY, type GlossaryEntry } from "./glossary";

export const MAX_TERMS = 4;

type Pattern = { entry: GlossaryEntry; re: RegExp; length: number };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Palavra inteira com acentos: nada de letra/dígito colado antes ou depois.
const bounded = (s: string, flags: string) => new RegExp(`(?<![\\p{L}\\p{N}])${escape(s)}(?![\\p{L}\\p{N}])`, `g${flags}`);

/** Expressões mais longas primeiro: "primeira camada" ganha de "camada" no mesmo trecho. */
const PATTERNS: Pattern[] = GLOSSARY.flatMap((entry) => [
  ...(entry.match.words ?? []).map((w) => ({ entry, re: bounded(w, "iu"), length: w.length })),
  ...(entry.match.acronyms ?? []).map((a) => ({ entry, re: bounded(a, "u"), length: a.length })),
]).sort((a, b) => b.length - a.length);

/**
 * Termos do glossário presentes nos textos, na ordem de prioridade dos textos
 * (o primeiro texto pesa mais). Cada trecho de texto só conta para um termo.
 */
export function findTerms(texts: string[], max = MAX_TERMS): GlossaryEntry[] {
  const found = new Map<string, { entry: GlossaryEntry; rank: number; pos: number }>();
  texts.forEach((original, rank) => {
    let text = original;
    for (const p of PATTERNS) {
      text = text.replace(p.re, (m, offset: number) => {
        const prev = found.get(p.entry.id);
        if (!prev || rank < prev.rank || (rank === prev.rank && offset < prev.pos))
          found.set(p.entry.id, { entry: p.entry, rank, pos: offset });
        return " ".repeat(m.length); // apaga o trecho para termos menores não casarem nele
      });
    }
  });
  const ordered = [...found.values()].sort((a, b) => a.rank - b.rank || a.pos - b.pos).map((f) => f.entry);
  // Termos genéricos (ex.: "impressão 3D") só entram quando a pergunta tem pouco termo específico.
  const specific = ordered.filter((e) => !e.generic);
  return (specific.length >= 2 ? specific : ordered).slice(0, max);
}

/**
 * Textos de uma atividade errada, do mais ao menos relevante: o que a pessoa marcou e
 * o feedback do erro, depois o enunciado, depois as demais alternativas/cartões.
 */
export function wrongAnswerTexts(a: Activity, answer: Answer, feedback: string): string[] {
  const texts: string[] = [];
  if ((a.type === "multiple_choice" || a.type === "visual_diagnosis") && answer.kind === "choice") {
    const chosen = a.options.find((o) => o.id === answer.optionId);
    texts.push([chosen?.text ?? "", feedback].join(" "));
  } else texts.push(feedback);
  texts.push(a.statement);
  if (a.type === "multiple_choice" || a.type === "visual_diagnosis") texts.push(a.options.map((o) => o.text).join(" · "));
  if (a.type === "matching") texts.push(a.pairs.map((p) => `${p.left} · ${p.right}`).join(" · "));
  if (a.type === "ordering") texts.push(a.items.map((i) => i.text).join(" · "));
  return texts;
}
