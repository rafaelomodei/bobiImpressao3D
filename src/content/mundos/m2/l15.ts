import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L15. */
export const l15: LessonInput = {
  id: "BOBI-M02-L15",
  slug: "l15",
  number: 15,
  title: "Atenção à segurança!",
  objective:
    "Identificar riscos de calor, movimento e emissões e tomar decisões seguras em cenários introdutórios de impressão 3D.",
  intro: {
    lines: [
      {
        text: "Antes de mexer na oficina, precisamos reconhecer alguns perigos. Segurança vem antes da impressão!",
        pose: "alert",
      },
    ],
    visualAssetId: "l15-riscos-oficina",
    // redigido pela equipe técnica
    cta: "Vamos com atenção!",
  },
  activities: [
    {
      id: "A01",
      type: "visual_diagnosis",
      title: "Afaste a mão!",
      pedagogicalLabel: "diagnóstico visual",
      statement: "Qual situação exige afastar a mão?",
      options: [
        {
          id: "a",
          text: "Mão perto de bico quente",
          assetId: "l15-mao-bico-quente",
          // redigido pela equipe técnica
          feedback: "Isso! Mão perto do bico quente precisa se afastar: o conjunto aquecido queima.",
        },
        {
          id: "b",
          text: "Área livre sinalizada",
          assetId: "l15-area-livre",
          feedback: "O conjunto aquecido pode causar queimaduras.",
        },
        {
          id: "c",
          text: "Filamento em carretel",
          assetId: "l15-filamento-carretel",
          feedback: "O conjunto aquecido pode causar queimaduras.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Mão perto do bico quente precisa se afastar: o conjunto aquecido queima.",
      // redigido pela equipe técnica
      hint: "Procure o sinal de quente na cena.",
    },
    {
      id: "A02",
      type: "multiple_choice",
      title: "Peça em movimento",
      pedagogicalLabel: "múltipla escolha",
      preBlocks: [
        // redigido pela equipe técnica (fala de segurança)
        { kind: "speech", text: "Máquina trabalhando é máquina em movimento. Atenção!", pose: "alert" },
      ],
      statement: "A impressora está trabalhando e uma peça móvel começou a se deslocar. O que fazer?",
      options: [
        {
          id: "a",
          text: "Manter mãos e objetos fora da área de movimento.",
          // redigido pela equipe técnica
          feedback: "Isso! Mãos e objetos ficam longe das partes que se movem.",
        },
        {
          id: "b",
          text: "Segurar a peça móvel.",
          feedback: "Partes móveis podem prender dedos ou objetos.",
        },
        {
          id: "c",
          text: "Ajustar correia em operação.",
          feedback: "Partes móveis podem prender dedos ou objetos.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Mãos e objetos ficam longe das partes que se movem.",
      // redigido pela equipe técnica
      hint: "Qual opção não coloca nada perto da máquina em funcionamento?",
    },
    {
      id: "A03",
      type: "matching",
      title: "Cada risco, um cuidado",
      pedagogicalLabel: "associação",
      statement: "Ligue cada risco à prevenção: calor, movimento, emissões.",
      pairs: [
        { id: "p1", left: "Calor", leftAssetId: "l15-picto-calor", right: "Não tocar partes quentes." },
        { id: "p2", left: "Movimento", leftAssetId: "l15-picto-movimento", right: "Manter área desobstruída." },
        {
          id: "p3",
          left: "Emissões",
          leftAssetId: "l15-picto-emissoes",
          right: "Adotar ventilação e controles adequados conforme ambiente e material.",
        },
      ],
      errorFeedback: "Cada risco pede uma medida específica; ventilação não substitui cuidado com partes quentes.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Calor, movimento e emissões: cada risco com sua prevenção.",
      // redigido pela equipe técnica
      hint: "Emissões estão no ar do ambiente. Calor está nas partes da máquina.",
    },
    {
      // Mapa de tipos: aplicação → multiple_choice.
      id: "A04",
      type: "multiple_choice",
      title: "Sem supervisão, sem impressão",
      pedagogicalLabel: "aplicação",
      statement:
        "Caramelo quer usar impressora real, mas não há supervisão nem avaliação do ambiente. O que fazer?",
      options: [
        {
          id: "a",
          text: "Não iniciar e procurar orientação responsável.",
          // redigido pela equipe técnica
          feedback: "Isso! Sem supervisão e sem avaliar o ambiente, não iniciamos.",
        },
        {
          id: "b",
          text: "Começar sozinho porque usa PLA.",
          feedback: "Mesmo o processo com filamento exige avaliação de calor, movimento e ambiente.",
        },
        {
          id: "c",
          text: "Ignorar ventilação.",
          feedback: "Mesmo o processo com filamento exige avaliação de calor, movimento e ambiente.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Sem supervisão e sem avaliar o ambiente, não iniciamos.",
      // redigido pela equipe técnica
      hint: "O que falta na cena: alguém responsável ou um tipo de filamento?",
    },
  ],
  outro: {
    line: "Você identificou os riscos da oficina. Segurança é parte do aprendizado!",
    // redigido pela equipe técnica
    summary: [
      "Riscos de calor, movimento e emissões",
      "Cada risco tem sua prevenção",
      "Sem supervisão responsável, não iniciar",
    ],
  },
  sourceIds: ["SAF-01", "SAF-02"],
};
