import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L22.
 * Convenções de transcrição: ver comentário de l17.ts.
 * A01 ("comparação visual" → diagnóstico visual): cenário incorporado ao enunciado.
 * A02: a ficha pede ligar aos "desenhos"; o schema só aceita imagem no lado
 * esquerdo, então os desenhos comparativos entram como estímulo (stimulusAssetId)
 * e o lado direito mantém o texto da ficha.
 */
export const l22: LessonInput = {
  id: "BOBI-M03-L22",
  slug: "l22",
  number: 22,
  title: "A altura das camadas",
  objective:
    "Associar espessura das camadas à quantidade de camadas e à aparência ilustrada, sem universalizar tempo/resistência.",
  intro: {
    lines: [
      { text: "Camadas finas ou grossas?", pose: "talk" },
      { text: "Vamos comparar dois jeitos virtuais de imprimir o mesmo objeto.", pose: "explain" },
    ],
    visualAssetId: "l22-camadas-fina-grossa",
    cta: "Vamos comparar!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "visual_diagnosis",
      title: "Quantas camadas?", // redigido pela equipe técnica
      pedagogicalLabel: "comparação visual",
      statement:
        "Duas peças de mesma altura, com camadas de 0,12 e 0,28 mm em perfis válidos do exemplo. Qual terá mais camadas?",
      options: [
        {
          id: "a",
          text: "Camadas de 0,12 mm",
          assetId: "l22-corte-012",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Com camadas de 0,12 mm, a mesma altura precisa de mais camadas.",
        },
        {
          id: "b",
          text: "Camadas de 0,28 mm",
          assetId: "l22-corte-028",
          feedback: "Camadas mais finas exigem mais níveis para a mesma altura.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Com camadas de 0,12 mm, a mesma altura precisa de mais camadas.",
      // redigido pela equipe técnica
      hint: "A altura é a mesma. Qual camada precisa se repetir mais vezes para chegar lá?",
    },
    {
      id: "A02",
      type: "matching",
      title: "Degraus e altura", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Ligue fina, grossa e altura final aos desenhos.",
      stimulusAssetId: "l22-camadas-fina-grossa",
      pairs: [
        { id: "p1", left: "Fina", right: "Degraus menores." },
        { id: "p2", left: "Grossa", right: "Degraus mais visíveis no exemplo." },
        { id: "p3", left: "Altura final", right: "Permanece igual." },
      ],
      errorFeedback: "Espessura das camadas e altura total são grandezas diferentes.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! A espessura muda os degraus, mas a altura final continua a mesma.",
      // redigido pela equipe técnica
      hint: "Olhe a borda inclinada das duas peças e a linha de altura ao lado.",
    },
    {
      id: "A03",
      type: "multiple_choice",
      title: "Camadas e acabamento", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Altura de camada pode influenciar o acabamento visual?",
      options: [
        {
          id: "a",
          text: "Sim, conforme geometria.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! A altura de camada pode influenciar a aparência da peça.",
        },
        {
          id: "b",
          text: "Nunca.",
          feedback: "Os degraus entre camadas podem ficar mais ou menos perceptíveis.",
        },
        {
          id: "c",
          text: "Só muda cor.",
          feedback: "Os degraus entre camadas podem ficar mais ou menos perceptíveis.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A altura de camada pode influenciar a aparência da peça.",
      // redigido pela equipe técnica
      hint: "Lembre dos degraus que você comparou nos desenhos.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Existe regra universal?", // redigido pela equipe técnica
      pedagogicalLabel: "aplicação",
      statement: "Camada mais fina sempre reduz tempo e aumenta resistência?",
      options: [
        {
          id: "a",
          text: "Não, depende de parâmetros.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Não há regra universal para tempo e resistência.",
        },
        { id: "b", text: "Sim.", feedback: "Tempo e resistência dependem de outros fatores." },
        { id: "c", text: "Depende só do nome.", feedback: "Tempo e resistência dependem de outros fatores." },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Não há regra universal para tempo e resistência.",
      // redigido pela equipe técnica
      hint: "Desconfie de respostas com \"sempre\".",
    },
  ],
  outro: {
    line: "Você entendeu que camadas diferentes podem mudar o resultado visual!",
    // redigido pela equipe técnica
    summary: ["Camadas finas: mais camadas", "Degraus mais ou menos visíveis", "Sem regra universal de tempo"],
  },
  sourceIds: ["ORC-01", "PRU-05"],
};
