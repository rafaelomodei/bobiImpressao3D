import type { z } from "zod";
import type { assessment, assetEntry, lesson, world } from "./schema";

/** Tipos de autoria (antes dos defaults do Zod). Use estes nos arquivos de conteúdo. */
export type LessonInput = z.input<typeof lesson>;
export type AssessmentInput = z.input<typeof assessment>;
export type AssetInput = z.input<typeof assetEntry>;
export type WorldInput = z.input<typeof world>;
