import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-01.md § L01. */
export const l01: LessonInput = {
  id: "BOBI-M01-L01",
  slug: "l01",
  number: 1,
  title: "O que é impressão 3D?",
  objective:
    "Reconhecer impressão 3D como fabricação de objeto físico a partir de um modelo digital, por acréscimo de material.",
  intro: {
    lines: [
      { text: "Já imaginou transformar um desenho digital em um objeto de verdade?", pose: "talk" },
      {
        text: "Na impressão 3D, uma máquina usa um modelo digital para fabricar uma peça física.",
        pose: "explain",
      },
    ],
    visualAssetId: "l01-chaveiro-fluxo",
    cta: "Vamos descobrir!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Reconhecer o processo",
      pedagogicalLabel: "múltipla escolha",
      statement: "Qual dessas situações mostra uma impressão 3D?",
      options: [
        {
          id: "a",
          text: "Uma máquina deposita material e constrói um objeto físico.",
          assetId: "l01-maquina-deposita",
          feedback: "Isso! Na impressão 3D, material é acrescentado para formar o objeto.",
        },
        {
          id: "b",
          text: "Uma máquina corta material de um bloco para formar uma peça.",
          assetId: "l01-maquina-corta",
          feedback:
            "Essa máquina retira material de um bloco. A impressão 3D constrói a peça acrescentando material.",
        },
        {
          id: "c",
          text: "Uma impressora coloca uma fotografia em uma folha de papel.",
          assetId: "l01-impressora-papel",
          feedback: "Essa máquina imprime uma imagem no papel. A impressão 3D fabrica um objeto com volume.",
        },
      ],
      correctOptionId: "a",
      successFeedback: "Isso! Na impressão 3D, material é acrescentado para formar o objeto.",
      // Dica não prevista na ficha: redigida pela equipe técnica (DD006), sem revelar a resposta.
      hint: "Procure a máquina que acrescenta material para formar um objeto com volume.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Modelo digital ou objeto físico?",
      pedagogicalLabel: "associação",
      preBlocks: [
        { kind: "speech", text: "Antes de uma peça existir de verdade, ela pode existir apenas no computador.", pose: "explain" },
      ],
      statement: "Ligue cada elemento à sua função.",
      pairs: [
        { id: "p1", left: "Modelo 3D", right: "Representação digital do objeto." },
        { id: "p2", left: "Impressora 3D", right: "Máquina responsável pela fabricação." },
        { id: "p3", left: "Peça impressa", right: "Objeto físico produzido." },
      ],
      errorFeedback:
        "Esses elementos têm funções diferentes. Pense no que existe no computador e no que pode ser segurado.",
      successFeedback: "Perfeito! O modelo contém a informação, a impressora fabrica e a peça é o resultado físico.",
      hint: "O modelo existe no computador; a peça impressa é o que você consegue segurar.",
    },
    {
      id: "A03",
      type: "ordering",
      title: "Como uma ideia vira objeto?",
      pedagogicalLabel: "ordenação",
      statement: "Organize as etapas para transformar um modelo digital em uma peça.",
      items: [
        { id: "i1", text: "Escolher ou criar um modelo 3D." },
        { id: "i2", text: "Preparar o arquivo para a impressora." },
        { id: "i3", text: "Imprimir a peça." },
      ],
      errorFeedback:
        "A impressora precisa receber instruções antes de fabricar. Que etapa prepara o modelo para a máquina?",
      successFeedback: "Exatamente! Primeiro vem o modelo, depois a preparação e, por fim, a fabricação.",
      hint: "Comece pelo modelo. A impressão é sempre a última etapa.",
    },
    {
      id: "A04",
      type: "visual_diagnosis",
      title: "O desafio do Caramelo",
      pedagogicalLabel: "diagnóstico visual",
      statement: "Qual imagem mostra o chaveiro sendo impresso neste momento?",
      options: [
        {
          id: "a",
          text: "Chaveiro como modelo digital no computador",
          assetId: "l01-chaveiro-digital",
          feedback:
            "Esse é o modelo digital. Ele mostra como será o chaveiro, mas a fabricação ainda não começou.",
        },
        {
          id: "b",
          text: "Chaveiro parcialmente construído na impressora, com o bico depositando material",
          assetId: "l01-chaveiro-imprimindo",
          feedback: "Isso mesmo! A impressora está acrescentando material para construir o chaveiro.",
        },
        {
          id: "c",
          text: "Chaveiro físico pronto",
          assetId: "l01-chaveiro-pronto",
          feedback:
            "O chaveiro já está pronto nessa imagem. Procure a cena em que a máquina ainda está fabricando.",
        },
      ],
      correctOptionId: "b",
      successFeedback: "Isso mesmo! A impressora está acrescentando material para construir o chaveiro.",
      hint: "Procure a cena em que o bico da impressora ainda está trabalhando.",
    },
  ],
  outro: {
    line: "Você descobriu como um modelo digital pode virar um objeto de verdade!",
    summary: ["O que é impressão 3D", "Diferença entre modelo e objeto", "Sequência básica de fabricação"],
  },
};
