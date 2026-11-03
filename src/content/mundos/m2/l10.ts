import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L10. */
export const l10: LessonInput = {
  id: "BOBI-M02-L10",
  slug: "l10",
  number: 10,
  title: "A máquina ganha movimento",
  objective:
    "Reconhecer os eixos X, Y e Z em uma representação cartesiana e a diferença entre deslocamento na camada e avanço de altura.",
  intro: {
    lines: [
      {
        text: "Como a impressora sabe para onde ir? Vamos conhecer as direções em que as partes se movimentam!",
        pose: "talk",
      },
    ],
    visualAssetId: "l10-eixos-xyz",
    // redigido pela equipe técnica
    cta: "Vamos ver!",
  },
  activities: [
    {
      id: "A01",
      type: "matching",
      title: "As três direções",
      pedagogicalLabel: "associação",
      statement: "Na representação cartesiana didática mostrada, ligue X, Y e Z às setas ilustradas.",
      stimulusAssetId: "l10-eixos-xyz",
      pairs: [
        { id: "p1", left: "X", right: "Lado a lado" },
        { id: "p2", left: "Y", right: "Frente/trás" },
        { id: "p3", left: "Z", right: "Altura" },
      ],
      errorFeedback:
        "Observe a direção de cada seta nesta máquina ilustrada; não precisamos decorar qual peça física se move.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! X vai de lado a lado, Y de frente para trás e Z muda a altura.",
      // redigido pela equipe técnica
      hint: "Siga cada seta com o dedo na tela: uma sobe, uma vai para os lados e uma vem para a frente.",
    },
    {
      // Mapa de tipos: identificação visual → visual_diagnosis (observar setas dos eixos).
      id: "A02",
      type: "visual_diagnosis",
      title: "Subindo de camada",
      pedagogicalLabel: "identificação visual",
      statement: "Qual seta mostra mudança de altura entre camadas?",
      options: [
        {
          id: "a",
          text: "Seta vertical Z",
          assetId: "l10-seta-z",
          // redigido pela equipe técnica
          feedback: "Isso! A seta vertical Z mostra a mudança de altura entre as camadas.",
        },
        {
          id: "b",
          text: "Seta lateral X",
          assetId: "l10-seta-x",
          feedback: "As novas camadas aparecem em outros níveis de altura.",
        },
        {
          id: "c",
          text: "Seta frente-trás Y",
          assetId: "l10-seta-y",
          feedback: "As novas camadas aparecem em outros níveis de altura.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A seta vertical Z mostra a mudança de altura entre as camadas.",
      // redigido pela equipe técnica
      hint: "Uma camada nova fica por cima da anterior. Qual seta aponta nessa direção?",
    },
    {
      id: "A03",
      type: "ordering",
      title: "Camada por camada",
      pedagogicalLabel: "ordenação",
      preBlocks: [
        {
          kind: "animation",
          assetId: "l10-anim-camadas",
          // redigido pela equipe técnica
          caption: "Veja a máquina traçar uma camada, subir de nível e depositar a próxima.",
        },
      ],
      statement: "Na animação guiada de uma peça simples, organize as etapas.", // redigido pela equipe técnica (adaptado da ficha)
      items: [
        { id: "i1", text: "Traçar percurso da primeira camada." },
        { id: "i2", text: "Passar ao nível seguinte." },
        { id: "i3", text: "Depositar próxima camada." },
      ],
      errorFeedback: "Antes da camada seguinte, o sistema precisa mudar o nível de impressão.",
      // redigido pela equipe técnica
      successFeedback: "Exatamente! Traça a camada, avança a altura e deposita a seguinte.",
      // redigido pela equipe técnica
      hint: "A primeira camada vem primeiro. O que precisa mudar antes da próxima?",
    },
    {
      // Mapa de tipos: diagnóstico contextual → multiple_choice com ilustração de contexto.
      id: "A04",
      type: "multiple_choice",
      title: "Cada máquina se move de um jeito",
      pedagogicalLabel: "diagnóstico contextual",
      statement: "Em todas as impressoras a mesma peça física precisa se mover no mesmo eixo?",
      stimulusAssetId: "l10-arquiteturas",
      options: [
        {
          id: "a",
          text: "Não, depende da arquitetura.",
          // redigido pela equipe técnica
          feedback: "Isso! A distribuição de movimento varia conforme a arquitetura da impressora.",
        },
        {
          id: "b",
          text: "Sim, somente o cabeçote se move.",
          feedback:
            "O que importa é o movimento relativo; a mesa e o cabeçote não se movimentam igual em todos os modelos.",
        },
        {
          id: "c",
          text: "Sim, somente a mesa se move.",
          feedback:
            "O que importa é o movimento relativo; a mesa e o cabeçote não se movimentam igual em todos os modelos.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A distribuição de movimento varia conforme a arquitetura da impressora.",
      // redigido pela equipe técnica
      hint: "Compare as duas máquinas da imagem: a mesa faz o mesmo movimento nas duas?",
    },
  ],
  outro: {
    line: "Você descobriu como os movimentos ajudam a construir a peça!",
    // redigido pela equipe técnica
    summary: [
      "Eixos X, Y e Z",
      "Movimento na camada e avanço de altura",
      "Arquiteturas diferentes se movem de jeitos diferentes",
    ],
  },
  sourceIds: ["CRE-03", "ORC-01"],
};
