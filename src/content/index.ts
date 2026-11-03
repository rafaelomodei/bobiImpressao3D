import "server-only";
import { createHash } from "node:crypto";
import { assetEntry, world, type Activity, type Assessment, type AssetEntry, type Lesson, type World } from "./schema";
import { activityAssetIds, toPublicActivity, toPublicAsset } from "./engine";
import type { Answer, PublicAssessment, PublicAsset, PublicLesson, PublicTerm } from "./public-types";
import { findTerms, wrongAnswerTexts } from "./explain";
import type { PathNode } from "@/lib/game/rules";
import m1 from "./mundos/m1";
import m2 from "./mundos/m2";
import m3 from "./mundos/m3";
import { ASSETS as CORE } from "./assets/core";
import { ASSETS as A1 } from "./assets/m1";
import { ASSETS as A2 } from "./assets/m2";
import { ASSETS as A3 } from "./assets/m3";
import { READY_SPRITES } from "./assets/ready.generated";

/** Mundos validados na carga do módulo: conteúdo inválido derruba o build (DD001 §6). */
export const WORLDS: World[] = [m1, m2, m3].map((w) => world.parse(w));

const ASSET_MAP = new Map<string, AssetEntry>(
  [...CORE, ...A1, ...A2, ...A3].map((a) => {
    const parsed = assetEntry.parse(a);
    // Pronto = arquivo presente em public/sprites (lista gerada por pnpm sprites:sync).
    return [parsed.id, { ...parsed, status: READY_SPRITES.includes(parsed.file) ? "ready" : "placeholder" }];
  }),
);

/** Versão do conteúdo publicada: hash do conteúdo validado (RNF011/RNF012). */
export const CONTENT_VERSION = createHash("sha256")
  .update(JSON.stringify(WORLDS))
  .digest("hex")
  .slice(0, 12);

export const PATH: PathNode[] = WORLDS.flatMap((w) => [
  ...w.lessons.map(
    (l): PathNode => ({ kind: "lesson", id: l.id, slug: l.slug, number: l.number, title: l.title, world: w.number }),
  ),
  { kind: "assessment", id: w.assessment.id, slug: w.assessment.slug, title: w.assessment.title, world: w.number },
]);

export function findLesson(slug: string): { lesson: Lesson; world: World } | null {
  for (const w of WORLDS) {
    const lesson = w.lessons.find((l) => l.slug === slug);
    if (lesson) return { lesson, world: w };
  }
  return null;
}

export function findAssessment(slug: string): { assessment: Assessment; world: World } | null {
  for (const w of WORLDS) if (w.assessment.slug === slug) return { assessment: w.assessment, world: w };
  return null;
}

export function getAsset(id: string): PublicAsset {
  const a = ASSET_MAP.get(id);
  return a ? toPublicAsset(a) : { id, label: id, emoji: "🖼️", kind: "illustration", src: null, reducedMotionSrc: null };
}

function assetsFor(ids: string[]): Record<string, PublicAsset> {
  return Object.fromEntries(ids.map((id) => [id, getAsset(id)]));
}

export function toPublicLesson(lesson: Lesson, w: World): PublicLesson {
  const ids = lesson.activities.flatMap(activityAssetIds);
  if (lesson.intro.visualAssetId) ids.push(lesson.intro.visualAssetId);
  return {
    id: lesson.id,
    slug: lesson.slug,
    number: lesson.number,
    title: lesson.title,
    worldTitle: `Mundo ${w.number} · ${w.title}`,
    intro: lesson.intro,
    activities: lesson.activities.map((a) => toPublicActivity(a, lesson.id)),
    outro: lesson.outro,
    assets: assetsFor(ids),
  };
}

export function toPublicAssessment(a: Assessment, w: World): PublicAssessment {
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    worldNumber: w.number,
    intro: a.intro,
    passMin: a.passMin,
    questions: a.questions.map((q) => toPublicActivity(q, a.id)),
    assets: assetsFor(a.questions.flatMap(activityAssetIds)),
  };
}

export function lessonTitle(id: string): string {
  for (const w of WORLDS) {
    const l = w.lessons.find((x) => x.id === id);
    if (l) return `L${String(l.number).padStart(2, "0")} · ${l.title}`;
  }
  return id;
}

/** DD027: termos do glossário que ajudam a entender a pergunta depois de um erro. */
export function explainWrongAnswer(activity: Activity, answer: Answer, feedback: string): PublicTerm[] {
  return findTerms(wrongAnswerTexts(activity, answer, feedback)).map((t) => {
    const image = t.assetId ? getAsset(t.assetId) : null;
    return { term: t.term, definition: t.definition, image: image?.src ? image : null };
  });
}
