import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L20.
 * Convenções de transcrição: ver comentário de l17.ts.
 * A03: máquinas fictícias identificadas como "Máquina A" (100 mm) e "Máquina B"
 * (60 mm), sem nomes de fabricantes; cenário incorporado ao enunciado.
 * A04 ("diagnóstico" → múltipla escolha com texto, conforme mapa de tipos): a
 * ficha só define a resposta correta; os distratores foram redigidos pela equipe técnica.
 */
export const l20: LessonInput = {
  id: "BOBI-M03-L20",
  slug: "l20",
  number: 20,
  title: "Escolhendo a máquina",
  objective: "Reconhecer compatibilidade entre perfil de máquina, área útil e projeto no cenário.",
  intro: {
    lines: [
      { text: "Duas máquinas, um chaveiro.", pose: "talk" },
      { text: "Qual perfil combina com o que vamos imprimir?", pose: "explain" },
    ],
    visualAssetId: "l20-duas-maquinas",
    cta: "Vamos comparar!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Por que o perfil importa", // redigido pela equipe técnica
      pedagogicalLabel: "múltipla escolha",
      statement: "Por que escolher perfil de máquina correto?",
      options: [
        {
          id: "a",
          text: "Compatibilizar instruções.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! O perfil compatibiliza a preparação com o equipamento.",
        },
        {
          id: "b",
          text: "Alterar cor.",
          feedback: "O perfil define características da máquina usada para o preparo.",
        },
        {
          id: "c",
          text: "Renomear arquivo.",
          feedback: "O perfil define características da máquina usada para o preparo.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! O perfil compatibiliza a preparação com o equipamento.",
      // redigido pela equipe técnica
      hint: "O fatiador precisa conhecer a máquina para preparar as instruções certas.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Informações do perfil", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      statement: "Associe volume útil, diâmetro de bico configurado e perfil de máquina.",
      pairs: [
        { id: "p1", left: "Volume útil", right: "Limites de dimensões." },
        { id: "p2", left: "Diâmetro de bico configurado", right: "Parâmetro de extrusão." },
        { id: "p3", left: "Perfil de máquina", right: "Conjunto de configurações." },
      ],
      errorFeedback: "Cada informação serve a uma verificação.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Volume, bico e perfil ajudam a conferir coisas diferentes.",
      // redigido pela equipe técnica
      hint: "Um item fala de espaço, outro de extrusão, e outro reúne tudo.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Qual máquina cabe?", // redigido pela equipe técnica
      pedagogicalLabel: "visual",
      statement:
        "O chaveiro tem 80 mm na direção exibida. As demais dimensões são válidas nas duas máquinas. Qual cabe?",
      options: [
        {
          id: "a",
          text: "Máquina A: 100 mm de área útil na direção",
          assetId: "l20-maquina-100mm",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! 80 mm cabem nos 100 mm de área útil dessa direção.",
        },
        {
          id: "b",
          text: "Máquina B: 60 mm de área útil na direção",
          assetId: "l20-maquina-60mm",
          feedback: "80 mm excedem o limite de 60 mm.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! 80 mm cabem nos 100 mm de área útil dessa direção.",
      // redigido pela equipe técnica
      hint: "Compare os 80 mm do chaveiro com o limite de cada máquina.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Perfil trocado", // redigido pela equipe técnica
      pedagogicalLabel: "diagnóstico",
      statement: "O perfil aberto não corresponde à impressora virtual selecionada. O que fazer?",
      stimulusAssetId: "l20-perfil-divergente",
      options: [
        {
          id: "a",
          text: "Corrigir o perfil antes de gerar instruções.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Primeiro o perfil certo, depois as instruções.",
        },
        {
          id: "b",
          text: "Gerar as instruções assim mesmo.", // redigido pela equipe técnica
          feedback: "Instruções precisam corresponder à máquina.",
        },
        {
          id: "c",
          text: "Mudar só o nome do perfil.", // redigido pela equipe técnica
          feedback: "Instruções precisam corresponder à máquina.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Primeiro o perfil certo, depois as instruções.",
      // redigido pela equipe técnica
      hint: "Compare o nome da impressora selecionada com o perfil aberto.",
    },
  ],
  outro: {
    line: "Perfil e espaço precisam combinar com o projeto!",
    // redigido pela equipe técnica
    summary: ["Perfil de máquina", "Área útil e cabimento", "Corrigir o perfil antes de fatiar"],
  },
  sourceIds: ["ORC-01", "CRE-01"],
};
