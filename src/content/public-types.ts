/**
 * Formato público do conteúdo: o que o navegador recebe. Não contém gabarito,
 * feedback por alternativa nem a ordem/pares corretos (DD001).
 */
import type { CarameloPose } from "./schema";

export type PublicAsset = {
  id: string;
  label: string;
  emoji: string;
  kind: string;
  src: string | null;
};

export type PublicPreBlock =
  | { kind: "speech"; text: string; pose: CarameloPose }
  | { kind: "animation" | "image"; assetId: string; caption: string };

type PublicBase = {
  id: string;
  title: string;
  pedagogicalLabel: string;
  preBlocks: PublicPreBlock[];
  statement: string;
  stimulusAssetId?: string;
};

export type PublicChoiceActivity = PublicBase & {
  type: "multiple_choice" | "visual_diagnosis";
  options: { id: string; text: string; assetId?: string }[];
};
export type PublicMatchingActivity = PublicBase & {
  type: "matching";
  left: { id: string; text: string; assetId?: string }[];
  right: { id: string; text: string }[];
};
export type PublicOrderingActivity = PublicBase & {
  type: "ordering";
  items: { id: string; text: string; assetId?: string }[];
};
export type PublicActivity = PublicChoiceActivity | PublicMatchingActivity | PublicOrderingActivity;

export type Answer =
  | { kind: "choice"; optionId: string }
  | { kind: "matching"; pairs: Record<string, string> }
  | { kind: "ordering"; order: string[] };

export type PublicLesson = {
  id: string;
  slug: string;
  number: number;
  title: string;
  worldTitle: string;
  intro: { lines: { text: string; pose: CarameloPose }[]; visualAssetId?: string; cta: string };
  activities: PublicActivity[];
  outro: { line: string; summary: string[] };
  assets: Record<string, PublicAsset>;
};

export type PublicAssessment = {
  id: string;
  slug: string;
  title: string;
  worldNumber: number;
  intro: string;
  passMin: number;
  questions: PublicActivity[];
  assets: Record<string, PublicAsset>;
};
