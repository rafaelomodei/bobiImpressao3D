import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-01-l05-l08.md § L05.
 *
 * A ficha de L05–L08 define desafio, resposta esperada e "feedback orientador" (diretriz),
 * mas não o texto literal de alternativas e feedbacks. Esses textos foram redigidos pela
 * equipe técnica a partir da resposta esperada e da diretriz, e estão marcados abaixo.
 * Literais da ficha: objetivo, abertura, enunciados entre aspas, resposta esperada e conclusão.
 *
 * Decisão: em atividades "diagnóstico visual" cuja resposta é um NOME (não uma imagem),
 * usamos múltipla escolha + stimulusAssetId, mantendo o rótulo original em pedagogicalLabel
 * (mesmo padrão de "L10 A04 → Ilustração como contexto" no mapa de tipos).
 */
export const l05: LessonInput = {
  id: "BOBI-M01-L05",
  slug: "l05",
  number: 5,
  title: "Impressão ou fabricação tradicional?",
  objective:
    "Diferenciar fabricação aditiva, subtrativa e por moldagem por exemplos simples, reconhecendo como cada processo modifica o material.",
  intro: {
    lines: [
      {
        text: "Nem toda máquina fabrica as coisas do mesmo jeito! Algumas colocam material, outras retiram e outras usam moldes.",
        pose: "explain",
      },
    ],
    // redigido pela equipe técnica (a ficha não define CTA)
    cta: "Vamos comparar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Quem acrescenta material?",
      // Rótulo original "múltipla escolha visual" → múltipla escolha com alternativas com figura.
      // Decisão: reaproveita as ilustrações de L01 A01 (deposita/corta) para manter o mesmo desenho de máquina.
      pedagogicalLabel: "múltipla escolha visual",
      statement: "Qual máquina está acrescentando material para construir uma peça?",
      // redigido pela equipe técnica (textos e feedbacks das alternativas)
      options: [
        {
          id: "a",
          text: "Fresadora retirando material de um bloco.",
          assetId: "l01-maquina-corta",
          feedback: "A fresadora retira material de um bloco. Procure a máquina que acrescenta material.",
        },
        {
          id: "b",
          text: "Impressora FDM depositando camadas.",
          assetId: "l01-maquina-deposita",
          feedback: "Isso! A máquina FDM acrescenta material para construir a peça. Já a fresadora retira material.",
        },
        {
          id: "c",
          text: "Injetora preenchendo um molde.",
          assetId: "l05-injecao-molde",
          feedback:
            "Aqui o material ganha a forma de um molde. Procure a máquina que acrescenta material camada por camada.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! A máquina FDM acrescenta material para construir a peça. Já a fresadora retira material.",
      // redigido pela equipe técnica
      hint: "Observe o material: ele está sendo colocado, retirado ou empurrado para dentro de um molde?",
    },
    {
      id: "A02",
      type: "matching",
      // redigido pela equipe técnica (título, enunciado e feedbacks)
      title: "O que cada processo faz?",
      pedagogicalLabel: "associação",
      statement: "Ligue cada processo à ação que ele realiza sobre o material.",
      pairs: [
        { id: "p1", left: "Fabricação aditiva", right: "Acrescentar material." },
        { id: "p2", left: "Fabricação subtrativa", right: "Retirar material." },
        { id: "p3", left: "Moldagem", right: "Dar forma ao material usando um molde." },
      ],
      errorFeedback:
        "Quase! Não olhe só para o nome. Pense no que acontece com o material: ele é acrescentado, retirado ou colocado em um molde?",
      successFeedback: "Perfeito! O que diferencia os processos é o que cada um faz com o material.",
      hint: "Aditivo lembra adição. Subtrativo lembra subtração.",
    },
    {
      id: "A03",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Que processo é esse?",
      // Rótulo original "diagnóstico visual" com resposta em texto → múltipla escolha + estímulo (ver topo).
      pedagogicalLabel: "diagnóstico visual",
      stimulusAssetId: "l05-ferramenta-removendo",
      statement: "Qual processo está sendo utilizado?",
      // redigido pela equipe técnica (feedbacks das alternativas)
      options: [
        {
          id: "a",
          text: "Fabricação aditiva",
          feedback:
            "Na fabricação aditiva, o material é acrescentado. Na imagem, a ferramenta está tirando material do bloco.",
        },
        {
          id: "b",
          text: "Moldagem",
          feedback: "Na moldagem, o material ganha forma dentro de um molde. Aqui não há molde: a ferramenta retira material.",
        },
        {
          id: "c",
          text: "Fabricação subtrativa",
          feedback: "Isso! A ferramenta subtrai material do bloco. Ela não deposita camadas.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Isso! A ferramenta subtrai material do bloco. Ela não deposita camadas.",
      // redigido pela equipe técnica
      hint: "Repare nos pedacinhos que saem do bloco. O material está aumentando ou diminuindo?",
    },
    {
      id: "A04",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Três máquinas, três jeitos",
      // Rótulo original "aplicação" → múltipla escolha (mapa de tipos).
      pedagogicalLabel: "aplicação",
      stimulusAssetId: "l05-tres-processos",
      statement: "Qual descrição diferencia corretamente os três processos?",
      // redigido pela equipe técnica (distratores e feedbacks); a correta segue a resposta esperada da ficha.
      options: [
        {
          id: "a",
          text: "FDM: deposição; fresadora: remoção; injeção: moldagem.",
          feedback: "Exatamente! A FDM deposita, a fresadora remove e a injeção dá forma ao material dentro de um molde.",
        },
        {
          id: "b",
          text: "FDM: remoção; fresadora: deposição; injeção: moldagem.",
          feedback: "A FDM não retira material: ela deposita. Quem remove material de um bloco é a fresadora.",
        },
        {
          id: "c",
          text: "FDM: deposição; fresadora: moldagem; injeção: remoção.",
          feedback:
            "A FDM deposita, mas a fresadora não usa molde: ela remove material. Quem dá forma usando um molde é a injeção.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback:
        "Exatamente! A FDM deposita, a fresadora remove e a injeção dá forma ao material dentro de um molde.",
      // redigido pela equipe técnica
      hint: "Confira uma máquina de cada vez: ela coloca, tira ou preenche um molde?",
    },
  ],
  outro: {
    line: "Você descobriu que existem maneiras diferentes de fabricar objetos!",
    // redigido pela equipe técnica (a ficha não define resumo)
    summary: ["Fabricação aditiva", "Fabricação subtrativa", "Fabricação por moldagem"],
  },
  // A ficha cita também "NIST — What Is Additive Manufacturing?", ainda sem ID no catálogo de
  // fontes; incluir quando for catalogado e conferido.
  sourceIds: ["ULT-01"],
};
