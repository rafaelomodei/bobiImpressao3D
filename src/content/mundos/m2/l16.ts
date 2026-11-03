import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-02.md § L16. */
export const l16: LessonInput = {
  id: "BOBI-M02-L16",
  slug: "l16",
  number: 16,
  title: "Prepare a oficina",
  objective:
    "Aplicar uma checagem virtual inicial de segurança e reconhecer quando uma oficina não está pronta para impressão.",
  intro: {
    lines: [
      {
        text: "Temos o projeto, mas antes de começar quero conferir se a oficina está pronta. Me ajuda?",
        pose: "talk",
      },
    ],
    visualAssetId: "l16-checklist-oficina",
    // redigido pela equipe técnica
    cta: "Vamos conferir!",
  },
  activities: [
    {
      // Decisão: a ficha só define o gabarito ("desobstruir a área..."). Modelado como
      // "apontar o problema na bancada": cada opção é um destaque da mesma cena
      // (grupo "l16-bancada"); textos das opções b/c redigidos pela equipe técnica.
      id: "A01",
      type: "visual_diagnosis",
      title: "A bancada está pronta?",
      pedagogicalLabel: "diagnóstico visual",
      statement: "O que precisa ser resolvido?",
      stimulusAssetId: "l16-bancada-obstruida",
      options: [
        {
          id: "a",
          // redigido pela equipe técnica (a partir do gabarito)
          text: "Objetos bloqueando a área de movimento",
          assetId: "l16-destaque-obstrucao",
          // redigido pela equipe técnica (a partir do gabarito)
          feedback:
            "Isso! É preciso desobstruir a área antes de qualquer operação, sem acessar partes móveis em atividade.",
        },
        {
          id: "b",
          // redigido pela equipe técnica
          text: "Carretel no suporte",
          assetId: "l16-destaque-carretel",
          feedback: "Um objeto próximo às partes móveis pode comprometer a segurança da operação.",
        },
        {
          id: "c",
          // redigido pela equipe técnica
          text: "Tela da impressora",
          assetId: "l16-destaque-tela",
          feedback: "Um objeto próximo às partes móveis pode comprometer a segurança da operação.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica (a partir do gabarito)
      successFeedback:
        "Isso! É preciso desobstruir a área antes de qualquer operação, sem acessar partes móveis em atividade.",
      // redigido pela equipe técnica
      hint: "Olhe o caminho por onde a mesa e o cabeçote passam.",
    },
    {
      id: "A02",
      type: "matching",
      title: "Por que verificar?",
      pedagogicalLabel: "associação",
      statement: "Relacione as verificações aos motivos.",
      pairs: [
        { id: "p1", left: "Área livre", right: "Movimento sem obstáculos." },
        { id: "p2", left: "Ventilação/controles", right: "Exposição." },
        { id: "p3", left: "Material compatível", right: "Processo adequado." },
        { id: "p4", left: "Supervisão", right: "Orientação segura." },
      ],
      errorFeedback:
        "Observe se estamos verificando espaço, ambiente, compatibilidade ou quem acompanha a atividade.",
      // redigido pela equipe técnica
      successFeedback: "Perfeito! Espaço, ambiente, material e supervisão: cada verificação tem um motivo.",
      // redigido pela equipe técnica
      hint: "Ventilação cuida do ar do ambiente. Supervisão é sobre quem acompanha.",
    },
    {
      id: "A03",
      type: "ordering",
      title: "Checagem virtual",
      pedagogicalLabel: "ordenação",
      statement: "Para uma checagem virtual, ordene as verificações.", // redigido pela equipe técnica (adaptado da ficha)
      items: [
        { id: "i1", text: "Olhar ambiente e supervisão." },
        { id: "i2", text: "Conferir máquina/material compatível." },
        { id: "i3", text: "Analisar área livre." },
        { id: "i4", text: "Confirmar que pode iniciar com segurança, somente se tudo estiver adequado." },
      ],
      errorFeedback:
        "A decisão de iniciar vem depois das verificações. Esta ordem é didática, não um manual de operação real.",
      // redigido pela equipe técnica
      successFeedback: "Exatamente! Ambiente, compatibilidade, área livre e, só no fim, a decisão de iniciar.",
      // redigido pela equipe técnica
      hint: "Comece pelo ambiente e por quem acompanha. Iniciar é sempre a última etapa.",
    },
    {
      // Mapa de tipos: aplicação → multiple_choice.
      id: "A04",
      type: "multiple_choice",
      title: "Liberar ou não?",
      pedagogicalLabel: "aplicação",
      preBlocks: [
        // redigido pela equipe técnica (apresenta o cenário da ficha; fala de segurança)
        {
          kind: "speech",
          text: "Na tela, a ventilação do ambiente aparece como não verificada.",
          pose: "alert",
        },
      ],
      statement: "Caramelo pode liberar a operação real?",
      stimulusAssetId: "l16-checklist-ventilacao-pendente",
      options: [
        {
          id: "a",
          text: "Não, falta verificar condição.",
          // redigido pela equipe técnica (a partir do gabarito)
          feedback: "Isso! Não liberamos: pedimos avaliação e orientação responsável antes.",
        },
        {
          id: "b",
          text: "Sim, porque a máquina liga.",
          feedback: "O fato de a impressora funcionar ou usar PLA não dispensa a avaliação do ambiente.",
        },
        {
          id: "c",
          text: "Sim, porque o filamento é PLA.",
          feedback: "O fato de a impressora funcionar ou usar PLA não dispensa a avaliação do ambiente.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica (a partir do gabarito)
      successFeedback: "Isso! Não liberamos: pedimos avaliação e orientação responsável antes.",
      // redigido pela equipe técnica
      hint: "Olhe o item pendente no checklist.",
    },
  ],
  outro: {
    line: "A oficina virtual está organizada. Você já sabe o que verificar antes de pensar em imprimir!",
    // redigido pela equipe técnica
    summary: [
      "Área de movimento livre",
      "Ambiente, material, área e supervisão verificados",
      "Item pendente: não liberar",
    ],
  },
  sourceIds: ["SAF-01", "CRE-03"],
};
