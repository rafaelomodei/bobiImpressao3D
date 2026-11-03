import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L18.
 * Convenções de transcrição: ver comentário de l17.ts.
 * A04 (diagnóstico visual): a ficha descreve a tela "ainda não fatiado" como
 * estímulo; as alternativas são recortes da mesma tela com uma ação destacada
 * (cor, fatiar, enviar). Textos das alternativas erradas: redigidos pela equipe técnica.
 */
export const l18: LessonInput = {
  id: "BOBI-M03-L18",
  slug: "l18",
  number: 18,
  title: "Conheça o fatiador",
  objective:
    "Reconhecer a função de preparar o modelo e gerar instruções de fabricação com contexto de impressora/material.",
  intro: {
    lines: [
      { text: "O modelo está pronto.", pose: "talk" },
      { text: "Quem transforma o projeto em orientações para a impressora?", pose: "explain" },
    ],
    visualAssetId: "l18-fatiador-tela",
    cta: "Vamos ver!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "O papel do fatiador", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Para que serve um fatiador?",
      options: [
        {
          id: "a",
          text: "Preparar o modelo e as instruções.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! O fatiador prepara o modelo e gera as instruções de fabricação.",
        },
        { id: "b", text: "Imprimir papel.", feedback: "O fatiador faz a ponte entre a geometria e a fabricação." },
        { id: "c", text: "Guardar filamento.", feedback: "O fatiador faz a ponte entre a geometria e a fabricação." },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O fatiador prepara o modelo e gera as instruções de fabricação.",
      // redigido pela equipe técnica
      hint: "Ele fica entre o arquivo da peça e a máquina.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Quem faz o quê?", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Associe modelo, fatiador, prévia e instruções.",
      pairs: [
        { id: "p1", left: "Modelo", right: "Forma." },
        { id: "p2", left: "Fatiador", right: "Preparo." },
        { id: "p3", left: "Prévia", right: "Inspeção de trajetórias." },
        { id: "p4", left: "Instruções", right: "Comandos compatíveis." },
      ],
      errorFeedback: "Visualizar o resultado previsto não é o mesmo que executar a fabricação.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! A forma vira preparo, o preparo vira instruções, e a prévia ajuda a conferir.",
      // redigido pela equipe técnica
      hint: "A prévia serve para olhar. Quem a máquina segue são as instruções.",
    },
    {
      id: "A03",
      type: "ordering",
      title: "Passo a passo no fatiador", // redigido pela equipe técnica
      pedagogicalLabel: "ordenação",
      statement: "Ordene abrir modelo, escolher contexto da máquina/material, fatiar e inspecionar prévia.",
      items: [
        { id: "i1", text: "Abrir o modelo.", assetId: "l18-etapa-abrir" },
        { id: "i2", text: "Escolher o contexto da máquina/material.", assetId: "l18-etapa-contexto" },
        { id: "i3", text: "Fatiar.", assetId: "l18-etapa-fatiar" },
        { id: "i4", text: "Inspecionar a prévia.", assetId: "l18-etapa-previa" },
      ],
      errorFeedback: "A prévia vem depois do preparo.",
      // redigido pela equipe técnica
      successFeedback: "Exato! Abrir, dar o contexto, fatiar e só então inspecionar.",
      // redigido pela equipe técnica
      hint: "O fatiador precisa saber qual máquina e material vai usar antes de calcular.",
    },
    {
      id: "A04",
      type: "visual_diagnosis",
      title: "Ainda não fatiado", // redigido pela equipe técnica
      pedagogicalLabel: "diagnóstico visual",
      statement: "O que falta antes de ver as camadas?",
      stimulusAssetId: "l18-fatiador-nao-fatiado",
      options: [
        {
          id: "a",
          text: "Mudar a cor do modelo", // redigido pela equipe técnica
          assetId: "l18-acao-cor",
          feedback: "A prévia depende das trajetórias calculadas.",
        },
        {
          id: "b",
          text: "Executar o fatiamento",
          assetId: "l18-acao-fatiar",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Sem um fatiamento válido, não há camadas para mostrar.",
        },
        {
          id: "c",
          text: "Enviar para a impressora", // redigido pela equipe técnica
          assetId: "l18-acao-enviar",
          feedback: "A prévia depende das trajetórias calculadas.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! Sem um fatiamento válido, não há camadas para mostrar.",
      // redigido pela equipe técnica
      hint: "Leia o aviso da tela. Qual etapa ainda não aconteceu?",
    },
  ],
  outro: {
    line: "Agora você conhece o papel do fatiador!",
    // redigido pela equipe técnica
    summary: ["O fatiador prepara o modelo", "Contexto de máquina e material", "Prévia só depois de fatiar"],
  },
  sourceIds: ["ULT-02", "BAM-03", "ORC-01"],
};
