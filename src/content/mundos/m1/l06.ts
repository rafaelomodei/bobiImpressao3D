import type { LessonInput } from "../../types";

/**
 * Fonte homologada: docs/licoes/mundo-01-l05-l08.md § L06.
 *
 * Como em L05: alternativas e feedbacks foram redigidos pela equipe técnica a partir da
 * "resposta esperada" e do "feedback orientador" da ficha (marcados abaixo).
 * Restrições da ficha: nenhuma atividade física com resina; não ensinar operação real,
 * contato com material não curado ou pós-processamento.
 */
export const l06: LessonInput = {
  id: "BOBI-M01-L06",
  slug: "l06",
  number: 6,
  title: "Filamento ou resina?",
  objective:
    "Reconhecer diferenças introdutórias entre impressoras FDM/FFF e impressoras de fotopolimerização de resina, incluindo cuidados essenciais de segurança.",
  intro: {
    lines: [
      {
        text: "Você sabia que nem toda impressora 3D usa aquele rolo de filamento? Algumas usam resina líquida e luz para formar a peça!",
        pose: "explain",
      },
    ],
    visualAssetId: "l06-fdm-e-resina",
    // redigido pela equipe técnica (a ficha não define CTA)
    cta: "Vamos ver a diferença!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "O que alimenta a FDM?",
      // Rótulo original "identificação visual" → múltipla escolha com alternativas com figura.
      pedagogicalLabel: "identificação visual",
      statement: "Qual destes materiais normalmente alimenta uma impressora FDM?",
      // redigido pela equipe técnica (textos e feedbacks das alternativas)
      options: [
        {
          id: "a",
          text: "Recipiente de resina líquida",
          assetId: "l06-recipiente-resina",
          feedback:
            "A resina é usada em outra família de processos, que endurece o material com luz. A FDM é alimentada por um fio de termoplástico.",
        },
        {
          id: "b",
          text: "Carretel de filamento",
          assetId: "l06-carretel-filamento",
          feedback: "Isso! A FDM/FFF deposita termoplástico, que chega à máquina como filamento enrolado no carretel.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! A FDM/FFF deposita termoplástico, que chega à máquina como filamento enrolado no carretel.",
      // redigido pela equipe técnica
      hint: "O bico aquecido da FDM precisa receber um fio de material.",
    },
    {
      id: "A02",
      type: "matching",
      // redigido pela equipe técnica (título, enunciado e feedbacks)
      title: "Cada tecnologia, um princípio",
      pedagogicalLabel: "associação",
      statement: "Ligue cada tecnologia ao seu princípio.",
      pairs: [
        { id: "p1", left: "FDM/FFF", right: "Deposição de termoplástico aquecido." },
        { id: "p2", left: "SLA/MSLA", right: "Solidificação de resina fotossensível por luz." },
      ],
      errorFeedback: "Quase! Uma tecnologia deposita material aquecido; a outra endurece um líquido usando luz.",
      successFeedback:
        "Perfeito! A FDM deposita termoplástico aquecido; a SLA/MSLA usa luz para solidificar a resina. São princípios diferentes, cada um com seus usos.",
      hint: "Qual delas trabalha com um bico quente, e qual trabalha com luz?",
    },
    {
      id: "A03",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Luz e resina",
      pedagogicalLabel: "múltipla escolha",
      stimulusAssetId: "l06-esquema-luz-resina",
      statement:
        "Uma máquina usa luz para endurecer seletivamente resina líquida. Qual tecnologia está sendo representada?",
      // redigido pela equipe técnica (distratores e feedbacks)
      options: [
        {
          id: "a",
          text: "Deposição de filamento (FDM/FFF)",
          feedback: "Na FDM, um bico aquecido deposita filamento. Aqui não há bico: é a luz que endurece a resina líquida.",
        },
        {
          id: "b",
          text: "Fabricação subtrativa",
          feedback: "A fabricação subtrativa retira material de um bloco. Aqui, a luz endurece partes de um líquido.",
        },
        {
          id: "c",
          text: "Fotopolimerização de resina",
          feedback: "Isso! A luz promove a solidificação seletiva da resina. Não há deposição de filamento por bico aquecido.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! A luz promove a solidificação seletiva da resina. Não há deposição de filamento por bico aquecido.",
      // redigido pela equipe técnica
      hint: "Não há bico nem fio de plástico. O que a luz está fazendo com o líquido?",
    },
    {
      id: "A04",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Resina sem cura: e agora?",
      // Rótulo original "segurança contextual" → múltipla escolha (mapa de tipos).
      pedagogicalLabel: "segurança contextual",
      preBlocks: [
        // redigido pela equipe técnica
        { kind: "speech", text: "Atenção: resina líquida sem cura não é brinquedo.", pose: "alert" },
      ],
      stimulusAssetId: "l06-resina-alerta",
      statement: "Caramelo encontra um recipiente de resina líquida sem cura. O que deve fazer?",
      // Correta: texto literal da resposta esperada. Distratores e feedbacks: redigido pela equipe técnica.
      options: [
        {
          id: "a",
          text: "Abrir o recipiente e tocar a resina para sentir a textura.",
          feedback: "Resina não curada pode oferecer riscos à saúde. Não é algo para tocar ou explorar por curiosidade.",
        },
        {
          id: "b",
          text: "Não manusear sem controles, orientação e EPIs adequados; procurar um adulto responsável e capacitado.",
          feedback:
            "Isso! Resina não curada pode oferecer riscos à saúde. Quem manuseia precisa de controles, orientação e EPIs adequados.",
        },
        {
          id: "c",
          text: "Mexer só com a ponta do dedo, rapidinho, e lavar a mão depois.",
          feedback:
            "Mesmo um contato rápido com resina não curada pode oferecer riscos. O certo é não manusear e chamar um adulto capacitado.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback:
        "Isso! Resina não curada pode oferecer riscos à saúde. Quem manuseia precisa de controles, orientação e EPIs adequados.",
      // redigido pela equipe técnica
      hint: "Pense primeiro na segurança: quem deveria cuidar desse material?",
    },
  ],
  outro: {
    line: "Agora você conhece duas maneiras diferentes de imprimir em 3D!",
    // redigido pela equipe técnica (a ficha não define resumo)
    summary: ["Filamento e FDM/FFF", "Resina e luz (SLA/MSLA)", "Cuidado com resina sem cura"],
  },
  // A ficha cita também CDC/NIOSH (segurança) e Formlabs (princípios de SLA), ainda sem ID no
  // catálogo de fontes; incluir quando forem catalogados e conferidos.
  sourceIds: ["ULT-01"],
};
