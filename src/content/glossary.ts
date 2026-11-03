/**
 * Glossário do ciclo de erro (DD027). Quando a pessoa erra, o jogo explica em uma ou
 * duas frases simples os termos que aparecem na pergunta e na resposta marcada.
 *
 * Regras de escrita: linguagem para 10–14 anos, no máximo ~200 caracteres, coerente
 * com as lições homologadas (docs/licoes) e a base de conhecimento. Não é artigo: só o
 * suficiente para dar contexto. `assetId` reaproveita uma ilustração do catálogo; ela
 * só aparece quando o sprite estiver pronto.
 *
 * `match`: formas como o termo aparece no texto. Siglas diferenciam maiúsculas; palavras
 * comuns não. Todas casam como palavra inteira.
 */
export type GlossaryEntry = {
  id: string;
  term: string;
  definition: string;
  match: { words?: string[]; acronyms?: string[] };
  assetId?: string;
  /** Termo que aparece em quase toda pergunta: só entra se houver menos de 2 termos específicos. */
  generic?: boolean;
};

export const GLOSSARY: GlossaryEntry[] = [
  // --- Processos -----------------------------------------------------------
  {
    id: "impressao-3d",
    term: "Impressão 3D",
    definition: "Jeito de fabricar um objeto de verdade, com volume, acrescentando material camada por camada a partir de um modelo no computador.",
    match: { words: ["impressão 3D", "impressões 3D"] },
    assetId: "l02-torre-estagios",
    generic: true,
  },
  {
    id: "fabricacao-aditiva",
    term: "Fabricação aditiva",
    definition: "Fabricar somando material, camada por camada, até formar o objeto. A impressão 3D é um tipo de fabricação aditiva.",
    match: { words: ["fabricação aditiva", "aditiva", "aditivo"] },
    assetId: "l02-torre-estagios",
  },
  {
    id: "fabricacao-subtrativa",
    term: "Fabricação subtrativa",
    definition: "Fabricar tirando material de um bloco — cortando, furando ou lixando — até sobrar a forma desejada.",
    match: { words: ["fabricação subtrativa", "subtrativa", "subtrativo", "corta material", "retira material", "retirar material"] },
  },
  {
    id: "injecao",
    term: "Moldagem por injeção",
    definition: "Plástico derretido é empurrado para dentro de um molde fechado. Vale a pena para fazer muitas peças iguais, mas o molde custa caro.",
    match: { words: ["moldagem por injeção", "injeção", "molde", "moldes"] },
  },
  {
    id: "fdm",
    term: "FDM / FFF",
    definition: "Impressão com filamento: um fio de plástico é derretido no bico e depositado camada por camada. FDM e FFF são dois nomes para o mesmo processo.",
    match: { acronyms: ["FDM", "FFF"] },
    assetId: "l06-carretel-filamento",
  },
  {
    id: "sla",
    term: "SLA / MSLA",
    definition: "Impressão com resina: uma resina líquida endurece quando recebe luz, formando uma camada de cada vez.",
    match: { acronyms: ["SLA", "MSLA"] },
    assetId: "l06-recipiente-resina",
  },
  {
    id: "prototipo",
    term: "Protótipo",
    definition: "Uma primeira versão de teste de um objeto, feita para ver se a ideia funciona antes da versão final.",
    match: { words: ["protótipo", "protótipos"] },
    assetId: "l04-caixa-prototipo",
  },

  // --- Objeto e camadas ----------------------------------------------------
  {
    id: "modelo-3d",
    term: "Modelo 3D",
    definition: "O desenho do objeto no computador, com largura, altura e profundidade. É o ponto de partida de toda impressão.",
    match: { words: ["modelo 3D", "modelos 3D", "modelo digital", "modelos digitais"] },
  },
  {
    id: "camada",
    term: "Camada",
    definition: "Uma \"fatia\" fina do objeto. A impressora faz uma camada de cada vez, de baixo para cima, até a peça ficar pronta.",
    match: { words: ["camada", "camadas"] },
    assetId: "l02-torre-metade",
  },
  {
    id: "primeira-camada",
    term: "Primeira camada",
    definition: "A camada que encosta na mesa. Se ela grudar bem e por igual, o resto da peça ganha uma base firme.",
    match: { words: ["primeira camada"] },
    assetId: "l14-mesa-primeira-camada",
  },
  {
    id: "altura-camada",
    term: "Altura de camada",
    definition: "A espessura de cada camada. Camadas mais finas deixam a peça mais lisa, mas a impressão demora mais.",
    match: { words: ["altura de camada", "altura da camada", "altura das camadas"] },
  },

  // --- Materiais -----------------------------------------------------------
  {
    id: "termoplastico",
    term: "Termoplástico",
    definition: "Plástico que amolece com o calor e endurece de novo ao esfriar. É isso que permite derreter o filamento e formar cada camada.",
    match: { words: ["termoplástico", "termoplásticos", "termoplástica"] },
  },
  {
    id: "filamento",
    term: "Filamento",
    definition: "O \"fio\" de plástico enrolado no carretel. É o material que a impressora FDM derrete para construir a peça.",
    match: { words: ["filamento", "filamentos"] },
    assetId: "l06-carretel-filamento",
  },
  {
    id: "pla",
    term: "PLA",
    definition: "O filamento mais usado por quem está começando: imprime em temperatura mais baixa e costuma entortar pouco.",
    match: { acronyms: ["PLA"] },
    assetId: "l06-carretel-filamento",
  },
  {
    id: "petg",
    term: "PETG",
    definition: "Outro tipo de filamento, mais resistente que o PLA. Precisa de temperatura diferente, por isso o perfil tem que combinar com o material.",
    match: { acronyms: ["PETG"] },
  },
  {
    id: "resina",
    term: "Resina",
    definition: "Material líquido que endurece com luz. Antes de endurecer pode fazer mal à pele, então só se manuseia com orientação e proteção.",
    match: { words: ["resina", "resinas"] },
    assetId: "l06-resina-alerta",
  },
  {
    id: "epi",
    term: "EPI",
    definition: "Equipamento de proteção individual: luvas, óculos e outros itens que protegem quem manuseia materiais.",
    match: { acronyms: ["EPI", "EPIs"] },
  },

  // --- Partes da impressora ------------------------------------------------
  {
    id: "carretel",
    term: "Carretel",
    definition: "O rolo onde o filamento fica enrolado. Ele vai soltando o fio conforme a impressora puxa.",
    match: { words: ["carretel", "carretéis"] },
    assetId: "l09-destaque-carretel",
  },
  {
    id: "extrusor",
    term: "Extrusor",
    definition: "A parte que puxa o filamento do carretel e empurra até o bico, controlando quanto material sai.",
    match: { words: ["extrusor", "extrusores"] },
    assetId: "l09-destaque-extrusor",
  },
  {
    id: "hotend",
    term: "Hotend",
    definition: "A parte quente da impressora: esquenta e derrete o filamento logo antes de ele sair pelo bico.",
    match: { words: ["hotend", "conjunto aquecido", "conjunto quente"] },
  },
  {
    id: "bico",
    term: "Bico",
    definition: "A pontinha quente por onde sai o plástico derretido. É ele que \"desenha\" cada camada.",
    match: { words: ["bico", "bicos"] },
    assetId: "l09-destaque-bico",
  },
  {
    id: "mesa",
    term: "Mesa de impressão",
    definition: "A superfície onde a peça é construída. A primeira camada precisa grudar bem nela.",
    match: { words: ["mesa de impressão", "mesa"] },
    assetId: "l09-destaque-mesa",
  },
  {
    id: "eixos",
    term: "Eixos X, Y e Z",
    definition: "As direções em que a máquina se move: X para os lados, Y para frente e para trás, e Z para cima, a cada nova camada.",
    match: { words: ["eixo", "eixos", "eixo Z", "eixo X", "eixo Y", "X, Y e Z"] },
  },

  // --- Do arquivo à impressão ----------------------------------------------
  {
    id: "fatiador",
    term: "Fatiador",
    definition: "Programa que \"fatia\" o modelo 3D em camadas e cria as instruções que a impressora vai seguir.",
    match: { words: ["fatiador", "fatiadores", "fatiamento"] },
  },
  {
    id: "gcode",
    term: "G-code",
    definition: "O arquivo de instruções criado pelo fatiador: diz à impressora para onde ir, quanto material soltar e em que temperatura.",
    match: { acronyms: ["G-code"] },
  },
  {
    id: "stl",
    term: "STL",
    definition: "Formato de arquivo comum para modelos 3D. Guarda só a forma do objeto, sem cores nem configurações.",
    match: { acronyms: ["STL"] },
  },
  {
    id: "3mf",
    term: "3MF",
    definition: "Formato de arquivo de modelo 3D mais completo que o STL: pode guardar a forma e também cores e configurações do projeto.",
    match: { acronyms: ["3MF"] },
  },
  {
    id: "perfil",
    term: "Perfil",
    definition: "Conjunto de configurações prontas no fatiador para uma impressora ou um material, como temperatura e velocidade.",
    match: { words: ["perfil", "perfis"] },
  },
  {
    id: "previa",
    term: "Prévia",
    definition: "A simulação no fatiador que mostra, camada por camada, como a peça vai ficar — antes de gastar material.",
    match: { words: ["prévia", "pré-visualização"] },
  },

  {
    id: "escala",
    term: "Escala",
    definition: "Ferramenta do fatiador que aumenta ou diminui o tamanho do modelo inteiro, sem mudar a forma dele.",
    match: { words: ["escala"] },
  },
  {
    id: "area-impressao",
    term: "Área de impressão",
    definition: "O espaço máximo em que a impressora consegue imprimir. Se a peça passar desse limite em alguma direção, ela não cabe.",
    match: { words: ["área de impressão", "área útil", "área válida", "volume de impressão"] },
    assetId: "l19-limite-peca-120mm",
  },
  {
    id: "resfriamento",
    term: "Resfriamento",
    definition: "Depois de imprimir, o bico e a mesa continuam quentes por um tempo. Só se mexe neles depois que esfriarem.",
    match: { words: ["resfriamento", "esfriar", "esfriarem"] },
  },

  // --- Problemas comuns ----------------------------------------------------
  {
    id: "warping",
    term: "Warping",
    definition: "Defeito em que os cantos da peça se levantam da mesa enquanto ela esfria.",
    match: { words: ["warping", "canto erguido", "cantos erguidos"] },
    assetId: "l07-peca-warping",
  },
  {
    id: "stringing",
    term: "Stringing",
    definition: "Fiozinhos de plástico, parecidos com teia de aranha, entre partes da peça. Acontece quando o bico vaza enquanto se move.",
    match: { words: ["stringing"] },
    assetId: "l07-peca-stringing",
  },
  {
    id: "deslocamento",
    term: "Deslocamento de camadas",
    definition: "Quando as camadas \"escorregam\" para o lado e a peça fica torta, como uma pilha de livros empurrada.",
    match: { words: ["deslocamento de camadas", "deslocamento de camada", "deslocamento", "camadas deslocadas"] },
    assetId: "l07-peca-deslocamento",
  },
];
