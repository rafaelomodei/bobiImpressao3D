import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L17.
 *
 * Decisões de transcrição (valem para todo o Mundo 3):
 * - Alternativas: a ficha lista as opções em minúsculas separadas por "/"; foram
 *   transcritas na mesma ordem, com inicial maiúscula e ponto final. A ordem da
 *   ficha foi mantida (a correta costuma ser a primeira); o embaralhamento, se
 *   houver, fica a cargo do motor.
 * - Feedback de alternativa errada = "Feedback em caso de erro" da ficha (literal).
 * - Títulos das atividades, `hint`, `successFeedback`, CTA e resumo da conclusão
 *   não constam da ficha: redigidos pela equipe técnica.
 * - Abertura com duas frases foi dividida em duas falas, sem alterar o texto.
 */
export const l17: LessonInput = {
  id: "BOBI-M03-L17",
  slug: "l17",
  number: 17,
  title: "O arquivo do objeto",
  objective:
    "Diferenciar informações de geometria, contêiner 3MF e instruções para máquina, com escopo do formato explícito.",
  intro: {
    lines: [
      { text: "Um chaveiro digital pode ter arquivos diferentes.", pose: "talk" },
      { text: "Vamos descobrir o que cada um pode guardar?", pose: "explain" },
    ],
    visualAssetId: "l17-chaveiro-arquivos",
    cta: "Vamos descobrir!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "matching",
      title: "Cada arquivo, um papel", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Ligue STL, 3MF e G-code ao papel no contexto FDM.",
      pairs: [
        { id: "p1", left: "STL", leftAssetId: "l17-cartao-stl", right: "Representação geométrica." },
        {
          id: "p2",
          left: "3MF",
          leftAssetId: "l17-cartao-3mf",
          right: "Formato de manufatura aditiva que pode conter geometria e outros dados.",
        },
        { id: "p3", left: "G-code", leftAssetId: "l17-cartao-gcode", right: "Instruções da máquina." },
      ],
      errorFeedback: "Geometria e instruções de fabricação não são a mesma coisa.",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! O STL descreve a forma, o 3MF pode reunir geometria e outros dados, e o G-code instrui a máquina.",
      // redigido pela equipe técnica
      hint: "Pergunte a cada arquivo: ele descreve a forma ou diz à máquina o que fazer?",
    },
    {
      id: "A02",
      type: "multiple_choice",
      title: "O que o STL guarda?", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Um STL sozinho contém temperatura e percurso de uma impressora específica?",
      stimulusAssetId: "l17-cartao-stl",
      options: [
        {
          id: "a",
          text: "Não, precisa de preparação.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! O STL não contém instruções de máquina. Elas surgem na preparação.",
        },
        { id: "b", text: "Sim, sempre.", feedback: "O fatiador considera equipamento, material e parâmetros." },
        { id: "c", text: "É uma imagem.", feedback: "O fatiador considera equipamento, material e parâmetros." },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O STL não contém instruções de máquina. Elas surgem na preparação.",
      // redigido pela equipe técnica
      hint: "Pense no que o fatiador precisa saber além da forma da peça.",
    },
    {
      id: "A03",
      type: "multiple_choice",
      title: "Quem fala com a máquina?", // redigido pela equipe técnica
      pedagogicalLabel: "visual",
      statement: "Qual apresenta instruções para a máquina?",
      // Textos das alternativas descrevem os cartões da ficha (STL malha, 3MF projeto, G-code trajetórias).
      options: [
        {
          id: "a",
          text: "Cartão STL (malha)",
          assetId: "l17-cartao-stl",
          feedback: "Arquivos que descrevem geometria não necessariamente trazem comandos executáveis.",
        },
        {
          id: "b",
          text: "Cartão 3MF (projeto ilustrativo)",
          assetId: "l17-cartao-3mf",
          feedback: "Arquivos que descrevem geometria não necessariamente trazem comandos executáveis.",
        },
        {
          id: "c",
          text: "Cartão G-code (trajetórias) da máquina do cenário",
          assetId: "l17-cartao-gcode",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Exato! O G-code compatível com a máquina do cenário traz as instruções de fabricação.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Exato! O G-code compatível com a máquina do cenário traz as instruções de fabricação.",
      // redigido pela equipe técnica
      hint: "Procure o cartão que mostra caminhos para o bico, e não só a forma.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Todo 3MF é igual?", // redigido pela equipe técnica
      pedagogicalLabel: "aplicação",
      statement: "Todo 3MF contém os mesmos dados de perfil e instruções?",
      stimulusAssetId: "l17-cartao-3mf",
      options: [
        {
          id: "a",
          text: "Não.",
          // redigido pela equipe técnica (texto de acerto, a partir da resposta correta da ficha)
          feedback: "Isso! Não; depende do arquivo e da aplicação.",
        },
        {
          id: "b",
          text: "Sim, obrigatoriamente.",
          feedback: "3MF é extensível e nem todo arquivo incorpora todas as configurações.",
        },
        {
          id: "c",
          text: "É só imagem.",
          feedback: "3MF é extensível e nem todo arquivo incorpora todas as configurações.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Não; depende do arquivo e da aplicação.",
      // redigido pela equipe técnica
      hint: "Um formato que pode guardar dados extras não precisa guardar todos eles.",
    },
  ],
  outro: {
    line: "Você descobriu a diferença entre representar a peça e instruir a fabricação!",
    // redigido pela equipe técnica
    summary: ["O que o STL representa", "O que um 3MF pode conter", "G-code como instruções da máquina"],
  },
  sourceIds: ["STD-01", "BAM-03", "ULT-02"],
};
