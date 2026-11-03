/**
 * Projeção pública e correção das atividades. Funções puras (testáveis);
 * só devem ser chamadas no servidor, a partir de src/content/index.ts.
 */
import { createHash } from "node:crypto";
import type { Activity, AssetEntry } from "./schema";
import type { Answer, PublicActivity, PublicAsset } from "./public-types";

/** Id opaco e estável: o navegador não consegue deduzir pares nem ordem pelo id. */
export function opaqueId(scope: string, rawId: string): string {
  return "x" + createHash("sha256").update(`bobi:${scope}:${rawId}`).digest("hex").slice(0, 10);
}

/** Embaralhamento determinístico (mesma ordem após recarregar a página). */
export function stableShuffle<T>(items: T[], seed: string, key: (t: T) => string): T[] {
  const h = (s: string) => createHash("sha256").update(`${seed}:${s}`).digest("hex");
  const shuffled = [...items].sort((a, b) => (h(key(a)) < h(key(b)) ? -1 : 1));
  // Nunca apresentar já na ordem correta (ordenação/associação ficariam triviais).
  if (shuffled.length > 1 && shuffled.every((t, i) => key(t) === key(items[i]))) {
    shuffled.push(shuffled.shift()!);
  }
  return shuffled;
}

export function toPublicActivity(a: Activity, scope: string): PublicActivity {
  const base = {
    id: a.id,
    title: a.title,
    pedagogicalLabel: a.pedagogicalLabel,
    preBlocks: a.preBlocks,
    statement: a.statement,
    stimulusAssetId: a.stimulusAssetId,
  };
  const s = `${scope}:${a.id}`;
  switch (a.type) {
    case "multiple_choice":
    case "visual_diagnosis":
      return {
        ...base,
        type: a.type,
        options: a.options.map(({ id, text, assetId }) => ({ id, text, assetId })),
      };
    case "matching":
      return {
        ...base,
        type: "matching",
        left: a.pairs.map((p) => ({ id: p.id, text: p.left, assetId: p.leftAssetId })),
        right: stableShuffle(a.pairs, s, (p) => p.id).map((p) => ({ id: opaqueId(s, p.id), text: p.right })),
      };
    case "ordering":
      return {
        ...base,
        type: "ordering",
        items: stableShuffle(a.items, s, (i) => i.id).map((i) => ({
          id: opaqueId(s, i.id),
          text: i.text,
          assetId: i.assetId,
        })),
      };
  }
}

export type GradeResult = {
  correct: boolean;
  /** Feedback específico (alternativa) ou geral (associação/ordenação). */
  feedback: string;
  /** Associação: ids da coluna esquerda com par errado (para destacar). */
  wrongIds?: string[];
};

export function gradeActivity(a: Activity, answer: Answer, scope: string): GradeResult {
  const s = `${scope}:${a.id}`;
  switch (a.type) {
    case "multiple_choice":
    case "visual_diagnosis": {
      if (answer.kind !== "choice") return { correct: false, feedback: "Escolha uma alternativa." };
      if (answer.optionId === a.correctOptionId) return { correct: true, feedback: a.successFeedback };
      const opt = a.options.find((o) => o.id === answer.optionId);
      return { correct: false, feedback: opt?.feedback ?? "Escolha uma das alternativas." };
    }
    case "matching": {
      if (answer.kind !== "matching") return { correct: false, feedback: a.errorFeedback };
      const wrongIds = a.pairs.filter((p) => answer.pairs[p.id] !== opaqueId(s, p.id)).map((p) => p.id);
      return wrongIds.length === 0
        ? { correct: true, feedback: a.successFeedback }
        : { correct: false, feedback: a.errorFeedback, wrongIds };
    }
    case "ordering": {
      if (answer.kind !== "ordering") return { correct: false, feedback: a.errorFeedback };
      const expected = a.items.map((i) => opaqueId(s, i.id));
      const ok = expected.length === answer.order.length && expected.every((id, i) => answer.order[i] === id);
      return ok ? { correct: true, feedback: a.successFeedback } : { correct: false, feedback: a.errorFeedback };
    }
  }
}

/** Ids de assets usados por uma atividade (para enviar só o necessário ao cliente). */
export function activityAssetIds(a: Activity): string[] {
  const ids: string[] = [];
  if (a.stimulusAssetId) ids.push(a.stimulusAssetId);
  for (const b of a.preBlocks) if (b.kind !== "speech") ids.push(b.assetId);
  if (a.type === "multiple_choice" || a.type === "visual_diagnosis")
    for (const o of a.options) if (o.assetId) ids.push(o.assetId);
  if (a.type === "matching") for (const p of a.pairs) if (p.leftAssetId) ids.push(p.leftAssetId);
  if (a.type === "ordering") for (const i of a.items) if (i.assetId) ids.push(i.assetId);
  return ids;
}

export function toPublicAsset(a: AssetEntry): PublicAsset {
  return {
    id: a.id,
    label: a.label,
    emoji: a.emoji,
    kind: a.kind,
    src: a.status === "ready" ? `/sprites/${a.file}` : null,
  };
}
