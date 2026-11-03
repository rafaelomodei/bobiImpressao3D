import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L19.
 * Convenções de transcrição: ver comentário de l17.ts.
 * A03: a ficha descreve o cenário (área de 100 mm; modelos de 40 e 120 mm) e a
 * pergunta "Qual excede o limite?"; o cenário foi incorporado ao enunciado.
 */
export const l19: LessonInput = {
  id: "BOBI-M03-L19",
  slug: "l19",
  number: 19,
  title: "Tamanho e posição",
  objective: "Diferenciar escala, rotação e posição, interpretando o limite de uma mesa virtual.",
  intro: {
    lines: [
      { text: "O chaveiro está gigante e fora da mesa.", pose: "concern" },
      { text: "Vamos arrumar seu tamanho e posição!", pose: "explain" },
    ],
    visualAssetId: "l19-chaveiro-gigante",
    cta: "Bora ajustar!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Mudar o tamanho", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Qual ação altera as dimensões do chaveiro?",
      options: [
        {
          id: "a",
          text: "Escala.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! A escala muda as dimensões da peça.",
        },
        { id: "b", text: "Rotação.", feedback: "A rotação muda orientação; mover altera localização." },
        { id: "c", text: "Mover.", feedback: "A rotação muda orientação; mover altera localização." },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A escala muda as dimensões da peça.",
      // redigido pela equipe técnica
      hint: "Girar ou arrastar a peça não deixa ela maior nem menor.",
    },
    {
      id: "A02",
      type: "matching",
      title: "O que cada ajuste muda", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Associe escala, rotação e posição às mudanças visuais.",
      pairs: [
        { id: "p1", left: "Escala", right: "Tamanho." },
        { id: "p2", left: "Rotação", right: "Orientação." },
        { id: "p3", left: "Posição", right: "Localização na mesa." },
      ],
      errorFeedback: "A peça pode mudar de lugar sem aumentar.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Escala, rotação e posição mudam coisas diferentes na peça.",
      // redigido pela equipe técnica
      hint: "Um ajuste muda o tamanho, outro o ângulo, outro o lugar.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Cabe na mesa?", // redigido pela equipe técnica
      pedagogicalLabel: "visual",
      statement:
        "A área válida tem 100 mm na direção indicada. Compare os modelos de 40 mm e 120 mm. Qual excede o limite?",
      options: [
        {
          id: "a",
          text: "Modelo de 40 mm",
          assetId: "l19-limite-peca-40mm",
          feedback: "Compare apenas a dimensão e o limite explicitados.",
        },
        {
          id: "b",
          text: "Modelo de 120 mm",
          assetId: "l19-limite-peca-120mm",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! 120 mm passam do limite de 100 mm nessa direção.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! 120 mm passam do limite de 100 mm nessa direção.",
      // redigido pela equipe técnica
      hint: "Compare cada medida com os 100 mm da área válida.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Fora da área", // redigido pela equipe técnica
      pedagogicalLabel: "aplicação",
      statement: "O chaveiro está fora da área, mas tem tamanho correto. O que fazer?",
      stimulusAssetId: "l19-chaveiro-fora-da-area",
      options: [
        {
          id: "a",
          text: "Reposicionar dentro da área válida.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Basta mover o chaveiro para dentro da área válida.",
        },
        { id: "b", text: "Ampliar.", feedback: "Não é necessário aumentar a peça para mudar sua posição." },
        {
          id: "c",
          text: "Ignorar.",
          // redigido pela equipe técnica (o feedback da ficha trata da opção "ampliar")
          feedback: "Fora da área válida a peça não pode seguir. Ajuste a posição antes de continuar.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Basta mover o chaveiro para dentro da área válida.",
      // redigido pela equipe técnica
      hint: "O tamanho já está certo. O problema é onde a peça está.",
    },
  ],
  outro: {
    line: "Você já sabe ajustar tamanho, orientação e posição!",
    // redigido pela equipe técnica
    summary: ["Escala muda o tamanho", "Rotação muda a orientação", "Posição dentro da área válida"],
  },
  sourceIds: ["ORC-01", "PRU-05"],
};
