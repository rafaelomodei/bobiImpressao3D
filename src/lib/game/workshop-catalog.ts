import { READY_SPRITES } from "../../content/assets/ready.generated.ts";

/**
 * Catálogo da oficina — VALORES DE TESTE (DD021). PD007 continua em proposta:
 * custos, tempos e desbloqueios abaixo existem para tornar a oficina jogável e
 * devem ser revistos na homologação. Duração sempre entre 2 e 15 min (PD005).
 */

export type Requirement = { lessonId?: string; assessmentId?: string; label: string };

export type WorkshopItem = {
  id: string;
  name: string;
  description: string;
  emoji: string;
  assetId: string;
  costFios: number;
  minutes: number;
  requires: Requirement;
};

export type WorkshopUpgrade = {
  id: "mesa-ajustada" | "nivelamento-auto";
  name: string;
  machineName: string;
  description: string;
  emoji: string;
  costFios: number;
  requires: Requirement;
};

/** A oficina abre com a primeira lição concluída (DD021). */
export const WORKSHOP_UNLOCK: Requirement = { lessonId: "BOBI-M01-L01", label: "Conclua a L01" };

export const MACHINE_BASE = {
  id: "bobi-mini",
  name: "Bobi Mini",
  description: "Impressora FDM fictícia de entrada, com nivelamento manual da mesa.",
};

export const ITEMS: WorkshopItem[] = [
  {
    id: "chaveiro",
    name: "Chaveiro bobi.",
    description: "O primeiro objeto da oficina. Pequeno, rápido e com furo para a argola.",
    emoji: "🔑",
    assetId: "item-chaveiro",
    costFios: 0,
    minutes: 2,
    requires: WORKSHOP_UNLOCK,
  },
  {
    id: "cubo-calibracao",
    name: "Cubo de calibração",
    description: "Um cubo simples para comparar camadas e conferir a primeira camada.",
    emoji: "🧊",
    assetId: "item-cubo-calibracao",
    costFios: 10,
    minutes: 3,
    requires: { lessonId: "BOBI-M01-L04", label: "Conclua a L04" },
  },
  {
    id: "organizador",
    name: "Organizador de bancada",
    description: "Compartimentos para lápis e cabos da bancada do Caramelo.",
    emoji: "🗃️",
    assetId: "item-organizador",
    costFios: 20,
    minutes: 5,
    requires: { assessmentId: "BOBI-M01-AV01", label: "Passe na avaliação do Mundo 1" },
  },
  {
    id: "suporte-ferramentas",
    name: "Suporte para ferramentas",
    description: "Deixa espátula e alicate sempre à mão na oficina.",
    emoji: "🧰",
    assetId: "item-suporte-ferramentas",
    costFios: 30,
    minutes: 8,
    requires: { lessonId: "BOBI-M02-L16", label: "Conclua a L16" },
  },
  {
    id: "porta-carretel",
    name: "Porta-carretel",
    description: "Suporte para o carretel de filamento ficar bem apoiado.",
    emoji: "🧵",
    assetId: "item-porta-carretel",
    costFios: 40,
    minutes: 10,
    requires: { assessmentId: "BOBI-M02-AV02", label: "Passe na avaliação do Mundo 2" },
  },
];

export const UPGRADES: WorkshopUpgrade[] = [
  {
    id: "mesa-ajustada",
    name: "Kit de estabilidade",
    machineName: "Bobi Ajustada",
    description: "Estrutura mais firme: impressões ficam 25% mais rápidas (nunca abaixo de 2 min).",
    emoji: "🔩",
    costFios: 60,
    requires: { assessmentId: "BOBI-M02-AV02", label: "Passe na avaliação do Mundo 2" },
  },
  {
    id: "nivelamento-auto",
    name: "Sensor de nivelamento",
    machineName: "Bobi Auto",
    description:
      "Nivelamento automático simulado: a máquina mede os cantos e você só confere a primeira camada.",
    emoji: "📡",
    costFios: 100,
    requires: { assessmentId: "BOBI-M03-AV03", label: "Passe na avaliação do Mundo 3" },
  },
];

export type MachineTier = "mini" | "ajustada" | "auto";
export type MachineState = "idle" | "printing" | "finished";

/** Sprites da impressora presentes em public/sprites (lista gerada por pnpm sprites:sync). */
const MACHINE_SPRITES_READY = new Set(
  READY_SPRITES.filter((f) => f.startsWith("bobi-machine-")).map((f) => f.replace(/^bobi-machine-|\.png$/g, "")),
);

export function machineTier(upgrades: string[]): MachineTier {
  if (upgrades.includes("nivelamento-auto")) return "auto";
  if (upgrades.includes("mesa-ajustada")) return "ajustada";
  return "mini";
}

/** Sprite do tier e estado; sem arte desse tier, usa a Mini no mesmo estado; sem nenhuma, null. */
export function machineSprite(tier: MachineTier, state: MachineState): string | null {
  for (const key of [`${tier}-${state}`, `mini-${state}`])
    if (MACHINE_SPRITES_READY.has(key)) return `/sprites/bobi-machine-${key}.png`;
  return null;
}

/** Sprite do projeto fabricável, quando o arquivo correspondente já estiver pronto. */
export function itemSprite(item: WorkshopItem): string | null {
  const file = `bobi-${item.assetId}.png`;
  return READY_SPRITES.includes(file) ? `/sprites/${file}` : null;
}

export function machineName(upgrades: string[]): string {
  if (upgrades.includes("nivelamento-auto")) return "Bobi Auto";
  if (upgrades.includes("mesa-ajustada")) return "Bobi Ajustada";
  return MACHINE_BASE.name;
}

export function printMinutes(item: WorkshopItem, upgrades: string[]): number {
  const factor = upgrades.includes("mesa-ajustada") ? 0.75 : 1;
  return Math.min(15, Math.max(2, Math.round(item.minutes * factor)));
}

export function meets(req: Requirement, lessons: Set<string>, assessments: Set<string>): boolean {
  if (req.lessonId && !lessons.has(req.lessonId)) return false;
  if (req.assessmentId && !assessments.has(req.assessmentId)) return false;
  return true;
}

/* ------------------------------------------------------------------------- */
/* Minijogo de nivelamento (PD007 §3) — cenário autoral, não física real.     */
/* ------------------------------------------------------------------------- */

export const CORNERS = ["fl", "fr", "bl", "br"] as const;
export type Corner = (typeof CORNERS)[number];
export const CORNER_LABEL: Record<Corner, string> = {
  fl: "Frente esquerda",
  fr: "Frente direita",
  bl: "Fundo esquerdo",
  br: "Fundo direito",
};

/** Escala didática: -3 (bico muito perto) … 0 (ideal) … +3 (bico muito longe). */
export const LEVEL_RANGE = 3;

/** Cenário determinístico por tentativa: nenhum canto começa no ideal em todos. */
export function levelingScenario(seed: number): Record<Corner, number> {
  const vals = [2, -1, 3, -2, 1, -3, 2, 1];
  const r = (i: number) => vals[(seed * 3 + i * 5) % vals.length];
  return { fl: r(0), fr: r(1), bl: r(2), br: r(3) };
}

export type CornerResult = "too-close" | "ok" | "too-far";

export function cornerResult(offset: number): CornerResult {
  if (offset === 0) return "ok";
  return offset < 0 ? "too-close" : "too-far";
}

export const CORNER_FEEDBACK: Record<CornerResult, string> = {
  "too-close": "As linhas saíram achatadas e falhadas: o bico está perto demais da mesa.",
  "too-far": "As linhas ficaram redondinhas e soltas: o bico está longe demais da mesa.",
  ok: "Linhas uniformes, levemente achatadas e grudadas na mesa.",
};
