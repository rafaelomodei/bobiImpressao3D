import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-03.md § L24.
 * Convenções de transcrição: ver comentário de l17.ts.
 * - Abertura: o negrito de "virtual" na ficha foi transcrito como texto simples.
 * - A02 ("configuração" → múltipla escolha) com cartões de configuração como figura.
 * - A04 ("execução virtual" → bloco de animação não pontuado + múltipla escolha,
 *   conforme docs/arquitetura/mapa-de-tipos-de-atividade.md). A ficha define só a
 *   resposta correta; distratores e legenda da animação redigidos pela equipe técnica.
 * - A impressão é sempre identificada como virtual; a oficina temporizada (PD005)
 *   não participa desta lição.
 */
export const l24: LessonInput = {
  id: "BOBI-M03-L24",
  slug: "l24",
  number: 24,
  title: "Imprima seu primeiro chaveiro",
  objective:
    "Concluir preparação, inspeção e execução simulada guiada de um chaveiro no bobi., sem fatiamento físico ou tempo de espera bloqueante.",
  intro: {
    lines: [
      { text: "Chegou a missão final!", pose: "celebrate" },
      { text: "Vamos imprimir um chaveiro virtual usando tudo que aprendemos.", pose: "explain" },
    ],
    visualAssetId: "l24-missao-final",
    cta: "Começar a missão!", // redigido pela equipe técnica
  },
  activities: [
    {
      id: "A01",
      type: "visual_diagnosis",
      title: "Escolha o modelo", // redigido pela equipe técnica
      pedagogicalLabel: "seleção visual",
      statement: "Qual modelo escolher?",
      options: [
        {
          id: "a",
          text: "Chaveiro 3D com furo",
          assetId: "l24-modelo-chaveiro-furo",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Modelo 3D do chaveiro com furo funcional para a argola.",
        },
        {
          id: "b",
          text: "Imagem JPG",
          assetId: "l24-imagem-jpg",
          feedback: "O modelo precisa ter geometria 3D e a abertura para a argola.",
        },
        {
          id: "c",
          text: "Escultura sem abertura",
          assetId: "l24-escultura-sem-furo",
          feedback: "O modelo precisa ter geometria 3D e a abertura para a argola.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Modelo 3D do chaveiro com furo funcional para a argola.",
      // redigido pela equipe técnica
      hint: "Precisa ser um modelo 3D e ter lugar para a argola.",
    },
    {
      id: "A02",
      type: "multiple_choice",
      title: "Configure a oficina", // redigido pela equipe técnica
      pedagogicalLabel: "configuração",
      statement: "A oficina virtual FDM aceita PLA. Qual configuração escolher?",
      options: [
        {
          id: "a",
          text: "FDM + PLA + perfil correto",
          assetId: "l24-config-fdm-pla",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! FDM, PLA e perfil compatível: tudo combina.",
        },
        {
          id: "b",
          text: "FDM + resina",
          assetId: "l24-config-fdm-resina",
          feedback: "Material, impressora e perfil precisam combinar.",
        },
        {
          id: "c",
          text: "Perfil de outra máquina",
          assetId: "l24-config-outra-maquina",
          feedback: "Material, impressora e perfil precisam combinar.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! FDM, PLA e perfil compatível: tudo combina.",
      // redigido pela equipe técnica
      hint: "Confira três coisas em cada cartão: máquina, material e perfil.",
    },
    {
      id: "A03",
      type: "visual_diagnosis",
      title: "Pode avançar?", // redigido pela equipe técnica
      pedagogicalLabel: "inspeção visual",
      statement: "Qual pode avançar?",
      options: [
        {
          id: "a",
          text: "Chaveiro dentro da mesa e furo livre",
          assetId: "l24-previa-ok",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Dentro da mesa, furo livre e perfil já compatível. Pode seguir.",
        },
        {
          id: "b",
          text: "Chaveiro fora da mesa",
          assetId: "l24-previa-fora",
          feedback: "Confira área e geometria funcional antes de continuar.",
        },
        {
          id: "c",
          text: "Furo coberto",
          assetId: "l24-previa-furo-coberto",
          feedback: "Confira área e geometria funcional antes de continuar.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Dentro da mesa, furo livre e perfil já compatível. Pode seguir.",
      // redigido pela equipe técnica
      hint: "Confira duas coisas: se a peça está na mesa e se o furo está aberto.",
    },
    {
      id: "A04",
      type: "multiple_choice",
      title: "Impressão virtual", // redigido pela equipe técnica
      pedagogicalLabel: "execução virtual",
      preBlocks: [
        {
          kind: "animation",
          assetId: "l24-anim-impressao-virtual",
          // redigido pela equipe técnica
          caption: "Iniciar impressão virtual: o bico deposita material camada por camada até o chaveiro ficar pronto.",
        },
      ],
      statement: "Qual processo vimos?",
      options: [
        {
          id: "a",
          text: "Deposição de material por camadas, ilustrando FDM.",
          // redigido pela equipe técnica (texto de acerto)
          feedback: "Isso! Uma simulação de FDM: material depositado camada por camada.",
        },
        {
          id: "b",
          text: "Uma impressora real imprimindo o chaveiro agora.", // redigido pela equipe técnica
          feedback: "Esta é uma simulação ilustrativa, não uma impressão física.",
        },
        {
          id: "c",
          text: "Material sendo cortado de um bloco.", // redigido pela equipe técnica
          // redigido pela equipe técnica (o feedback da ficha trata da opção "impressora real")
          feedback: "Na animação nada foi retirado: o material foi acrescentado em camadas.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Uma simulação de FDM: material depositado camada por camada.",
      // redigido pela equipe técnica
      hint: "Repare em como o chaveiro foi crescendo na animação.",
    },
  ],
  outro: {
    line: "Parabéns! Você produziu seu primeiro chaveiro virtual!",
    // redigido pela equipe técnica
    summary: ["Modelo 3D com furo funcional", "Máquina, material e perfil combinando", "Prévia conferida e impressão virtual"],
  },
  sourceIds: ["ULT-02", "ORC-01", "SAF-01"],
};
