import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-01-l05-l08.md § L08.
 *
 * Missão integradora ILUSTRATIVA: não é fabricação virtual temporizada e não substitui o
 * desafio do chaveiro de BOBI-M03-L24. Como em L05: alternativas, feedbacks e enunciados não
 * literais foram redigidos pela equipe técnica (marcados abaixo).
 * A04: "diagnóstico visual" com resposta em nome → múltipla escolha + estímulo (ver l05.ts).
 */
export const l08: LessonInput = {
  id: "BOBI-M01-L08",
  slug: "l08",
  number: 8,
  title: "Primeira missão do Caramelo",
  objective:
    "Integrar os fundamentos de M1 em uma missão aplicada: escolher um projeto adequado, identificar material/tecnologia, ordenar preparação e reconhecer um sintoma visual.",
  intro: {
    lines: [
      {
        text: "Minha bancada está uma bagunça! Preciso de um porta-lápis novo. Você me ajuda a organizar esse projeto?",
        pose: "talk",
      },
    ],
    visualAssetId: "l08-bancada-baguncada",
    // redigido pela equipe técnica (a ficha não define CTA)
    cta: "Vamos ajudar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      // redigido pela equipe técnica (título e enunciado)
      title: "Escolha o projeto",
      // Rótulo original "escolha visual" → múltipla escolha com alternativas com figura (mapa de tipos).
      pedagogicalLabel: "escolha visual",
      statement: "Qual destes modelos resolve a necessidade de guardar os lápis?",
      // redigido pela equipe técnica (alternativas e feedbacks)
      options: [
        {
          id: "a",
          text: "Enfeite em forma de osso, sem espaço para guardar nada",
          assetId: "l08-enfeite-osso",
          feedback:
            "O enfeite é bonito, mas não tem onde guardar os lápis. A melhor escolha atende à necessidade, não só à aparência.",
        },
        {
          id: "b",
          text: "Porta-copos raso, baixo demais para os lápis",
          assetId: "l08-porta-copos",
          feedback: "O porta-copos é raso demais: os lápis cairiam. Procure o modelo feito para guardar lápis em pé.",
        },
        {
          id: "c",
          text: "Porta-lápis com compartimentos adequados",
          assetId: "l08-porta-lapis",
          feedback: "Boa escolha! Esse porta-lápis tem compartimentos do tamanho certo para guardar os lápis.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Boa escolha! Esse porta-lápis tem compartimentos do tamanho certo para guardar os lápis.",
      // redigido pela equipe técnica
      hint: "Imagine os lápis guardados em cada objeto. Em qual deles ficam firmes e organizados?",
    },
    {
      id: "A02",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "O material certo",
      // Rótulo original "seleção tecnológica" → múltipla escolha (mapa de tipos), com figuras.
      pedagogicalLabel: "seleção tecnológica",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada do contexto "Há uma impressora FDM disponível")
        { kind: "speech", text: "Na oficina, temos uma impressora FDM disponível.", pose: "explain" },
      ],
      statement: "Qual material corresponde à alimentação dessa máquina?",
      // redigido pela equipe técnica (alternativas e feedbacks); a correta segue a resposta esperada.
      options: [
        {
          id: "a",
          text: "Carretel de filamento compatível",
          assetId: "l06-carretel-filamento",
          feedback:
            "Isso! A impressora FDM é alimentada por filamento, e ele precisa ser compatível com a máquina.",
        },
        {
          id: "b",
          text: "Recipiente de resina líquida",
          assetId: "l06-recipiente-resina",
          feedback: "A resina alimenta outra família de impressoras, que usa luz. Esta máquina é FDM.",
        },
        {
          id: "c",
          text: "Bloco maciço de plástico",
          assetId: "l08-bloco-plastico",
          feedback:
            "Um bloco maciço serve para processos que retiram material, como a fresagem. A FDM precisa de um fio de material.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! A impressora FDM é alimentada por filamento, e ele precisa ser compatível com a máquina.",
      // redigido pela equipe técnica
      hint: "Lembre: a FDM empurra um fio de material pelo bico aquecido.",
    },
    {
      id: "A03",
      type: "ordering",
      // redigido pela equipe técnica (título, enunciado e feedbacks)
      title: "Do modelo à peça",
      pedagogicalLabel: "ordenação",
      statement: "Organize o fluxo para imprimir o porta-lápis.",
      items: [
        { id: "i1", text: "Obter modelo 3D." },
        { id: "i2", text: "Preparar no fatiador." },
        { id: "i3", text: "Fornecer instruções à impressora." },
        { id: "i4", text: "Imprimir a peça." },
      ],
      errorFeedback: "A impressora precisa das instruções de impressão preparadas antes de iniciar.",
      successFeedback: "Perfeito! Com o modelo preparado e as instruções na impressora, a impressão pode começar.",
      hint: "Tudo começa pelo modelo. A impressão é sempre a última etapa.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "O resultado do porta-lápis",
      pedagogicalLabel: "diagnóstico visual",
      preBlocks: [
        // redigido pela equipe técnica (ficha: resultado FICTÍCIO)
        { kind: "speech", text: "Imagine que o porta-lápis saiu assim da impressora. Repare bem.", pose: "concern" },
      ],
      stimulusAssetId: "l08-porta-lapis-stringing",
      statement: "Qual sintoma aparece?",
      // redigido pela equipe técnica (feedbacks)
      options: [
        {
          id: "a",
          text: "Stringing (formação de fios)",
          feedback:
            "Isso! Os fios entre as partes do porta-lápis são stringing. Aqui só identificamos o sintoma, sem adivinhar a causa.",
        },
        {
          id: "b",
          text: "Warping (bordas levantadas)",
          feedback: "No warping, os cantos da base se levantam. Aqui, olhe o espaço entre os compartimentos.",
        },
        {
          id: "c",
          text: "Deslocamento de camadas",
          feedback: "No deslocamento, as camadas escorregam para o lado. Aqui, repare no que liga uma parte à outra.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! Os fios entre as partes do porta-lápis são stringing. Aqui só identificamos o sintoma, sem adivinhar a causa.",
      // redigido pela equipe técnica
      hint: "Olhe o espaço entre os compartimentos. O que aparece ali?",
    },
  ],
  outro: {
    line: "Conseguimos organizar meu primeiro projeto! Você já sabe como começar e o que observar se algo não sair como esperado.",
    // redigido pela equipe técnica (a ficha não define resumo)
    summary: ["Escolher pelo uso", "Filamento para a FDM", "Fluxo de preparação", "Reconhecer stringing"],
  },
  sourceIds: ["ULT-02", "BAM-03"],
};
