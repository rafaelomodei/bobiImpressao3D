import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L12. */
export const l12: LessonInput = {
  id: "BOBI-M02-L12",
  slug: "l12",
  number: 12,
  title: "Por que o bico esquenta?",
  objective:
    "Reconhecer que o aquecimento controlado permite a extrusão do termoplástico e que o conjunto aquecido apresenta risco de queimadura.",
  intro: {
    lines: [
      {
        text: "O filamento parece rígido no rolo, mas chega à peça em trilhas. O que muda no caminho?",
        pose: "talk",
      },
    ],
    visualAssetId: "l12-filamento-vira-trilha",
    // redigido pela equipe técnica
    cta: "Vamos descobrir!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Para que serve o calor?",
      pedagogicalLabel: "múltipla escolha",
      statement: "Por que o conjunto de extrusão aquece o filamento na impressão FDM?",
      options: [
        {
          id: "a",
          text: "Para permitir sua extrusão/deposição.",
          // redigido pela equipe técnica
          feedback: "Isso! O calor amolece o termoplástico na medida certa para ele sair pelo bico.",
        },
        {
          id: "b",
          text: "Para secar a peça pronta.",
          feedback: "O calor atua no material antes de ele sair pelo bico; não é uma etapa de pintura.",
        },
        {
          id: "c",
          text: "Para pintar o objeto.",
          feedback: "O calor atua no material antes de ele sair pelo bico; não é uma etapa de pintura.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O calor amolece o termoplástico na medida certa para ele sair pelo bico.",
      // redigido pela equipe técnica
      hint: "O filamento é rígido no rolo. O que precisa acontecer para ele passar pelo bico?",
    },
    {
      id: "A02",
      type: "matching",
      title: "Calor, saída e peça",
      pedagogicalLabel: "associação",
      statement: "Ligue aquecedor/hotend, bico e peça em formação às descrições.",
      pairs: [
        { id: "p1", left: "Aquecedor/hotend", right: "Aquece/controla a região de fusão." },
        { id: "p2", left: "Bico", right: "Saída/deposição." },
        { id: "p3", left: "Peça em formação", right: "Material depositado em camadas." },
      ],
      errorFeedback: "O aquecimento ocorre no conjunto do hotend; o bico direciona a saída do material.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! O hotend aquece, o bico direciona a saída e a peça cresce em camadas.",
      // redigido pela equipe técnica
      hint: "Uma parte aquece, outra é por onde o material sai, e a terceira é o resultado.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Conjunto quente!",
      pedagogicalLabel: "diagnóstico visual",
      preBlocks: [
        // redigido pela equipe técnica (fala de segurança)
        { kind: "speech", text: "Parte quente: aqui a gente observa sem tocar.", pose: "alert" },
      ],
      statement: "Qual atitude é segura?",
      stimulusAssetId: "l12-hotend-quente",
      options: [
        {
          id: "a",
          text: "Não tocar no conjunto aquecido",
          assetId: "l12-atitude-nao-tocar",
          // redigido pela equipe técnica
          feedback: "Isso! Com o conjunto aquecido, a atitude segura é não tocar.",
        },
        {
          id: "b",
          text: "Testar com os dedos",
          assetId: "l12-atitude-dedos",
          feedback: "O metal aquecido pode causar queimaduras mesmo quando não parece brilhante.",
        },
        {
          id: "c",
          text: "Remover material manualmente com máquina quente",
          assetId: "l12-atitude-remover",
          feedback: "O metal aquecido pode causar queimaduras mesmo quando não parece brilhante.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Com o conjunto aquecido, a atitude segura é não tocar.",
      // redigido pela equipe técnica
      hint: "O ícone avisa que o conjunto está quente. Qual cena mantém as mãos longe?",
    },
    {
      id: "A04",
      type: "ordering",
      title: "Depois de imprimir",
      pedagogicalLabel: "ordenação",
      preBlocks: [
        // redigido pela equipe técnica (fala de segurança)
        {
          kind: "speech",
          text: "A impressão acabou, mas o conjunto ainda pode estar quente. Calma e ordem.",
          pose: "alert",
        },
      ],
      statement: "No cenário virtual, coloque as ações seguras após uma atividade em ordem.", // redigido pela equipe técnica (adaptado da ficha)
      items: [
        { id: "i1", text: "Encerrar processo." },
        { id: "i2", text: "Aguardar resfriamento indicado." },
        { id: "i3", text: "Inspecionar sem tocar em partes quentes." },
      ],
      errorFeedback: "Resfriar é necessário antes de qualquer contato com partes que possam estar quentes.",
      // redigido pela equipe técnica
      successFeedback: "Exatamente! Encerrar, esperar esfriar e só então inspecionar, sem tocar no que é quente.",
      // redigido pela equipe técnica
      hint: "A inspeção nunca vem antes de esperar o resfriamento.",
    },
  ],
  outro: {
    line: "Agora você entende por que há aquecimento e por que precisamos respeitar o calor!",
    // redigido pela equipe técnica
    summary: [
      "O calor permite a extrusão do termoplástico",
      "Hotend aquece; bico direciona a saída",
      "Conjunto quente: não tocar e esperar esfriar",
    ],
  },
  sourceIds: ["CRE-03", "SAF-01"],
};
