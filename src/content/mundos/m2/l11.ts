import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L11. */
export const l11: LessonInput = {
  id: "BOBI-M02-L11",
  slug: "l11",
  number: 11,
  title: "O caminho do filamento",
  objective:
    "Reconhecer o trajeto geral do filamento em uma impressora FDM e diferenciar alimentação, aquecimento e deposição.",
  intro: {
    lines: [
      { text: "O filamento começa enrolado no carretel. Como será que ele chega até a peça?", pose: "talk" },
    ],
    visualAssetId: "l11-caminho-filamento",
    // redigido pela equipe técnica
    cta: "Vamos seguir o fio!",
  },
  activities: [
    {
      id: "A01",
      type: "ordering",
      title: "Do carretel ao bico",
      pedagogicalLabel: "ordenação",
      statement: "Organize o caminho simplificado do filamento.",
      items: [
        { id: "i1", text: "Carretel", assetId: "l11-cartao-carretel" },
        { id: "i2", text: "Extrusor/alimentação", assetId: "l11-cartao-extrusor" },
        { id: "i3", text: "Hotend", assetId: "l11-cartao-hotend" },
        { id: "i4", text: "Bico", assetId: "l11-cartao-bico" },
      ],
      errorFeedback: "O filamento vem do carretel, é conduzido e aquecido antes de sair pelo bico.",
      // redigido pela equipe técnica
      successFeedback: "Exatamente! Carretel, extrusor, hotend e, por fim, o bico.",
      // redigido pela equipe técnica
      hint: "Comece onde o filamento fica guardado. A saída é sempre o último passo.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Quem faz o quê?",
      pedagogicalLabel: "associação",
      statement: "Associe carretel, extrusor, hotend e bico às funções mostradas.",
      pairs: [
        { id: "p1", left: "Carretel", leftAssetId: "l11-cartao-carretel", right: "Armazenar" },
        { id: "p2", left: "Extrusor", leftAssetId: "l11-cartao-extrusor", right: "Alimentar" },
        { id: "p3", left: "Hotend", leftAssetId: "l11-cartao-hotend", right: "Aquecer" },
        { id: "p4", left: "Bico", leftAssetId: "l11-cartao-bico", right: "Depositar" },
      ],
      errorFeedback: "Aquecer o material e empurrá-lo são funções diferentes.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Guardar, alimentar, aquecer e depositar: cada parte cuida de uma etapa.",
      // redigido pela equipe técnica
      hint: "O hotend é a parte quente. O extrusor é a parte que empurra.",
    },
    {
      id: "A03",
      type: "multiple_choice",
      title: "Um tubo no caminho",
      pedagogicalLabel: "múltipla escolha",
      preBlocks: [
        // redigido pela equipe técnica (a ficha diz que o Caramelo aponta o tubo)
        { kind: "speech", text: "Repare neste tubo entre o extrusor e o cabeçote.", pose: "explain" },
      ],
      statement: "Todas as impressoras possuem o extrusor exatamente ao lado do bico?",
      stimulusAssetId: "l11-tubo-bowden",
      options: [
        {
          id: "a",
          text: "Não, existem arranjos como direct-drive e Bowden.",
          // redigido pela equipe técnica
          feedback: "Isso! Existem diferentes arranjos de alimentação, como direct-drive e Bowden.",
        },
        {
          id: "b",
          text: "Sim.",
          feedback: "O caminho muda conforme a arquitetura, mas continua existindo alimentação e deposição.",
        },
        {
          id: "c",
          text: "Só modelos de resina.",
          feedback: "O caminho muda conforme a arquitetura, mas continua existindo alimentação e deposição.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Existem diferentes arranjos de alimentação, como direct-drive e Bowden.",
      // redigido pela equipe técnica
      hint: "Se o extrusor estivesse colado no bico, para que serviria esse tubo?",
    },
    {
      id: "A04",
      type: "visual_diagnosis",
      title: "O que está faltando?",
      pedagogicalLabel: "diagnóstico visual",
      statement: "Qual elemento está faltando no esquema?",
      stimulusAssetId: "l11-esquema-sem-filamento",
      options: [
        {
          id: "a",
          text: "Filamento conectado à alimentação",
          assetId: "l11-opcao-filamento-conectado",
          // redigido pela equipe técnica
          feedback: "Isso mesmo! Sem o filamento conectado à alimentação, o material não chega ao bico.",
        },
        {
          id: "b",
          text: "Tela touch",
          assetId: "l11-opcao-tela-touch",
          feedback: "Antes de chegar ao bico, o filamento precisa seguir um caminho físico de alimentação.",
        },
        {
          id: "c",
          text: "Peça pronta",
          assetId: "l11-opcao-peca-pronta",
          feedback: "Antes de chegar ao bico, o filamento precisa seguir um caminho físico de alimentação.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso mesmo! Sem o filamento conectado à alimentação, o material não chega ao bico.",
      // redigido pela equipe técnica
      hint: "O carretel está cheio. Olhe o espaço entre ele e o extrusor.",
    },
  ],
  outro: {
    line: "Do carretel ao bico: você já conhece o caminho do filamento!",
    // redigido pela equipe técnica
    summary: [
      "Caminho do filamento: carretel, extrusor, hotend e bico",
      "Alimentar, aquecer e depositar são funções diferentes",
      "Existem arranjos diferentes, como direct-drive e Bowden",
    ],
  },
  sourceIds: ["CRE-03", "ORC-01"],
};
