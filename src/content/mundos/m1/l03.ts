import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-01.md § L03. */
export const l03: LessonInput = {
  id: "BOBI-M01-L03",
  slug: "l03",
  number: 3,
  title: "Da ideia ao objeto",
  objective: "Reconhecer ideia → modelo 3D → preparação no fatiador → fabricação.",
  intro: {
    lines: [
      { text: "Eu tive uma ideia! Quero fazer um chaveiro para minha mochila!", pose: "talk" },
      { text: "Mas como faço para transformar essa ideia em uma peça de verdade?", pose: "explain" },
    ],
    visualAssetId: "l03-ideia-ao-objeto",
    cta: "Vamos criar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Da ideia ao modelo",
      pedagogicalLabel: "múltipla escolha",
      // Nota da ficha: imagens e textos também podem ser insumos para modelagem; não são,
      // isoladamente, o modelo 3D pronto para o fluxo deste exercício.
      statement: "Qual destes elementos representa um modelo 3D que podemos preparar para a impressão?",
      options: [
        {
          id: "a",
          text: "Fotografia ou desenho plano do chaveiro",
          feedback:
            "A imagem ajuda a mostrar a ideia, mas neste processo ainda precisamos de um modelo com a forma tridimensional do chaveiro.",
        },
        {
          id: "b",
          text: "Representação tridimensional digital, com geometria",
          feedback: "Isso! O modelo 3D representa a forma do chaveiro que queremos fabricar.",
        },
        {
          id: "c",
          text: "Texto: “Quero um chaveiro de cachorro caramelo”",
          feedback:
            "O texto descreve nossa ideia, mas ainda precisamos transformá-la em um modelo digital adequado para imprimir.",
        },
      ],
      correctOptionId: "b",
      successFeedback: "Isso! O modelo 3D representa a forma do chaveiro que queremos fabricar.",
      // redigido pela equipe técnica
      hint: "Procure o elemento que tem a forma do chaveiro em todas as direções: largura, altura e profundidade.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Quem faz o quê?",
      pedagogicalLabel: "associação",
      statement: "Ligue cada elemento à sua função.",
      pairs: [
        { id: "p1", left: "Modelo 3D", right: "Representa digitalmente a forma do objeto." },
        { id: "p2", left: "Fatiador", right: "Prepara o modelo e gera instruções para impressão." },
        { id: "p3", left: "Impressora 3D", right: "Usa as instruções e fabrica o objeto físico." },
      ],
      errorFeedback:
        "Essas funções são diferentes. Pense em quem representa a forma, quem prepara as instruções e quem fabrica o objeto.",
      // O schema não tem feedback por par: os três "feedbacks corretos por par" homologados
      // foram unidos em uma única mensagem de acerto (só pontuação/maiúsculas ajustadas).
      successFeedback:
        "O modelo guarda a forma digital do objeto; o fatiador prepara o modelo e gera as instruções; a impressora utiliza as instruções para construir a peça física.",
      // redigido pela equipe técnica
      hint: "Siga o caminho do chaveiro: primeiro a forma, depois as instruções, por fim a fabricação.",
    },
    {
      id: "A03",
      type: "ordering",
      title: "A jornada do chaveiro",
      pedagogicalLabel: "ordenação",
      statement: "Coloque as etapas na ordem correta, da ideia ao objeto.",
      items: [
        { id: "i1", text: "Imaginar o chaveiro." },
        { id: "i2", text: "Obter o modelo 3D." },
        { id: "i3", text: "Preparar o modelo em fatiador e gerar instruções compatíveis." },
        { id: "i4", text: "Fabricar o chaveiro." },
      ],
      errorFeedback:
        "A impressora precisa receber as instruções antes de começar. Observe onde a preparação deve acontecer.",
      successFeedback:
        "Perfeito! Uma ideia vira modelo, o modelo é preparado e a impressora fabrica o chaveiro.",
      hint: "Primeiro temos a ideia e o modelo. Depois preparamos a impressão. Só então a máquina começa a fabricar.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "O que está faltando?",
      // Rótulo original "diagnóstico de etapa" → múltipla escolha com alternativas em texto (mapa de tipos).
      pedagogicalLabel: "diagnóstico de etapa",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada do "Contexto" da ficha)
        {
          kind: "speech",
          text: "Já tenho o modelo do chaveiro e a impressora. Mas ainda não preparei as instruções.",
          pose: "talk",
        },
      ],
      statement: "Qual é o próximo passo para preparar o chaveiro para impressão?",
      options: [
        {
          id: "a",
          text: "Abrir modelo no fatiador, preparar e gerar instruções",
          feedback: "Isso! O fatiador prepara o modelo e gera as instruções necessárias para a impressora.",
        },
        {
          id: "b",
          text: "Enviar somente captura de tela do modelo",
          feedback:
            "Uma captura de tela mostra a aparência do modelo, mas não fornece as instruções de fabricação necessárias neste processo.",
        },
        {
          id: "c",
          text: "Começar sem preparar as instruções",
          feedback: "Antes de começar, a impressora precisa receber instruções adequadas ao modelo e ao equipamento.",
        },
      ],
      correctOptionId: "a",
      // A ficha também traz, após a A04: "Conseguimos! Agora o chaveiro está preparado para iniciar
      // a impressão." O schema não tem bloco pós-atividade; fala fica pendente para o motor (incremento B).
      successFeedback: "Isso! O fatiador prepara o modelo e gera as instruções necessárias para a impressora.",
      // redigido pela equipe técnica
      hint: "A impressora não entende uma imagem. Que ferramenta transforma o modelo em instruções?",
    },
  ],
  outro: {
    line: "Mandou bem! Você descobriu o caminho que transforma uma ideia em um objeto de verdade!",
    summary: ["Ideia e modelo", "Papel do fatiador", "Preparação e fabricação"],
  },
};
