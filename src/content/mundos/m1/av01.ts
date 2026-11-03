import type { AssessmentInput } from "../../types";

/**
 * Fonte homologada: docs/avaliacoes/mundo-01-av01.md.
 *
 * A ficha define competência, enunciado/tarefa, resposta correta, regra de correção e o
 * objetivo do "feedback ao final". Alternativas incorretas, feedbacks por alternativa, dicas,
 * enunciados ausentes e o texto de reviewExplanation foram redigidos pela equipe técnica
 * (authoredDistractors: true) — exigem revisão antes de publicar.
 * Regra: uma unidade por questão totalmente correta; associação/ordenação sem frações.
 * Posição da correta variada entre as questões (a ficha não fixa A/B/C).
 */
export const av01: AssessmentInput = {
  id: "BOBI-M01-AV01",
  slug: "av01",
  title: "Avaliação de domínio do Mundo 1",
  objective:
    "Verificar se o aprendiz consegue aplicar os fundamentos de impressão 3D ao reconhecer o processo aditivo, sequenciar a preparação, selecionar uma aplicação apropriada, distinguir tecnologias e identificar um defeito visual.",
  // redigido pela equipe técnica
  intro:
    "Cinco desafios sobre tudo o que você viu no Mundo 1. Acerte quatro para liberar o Mundo 2. O resultado e as explicações aparecem no final.",
  passMin: 4,
  authoredDistractors: true,
  questions: [
    {
      id: "Q01",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Processo aditivo",
      // Modalidade da ficha: múltipla escolha visual (alternativas com figura; reaproveita as ilustrações de L01 A01/L05 A01).
      pedagogicalLabel: "múltipla escolha visual",
      competency: "Reconhecer como uma impressora 3D FDM constrói uma peça.",
      statement: "Qual processo constrói uma peça por acréscimo sucessivo de material?",
      // redigido pela equipe técnica (distratores: remoção e moldagem, conforme regra de correção)
      options: [
        {
          id: "a",
          text: "Fabricação subtrativa",
          assetId: "l01-maquina-corta",
          feedback: "Na fabricação subtrativa, o material é retirado de um bloco, não acrescentado.",
        },
        {
          id: "b",
          text: "Fabricação por moldagem",
          assetId: "l05-injecao-molde",
          feedback: "Na moldagem, o material ganha forma dentro de um molde, sem ser acrescentado em camadas.",
        },
        {
          id: "c",
          text: "Fabricação aditiva",
          assetId: "l01-maquina-deposita",
          feedback: "Isso! Acrescentar material, camada após camada, é fabricação aditiva.",
        },
      ],
      correctOptionId: "c",
      // redigido pela equipe técnica
      successFeedback: "Isso! Acrescentar material, camada após camada, é fabricação aditiva.",
      // redigido pela equipe técnica
      hint: "Acréscimo lembra adição.",
      // redigido pela equipe técnica (objetivo da ficha: por que depositar material é aditivo)
      reviewExplanation:
        "Na impressão 3D FDM, a máquina deposita material e a peça cresce camada por camada. Como o material é acrescentado, o processo é chamado de fabricação aditiva. Retirar material de um bloco é subtrativo; dar forma com molde é moldagem.",
      reviewLessonIds: ["BOBI-M01-L01", "BOBI-M01-L02", "BOBI-M01-L05"],
      sourceIds: ["ULT-01"],
    },
    {
      id: "Q02",
      type: "ordering",
      // redigido pela equipe técnica (título)
      title: "Sequência de fabricação",
      pedagogicalLabel: "ordenação",
      competency: "Organizar o fluxo digital básico.",
      statement: "Organize a sequência necessária para fabricar um objeto a partir de um modelo digital.",
      items: [
        { id: "i1", text: "Modelo digital" },
        { id: "i2", text: "Preparação das instruções no fatiador" },
        { id: "i3", text: "Impressora/fabricação da peça" },
      ],
      // redigido pela equipe técnica
      errorFeedback: "A impressora precisa receber as instruções antes de fabricar. Onde entra a preparação?",
      // redigido pela equipe técnica
      successFeedback: "Isso! Modelo, preparação no fatiador e, por fim, a fabricação.",
      // redigido pela equipe técnica
      hint: "A fabricação é sempre a última etapa.",
      // redigido pela equipe técnica (objetivo da ficha: impressora precisa de instruções antes)
      reviewExplanation:
        "A impressora não fabrica direto do modelo digital: ela precisa de instruções adequadas. Por isso o modelo passa primeiro pelo fatiador, que prepara essas instruções, e só então a impressora fabrica a peça.",
      reviewLessonIds: ["BOBI-M01-L01", "BOBI-M01-L03", "BOBI-M01-L08"],
      sourceIds: ["ULT-02", "BAM-03"],
    },
    {
      id: "Q03",
      type: "multiple_choice",
      // redigido pela equipe técnica (título)
      title: "Aplicação prática",
      pedagogicalLabel: "múltipla escolha visual",
      competency: "Escolher uma solução que atenda a uma necessidade.",
      preBlocks: [
        // redigido pela equipe técnica (fala adaptada do "Contexto" da ficha)
        { kind: "speech", text: "Preciso organizar os lápis e os cabos da minha bancada.", pose: "talk" },
      ],
      // redigido pela equipe técnica (a ficha define só a tarefa "selecionar entre projetos")
      statement: "Qual destes projetos é o mais adequado para essa situação?",
      // redigido pela equipe técnica (distratores imprimíveis que não resolvem o problema)
      options: [
        {
          id: "a",
          text: "Organizador com compartimentos para lápis e cabos",
          assetId: "av01-organizador-compartimentos",
          feedback: "Isso! Os compartimentos guardam os lápis e os cabos, cada um no seu lugar.",
        },
        {
          id: "b",
          text: "Vaso decorativo sem divisões",
          assetId: "av01-vaso-decorativo",
          feedback: "O vaso pode ser impresso, mas sem divisões os lápis e os cabos ficariam misturados.",
        },
        {
          id: "c",
          text: "Porta-retrato com moldura de osso",
          assetId: "av01-porta-retrato",
          feedback: "O porta-retrato pode ser impresso, mas não guarda lápis nem cabos.",
        },
      ],
      correctOptionId: "a",
      // redigido pela equipe técnica
      successFeedback: "Isso! Os compartimentos guardam os lápis e os cabos, cada um no seu lugar.",
      // redigido pela equipe técnica
      hint: "Todos podem ser impressos. Qual resolve o problema da bancada?",
      // redigido pela equipe técnica (objetivo da ficha: finalidades diferentes; atender ao problema)
      reviewExplanation:
        "Todos esses objetos podem ser impressos em 3D, mas cada um tem uma finalidade. A melhor solução é a que atende ao problema: aqui, guardar lápis e cabos de forma organizada.",
      reviewLessonIds: ["BOBI-M01-L04", "BOBI-M01-L08"],
    },
    {
      id: "Q04",
      type: "matching",
      // redigido pela equipe técnica (título e enunciado; a ficha define só a tarefa)
      title: "Tecnologias de impressão",
      pedagogicalLabel: "associação",
      competency: "Distinguir FDM e fotopolimerização de resina.",
      statement: "Ligue cada tecnologia ao seu princípio.",
      pairs: [
        { id: "p1", left: "FDM/FFF", right: "Deposição de filamento termoplástico" },
        { id: "p2", left: "SLA/MSLA", right: "Resina fotossensível solidificada por luz" },
      ],
      // redigido pela equipe técnica
      errorFeedback: "Uma tecnologia deposita filamento; a outra usa luz para solidificar resina.",
      // redigido pela equipe técnica
      successFeedback: "Isso! Filamento depositado na FDM/FFF; resina solidificada por luz na SLA/MSLA.",
      // redigido pela equipe técnica
      hint: "Qual delas usa um bico e um fio de material?",
      // redigido pela equipe técnica (objetivo da ficha: comparar sem sugerir equivalência de segurança/qualidade)
      reviewExplanation:
        "A FDM/FFF deposita filamento termoplástico aquecido; a SLA/MSLA usa luz para solidificar resina fotossensível. São princípios diferentes, com cuidados de segurança diferentes, e nenhuma é a melhor para todos os casos.",
      reviewLessonIds: ["BOBI-M01-L06"],
      sourceIds: ["ULT-01"],
    },
    {
      id: "Q05",
      type: "multiple_choice",
      // redigido pela equipe técnica (título e enunciado; a ficha define só a tarefa)
      title: "Reconhecimento de falha",
      pedagogicalLabel: "múltipla escolha visual",
      competency: "Identificar um sintoma visual introdutório.",
      stimulusAssetId: "av01-peca-stringing",
      statement: "Observe a peça. Qual sintoma aparece?",
      // redigido pela equipe técnica (distratores: outros sintomas de M1; sem exigir causa)
      options: [
        {
          id: "a",
          text: "Warping (bordas levantadas)",
          feedback: "No warping, os cantos da base se levantam. Nesta peça, a base está toda apoiada.",
        },
        {
          id: "b",
          text: "Stringing (formação de fios)",
          feedback: "Isso! Os fios finos entre as partes separadas são o sintoma stringing.",
        },
        {
          id: "c",
          text: "Deslocamento de camadas",
          feedback: "No deslocamento, as camadas escorregam para o lado. Nesta peça, as camadas estão alinhadas.",
        },
      ],
      correctOptionId: "b",
      // redigido pela equipe técnica
      successFeedback: "Isso! Os fios finos entre as partes separadas são o sintoma stringing.",
      // redigido pela equipe técnica
      hint: "Olhe o espaço entre as partes da peça.",
      // redigido pela equipe técnica (objetivo da ficha: diferenciar sintoma e hipótese de origem)
      reviewExplanation:
        "Os fios finos entre partes separadas são o sintoma chamado stringing. Reconhecer o sintoma é diferente de saber a causa: mais de um fator pode contribuir, e a origem se investiga depois, com mais informações.",
      reviewLessonIds: ["BOBI-M01-L07", "BOBI-M01-L08"],
      sourceIds: ["PRU-07"],
    },
  ],
};
