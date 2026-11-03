import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L13. */
export const l13: LessonInput = {
  id: "BOBI-M02-L13",
  slug: "l13",
  number: 13,
  title: "O que é PLA?",
  objective:
    "Reconhecer o PLA como um termoplástico utilizado em filamento FDM e escolher o material correto em uma situação simples.",
  intro: {
    lines: [
      {
        text: "Na oficina aparecem rolos com letras diferentes. Hoje vamos conhecer um dos filamentos mais comuns: PLA!",
        pose: "talk",
      },
    ],
    visualAssetId: "l13-rolos-oficina",
    // redigido pela equipe técnica
    cta: "Vamos conhecer!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "O que é PLA?",
      pedagogicalLabel: "múltipla escolha",
      statement: "O que significa PLA neste cenário?",
      options: [
        {
          id: "a",
          text: "Um tipo de material termoplástico usado como filamento.",
          // redigido pela equipe técnica
          feedback: "Isso! PLA é um material termoplástico usado como filamento na impressão FDM.",
        },
        {
          id: "b",
          text: "Um botão da impressora.",
          feedback: "PLA descreve o material; não é arquivo nem componente da máquina.",
        },
        {
          id: "c",
          text: "Um formato de imagem.",
          feedback: "PLA descreve o material; não é arquivo nem componente da máquina.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! PLA é um material termoplástico usado como filamento na impressão FDM.",
      // redigido pela equipe técnica
      hint: "As letras PLA aparecem na etiqueta dos rolos. O que vem enrolado neles?",
    },
    {
      // Mapa de tipos: identificação visual → multiple_choice com alternativas com figura.
      id: "A02",
      type: "multiple_choice",
      title: "Onde está o PLA?",
      pedagogicalLabel: "identificação visual",
      statement: "Qual opção corresponde ao PLA em filamento?",
      options: [
        {
          id: "a",
          text: "Carretel identificado PLA",
          assetId: "l13-carretel-pla",
          // redigido pela equipe técnica
          feedback: "Isso! O PLA da impressora FDM vem como filamento enrolado no carretel.",
        },
        {
          id: "b",
          text: "Recipiente de resina",
          assetId: "l13-recipiente-resina",
          feedback: "Para essa impressora FDM do exemplo, o material está na forma de filamento.",
        },
        {
          id: "c",
          text: "Folha de papel",
          assetId: "l13-folha-papel",
          feedback: "Para essa impressora FDM do exemplo, o material está na forma de filamento.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O PLA da impressora FDM vem como filamento enrolado no carretel.",
      // redigido pela equipe técnica
      hint: "Na impressora FDM, o material vem em forma de fio.",
    },
    {
      id: "A03",
      type: "matching",
      title: "Material, processo ou modelo?",
      pedagogicalLabel: "associação",
      statement: "Associe os rótulos PLA, FDM e modelo 3D às categorias.",
      pairs: [
        { id: "p1", left: "PLA", right: "Material" },
        { id: "p2", left: "FDM", right: "Processo/tecnologia" },
        { id: "p3", left: "Modelo 3D", right: "Representação digital da peça" },
      ],
      errorFeedback: "Material, processo e modelo digital são conceitos diferentes.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! PLA é o material, FDM é o processo e o modelo 3D é a peça no computador.",
      // redigido pela equipe técnica
      hint: "Pense no que vem no rolo, no jeito de fabricar e no que fica no computador.",
    },
    {
      // Mapa de tipos: aplicação → multiple_choice.
      id: "A04",
      type: "multiple_choice",
      title: "Qual rolo escolher?",
      pedagogicalLabel: "aplicação",
      preBlocks: [
        // redigido pela equipe técnica (apresenta o cenário da ficha)
        {
          kind: "speech",
          text: "Nossa impressora FDM didática tem um perfil compatível com PLA.",
          pose: "explain",
        },
      ],
      statement: "Qual rolo devemos escolher entre PLA compatível, resina líquida e filamento não identificado?",
      stimulusAssetId: "l13-cartao-perfil-pla",
      options: [
        {
          id: "a",
          text: "PLA compatível com o perfil",
          // redigido pela equipe técnica
          feedback: "Isso! Escolhemos o PLA explicitamente compatível com o perfil da impressora.",
        },
        {
          id: "b",
          text: "Resina líquida",
          feedback: "A compatibilidade com o equipamento e o perfil importa; não basta qualquer plástico.",
        },
        {
          id: "c",
          text: "Filamento não identificado",
          feedback: "A compatibilidade com o equipamento e o perfil importa; não basta qualquer plástico.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Escolhemos o PLA explicitamente compatível com o perfil da impressora.",
      // redigido pela equipe técnica
      hint: "Confira o cartão do perfil: qual material ele indica?",
    },
  ],
  outro: {
    line: "Boa! PLA é um material, e não uma máquina ou uma moeda do jogo.",
    // redigido pela equipe técnica
    summary: [
      "PLA é um termoplástico usado como filamento",
      "Material, processo e modelo são conceitos diferentes",
      "Escolher material compatível com a impressora e o perfil",
    ],
  },
  sourceIds: ["PRU-06", "SAF-01"],
};
