import { z } from "zod";

/**
 * Schema do conteúdo curricular (DD001/DD002/DD017).
 *
 * O conteúdo homologado em docs/licoes e docs/avaliacoes é transcrito para
 * módulos TypeScript em src/content/mundos. Esses módulos são `server-only`:
 * gabaritos e feedbacks nunca vão para o navegador; o cliente recebe só a
 * projeção pública (ver src/content/public.ts) e a correção acontece no servidor.
 */

export const CARAMELO_POSES = [
  "idle",
  "talk",
  "explain",
  "hint",
  "celebrate",
  "concern",
  "alert",
  "unlocked",
] as const;
export const carameloPose = z.enum(CARAMELO_POSES);
export type CarameloPose = z.infer<typeof carameloPose>;

/** IDs de asset: minúsculas, números e hífen, ex.: "l01-chaveiro-digital". */
export const assetId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/);

const speech = z.object({
  text: z.string().min(1),
  pose: carameloPose.default("talk"),
});
export type Speech = z.infer<typeof speech>;

/** Bloco não pontuado exibido antes da pergunta (fala do Caramelo ou animação). */
const preBlock = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("speech"), text: z.string().min(1), pose: carameloPose.default("explain") }),
  z.object({ kind: z.literal("animation"), assetId, caption: z.string().min(1) }),
  z.object({ kind: z.literal("image"), assetId, caption: z.string().min(1) }),
]);

const activityBase = z.object({
  /** "A01".."A04" nas lições; "Q01".."Q05" nas avaliações. */
  id: z.string().regex(/^(A|Q)\d{2}$/),
  title: z.string().min(1),
  /** Rótulo original da ficha (DD002), exibido como subtítulo. */
  pedagogicalLabel: z.string().min(1),
  competency: z.string().optional(),
  preBlocks: z.array(preBlock).default([]),
  statement: z.string().min(1),
  /** Imagem de contexto exibida acima das alternativas. */
  stimulusAssetId: assetId.optional(),
  /** Dica oferecida após dois erros (DD006). */
  hint: z.string().min(1),
  /** Mensagem quando acerta (alternativa correta ou conjunto completo). */
  successFeedback: z.string().min(1),
  /** Explicação mostrada no fim da avaliação (só avaliações). */
  reviewExplanation: z.string().optional(),
  /** Lições recomendadas para revisão se errar (só avaliações). */
  reviewLessonIds: z.array(z.string()).optional(),
  sourceIds: z.array(z.string()).default([]),
});

const choiceOption = z.object({
  id: z.string().regex(/^[a-z]$/),
  text: z.string().min(1),
  assetId: assetId.optional(),
  /** Feedback específico desta alternativa quando errada. */
  feedback: z.string().min(1),
});

export const multipleChoice = activityBase.extend({
  type: z.literal("multiple_choice"),
  options: z.array(choiceOption).min(2).max(5),
  correctOptionId: z.string(),
});

/** Diagnóstico visual: alternativas são cenas/imagens; assetId obrigatório. */
export const visualDiagnosis = activityBase.extend({
  type: z.literal("visual_diagnosis"),
  options: z.array(choiceOption.extend({ assetId })).min(2).max(5),
  correctOptionId: z.string(),
});

export const matching = activityBase.extend({
  type: z.literal("matching"),
  /** Pares corretos; o cliente recebe as colunas embaralhadas. */
  pairs: z
    .array(
      z.object({
        id: z.string().regex(/^p\d$/),
        left: z.string().min(1),
        leftAssetId: assetId.optional(),
        right: z.string().min(1),
      }),
    )
    .min(2)
    .max(5),
  errorFeedback: z.string().min(1),
});

export const ordering = activityBase.extend({
  type: z.literal("ordering"),
  /** Itens na ORDEM CORRETA; o cliente recebe embaralhados. */
  items: z
    .array(z.object({ id: z.string().regex(/^i\d$/), text: z.string().min(1), assetId: assetId.optional() }))
    .min(2)
    .max(6),
  errorFeedback: z.string().min(1),
});

export const activity = z
  .discriminatedUnion("type", [multipleChoice, visualDiagnosis, matching, ordering])
  .superRefine((a, ctx) => {
    if (a.type === "multiple_choice" || a.type === "visual_diagnosis") {
      if (!a.options.some((o) => o.id === a.correctOptionId)) {
        ctx.addIssue({ code: "custom", message: `correctOptionId ${a.correctOptionId} inexistente em ${a.id}` });
      }
      const ids = new Set(a.options.map((o) => o.id));
      if (ids.size !== a.options.length) ctx.addIssue({ code: "custom", message: `opções duplicadas em ${a.id}` });
    }
  });
export type Activity = z.infer<typeof activity>;
export type ActivityType = Activity["type"];

export const lesson = z.object({
  /** "BOBI-M01-L01" */
  id: z.string().regex(/^BOBI-M0\d-L\d{2}$/),
  /** "l01" — usado na URL. */
  slug: z.string().regex(/^l\d{2}$/),
  number: z.number().int().min(1),
  title: z.string().min(1),
  objective: z.string().min(1),
  /** Abertura S00: falas curtas do Caramelo + visual + CTA. */
  intro: z.object({
    lines: z.array(speech).min(1),
    visualAssetId: assetId.optional(),
    cta: z.string().min(1),
  }),
  activities: z.array(activity).min(3).max(5),
  /** Conclusão S05. */
  outro: z.object({ line: z.string().min(1), summary: z.array(z.string().min(1)).min(1) }),
  sourceIds: z.array(z.string()).default([]),
});
export type Lesson = z.infer<typeof lesson>;

export const assessment = z.object({
  /** "BOBI-M01-AV01" */
  id: z.string().regex(/^BOBI-M0\d-AV\d{2}$/),
  slug: z.string().regex(/^av\d{2}$/),
  title: z.string().min(1),
  objective: z.string().min(1),
  intro: z.string().min(1),
  passMin: z.number().int().default(4),
  questions: z.array(activity).length(5),
  /**
   * true quando distratores/textos foram redigidos pela equipe técnica porque a
   * ficha homologada só define o gabarito e a regra de correção. Exige revisão.
   */
  authoredDistractors: z.boolean().default(false),
});
export type Assessment = z.infer<typeof assessment>;

export const world = z.object({
  id: z.enum(["M1", "M2", "M3"]),
  number: z.number().int(),
  title: z.string(),
  subtitle: z.string(),
  lessons: z.array(lesson).length(8),
  assessment,
});
export type World = z.infer<typeof world>;

/**
 * Catálogo de assets visuais. Enquanto `status` for "placeholder", a interface
 * desenha um cartão provisório com `emoji` e `label`. Quando a arte final existir
 * em public/sprites/<file>, mudar para "ready".
 */
export const assetEntry = z.object({
  id: assetId,
  kind: z.enum(["character", "illustration", "scene", "card", "diagram", "animation", "icon", "machine", "item"]),
  label: z.string().min(1),
  emoji: z.string().min(1),
  /** Descrição de produção: o que desenhar, sem ambiguidade. */
  description: z.string().min(1),
  /** Orientação de produção: ângulo/câmera, enquadramento, elementos obrigatórios e proibidos. */
  production: z.object({
    view: z.string().min(1),
    size: z.string().default("512x512"),
    background: z.enum(["transparent", "scene"]).default("transparent"),
    mustShow: z.array(z.string()).default([]),
    mustNotShow: z.array(z.string()).default([]),
    consistencyGroup: z.string().optional(),
    frames: z.number().int().optional(),
    fps: z.number().optional(),
    loop: z.boolean().optional(),
  }),
  usedIn: z.array(z.string()).min(1),
  file: z.string().regex(/^bobi-[a-z0-9-]+\.(png|webp|svg)$/),
  status: z.enum(["placeholder", "ready"]).default("placeholder"),
});
export type AssetEntry = z.infer<typeof assetEntry>;
