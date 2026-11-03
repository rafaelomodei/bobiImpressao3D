import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-01.md § L04. */
export const l04: LessonInput = {
  id: "BOBI-M01-L04",
  slug: "l04",
  number: 4,
  title: "Onde usamos impressão 3D?",
  objective:
    "Reconhecer aplicações em educação, cotidiano e prototipagem; relacionar objeto e finalidade; selecionar solução apropriada.",
  intro: {
    lines: [
      {
        text: "A gente já descobriu como imprimir um chaveiro. Mas será que a impressão 3D serve só para isso?",
        pose: "talk",
      },
      { text: "Olha quanta coisa diferente! Vamos descobrir onde a impressão 3D pode ajudar?", pose: "explain" },
    ],
    visualAssetId: "l04-aplicacoes",
    cta: "Vamos explorar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Impressão 3D na escola",
      // Rótulo original "múltipla escolha visual" → múltipla escolha com alternativas com figura.
      pedagogicalLabel: "múltipla escolha visual",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada da "Situação" da ficha)
        {
          kind: "speech",
          text: "Uma professora quer objetos geométricos que os alunos possam segurar e observar de vários lados.",
          pose: "explain",
        },
      ],
      statement: "Qual destes recursos poderia ser impresso em uma impressora 3D para ajudar nessa aula?",
      options: [
        {
          id: "a",
          text: "Sólidos geométricos físicos (cubos, cilindros e pirâmides)",
          assetId: "l04-solidos-geometricos",
          feedback:
            "Isso! A impressão 3D pode criar sólidos que os alunos conseguem segurar e observar de vários lados.",
        },
        {
          id: "b",
          text: "Vídeo digital de figuras geométricas",
          assetId: "l04-video-figuras",
          feedback:
            "O vídeo também pode ajudar na aula, mas é um recurso digital. Aqui queremos imprimir objetos físicos.",
        },
        {
          id: "c",
          text: "Fotografia das figuras no papel",
          assetId: "l04-foto-figuras",
          feedback:
            "Uma fotografia pode mostrar as figuras, mas continua sendo plana. A impressora 3D pode criar modelos com volume.",
        },
      ],
      correctOptionId: "a",
      successFeedback:
        "Isso! A impressão 3D pode criar sólidos que os alunos conseguem segurar e observar de vários lados.",
      // redigido pela equipe técnica
      hint: "A impressora 3D imprime objetos com volume. Qual deles dá para pegar na mão?",
    },
    {
      id: "A02",
      type: "matching",
      title: "Cada peça tem uma utilidade",
      pedagogicalLabel: "associação",
      statement: "Ligue cada objeto ao lugar ou à situação em que ele será utilizado.",
      pairs: [
        {
          id: "p1",
          left: "Sólido geométrico",
          leftAssetId: "l04-solidos-geometricos",
          right: "Educação: estudar formas e volumes.",
        },
        {
          id: "p2",
          left: "Organizador personalizado",
          leftAssetId: "l04-organizador-lapis-cabos",
          right: "Cotidiano: organizar objetos de uma mesa.",
        },
        {
          id: "p3",
          left: "Protótipo de uma caixa",
          leftAssetId: "l04-caixa-prototipo",
          right: "Desenvolvimento de produto: testar tamanho e encaixe.",
        },
      ],
      errorFeedback: "Observe a função de cada peça. Ela ajuda a estudar, organizar alguma coisa ou testar uma ideia?",
      // O schema não tem feedback por par: os três "feedbacks corretos" homologados foram unidos
      // em uma única mensagem de acerto (só pontuação/maiúsculas ajustadas).
      successFeedback:
        "Um modelo físico pode ajudar a observar formas; um organizador impresso pode atender a um espaço específico; um protótipo ajuda a testar a ideia antes de produzir a versão definitiva.",
      // redigido pela equipe técnica
      hint: "Pergunte para cada peça: quem vai usar, e para quê?",
    },
    {
      id: "A03",
      type: "multiple_choice",
      title: "Testando uma ideia",
      pedagogicalLabel: "múltipla escolha",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada do "Contexto" da ficha)
        {
          kind: "speech",
          text: "Uma empresa imprimiu uma primeira versão de uma caixa antes de fabricar em quantidade.",
          pose: "explain",
        },
      ],
      stimulusAssetId: "l04-caixa-prototipo",
      statement: "Qual é uma vantagem de imprimir um protótipo antes da fabricação definitiva?",
      options: [
        {
          id: "a",
          text: "Testar tamanho/encaixe e fazer ajustes",
          feedback: "Exatamente! Com um protótipo, podemos testar uma ideia e descobrir o que precisa melhorar.",
        },
        {
          id: "b",
          text: "Garantir ausência de qualquer problema futuro",
          feedback: "Um protótipo ajuda a encontrar problemas, mas não garante que o produto final será perfeito.",
        },
        {
          id: "c",
          text: "Eliminar conferência de medidas",
          feedback:
            "As medidas ainda precisam ser verificadas. O protótipo ajuda justamente a conferir se tudo ficou como esperado.",
        },
      ],
      correctOptionId: "a",
      successFeedback: "Exatamente! Com um protótipo, podemos testar uma ideia e descobrir o que precisa melhorar.",
      // redigido pela equipe técnica
      hint: "Um protótipo é uma primeira versão. Para que serve testar antes de fazer muitas?",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Uma solução para a oficina",
      // Rótulo original "seleção visual" → múltipla escolha com alternativas com figura (mapa de tipos).
      // Nota da ficha: todas são peças potencialmente imprimíveis; somente A atende ao problema.
      pedagogicalLabel: "seleção visual",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada do "Contexto" da ficha)
        { kind: "speech", text: "Preciso organizar três lápis e dois cabos da minha bancada.", pose: "talk" },
      ],
      statement: "Qual destes projetos atende melhor à necessidade do Caramelo?",
      options: [
        {
          id: "a",
          text: "Organizador com espaço para lápis e cabos",
          assetId: "l04-organizador-lapis-cabos",
          feedback:
            "Boa escolha! Esse projeto tem espaços para os lápis e cabos. A impressão 3D permite criar objetos personalizados para necessidades específicas.",
        },
        {
          id: "b",
          text: "Escultura decorativa de um cachorro caramelo, sem compartimentos",
          assetId: "l04-escultura-cachorro",
          feedback: "Essa escultura pode ser impressa, mas não resolve o problema de organização da bancada.",
        },
        {
          id: "c",
          text: "Chaveiro com nome Caramelo",
          assetId: "l04-chaveiro-nome",
          feedback: "O chaveiro também pode ser impresso em 3D, mas não vai ajudar a guardar os lápis e cabos.",
        },
      ],
      correctOptionId: "a",
      successFeedback:
        "Boa escolha! Esse projeto tem espaços para os lápis e cabos. A impressão 3D permite criar objetos personalizados para necessidades específicas.",
      // redigido pela equipe técnica
      hint: "Todas podem ser impressas. Qual delas tem lugar para guardar o que está na bancada?",
    },
  ],
  outro: {
    line: "Agora você sabe que a impressão 3D pode ajudar na escola, em casa e até na criação de novos produtos!",
    summary: ["Educação", "Objetos personalizados", "Prototipagem", "Resolução de problemas"],
  },
};
