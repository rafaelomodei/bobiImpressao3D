import type { AssessmentInput } from "../../types";

/**
 * Fonte homologada: docs/avaliacoes/mundo-03-av03.md.
 *
 * A ficha define enunciados, gabaritos e o "feedback para revisão" (transcrito em
 * `reviewExplanation` e, em associação/ordenação, também em `errorFeedback`).
 * Títulos, intro, dicas, mensagens de acerto, textos das alternativas e feedback
 * por alternativa errada foram redigidos pela equipe técnica → authoredDistractors.
 * Q03/Q05 usam artes próprias (av03-*) para não repetir as imagens das lições.
 * Revisão por questão (ficha): L17; L18; L19–L20; L21; L23–L24.
 * A ficha não fixa letras nas alternativas de Q03/Q05; a correta foi posta em
 * posição diferente da usada nas lições (L20 A03, L24 A03) para não repetir o padrão.
 */
export const av03: AssessmentInput = {
  id: "BOBI-M03-AV03",
  slug: "av03",
  title: "Avaliação do Mundo 3", // redigido pela equipe técnica
  objective:
    "Demonstrar capacidade de reconhecer informações de arquivos, preparar e inspecionar uma impressão virtual simples de chaveiro.",
  // redigido pela equipe técnica
  intro:
    "Hora de mostrar o que você aprendeu no Mundo 3! São cinco desafios. Acerte pelo menos quatro para concluir.",
  passMin: 4,
  authoredDistractors: true,
  questions: [
    {
      id: "Q01",
      type: "matching",
      title: "Arquivos e funções", // redigido pela equipe técnica
      pedagogicalLabel: "associação",
      competency: "Diferenciar geometria, contêiner 3MF e instruções de máquina.", // redigido pela equipe técnica
      statement: "Ligue STL, 3MF e G-code às suas funções.",
      pairs: [
        { id: "p1", left: "STL", right: "Geometria." },
        { id: "p2", left: "3MF", right: "Formato que pode conter geometria e dados adicionais." },
        { id: "p3", left: "G-code", right: "Instruções da máquina do cenário." },
      ],
      errorFeedback:
        "Um arquivo de geometria não necessariamente contém instruções de impressão. Um 3MF não garante ter todas as configurações.",
      successFeedback: "Certo! Cada formato tem um papel diferente.", // redigido pela equipe técnica
      hint: "Qual deles a máquina consegue seguir como instrução?", // redigido pela equipe técnica
      reviewExplanation:
        "Um arquivo de geometria não necessariamente contém instruções de impressão. Um 3MF não garante ter todas as configurações.",
      reviewLessonIds: ["BOBI-M03-L17"],
      sourceIds: ["STD-01", "ULT-02", "BAM-03"],
    },
    {
      id: "Q02",
      type: "ordering",
      title: "Fluxo de preparo", // redigido pela equipe técnica
      pedagogicalLabel: "ordenação",
      competency: "Ordenar o fluxo de preparo no fatiador.", // redigido pela equipe técnica
      statement: "Organize o fluxo de preparo do chaveiro.",
      items: [
        { id: "i1", text: "Importar modelo." },
        { id: "i2", text: "Configurar impressora e material." },
        { id: "i3", text: "Fatiar." },
        { id: "i4", text: "Inspecionar prévia." },
      ],
      errorFeedback:
        "Primeiro precisamos do modelo e do perfil; só depois podemos verificar as trajetórias previstas.",
      successFeedback: "Certo! Modelo, configuração, fatiamento e, por fim, a prévia.", // redigido pela equipe técnica
      hint: "A prévia só existe depois que algo foi fatiado.", // redigido pela equipe técnica
      reviewExplanation:
        "Primeiro precisamos do modelo e do perfil; só depois podemos verificar as trajetórias previstas.",
      reviewLessonIds: ["BOBI-M03-L18"],
      sourceIds: ["ULT-02", "BAM-03", "ORC-01"],
    },
    {
      id: "Q03",
      type: "visual_diagnosis",
      title: "Espaço suficiente", // redigido pela equipe técnica
      pedagogicalLabel: "diagnóstico visual",
      competency: "Comparar a dimensão da peça com a área útil do perfil.", // redigido pela equipe técnica
      statement:
        "O chaveiro tem 80 mm na direção apresentada. Qual perfil tem espaço suficiente na direção informada, considerando demais dimensões compatíveis?",
      options: [
        {
          id: "a",
          text: "Perfil com limite de 60 mm", // redigido pela equipe técnica
          assetId: "av03-perfil-60mm",
          feedback: "80 mm não cabem em um limite de 60 mm.", // redigido pela equipe técnica
        },
        {
          id: "b",
          text: "Perfil com limite de 100 mm", // redigido pela equipe técnica
          assetId: "av03-perfil-100mm",
          feedback: "Certo! 80 mm cabem no limite de 100 mm.", // redigido pela equipe técnica
        },
      ],
      correctOptionId: "b",
      successFeedback: "Certo! 80 mm cabem no limite de 100 mm.", // redigido pela equipe técnica
      hint: "Compare os 80 mm com o limite de cada perfil.", // redigido pela equipe técnica
      reviewExplanation:
        "O perfil precisa acomodar a peça em todas as dimensões; neste cenário as outras já estão validadas.",
      reviewLessonIds: ["BOBI-M03-L19", "BOBI-M03-L20"],
      sourceIds: ["ORC-01"],
    },
    {
      id: "Q04",
      type: "matching",
      title: "Material, perfil e máquina", // redigido pela equipe técnica
      pedagogicalLabel: "associação contextual",
      competency: "Diferenciar material, perfil de material e equipamento.", // redigido pela equipe técnica
      statement:
        "A máquina fictícia selecionada é FDM/PLA. Relacione carretel PLA, perfil PLA e máquina FDM a suas funções.",
      pairs: [
        { id: "p1", left: "Carretel PLA", right: "Material." },
        { id: "p2", left: "Perfil PLA", right: "Parâmetros do material." },
        { id: "p3", left: "Máquina FDM", right: "Equipamento." },
      ],
      errorFeedback: "Material, configuração e equipamento precisam ser coerentes.",
      successFeedback: "Certo! Material, configuração e equipamento estão no lugar.", // redigido pela equipe técnica
      hint: "Um é físico, outro é configuração e outro é a máquina.", // redigido pela equipe técnica
      reviewExplanation: "Material, configuração e equipamento precisam ser coerentes.",
      reviewLessonIds: ["BOBI-M03-L21"],
      sourceIds: ["PRU-06", "ORC-01"],
    },
    {
      id: "Q05",
      type: "visual_diagnosis",
      title: "Pronto para a impressão virtual?", // redigido pela equipe técnica
      pedagogicalLabel: "inspeção visual",
      competency: "Inspecionar a prévia: furo funcional e cabimento na área útil.", // redigido pela equipe técnica
      statement: "Qual está adequada para iniciar a impressão virtual?",
      options: [
        {
          id: "a",
          text: "Furo fechado", // redigido pela equipe técnica
          assetId: "av03-previa-furo-fechado",
          feedback: "Com o furo fechado, a argola não passa.", // redigido pela equipe técnica
        },
        {
          id: "b",
          text: "Fora da área útil", // redigido pela equipe técnica
          assetId: "av03-previa-fora",
          feedback: "Parte do chaveiro está fora da área útil.", // redigido pela equipe técnica
        },
        {
          id: "c",
          text: "Furo livre e dentro da mesa", // redigido pela equipe técnica
          assetId: "av03-previa-ok",
          feedback: "Certo! Furo livre, dentro da área útil e perfil compatível.", // redigido pela equipe técnica
        },
      ],
      correctOptionId: "c",
      successFeedback: "Certo! Furo livre, dentro da área útil e perfil compatível.", // redigido pela equipe técnica
      hint: "Confira o furo e as bordas da mesa em cada prévia.", // redigido pela equipe técnica
      reviewExplanation:
        "O furo funcional e o cabimento precisam ser preservados; a prévia não garante sucesso físico.",
      reviewLessonIds: ["BOBI-M03-L23", "BOBI-M03-L24"],
      sourceIds: ["BAM-03", "ORC-01", "ULT-02"],
    },
  ],
};
