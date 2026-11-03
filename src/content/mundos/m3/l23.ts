import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L23.
 * Convenções de transcrição: ver comentário de l17.ts.
 */
export const l23: LessonInput = {
  id: "BOBI-M03-L23",
  slug: "l23",
  number: 23,
  title: "Olhe antes de imprimir",
  objective: "Inspecionar prévias simples e identificar anomalias claras antes da fabricação virtual.",
  intro: {
    lines: [
      { text: "O fatiador mostrou a prévia.", pose: "talk" },
      { text: "Vamos conferir se nosso chaveiro vai ficar do jeito esperado!", pose: "explain" },
    ],
    visualAssetId: "l23-previa-camadas",
    cta: "Vamos inspecionar!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Para que serve a prévia", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Para que serve a prévia do fatiamento?",
      options: [
        {
          id: "a",
          text: "Inspecionar trajetórias.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! A prévia mostra as camadas e trajetórias previstas para você conferir.",
        },
        {
          id: "b",
          text: "Garantir sucesso físico.",
          feedback: "A prévia ajuda a conferir; não garante sucesso no mundo real.",
        },
        {
          id: "c",
          text: "Imprimir em papel.",
          feedback: "A prévia ajuda a conferir; não garante sucesso no mundo real.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A prévia mostra as camadas e trajetórias previstas para você conferir.",
      // redigido pela equipe técnica
      hint: "A prévia é algo para olhar antes de fabricar.",
    },
    {
      id: "A02",
      type: "visual_diagnosis",
      title: "Cadê o furo?", // redigido pela equipe técnica
      pedagogicalLabel: "diagnóstico visual",
      statement: "Qual merece revisão?",
      options: [
        {
          id: "a",
          text: "Prévia com furo livre",
          assetId: "l23-previa-furo-livre",
          feedback: "O furo precisa estar livre para usar a argola.",
        },
        {
          id: "b",
          text: "Prévia com furo coberto",
          assetId: "l23-previa-furo-coberto",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Com o furo fechado, a argola não passa. Essa prévia precisa de revisão.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! Com o furo fechado, a argola não passa. Essa prévia precisa de revisão.",
      // redigido pela equipe técnica
      hint: "Imagine passar a argola do chaveiro em cada prévia.",
    },
    {
      id: "A03",
      type: "matching",
      title: "O que conferir", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Associe prévia, área útil e perfil material às verificações.",
      pairs: [
        { id: "p1", left: "Prévia", right: "Trajetórias." },
        { id: "p2", left: "Área útil", right: "Cabimento." },
        { id: "p3", left: "Perfil material", right: "Compatibilidade do material." },
      ],
      errorFeedback: "São conferências distintas antes de seguir.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Três conferências diferentes antes de imprimir.",
      // redigido pela equipe técnica
      hint: "Uma fala de caminhos, outra de espaço e outra do filamento.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "A abertura sumiu", // redigido pela equipe técnica
      pedagogicalLabel: "aplicação",
      statement: "A prévia não preserva a abertura funcional. O que fazer?",
      stimulusAssetId: "l23-previa-furo-coberto",
      options: [
        {
          id: "a",
          text: "Revisar preparo.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Revise o modelo ou a preparação antes de continuar.",
        },
        { id: "b", text: "Ignorar.", feedback: "Gerar trajetórias não significa que estejam corretas." },
        {
          id: "c",
          text: "Aprovar porque fatiou.",
          feedback: "Gerar trajetórias não significa que estejam corretas.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Revise o modelo ou a preparação antes de continuar.",
      // redigido pela equipe técnica
      hint: "Um chaveiro sem furo cumpre sua função?",
    },
  ],
  outro: {
    line: "Inspecionar antes de imprimir ajuda a reconhecer problemas no preparo!",
    // redigido pela equipe técnica
    summary: ["A prévia ajuda, mas não garante", "Furo funcional livre", "Revisar antes de seguir"],
  },
  sourceIds: ["BAM-03", "ORC-01", "ULT-02"],
};
