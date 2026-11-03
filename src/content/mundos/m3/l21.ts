import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L21.
 * Convenções de transcrição: ver comentário de l17.ts.
 * A03 (diagnóstico visual): o estímulo mostra o carretel rotulado PLA e o perfil
 * PETG selecionado; cada alternativa é um recorte da mesma cena com um destaque
 * diferente. Textos das alternativas: redigidos pela equipe técnica.
 * Regra da ficha: nenhuma temperatura numérica é exibida em textos ou artes.
 */
export const l21: LessonInput = {
  id: "BOBI-M03-L21",
  slug: "l21",
  number: 21,
  title: "Escolhendo o filamento",
  objective: "Diferenciar material e perfil e identificar incompatibilidades simples no fatiador virtual.",
  intro: {
    lines: [
      { text: "Já escolhemos a máquina.", pose: "talk" },
      { text: "Agora precisamos conferir qual filamento vamos usar!", pose: "explain" },
    ],
    visualAssetId: "l21-carreteis",
    cta: "Vamos conferir!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "O material certo", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "A impressora FDM fictícia aceita PLA. Qual material escolher?",
      options: [
        {
          id: "a",
          text: "PLA compatível.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Filamento PLA compatível com a impressora do cenário.",
        },
        { id: "b", text: "Resina líquida.", feedback: "A impressora FDM do cenário usa filamento." },
        { id: "c", text: "Papel.", feedback: "A impressora FDM do cenário usa filamento." },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Filamento PLA compatível com a impressora do cenário.",
      // redigido pela equipe técnica
      hint: "Releia o que a impressora do cenário aceita.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Material, perfil e máquina", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Ligue carretel PLA, perfil de material e impressora FDM aos seus papéis.",
      pairs: [
        { id: "p1", left: "Carretel PLA", right: "Material físico." },
        { id: "p2", left: "Perfil de material", right: "Parâmetros do material." },
        { id: "p3", left: "Impressora FDM", right: "Fabrica." },
      ],
      errorFeedback: "Material e configurações são coisas diferentes.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! O carretel é o material, o perfil guarda os parâmetros e a impressora fabrica.",
      // redigido pela equipe técnica
      hint: "Um deles você segura na mão; outro só existe no fatiador.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Algo não combina", // redigido pela equipe técnica
      pedagogicalLabel: "diagnóstico visual",
      statement: "Carretel rotulado PLA e perfil PETG selecionado. Qual inconsistência aparece?",
      stimulusAssetId: "l21-pla-perfil-petg",
      options: [
        {
          id: "a",
          text: "Perfil e material divergentes",
          assetId: "l21-destaque-rotulo-perfil",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! O carretel é PLA, mas o perfil selecionado é PETG.",
        },
        {
          id: "b",
          text: "Cor do carretel", // redigido pela equipe técnica
          assetId: "l21-destaque-cor",
          feedback: "Compare o rótulo do filamento com a configuração.",
        },
        {
          id: "c",
          text: "Posição do chaveiro na mesa", // redigido pela equipe técnica
          assetId: "l21-destaque-posicao",
          feedback: "Compare o rótulo do filamento com a configuração.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O carretel é PLA, mas o perfil selecionado é PETG.",
      // redigido pela equipe técnica
      hint: "Leia as duas etiquetas: a do carretel e a do perfil.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Existe temperatura universal?", // redigido pela equipe técnica
      pedagogicalLabel: "aplicação",
      statement: "Uma temperatura fixa funciona para todo PLA e toda impressora?",
      options: [
        {
          id: "a",
          text: "Não, varia.",
          // redigido pela equipe técnica (texto de acerto, a partir da resposta correta da ficha)
          feedback: "Isso! Depende de equipamento, material e perfil.",
        },
        {
          id: "b",
          text: "Sim, sempre.",
          feedback: "Não existe recomendação universal válida em todo contexto.",
        },
        {
          id: "c",
          text: "Depende só da cor.",
          feedback: "Não existe recomendação universal válida em todo contexto.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Depende de equipamento, material e perfil.",
      // redigido pela equipe técnica
      hint: "Pense em quantas máquinas e marcas de PLA diferentes existem.",
    },
  ],
  outro: {
    line: "Você sabe conferir se material e perfil estão de acordo!",
    // redigido pela equipe técnica
    summary: ["Material físico × perfil de material", "Conferir rótulo e configuração", "Sem temperatura universal"],
  },
  sourceIds: ["PRU-06", "ORC-01"],
};
