import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L09. */
export const l09: LessonInput = {
  id: "BOBI-M02-L09",
  slug: "l09",
  number: 9,
  title: "Conheça sua impressora",
  objective:
    "Identificar bico, extrusor, mesa e carretel de uma impressora FDM e relacionar cada parte à sua função.",
  intro: {
    lines: [
      {
        text: "Essa é a nossa oficina! Antes de começar, precisamos conhecer as partes da impressora.",
        pose: "talk",
      },
    ],
    visualAssetId: "l09-oficina-bobi-mini",
    // redigido pela equipe técnica
    cta: "Vamos conhecer!",
  },
  activities: [
    {
      // Decisão (mapa de tipos): "apontar a parte na ilustração" → visual_diagnosis; cada
      // opção é um destaque da mesma ilustração (grupo "l09-bobi-mini-partes").
      id: "A01",
      type: "visual_diagnosis",
      title: "Onde a peça começa?",
      pedagogicalLabel: "identificação visual",
      statement: "Qual parte é a superfície onde a peça começa a ser construída?",
      stimulusAssetId: "l09-impressora-pontos",
      options: [
        {
          id: "a",
          text: "Bico",
          assetId: "l09-destaque-bico",
          feedback:
            "Essas peças ajudam a conduzir ou depositar material; a mesa sustenta a peça durante a impressão.",
        },
        {
          id: "b",
          text: "Extrusor",
          assetId: "l09-destaque-extrusor",
          feedback:
            "Essas peças ajudam a conduzir ou depositar material; a mesa sustenta a peça durante a impressão.",
        },
        {
          id: "c",
          text: "Mesa de impressão",
          assetId: "l09-destaque-mesa",
          // redigido pela equipe técnica
          feedback: "Isso! A mesa é a superfície que sustenta a peça desde a primeira camada.",
        },
        {
          id: "d",
          text: "Carretel",
          assetId: "l09-destaque-carretel",
          // redigido pela equipe técnica
          feedback: "O carretel guarda o filamento. A peça é construída sobre outra superfície.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Isso! A mesa é a superfície que sustenta a peça desde a primeira camada.",
      // redigido pela equipe técnica
      hint: "Procure a parte plana, embaixo de tudo, onde a peça fica apoiada.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Cada parte, uma função",
      pedagogicalLabel: "associação",
      statement: "Ligue bico, mesa e carretel às respectivas funções.",
      pairs: [
        { id: "p1", left: "Bico", leftAssetId: "l09-destaque-bico", right: "Depositar material." },
        { id: "p2", left: "Mesa", leftAssetId: "l09-destaque-mesa", right: "Apoiar a peça." },
        { id: "p3", left: "Carretel", leftAssetId: "l09-destaque-carretel", right: "Armazenar o filamento." },
      ],
      // Decisão: a ficha traz no campo de erro uma "Dica"; ela é usada como errorFeedback.
      errorFeedback: "Pense onde o material fica guardado, por onde sai e onde a peça é apoiada.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! O carretel guarda, o bico deposita e a mesa apoia a peça.",
      // redigido pela equipe técnica
      hint: "O material sai pela ponta do cabeçote e a peça cresce sobre a parte plana.",
    },
    {
      id: "A03",
      type: "multiple_choice",
      title: "Quem empurra o filamento?",
      pedagogicalLabel: "múltipla escolha",
      statement: "Qual componente empurra ou alimenta o filamento em direção ao sistema de aquecimento?",
      options: [
        {
          id: "a",
          text: "Extrusor",
          // redigido pela equipe técnica
          feedback: "Isso! O extrusor alimenta o filamento em direção ao aquecimento.",
        },
        {
          id: "b",
          text: "Mesa",
          // redigido pela equipe técnica
          feedback: "A mesa apoia a peça. Ela não movimenta o filamento.",
        },
        {
          id: "c",
          text: "Ventilador",
          feedback:
            "O ventilador ajuda a controlar temperaturas; quem movimenta o filamento na alimentação é o extrusor.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O extrusor alimenta o filamento em direção ao aquecimento.",
      // redigido pela equipe técnica
      hint: "Pense na parte que puxa o filamento do carretel para dentro da máquina.",
    },
    {
      id: "A04",
      type: "visual_diagnosis",
      title: "O desafio do Caramelo",
      pedagogicalLabel: "diagnóstico visual",
      preBlocks: [
        // redigido pela equipe técnica (a ficha diz que o Caramelo aponta o bico)
        { kind: "speech", text: "Olha esta parte que estou apontando: o bico.", pose: "explain" },
      ],
      statement: "O que essa parte faz durante a impressão FDM?",
      stimulusAssetId: "l09-destaque-bico",
      options: [
        {
          id: "a",
          text: "Depositar material",
          assetId: "l09-funcao-depositar",
          // redigido pela equipe técnica
          feedback: "Isso mesmo! O bico deposita o material na trajetória de impressão.",
        },
        {
          id: "b",
          text: "Armazenar rolo",
          assetId: "l09-funcao-armazenar",
          feedback:
            "O material é armazenado no carretel e a peça é apoiada na mesa; a saída do material acontece no bico.",
        },
        {
          id: "c",
          text: "Sustentar a peça",
          assetId: "l09-funcao-sustentar",
          feedback:
            "O material é armazenado no carretel e a peça é apoiada na mesa; a saída do material acontece no bico.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso mesmo! O bico deposita o material na trajetória de impressão.",
      // redigido pela equipe técnica
      hint: "Repare de onde sai o filete de material que forma a peça.",
    },
  ],
  outro: {
    line: "Agora você já consegue reconhecer as partes principais da impressora!",
    // redigido pela equipe técnica
    summary: ["Partes principais de uma impressora FDM", "Função do bico, extrusor, mesa e carretel"],
  },
  sourceIds: ["CRE-03"],
};
