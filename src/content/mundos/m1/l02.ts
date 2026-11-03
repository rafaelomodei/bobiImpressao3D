import type { LessonInput } from "../../types";

/** Fonte homologada: docs/licoes/mundo-01.md § L02. */
export const l02: LessonInput = {
  id: "BOBI-M01-L02",
  slug: "l02",
  number: 2,
  title: "Criando camada por camada",
  objective:
    "Compreender a deposição sucessiva de camadas em FDM, distinguir trilha/camada/objeto e identificar uma lacuna esquemática.",
  intro: {
    lines: [
      {
        text: "Na última missão, você descobriu o que é impressão 3D. Mas como a máquina constrói um objeto inteiro?",
        pose: "talk",
      },
      { text: "Ela vai colocando material camada por camada, até formar a peça!", pose: "explain" },
    ],
    // Visual da ficha: torre geométrica simples em cinco estágios, crescendo pela deposição de camadas.
    visualAssetId: "l02-torre-estagios",
    cta: "Entendi, vamos testar!",
  },
  activities: [
    {
      id: "A01",
      type: "multiple_choice",
      title: "Como a peça cresce?",
      pedagogicalLabel: "múltipla escolha",
      statement: "Como uma impressora 3D de filamento constrói uma peça?",
      options: [
        {
          id: "a",
          text: "Acrescentando material em camadas sucessivas.",
          feedback: "Isso! Cada nova camada ajuda a construir o objeto, até ele ficar completo.",
        },
        {
          id: "b",
          text: "Esculpindo uma peça pronta até chegar ao formato desejado.",
          feedback:
            "Esculpir normalmente envolve retirar material. Nesta impressão 3D, a máquina acrescenta material para construir a peça.",
        },
        {
          id: "c",
          text: "Criando a peça inteira instantaneamente, sem etapas.",
          feedback:
            "A peça não aparece inteira de uma vez. Ela ganha forma aos poucos, enquanto novas camadas são depositadas.",
        },
      ],
      correctOptionId: "a",
      successFeedback: "Isso! Cada nova camada ajuda a construir o objeto, até ele ficar completo.",
      // redigido pela equipe técnica
      hint: "Lembre da abertura: a torre foi ficando mais alta aos poucos.",
    },
    {
      id: "A02",
      type: "ordering",
      title: "Construa de baixo para cima",
      // Rótulo original "ordenação visual" → componente ordenação com cartões de imagem (mapa de tipos).
      pedagogicalLabel: "ordenação visual",
      statement: "Organize as imagens do começo ao fim da impressão.",
      // Mesmo objeto, perspectiva e proporções (consistencyGroup "l02-torre").
      items: [
        { id: "i1", text: "Base da torre", assetId: "l02-torre-base" },
        { id: "i2", text: "Torre pela metade", assetId: "l02-torre-metade" },
        { id: "i3", text: "Torre completa", assetId: "l02-torre-completa" },
      ],
      errorFeedback: "Observe qual peça tem menos camadas. A impressão começa pequena e cresce até terminar.",
      successFeedback: "Boa! A impressão começa pela base e ganha altura conforme as novas camadas são formadas.",
      hint: "Primeiro aparece a base. Depois, a peça fica mais alta. No final, ela está completa.",
    },
    {
      id: "A03",
      type: "matching",
      title: "O que estamos vendo?",
      pedagogicalLabel: "associação",
      statement: "Ligue cada nome à sua explicação.",
      // Ficha lista "trilha e camada destacadas" nos assets: usado como imagem de apoio, sem rótulos de texto.
      stimulusAssetId: "l02-trilha-camada",
      pairs: [
        { id: "p1", left: "Trilha de material", right: "Caminho de material depositado pelo bico." },
        { id: "p2", left: "Camada", right: "Material depositado em um nível da peça." },
        { id: "p3", left: "Objeto completo", right: "Conjunto das camadas que formam a peça final." },
      ],
      errorFeedback:
        "Quase! Observe se estamos falando de um caminho de material, de um nível da peça ou do objeto inteiro.",
      successFeedback: "Perfeito! As trilhas formam camadas, e as camadas se juntam para construir o objeto.",
      // redigido pela equipe técnica
      hint: "Vá do menor para o maior: um caminho, depois um nível inteiro, depois a peça toda.",
    },
    {
      id: "A04",
      type: "visual_diagnosis",
      title: "Uma camada ficou faltando!",
      pedagogicalLabel: "diagnóstico visual",
      // A ficha traz esta fala do Caramelo junto da A04. O schema não tem bloco pós-atividade,
      // então ela é exibida antes da pergunta (o texto funciona como contexto).
      // Nota da ficha: sintoma visual, NÃO causa ou diagnóstico físico definitivo.
      preBlocks: [
        {
          kind: "speech",
          text: "As camadas precisam ser formadas conforme o projeto para que a peça tenha o resultado esperado. Depois vamos aprender mais sobre os problemas que podem acontecer.",
          pose: "explain",
        },
      ],
      statement: "Qual imagem mostra uma falha evidente na formação das camadas?",
      options: [
        {
          id: "a",
          text: "Torre parcialmente construída normalmente, sem terminar a parte superior",
          assetId: "l02-torre-metade",
          feedback: "Essa peça ainda está sendo construída. É normal que a parte de cima ainda não exista.",
        },
        {
          id: "b",
          text: "Torre esquemática com faixa horizontal de material ausente no meio da região prevista",
          assetId: "l02-torre-lacuna",
          feedback: "Isso! Há uma região sem material onde deveria existir uma camada da peça.",
        },
        {
          id: "c",
          text: "Torre completa sem lacunas aparentes",
          assetId: "l02-torre-completa",
          feedback: "Essa peça parece completa na ilustração. Procure aquela em que existe uma interrupção no meio.",
        },
      ],
      correctOptionId: "b",
      successFeedback: "Isso! Há uma região sem material onde deveria existir uma camada da peça.",
      // redigido pela equipe técnica
      hint: "Não olhe só para o topo. Percorra a torre de baixo para cima, camada por camada.",
    },
  ],
  outro: {
    line: "Mandou bem! Agora você sabe como uma peça ganha forma camada por camada!",
    summary: ["Camadas", "Progressão desde a base", "Trilha, camada e objeto", "Interrupção visual"],
  },
};
