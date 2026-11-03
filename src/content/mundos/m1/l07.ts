import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-01-l05-l08.md § L07.
 *
 * Como em L05: enunciados de A01–A03, alternativas e feedbacks foram redigidos pela equipe
 * técnica a partir do desafio, da resposta esperada e do feedback orientador (marcados abaixo).
 * O "Exemplo de feedback" da ficha (stringing) é usado literalmente no acerto da A01.
 * Regra da ficha: reconhecer sintomas SEM associá-los a causa única ou correção universal.
 * A01/A02: "diagnóstico visual" com resposta em nome → múltipla escolha + estímulo (ver l05.ts).
 * Pendência da ficha: a imagem de deslocamento de camadas exige validação técnica visual.
 */
export const l07: LessonInput = {
  id: "BOBI-M01-L07",
  slug: "l07",
  number: 7,
  title: "O que pode dar errado?",
  objective:
    "Reconhecer sintomas visuais de falhas introdutórias em FDM, sem associá-los a uma causa única ou a uma correção universal.",
  intro: {
    lines: [
      {
        text: "Ops! Nem toda impressão sai como a gente imaginou. Você consegue encontrar o que aconteceu com estas peças?",
        pose: "concern",
      },
    ],
    // redigido pela equipe técnica (a ficha não define CTA)
    cta: "Vamos investigar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      // redigido pela equipe técnica (título e enunciado)
      title: "Fios por toda parte",
      pedagogicalLabel: "diagnóstico visual",
      preBlocks: [
        // Ficha pede "uma peça de referência sem os sintomas para comparação".
        // redigido pela equipe técnica (legenda)
        { kind: "image", assetId: "l07-peca-referencia", caption: "Esta é a peça como deveria sair, sem falhas." },
      ],
      stimulusAssetId: "l07-peca-stringing",
      statement: "Que sintoma aparece nesta peça?",
      options: [
        {
          id: "a",
          text: "Warping (bordas levantadas)",
          // redigido pela equipe técnica
          feedback: "No warping, os cantos da base se levantam da mesa. Aqui, olhe o espaço entre as duas partes da peça.",
        },
        {
          id: "b",
          text: "Stringing (formação de fios)",
          feedback: "Esses fios são um sintoma chamado stringing. Mais de um fator pode contribuir para esse resultado.",
        },
        {
          id: "c",
          text: "Deslocamento de camadas",
          // redigido pela equipe técnica
          feedback:
            "No deslocamento, as camadas saem do alinhamento para o lado. Aqui, repare no que aparece entre as partes da peça.",
        },
      ],
      correctOptionId: "b",
      successFeedback: "Esses fios são um sintoma chamado stringing. Mais de um fator pode contribuir para esse resultado.",
      // redigido pela equipe técnica
      hint: "Olhe o espaço vazio entre as duas partes da peça. Tem algo ali que não deveria estar?",
    },
    {
      id: "A02",
      type: "multiple_choice",
      // redigido pela equipe técnica (título e enunciado)
      title: "A base saiu do lugar",
      pedagogicalLabel: "diagnóstico visual",
      stimulusAssetId: "l07-peca-warping",
      statement: "E agora? Que sintoma esta peça mostra?",
      // redigido pela equipe técnica (feedbacks)
      options: [
        {
          id: "a",
          text: "Stringing (formação de fios)",
          feedback: "Stringing são fios finos entre partes da peça. Aqui, olhe para os cantos da base.",
        },
        {
          id: "b",
          text: "Deslocamento de camadas",
          feedback: "No deslocamento, as camadas escorregam para o lado. Aqui, compare a base da peça com a superfície.",
        },
        {
          id: "c",
          text: "Warping (bordas levantadas)",
          feedback:
            "Isso! Os cantos da base se levantaram da superfície. Esse sintoma se chama warping, e mais de um fator pode contribuir para ele.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! Os cantos da base se levantaram da superfície. Esse sintoma se chama warping, e mais de um fator pode contribuir para ele.",
      // redigido pela equipe técnica
      hint: "Compare a base com a mesa da impressora. Ela está toda encostada?",
    },
    {
      id: "A03",
      type: "matching",
      // redigido pela equipe técnica (título, enunciado e feedbacks)
      title: "Cada falha no seu lugar",
      pedagogicalLabel: "associação",
      statement: "Ligue cada imagem ao sintoma que ela mostra.",
      pairs: [
        { id: "p1", left: "Fios entre partes", leftAssetId: "l07-peca-stringing", right: "Stringing" },
        { id: "p2", left: "Cantos levantados", leftAssetId: "l07-peca-warping", right: "Warping" },
        {
          id: "p3",
          left: "Camadas deslocadas lateralmente",
          leftAssetId: "l07-peca-deslocamento",
          right: "Deslocamento de camadas",
        },
      ],
      errorFeedback: "Quase! Observe onde o defeito aparece: entre as partes, na base ou ao longo das camadas.",
      successFeedback: "Perfeito! Cada sintoma aparece em um lugar e de um jeito diferente na peça.",
      hint: "Fios ficam no ar, entre as partes. Cantos levantados ficam embaixo. Camadas deslocadas parecem um degrau para o lado.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Antes de mexer em tudo",
      // Rótulo original "aplicação" → múltipla escolha (mapa de tipos).
      pedagogicalLabel: "aplicação",
      statement: "Caramelo viu uma falha. Qual é o melhor primeiro passo?",
      // Correta: texto literal da resposta esperada. Distratores e feedbacks: redigido pela equipe técnica.
      options: [
        {
          id: "a",
          text: "Mudar várias configurações de uma vez para ver se resolve.",
          feedback:
            "Mudar várias coisas ao mesmo tempo dificulta saber o que ajudou ou piorou. Primeiro, observe e reúna informações.",
        },
        {
          id: "b",
          text: "Trocar a temperatura na hora, sem olhar mais nada.",
          feedback:
            "Escolher um ajuste por impulso pode não resolver: uma mesma falha pode ter mais de uma causa. Primeiro, observe.",
        },
        {
          id: "c",
          text: "Observar os sintomas e reunir informações da impressão antes de ajustar algo.",
          feedback: "Isso! Diagnóstico precisa de contexto. Observar e reunir informações vem antes de qualquer ajuste.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Isso! Diagnóstico precisa de contexto. Observar e reunir informações vem antes de qualquer ajuste.",
      // redigido pela equipe técnica
      hint: "Antes de mexer em qualquer coisa, o que você precisa saber sobre essa impressão?",
    },
  ],
  outro: {
    line: "Você começou a reconhecer sinais de que uma impressão precisa de atenção!",
    // redigido pela equipe técnica (a ficha não define resumo)
    summary: ["Stringing", "Warping", "Deslocamento de camadas", "Observar antes de ajustar"],
  },
  sourceIds: ["PRU-02", "PRU-07", "PRU-08"],
};
