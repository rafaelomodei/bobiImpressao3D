import type { AssessmentInput } from "../../types";

/**
 * Fonte homologada: docs/avaliacoes/mundo-02-av02.md.
 *
 * Decisões:
 * - A ficha define enunciados, alternativas (Q02, Q04, Q05), gabaritos e o feedback de
 *   revisão. Feedback das alternativas erradas = feedback de revisão homologado.
 *   Dicas, mensagens de acerto, título, objetivo e introdução foram redigidos pela
 *   equipe técnica; por isso `authoredDistractors: true` (sinaliza revisão).
 * - Q04 (diagnóstico visual): as alternativas da ficha são consequências; cada uma
 *   ganhou uma ilustração do desfecho, e a borda levantada vai no estímulo.
 * - reviewLessonIds seguem "Resultado" da ficha: Q01→L09, Q02→L10, Q03→L11, Q04→L14,
 *   Q05→L15/L16.
 */
export const av02: AssessmentInput = {
  id: "BOBI-M02-AV02",
  slug: "av02",
  // redigido pela equipe técnica
  title: "Avaliação do Mundo 2 — Oficina",
  // redigido pela equipe técnica (a partir de CA-AV02-01)
  objective:
    "Demonstrar domínio de componentes, movimento, caminho do filamento, mesa/aderência e segurança.",
  // redigido pela equipe técnica
  intro: "Hora de mostrar o que você aprendeu na oficina! São cinco desafios. Acerte pelo menos quatro para abrir o Mundo 3.",
  passMin: 4,
  authoredDistractors: true,
  questions: [
    {
      // Mapa de tipos: associação visual → matching com cartões com figura.
      id: "Q01",
      type: "matching",
      title: "Componentes e funções",
      pedagogicalLabel: "associação visual",
      competency: "Componentes da impressora FDM",
      statement: "Associe cada componente à função.",
      pairs: [
        { id: "p1", left: "Carretel", leftAssetId: "av02-carretel", right: "Armazenar filamento." },
        { id: "p2", left: "Extrusor", leftAssetId: "av02-extrusor", right: "Alimentar filamento." },
        { id: "p3", left: "Bico", leftAssetId: "av02-bico", right: "Depositar material." },
      ],
      errorFeedback: "Guardar, conduzir e depositar material são etapas diferentes.",
      // redigido pela equipe técnica
      successFeedback: "Certo! Carretel guarda, extrusor alimenta e bico deposita.",
      // redigido pela equipe técnica
      hint: "Siga o material: onde fica guardado, quem empurra e por onde sai.",
      reviewExplanation: "Guardar, conduzir e depositar material são etapas diferentes.",
      reviewLessonIds: ["BOBI-M02-L09"],
      sourceIds: ["CRE-03"],
    },
    {
      id: "Q02",
      type: "multiple_choice",
      title: "Mudando de camada",
      pedagogicalLabel: "múltipla escolha",
      competency: "Movimento e eixos",
      statement: "Qual movimento representa mudar de camada em altura?",
      stimulusAssetId: "av02-eixos-xyz",
      options: [
        {
          id: "a",
          text: "Eixo Z",
          // redigido pela equipe técnica
          feedback: "Certo! Na ilustração, o eixo Z indica a mudança de altura entre camadas.",
        },
        {
          id: "b",
          text: "Eixo X",
          feedback: "A mudança de nível ocorre em altura; o movimento de peças físicas varia entre impressoras.",
        },
        {
          id: "c",
          text: "Eixo Y",
          feedback: "A mudança de nível ocorre em altura; o movimento de peças físicas varia entre impressoras.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Certo! Na ilustração, o eixo Z indica a mudança de altura entre camadas.",
      // redigido pela equipe técnica
      hint: "Observe a legenda: qual seta aponta para cima?",
      reviewExplanation:
        "A mudança de nível ocorre em altura; o movimento de peças físicas varia entre impressoras.",
      reviewLessonIds: ["BOBI-M02-L10"],
      sourceIds: ["CRE-03", "ORC-01"],
    },
    {
      id: "Q03",
      type: "ordering",
      title: "Caminho do filamento",
      pedagogicalLabel: "ordenação",
      competency: "Caminho do filamento",
      statement: "Organize o caminho simplificado do filamento.",
      items: [
        { id: "i1", text: "Carretel" },
        { id: "i2", text: "Extrusor" },
        { id: "i3", text: "Hotend" },
        { id: "i4", text: "Bico" },
      ],
      errorFeedback: "O filamento é alimentado, aquecido e depois depositado.",
      // redigido pela equipe técnica
      successFeedback: "Certo! Carretel, extrusor, hotend e bico.",
      // redigido pela equipe técnica
      hint: "Comece onde o filamento fica guardado.",
      reviewExplanation: "O filamento é alimentado, aquecido e depois depositado.",
      reviewLessonIds: ["BOBI-M02-L11"],
      sourceIds: ["CRE-03", "ORC-01"],
    },
    {
      id: "Q04",
      type: "visual_diagnosis",
      title: "Borda levantando",
      pedagogicalLabel: "diagnóstico visual",
      competency: "Mesa e aderência",
      statement: "Qual é o risco de uma primeira camada cuja borda começou a levantar da mesa?",
      stimulusAssetId: "av02-borda-levantada",
      options: [
        {
          id: "a",
          text: "Possibilidade de perder aderência/estabilidade",
          assetId: "av02-risco-perde-aderencia",
          // redigido pela equipe técnica
          feedback: "Certo! A borda levantada indica possível perda de aderência e estabilidade.",
        },
        {
          id: "b",
          text: "Melhora automática do encaixe",
          assetId: "av02-risco-encaixe",
          feedback: "A mesa precisa sustentar a peça, sobretudo no início da fabricação.",
        },
        {
          id: "c",
          text: "Mudança da cor",
          assetId: "av02-risco-cor",
          feedback: "A mesa precisa sustentar a peça, sobretudo no início da fabricação.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Certo! A borda levantada indica possível perda de aderência e estabilidade.",
      // redigido pela equipe técnica
      hint: "O que acontece com uma peça que deixa de ficar apoiada na mesa?",
      reviewExplanation: "A mesa precisa sustentar a peça, sobretudo no início da fabricação.",
      reviewLessonIds: ["BOBI-M02-L14"],
      sourceIds: ["PRU-02"],
    },
    {
      // Mapa de tipos: segurança situacional → multiple_choice.
      id: "Q05",
      type: "multiple_choice",
      title: "Oficina sem avaliação",
      pedagogicalLabel: "segurança situacional",
      competency: "Segurança",
      statement:
        "O bico está quente, peças se movimentam e o local está sem avaliação adequada de ventilação. O que fazer?",
      stimulusAssetId: "av02-cenario-sem-avaliacao",
      options: [
        {
          id: "a",
          text: "Não operar e buscar responsável para verificar riscos/controles.",
          // redigido pela equipe técnica (a partir do gabarito)
          feedback: "Certo! Não operamos e pedimos avaliação segura por pessoa responsável e capacitada.",
        },
        {
          id: "b",
          text: "Tocar no bico para testar.",
          feedback: "Calor, movimento e ambiente exigem controles, mesmo quando o material é PLA.",
        },
        {
          id: "c",
          text: "Imprimir sem verificar porque usa PLA.",
          feedback: "Calor, movimento e ambiente exigem controles, mesmo quando o material é PLA.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica (a partir do gabarito)
      successFeedback: "Certo! Não operamos e pedimos avaliação segura por pessoa responsável e capacitada.",
      // redigido pela equipe técnica
      hint: "Com calor, movimento e ambiente sem avaliação, qual opção não coloca ninguém em risco?",
      reviewExplanation: "Calor, movimento e ambiente exigem controles, mesmo quando o material é PLA.",
      reviewLessonIds: ["BOBI-M02-L15", "BOBI-M02-L16"],
      sourceIds: ["SAF-01", "SAF-02"],
    },
  ],
};
