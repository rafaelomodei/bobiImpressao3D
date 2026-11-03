import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L14. */
export const l14: LessonInput = {
  id: "BOBI-M02-L14",
  slug: "l14",
  number: 14,
  title: "A mesa de impressão",
  objective:
    "Entender o papel da mesa/superfície de impressão e reconhecer visualmente uma primeira camada apoiada ou que começa a se soltar.",
  intro: {
    lines: [
      {
        text: "Uma peça precisa começar em algum lugar. Vamos olhar para a mesa onde a primeira camada é formada!",
        pose: "talk",
      },
    ],
    visualAssetId: "l14-mesa-primeira-camada",
    // redigido pela equipe técnica
    cta: "Vamos olhar!",
  },
  activities: [
    {
      // Mapa de tipos: identificação visual → multiple_choice com alternativas com figura.
      // Decisão: reutiliza os destaques da Bobi Mini da L09 (mesma câmera e escala).
      id: "A01",
      type: "multiple_choice",
      title: "Onde nasce a primeira camada?",
      pedagogicalLabel: "identificação visual",
      statement: "Em qual parte da impressora a primeira camada é depositada?",
      options: [
        {
          id: "a",
          text: "Bico",
          assetId: "l09-destaque-bico",
          feedback: "A primeira camada se forma sobre uma superfície que sustenta a peça.",
        },
        {
          id: "b",
          text: "Mesa/superfície de impressão",
          assetId: "l09-destaque-mesa",
          // redigido pela equipe técnica
          feedback: "Isso! A primeira camada é depositada sobre a mesa de impressão.",
        },
        {
          id: "c",
          text: "Carretel",
          assetId: "l09-destaque-carretel",
          feedback: "A primeira camada se forma sobre uma superfície que sustenta a peça.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! A primeira camada é depositada sobre a mesa de impressão.",
      // redigido pela equipe técnica
      hint: "O bico deposita, mas o material precisa cair sobre alguma coisa.",
    },
    {
      id: "A02",
      type: "multiple_choice",
      title: "Uma boa base",
      pedagogicalLabel: "múltipla escolha",
      statement: "Por que o contato adequado da primeira camada com a superfície é importante?",
      options: [
        {
          id: "a",
          text: "Ajuda a manter a peça posicionada durante o início.",
          // redigido pela equipe técnica
          feedback: "Isso! Uma boa aderência deixa a peça estável desde o começo.",
        },
        {
          id: "b",
          text: "Muda a cor do plástico.",
          feedback: "Uma base que se solta pode comprometer a impressão.",
        },
        {
          id: "c",
          text: "Substitui o modelo digital.",
          feedback: "Uma base que se solta pode comprometer a impressão.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Uma boa aderência deixa a peça estável desde o começo.",
      // redigido pela equipe técnica
      hint: "Imagine a peça escorregando na mesa enquanto o bico trabalha.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Algo está levantando",
      pedagogicalLabel: "diagnóstico visual",
      statement: "Qual imagem mostra possível problema de aderência/deformação?",
      options: [
        {
          id: "a",
          text: "Primeira camada aderida",
          assetId: "l14-base-aderida",
          feedback: "Procure a região que não permanece apoiada na superfície.",
        },
        {
          id: "b",
          text: "Peça com canto da base levantado",
          assetId: "l14-base-canto-erguido",
          // redigido pela equipe técnica
          feedback: "Isso! O canto erguido mostra que a base deixou de ficar apoiada na mesa.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! O canto erguido mostra que a base deixou de ficar apoiada na mesa.",
      // redigido pela equipe técnica
      hint: "Olhe com atenção os cantos da base, bem rente à mesa.",
    },
    {
      // Mapa de tipos: aplicação segura → multiple_choice.
      id: "A04",
      type: "multiple_choice",
      title: "A peça começou a soltar",
      pedagogicalLabel: "aplicação segura",
      preBlocks: [
        // redigido pela equipe técnica (fala de segurança)
        {
          kind: "speech",
          text: "Mesa e cabeçote em movimento: aqui a gente observa sem pôr a mão.",
          pose: "alert",
        },
      ],
      statement: "A peça começou a soltar. O que fazer primeiro no nosso cenário educativo?",
      options: [
        {
          id: "a",
          text: "Interromper com segurança e observar o sintoma.",
          // redigido pela equipe técnica
          feedback: "Isso! Primeiro interrompemos com segurança e observamos o que aconteceu.",
        },
        {
          id: "b",
          text: "Pressionar a peça com os dedos durante operação.",
          feedback:
            "Não aproximamos mãos da mesa e do cabeçote em movimento; primeiro observamos o que ocorreu.",
        },
        {
          id: "c",
          text: "Puxar a peça quente.",
          feedback:
            "Não aproximamos mãos da mesa e do cabeçote em movimento; primeiro observamos o que ocorreu.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Primeiro interrompemos com segurança e observamos o que aconteceu.",
      // redigido pela equipe técnica
      hint: "Qual opção mantém as mãos longe da máquina?",
    },
  ],
  outro: {
    line: "A mesa sustenta a impressão, e a primeira camada merece atenção!",
    // redigido pela equipe técnica
    summary: [
      "A primeira camada é depositada na mesa",
      "Aderência mantém a peça estável",
      "Peça soltando: interromper e observar, sem pôr a mão",
    ],
  },
  sourceIds: ["PRU-02", "CRE-03"],
};
