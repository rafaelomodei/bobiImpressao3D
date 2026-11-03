import type { AssetInput } from "../types";

/**
 * Catálogo de assets do Mundo 1 — Descoberta (L01–L08 e AV01).
 *
 * Direção comum (docs/design/sistema-visual-narrativa-e-animacao.md e direcao-de-arte.md):
 * cartoon flat 2D, silhuetas simples, cores chapadas, contorno uniforme roxo-profundo
 * (#241241, ~4 px a 512 px), sem gradientes nem sombras volumétricas, sem texto legível
 * além do explicitamente pedido, sem marcas reais. Paleta de apoio: laranja #FD7301,
 * caramelo #F29507, creme #FDD182, roxo #523568/#8D71A7. Cor de "material impresso"
 * padrão do mundo: laranja #FD7301 (filamento/peças), salvo quando a descrição pedir outra.
 * Não incluir o Caramelo nem máquinas da oficina como sprites próprios (catálogo à parte);
 * quando uma cena mostra uma impressora FDM, usar o master "Bobi Mini" da oficina.
 *
 * Grupos de consistência (mesmo objeto, câmera, escala e enquadramento dentro do grupo):
 * - l01-chaveiro: o chaveiro "bobi." em todos os estados (L01).
 * - m1-processos-fabricacao: cartões de máquina/processo (L01 A01, L05, AV01 Q01).
 * - l02-torre: a mesma torre em todos os estágios (L02).
 * - l04-objetos / l04-a01-recursos: objetos de aplicação (L04).
 * - m1-materiais: carretel, recipiente de resina e bloco (L06, L08).
 * - m1-defeitos-fdm: peça de teste com e sem sintomas (L07, AV01).
 * - l08-projetos / av01-projetos: propostas de projeto da bancada.
 */

const SEM_MARCAS = "marcas, logotipos ou nomes de fabricantes reais";
const SEM_CARAMELO = "o personagem Caramelo (é sprite à parte)";

export const ASSETS: AssetInput[] = [
  // ───────────────────────────── L01 ─────────────────────────────
  {
    id: "l01-chaveiro-fluxo",
    kind: "diagram",
    label: "Do modelo digital ao chaveiro pronto",
    emoji: "🔑",
    description:
      "Diagrama horizontal em três painéis ligados por setas laranja da esquerda para a direita: (1) tela de computador genérica com o chaveiro bobi. como modelo 3D em wireframe/sombreado plano; (2) impressora FDM fictícia Bobi Mini com o chaveiro pela metade na mesa e o bico depositando material; (3) o chaveiro laranja pronto, com argola. O chaveiro é uma etiqueta arredondada com a palavra \"bobi.\" em relevo e um furo para a argola, igual nos três painéis.",
    production: {
      view: "três painéis lado a lado, cada objeto em 3/4 frontal levemente elevada (~20°), mesma escala do chaveiro nos três",
      size: "1024x384",
      background: "transparent",
      mustShow: [
        "o mesmo chaveiro nos três painéis",
        "setas indicando a ordem modelo → impressão → pronto",
        "bico depositando material no painel do meio",
      ],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "textos explicativos dentro da imagem"],
      consistencyGroup: "l01-chaveiro",
    },
    usedIn: ["BOBI-M01-L01 S00"],
    file: "bobi-l01-chaveiro-fluxo.png",
  },
  {
    id: "l01-maquina-deposita",
    kind: "illustration",
    label: "Máquina que deposita material",
    emoji: "🖨️",
    description:
      "Impressora FDM fictícia esquemática (Bobi Mini) construindo um pequeno cubo laranja: o bico desce sobre a peça e deixa um filete de material na camada de cima; as camadas da peça são visíveis como faixas horizontais. Diferença-chave para o cartão de corte: aqui o material SAI do bico e a peça cresce; não há bloco nem cavacos.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), máquina inteira centralizada, peça bem visível na mesa",
      size: "512x512",
      background: "transparent",
      mustShow: ["filete saindo do bico", "camadas horizontais na peça", "carretel de filamento no topo ou lateral"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "cavacos ou lascas", "fumaça ou fogo"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L01 A01", "BOBI-M01-L05 A01", "BOBI-M01-AV01 Q01"],
    file: "bobi-l01-maquina-deposita.png",
  },
  {
    id: "l01-maquina-corta",
    kind: "illustration",
    label: "Máquina que corta material de um bloco",
    emoji: "🪚",
    description:
      "Fresadora CNC fictícia e esquemática: uma ferramenta giratória (fresa) desce sobre um bloco cinza-claro maciço preso na mesa e já abriu um rebaixo nele; pequenos cavacos/lascas voam para fora. Diferença-chave: o bloco PERDE material; nada é depositado.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala e enquadramento de l01-maquina-deposita",
      size: "512x512",
      background: "transparent",
      mustShow: ["bloco maciço com parte já removida", "fresa em contato com o bloco", "lascas saindo do bloco"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "filamento ou carretel", "camadas sendo depositadas"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L01 A01", "BOBI-M01-L05 A01", "BOBI-M01-AV01 Q01"],
    file: "bobi-l01-maquina-corta.png",
  },
  {
    id: "l01-impressora-papel",
    kind: "illustration",
    label: "Impressora de papel",
    emoji: "📄",
    description:
      "Impressora de papel de escritório genérica soltando uma folha com uma fotografia simples (paisagem com sol e montanha em cores chapadas). Diferença-chave: o resultado é uma folha plana, sem volume.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala e enquadramento dos cartões de máquina",
      size: "512x512",
      background: "transparent",
      mustShow: ["folha plana saindo da impressora", "imagem impressa na folha"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "objeto 3D saindo da impressora"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L01 A01"],
    file: "bobi-l01-impressora-papel.png",
  },
  {
    id: "l01-chaveiro-digital",
    kind: "scene",
    label: "Chaveiro como modelo digital",
    emoji: "💻",
    description:
      "Monitor genérico mostrando o chaveiro bobi. como modelo 3D na tela de um programa de modelagem fictício (grade de chão, eixos coloridos discretos, modelo em azul-arroxeado plano). Nenhuma impressora em uso. Diferença-chave: o chaveiro só existe na tela.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesmo enquadramento de l01-chaveiro-imprimindo e l01-chaveiro-pronto",
      size: "768x512",
      background: "scene",
      mustShow: ["chaveiro inteiro dentro da tela", "grade/eixos indicando ambiente 3D"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "interface de software real", "chaveiro físico fora da tela"],
      consistencyGroup: "l01-chaveiro",
    },
    usedIn: ["BOBI-M01-L01 A04"],
    file: "bobi-l01-chaveiro-digital.png",
  },
  {
    id: "l01-chaveiro-imprimindo",
    kind: "scene",
    label: "Chaveiro sendo impresso",
    emoji: "🖨️",
    description:
      "Impressora FDM fictícia (Bobi Mini) com o chaveiro bobi. pela metade sobre a mesa e o bico depositando um filete de material na camada atual.",
    production: {
      view: "3/4 frontal levemente elevada (câmera ~20° acima), mesmo enquadramento de l01-chaveiro-digital e l01-chaveiro-pronto",
      size: "768x512",
      background: "scene",
      mustShow: ["bico encostado na camada superior", "chaveiro com cerca de metade da altura final", "filete saindo do bico"],
      mustNotShow: ["marcas reais de impressoras", "fumaça ou fogo", "mãos tocando o bico"],
      consistencyGroup: "l01-chaveiro",
    },
    usedIn: ["BOBI-M01-L01 A04"],
    file: "bobi-l01-chaveiro-imprimindo.png",
  },
  {
    id: "l01-chaveiro-pronto",
    kind: "scene",
    label: "Chaveiro pronto",
    emoji: "🔑",
    description:
      "O chaveiro bobi. laranja pronto, com argola metálica, apoiado sobre uma bancada de madeira clara. Nenhuma impressora trabalhando no quadro. Diferença-chave: objeto completo e fora da máquina.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesmo enquadramento e escala do chaveiro em l01-chaveiro-imprimindo",
      size: "768x512",
      background: "scene",
      mustShow: ["chaveiro completo com argola", "superfície de bancada"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "bico ou impressora em operação"],
      consistencyGroup: "l01-chaveiro",
    },
    usedIn: ["BOBI-M01-L01 A04"],
    file: "bobi-l01-chaveiro-pronto.png",
  },

  // ───────────────────────────── L02 ─────────────────────────────
  {
    id: "l02-torre-estagios",
    kind: "animation",
    label: "Torre crescendo camada por camada",
    emoji: "🗼",
    description:
      "Animação da mesma torre geométrica simples (prisma de base quadrada com topo em pirâmide baixa, faixas horizontais visíveis como camadas) em cinco estágios: 1 só a primeira camada; 2 ~25%; 3 ~50%; 4 ~75%; 5 completa. O bico de uma impressora FDM esquemática acompanha o topo nos quadros 1–4 e sobe para fora da peça no quadro 5.",
    production: {
      view: "frontal levemente elevada (~15°), câmera fixa, mesa e base da torre ancoradas no mesmo ponto em todos os quadros",
      size: "512x512",
      background: "transparent",
      mustShow: ["camadas horizontais contáveis", "crescimento só de baixo para cima", "mesma largura em todos os quadros"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "peça aparecendo inteira de uma vez", "lacunas"],
      consistencyGroup: "l02-torre",
      frames: 5,
      fps: 2,
      loop: true,
    },
    usedIn: ["BOBI-M01-L02 S00"],
    file: "bobi-l02-torre-estagios.png",
  },
  {
    id: "l02-torre-base",
    kind: "card",
    label: "Base da torre",
    emoji: "🟧",
    description:
      "Cartão: apenas as 2–3 primeiras camadas da torre sobre a mesa da impressora (altura ~15% da torre completa), com o bico logo acima. Mesmo desenho, largura e posição da torre dos demais cartões.",
    production: {
      view: "frontal levemente elevada (~15°), idêntica a l02-torre-metade e l02-torre-completa; mesa no mesmo ponto",
      size: "512x512",
      background: "transparent",
      mustShow: ["poucas camadas", "mesa da impressora", "bico acima da peça"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "números ou setas indicando ordem"],
      consistencyGroup: "l02-torre",
    },
    usedIn: ["BOBI-M01-L02 A02"],
    file: "bobi-l02-torre-base.png",
  },
  {
    id: "l02-torre-metade",
    kind: "card",
    label: "Torre pela metade",
    emoji: "🧱",
    description:
      "A torre com cerca de metade da altura final, topo plano (a parte superior ainda não existe), bico encostado na camada de cima depositando material. Todas as camadas presentes estão íntegras, sem lacunas. Serve tanto como cartão de ordenação quanto como a opção 'em construção normal' do diagnóstico.",
    production: {
      view: "frontal levemente elevada (~15°), idêntica aos demais cartões do grupo l02-torre",
      size: "512x512",
      background: "transparent",
      mustShow: ["metade da altura", "bico trabalhando no topo", "camadas contínuas"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "faixas vazias", "números ou setas indicando ordem"],
      consistencyGroup: "l02-torre",
    },
    usedIn: ["BOBI-M01-L02 A02", "BOBI-M01-L02 A04"],
    file: "bobi-l02-torre-metade.png",
  },
  {
    id: "l02-torre-completa",
    kind: "card",
    label: "Torre completa",
    emoji: "🗼",
    description:
      "A torre completa, com topo em pirâmide baixa, todas as camadas contínuas e sem nenhuma lacuna; o bico está recolhido acima, sem tocar a peça.",
    production: {
      view: "frontal levemente elevada (~15°), idêntica aos demais cartões do grupo l02-torre",
      size: "512x512",
      background: "transparent",
      mustShow: ["altura total", "topo finalizado", "camadas contínuas"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "faixas vazias", "números ou setas indicando ordem"],
      consistencyGroup: "l02-torre",
    },
    usedIn: ["BOBI-M01-L02 A02", "BOBI-M01-L02 A04"],
    file: "bobi-l02-torre-completa.png",
  },
  {
    id: "l02-torre-lacuna",
    kind: "card",
    label: "Torre com camada faltando",
    emoji: "⚠️",
    description:
      "A mesma torre completa (altura total, topo finalizado), porém com UMA faixa horizontal vazia no meio da altura: um vão onde deveria haver uma camada, deixando ver o fundo através da peça. Esquemático: indica sintoma visual, não causa.",
    production: {
      view: "frontal levemente elevada (~15°), idêntica a l02-torre-completa, mudando só a faixa ausente",
      size: "512x512",
      background: "transparent",
      mustShow: ["faixa vazia horizontal clara no meio", "camadas acima e abaixo íntegras"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "rachaduras, fumaça ou peças quebradas", "setas ou círculos apontando o defeito"],
      consistencyGroup: "l02-torre",
    },
    usedIn: ["BOBI-M01-L02 A04"],
    file: "bobi-l02-torre-lacuna.png",
  },
  {
    id: "l02-trilha-camada",
    kind: "diagram",
    label: "Trilha, camada e objeto",
    emoji: "🧵",
    description:
      "Torre pela metade vista de cima e de lado: na camada superior, UMA trilha (um caminho de filete) destacada em laranja forte enquanto o bico a percorre; a camada superior inteira destacada em contorno roxo #523568; o restante da peça em tom neutro. Sem rótulos de texto (o aprendiz associa os nomes).",
    production: {
      view: "3/4 elevada (~35°) para mostrar o topo da camada; mesma torre do grupo l02-torre",
      size: "768x512",
      background: "transparent",
      mustShow: ["uma trilha de material destacada", "uma camada inteira destacada com outra cor", "bico sobre a trilha"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "rótulos com os nomes trilha/camada/objeto"],
      consistencyGroup: "l02-torre",
    },
    usedIn: ["BOBI-M01-L02 A03"],
    file: "bobi-l02-trilha-camada.png",
  },

  // ───────────────────────────── L03 ─────────────────────────────
  {
    id: "l03-ideia-ao-objeto",
    kind: "diagram",
    label: "Da ideia ao chaveiro",
    emoji: "💡",
    description:
      "Diagrama em quatro etapas ligadas por setas laranja: (1) balão de pensamento com lâmpada e o esboço do chaveiro; (2) modelo 3D do chaveiro em formato de cabeça de cachorro caramelo (orelhas e focinho estilizados) numa tela genérica; (3) tela de um fatiador genérico mostrando o mesmo modelo cortado em linhas horizontais de camadas e um ícone de arquivo de instruções; (4) impressora FDM Bobi Mini imprimindo o chaveiro. O chaveiro tem o mesmo formato nas etapas 2–4.",
    production: {
      view: "quatro painéis lado a lado; objetos em 3/4 frontal (~20°), mesma escala do chaveiro",
      size: "1024x384",
      background: "transparent",
      mustShow: ["lâmpada/ideia", "modelo 3D do chaveiro de cachorro", "fatiador genérico com camadas", "impressora imprimindo"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "interface de software real (Cura, Bambu Studio, PrusaSlicer etc.)"],
      consistencyGroup: "l03-chaveiro-caramelo",
    },
    usedIn: ["BOBI-M01-L03 S00"],
    file: "bobi-l03-ideia-ao-objeto.png",
  },

  // ───────────────────────────── L04 ─────────────────────────────
  {
    id: "l04-aplicacoes",
    kind: "scene",
    label: "Aplicações da impressão 3D",
    emoji: "🧩",
    description:
      "Bancada com três grupos de objetos impressos em laranja, bem separados: à esquerda, sólidos geométricos didáticos (cubo, cilindro, pirâmide); no centro, o organizador de mesa com lápis e cabos (igual a l04-organizador-lapis-cabos); à direita, o protótipo de caixa com tampa (igual a l04-caixa-prototipo).",
    production: {
      view: "frontal levemente elevada (~20°), bancada horizontal ocupando a largura",
      size: "1024x512",
      background: "scene",
      mustShow: ["sólidos geométricos", "organizador de mesa", "protótipo de caixa"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "impressora no quadro"],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 S00"],
    file: "bobi-l04-aplicacoes.png",
  },
  {
    id: "l04-solidos-geometricos",
    kind: "item",
    label: "Sólidos geométricos impressos",
    emoji: "🔷",
    description:
      "Três sólidos físicos impressos em laranja — cubo, cilindro e pirâmide de base quadrada — com leve textura de camadas e sombra de contato na mesa, deixando claro que são objetos com volume.",
    production: {
      view: "3/4 elevada (~25°), mesmo enquadramento de l04-video-figuras e l04-foto-figuras",
      size: "512x512",
      background: "transparent",
      mustShow: ["cubo", "cilindro", "pirâmide", "volume evidente"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "tela ou papel"],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 A01", "BOBI-M01-L04 A02"],
    file: "bobi-l04-solidos-geometricos.png",
  },
  {
    id: "l04-video-figuras",
    kind: "illustration",
    label: "Vídeo de figuras geométricas",
    emoji: "📺",
    description:
      "Tela de tablet/monitor genérico reproduzindo um vídeo com as mesmas três figuras (cubo, cilindro, pirâmide) desenhadas, com ícone de 'play' e barra de progresso. Diferença-chave: recurso digital, dentro de uma tela.",
    production: {
      view: "3/4 elevada (~25°), mesmo enquadramento de l04-solidos-geometricos",
      size: "512x512",
      background: "transparent",
      mustShow: ["tela", "ícone de play/barra de vídeo", "figuras dentro da tela"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "logotipo de plataforma de vídeo real"],
      consistencyGroup: "l04-a01-recursos",
    },
    usedIn: ["BOBI-M01-L04 A01"],
    file: "bobi-l04-video-figuras.png",
  },
  {
    id: "l04-foto-figuras",
    kind: "illustration",
    label: "Fotografia das figuras no papel",
    emoji: "🖼️",
    description:
      "Folha de papel/fotografia impressa sobre a mesa mostrando as mesmas três figuras (cubo, cilindro, pirâmide). Diferença-chave: totalmente plana, borda fina, sem sombra de volume das figuras.",
    production: {
      view: "3/4 elevada (~25°), mesmo enquadramento de l04-solidos-geometricos",
      size: "512x512",
      background: "transparent",
      mustShow: ["folha plana", "figuras impressas na folha"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "objetos saindo do papel"],
      consistencyGroup: "l04-a01-recursos",
    },
    usedIn: ["BOBI-M01-L04 A01"],
    file: "bobi-l04-foto-figuras.png",
  },
  {
    id: "l04-organizador-lapis-cabos",
    kind: "item",
    label: "Organizador para lápis e cabos",
    emoji: "🗂️",
    description:
      "Organizador de mesa impresso em laranja com três furos cilíndricos verticais ocupados por três lápis em pé e duas canaletas/ganchos laterais segurando dois cabos enrolados. Cada item tem seu lugar visível.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesmo enquadramento de l04-escultura-cachorro e l04-chaveiro-nome",
      size: "512x512",
      background: "transparent",
      mustShow: ["3 lápis em compartimentos próprios", "2 cabos presos em canaletas próprias"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "plugues de marcas reais"],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 A02", "BOBI-M01-L04 A04"],
    file: "bobi-l04-organizador-lapis-cabos.png",
  },
  {
    id: "l04-caixa-prototipo",
    kind: "item",
    label: "Protótipo de caixa",
    emoji: "📦",
    description:
      "Caixa pequena impressa em laranja com a tampa ao lado, sendo conferida com uma régua/paquímetro genérico encostado na lateral; textura leve de camadas. Comunica 'primeira versão em teste de tamanho e encaixe'.",
    production: {
      view: "3/4 frontal levemente elevada (~20°)",
      size: "512x512",
      background: "transparent",
      mustShow: ["caixa e tampa separadas", "instrumento de medida encostado"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "linha de produção ou muitas caixas"],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 A02", "BOBI-M01-L04 A03"],
    file: "bobi-l04-caixa-prototipo.png",
  },
  {
    id: "l04-escultura-cachorro",
    kind: "item",
    label: "Escultura de cachorro caramelo",
    emoji: "🐕",
    description:
      "Escultura decorativa maciça impressa de um cachorro caramelo sentado (cor caramelo #F29507, sem roupa/acessórios do mascote), sobre um pedestal liso. Diferença-chave: não tem nenhum furo, compartimento ou gancho.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesmo enquadramento de l04-organizador-lapis-cabos",
      size: "512x512",
      background: "transparent",
      mustShow: ["cachorro sentado maciço", "pedestal sem compartimentos"],
      mustNotShow: [SEM_MARCAS, "acessórios ou expressão do Caramelo oficial", "furos ou espaços para guardar"],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 A04"],
    file: "bobi-l04-escultura-cachorro.png",
  },
  {
    id: "l04-chaveiro-nome",
    kind: "item",
    label: "Chaveiro com nome Caramelo",
    emoji: "🔑",
    description:
      "Chaveiro plano retangular de cantos arredondados impresso em laranja, com o texto \"Caramelo\" em relevo e argola. Diferença-chave: objeto pequeno, sem espaço para guardar nada.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesmo enquadramento de l04-organizador-lapis-cabos",
      size: "512x512",
      background: "transparent",
      mustShow: ["texto 'Caramelo' legível", "argola"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO],
      consistencyGroup: "l04-objetos",
    },
    usedIn: ["BOBI-M01-L04 A04"],
    file: "bobi-l04-chaveiro-nome.png",
  },

  // ───────────────────────────── L05 ─────────────────────────────
  {
    id: "l05-injecao-molde",
    kind: "illustration",
    label: "Injeção em molde",
    emoji: "🫙",
    description:
      "Injetora esquemática: um bico/cilindro horizontal empurra material derretido (laranja) para dentro de um molde de duas metades metálicas; um corte lateral do molde mostra a cavidade em forma de copinho sendo preenchida. Diferença-chave: o material ganha a forma do molde de uma vez, sem camadas e sem remoção.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala e enquadramento de l01-maquina-deposita e l01-maquina-corta",
      size: "512x512",
      background: "transparent",
      mustShow: ["molde de duas metades", "cavidade sendo preenchida (vista em corte)", "material entrando pelo canal"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "camadas", "lascas", "fumaça ou fogo"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L05 A01", "BOBI-M01-AV01 Q01"],
    file: "bobi-l05-injecao-molde.png",
  },
  {
    id: "l05-ferramenta-removendo",
    kind: "illustration",
    label: "Ferramenta removendo material",
    emoji: "🔩",
    description:
      "Close-up de uma fresa girando (linhas de movimento) cortando um bloco cinza-claro maciço: um canal já aberto no bloco e lascas espiraladas saindo. Sem máquina completa no quadro, para não repetir o cartão l01-maquina-corta.",
    production: {
      view: "close-up 3/4 (~30°), bloco ocupando a metade inferior, fresa entrando pelo alto",
      size: "768x512",
      background: "transparent",
      mustShow: ["bloco com material faltando", "lascas saindo", "ferramenta em contato"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "bico, filamento ou camadas", "molde", "mãos"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L05 A03"],
    file: "bobi-l05-ferramenta-removendo.png",
  },
  {
    id: "l05-tres-processos",
    kind: "diagram",
    label: "FDM, fresadora e injeção",
    emoji: "🏭",
    description:
      "Painel com as três máquinas lado a lado, cada uma com legenda curta de nome: \"FDM\" (impressora depositando camadas), \"Fresadora\" (ferramenta retirando material de um bloco) e \"Injeção\" (material preenchendo um molde). Mesmo desenho dos cartões l01-maquina-deposita, l01-maquina-corta e l05-injecao-molde, reduzidos.",
    production: {
      view: "três painéis lado a lado, mesma escala; câmera 3/4 frontal (~20°) em todos",
      size: "1024x384",
      background: "transparent",
      mustShow: ["rótulos FDM, Fresadora e Injeção", "o que acontece com o material em cada máquina"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "palavras deposição/remoção/moldagem (são a resposta)"],
      consistencyGroup: "m1-processos-fabricacao",
    },
    usedIn: ["BOBI-M01-L05 A04"],
    file: "bobi-l05-tres-processos.png",
  },

  // ───────────────────────────── L06 ─────────────────────────────
  {
    id: "l06-fdm-e-resina",
    kind: "scene",
    label: "Impressora de filamento e de resina",
    emoji: "🔦",
    description:
      "Duas impressoras lado a lado na bancada: à esquerda, FDM Bobi Mini com carretel laranja e bico depositando; à direita, impressora de resina genérica com tampa translúcida âmbar, tanque com líquido e plataforma subindo com a peça pendurada de cabeça para baixo, luz violeta sob o tanque.",
    production: {
      view: "frontal levemente elevada (~20°), as duas máquinas na mesma escala",
      size: "1024x512",
      background: "scene",
      mustShow: ["carretel de filamento", "tanque de resina com luz", "peça na plataforma da resina"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "pessoas manuseando resina", "respingos"],
      consistencyGroup: "l06-tecnologias",
    },
    usedIn: ["BOBI-M01-L06 S00"],
    file: "bobi-l06-fdm-e-resina.png",
  },
  {
    id: "l06-carretel-filamento",
    kind: "item",
    label: "Carretel de filamento",
    emoji: "🧶",
    description:
      "Carretel de filamento com fio laranja enrolado e a ponta solta saindo; carretel com laterais roxas sem rótulo de marca. Diferença-chave: material sólido em forma de fio.",
    production: {
      view: "3/4 frontal (~20°), mesma escala e enquadramento de l06-recipiente-resina e l08-bloco-plastico",
      size: "512x512",
      background: "transparent",
      mustShow: ["fio enrolado", "ponta do filamento solta"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "etiqueta com texto"],
      consistencyGroup: "m1-materiais",
    },
    usedIn: ["BOBI-M01-L06 A01", "BOBI-M01-L08 A02"],
    file: "bobi-l06-carretel-filamento.png",
  },
  {
    id: "l06-recipiente-resina",
    kind: "item",
    label: "Recipiente de resina líquida",
    emoji: "🧴",
    description:
      "Frasco fechado de resina líquida, translúcido âmbar com o líquido visível pela parede e nível marcado, tampa preta, pequeno pictograma genérico de atenção (triângulo com exclamação). Diferença-chave: material líquido em frasco.",
    production: {
      view: "3/4 frontal (~20°), mesma escala e enquadramento de l06-carretel-filamento",
      size: "512x512",
      background: "transparent",
      mustShow: ["líquido visível", "frasco fechado", "pictograma genérico de atenção"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "frasco aberto ou derramado", "mãos"],
      consistencyGroup: "m1-materiais",
    },
    usedIn: ["BOBI-M01-L06 A01", "BOBI-M01-L08 A02"],
    file: "bobi-l06-recipiente-resina.png",
  },
  {
    id: "l06-esquema-luz-resina",
    kind: "diagram",
    label: "Luz endurecendo resina",
    emoji: "💡",
    description:
      "Esquema em corte de uma impressora de resina: tanque com resina líquida âmbar, fonte de luz violeta embaixo projetando um feixe com a forma da camada, e a plataforma acima com a peça crescendo de cabeça para baixo; a camada recém-endurecida aparece em tom mais sólido onde o feixe incide.",
    production: {
      view: "corte lateral ortogonal (vista de perfil), sem perspectiva",
      size: "768x512",
      background: "transparent",
      mustShow: ["luz vindo de baixo", "resina líquida no tanque", "parte endurecida só onde a luz incide", "plataforma"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "bico ou filamento", "texto"],
      consistencyGroup: "l06-tecnologias",
    },
    usedIn: ["BOBI-M01-L06 A03"],
    file: "bobi-l06-esquema-luz-resina.png",
  },
  {
    id: "l06-resina-alerta",
    kind: "illustration",
    label: "Resina sem cura com alerta",
    emoji: "⚠️",
    description:
      "O mesmo frasco de l06-recipiente-resina sozinho sobre a bancada, fechado, com um grande ícone genérico de atenção (triângulo amarelo com exclamação) flutuando ao lado. Comunica cuidado, sem dramatizar.",
    production: {
      view: "3/4 frontal (~20°), frasco idêntico a l06-recipiente-resina",
      size: "768x512",
      background: "scene",
      mustShow: ["frasco fechado", "ícone de atenção"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "mãos, respingos ou pessoas", "caveira ou símbolos regulatórios reais"],
      consistencyGroup: "m1-materiais",
    },
    usedIn: ["BOBI-M01-L06 A04"],
    file: "bobi-l06-resina-alerta.png",
  },

  // ───────────────────────────── L07 ─────────────────────────────
  {
    id: "l07-peca-referencia",
    kind: "illustration",
    label: "Peça de teste sem falhas",
    emoji: "✅",
    description:
      "Peça de teste laranja: base retangular baixa com duas torrinhas cilíndricas separadas por um vão, apoiada na mesa da impressora. Base totalmente encostada na mesa, camadas alinhadas, vão entre as torres limpo. Referência para comparar com os defeitos.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), câmera e escala idênticas em todo o grupo m1-defeitos-fdm",
      size: "512x512",
      background: "transparent",
      mustShow: ["duas torres com vão limpo", "base inteira encostada", "camadas alinhadas"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "fios, cantos levantados ou degraus"],
      consistencyGroup: "m1-defeitos-fdm",
    },
    usedIn: ["BOBI-M01-L07 A01"],
    file: "bobi-l07-peca-referencia.png",
  },
  {
    id: "l07-peca-stringing",
    kind: "illustration",
    label: "Peça com stringing",
    emoji: "🕸️",
    description:
      "A mesma peça de teste, com vários fios finos de plástico estendidos no vão entre as duas torres, como teia. Base encostada e camadas alinhadas (único defeito: os fios).",
    production: {
      view: "idêntica a l07-peca-referencia",
      size: "512x512",
      background: "transparent",
      mustShow: ["fios finos ligando as duas torres"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "outros defeitos", "setas ou textos apontando o defeito"],
      consistencyGroup: "m1-defeitos-fdm",
    },
    usedIn: ["BOBI-M01-L07 A01", "BOBI-M01-L07 A03"],
    file: "bobi-l07-peca-stringing.png",
  },
  {
    id: "l07-peca-warping",
    kind: "illustration",
    label: "Peça com warping",
    emoji: "📐",
    description:
      "A mesma peça de teste, com os dois cantos da base levantados da mesa (curvados para cima, mostrando um vão de luz sob eles). Vão entre as torres limpo e camadas alinhadas (único defeito: cantos levantados).",
    production: {
      view: "idêntica a l07-peca-referencia; câmera baixa o suficiente para ver o vão sob os cantos",
      size: "512x512",
      background: "transparent",
      mustShow: ["cantos da base levantados", "vão visível entre base e mesa"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "fios", "camadas deslocadas", "setas ou textos"],
      consistencyGroup: "m1-defeitos-fdm",
    },
    usedIn: ["BOBI-M01-L07 A02", "BOBI-M01-L07 A03"],
    file: "bobi-l07-peca-warping.png",
  },
  {
    id: "l07-peca-deslocamento",
    kind: "illustration",
    label: "Peça com camadas deslocadas",
    emoji: "↔️",
    description:
      "A mesma peça de teste, com toda a metade superior deslocada lateralmente para a direita a partir de uma altura, formando um degrau nítido em todas as faces. Base encostada e sem fios (único defeito: deslocamento). Requer validação técnica visual antes da publicação (ficha L07).",
    production: {
      view: "idêntica a l07-peca-referencia",
      size: "512x512",
      background: "transparent",
      mustShow: ["degrau lateral na mesma altura em toda a peça"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "fios", "cantos levantados", "setas ou textos"],
      consistencyGroup: "m1-defeitos-fdm",
    },
    usedIn: ["BOBI-M01-L07 A03"],
    file: "bobi-l07-peca-deslocamento.png",
  },

  // ───────────────────────────── L08 ─────────────────────────────
  {
    id: "l08-bancada-baguncada",
    kind: "scene",
    label: "Bancada bagunçada",
    emoji: "✏️",
    description:
      "Bancada de oficina em madeira clara com lápis espalhados e rolando, cabos emaranhados, papéis e um carretel de filamento. Espaço livre à esquerda para o Caramelo ser composto por cima (sprite à parte).",
    production: {
      view: "frontal levemente elevada (~20°), bancada de ponta a ponta",
      size: "1024x512",
      background: "scene",
      mustShow: ["lápis espalhados", "cabos emaranhados"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "porta-lápis pronto"],
    },
    usedIn: ["BOBI-M01-L08 S00"],
    file: "bobi-l08-bancada-baguncada.png",
  },
  {
    id: "l08-enfeite-osso",
    kind: "item",
    label: "Enfeite em forma de osso",
    emoji: "🦴",
    description:
      "Enfeite maciço impresso em laranja em forma de osso de cachorro, deitado sobre a mesa. Diferença-chave: nenhuma cavidade ou furo para guardar lápis.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala de l08-porta-lapis e l08-porta-copos",
      size: "512x512",
      background: "transparent",
      mustShow: ["formato de osso", "peça maciça"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "lápis", "furos"],
      consistencyGroup: "l08-projetos",
    },
    usedIn: ["BOBI-M01-L08 A01"],
    file: "bobi-l08-enfeite-osso.png",
  },
  {
    id: "l08-porta-copos",
    kind: "item",
    label: "Porta-copos raso",
    emoji: "🥏",
    description:
      "Porta-copos impresso em laranja, disco raso com borda baixa (poucos milímetros). Ao lado, um lápis deitado mostra que ele é muito maior que a altura da borda. Diferença-chave: raso demais para manter lápis em pé.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala de l08-porta-lapis",
      size: "512x512",
      background: "transparent",
      mustShow: ["borda muito baixa", "lápis deitado ao lado para escala"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "lápis em pé dentro dele"],
      consistencyGroup: "l08-projetos",
    },
    usedIn: ["BOBI-M01-L08 A01"],
    file: "bobi-l08-porta-copos.png",
  },
  {
    id: "l08-porta-lapis",
    kind: "item",
    label: "Porta-lápis com compartimentos",
    emoji: "🖊️",
    description:
      "Porta-lápis impresso em laranja, alto, com três a quatro compartimentos verticais e lápis em pé dentro deles. Detalhe decorativo: pequena patinha em relevo na frente. Mesmo objeto de l08-porta-lapis-stringing.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala de l08-porta-copos e l08-enfeite-osso",
      size: "512x512",
      background: "transparent",
      mustShow: ["compartimentos separados", "lápis em pé"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "defeitos de impressão"],
      consistencyGroup: "l08-projetos",
    },
    usedIn: ["BOBI-M01-L08 A01"],
    file: "bobi-l08-porta-lapis.png",
  },
  {
    id: "l08-bloco-plastico",
    kind: "item",
    label: "Bloco maciço de plástico",
    emoji: "🧊",
    description:
      "Bloco retangular maciço de plástico laranja, liso, sem camadas, como matéria-prima de fresagem. Diferença-chave: não é fio nem líquido.",
    production: {
      view: "3/4 frontal (~20°), mesma escala e enquadramento de l06-carretel-filamento",
      size: "512x512",
      background: "transparent",
      mustShow: ["bloco maciço liso"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "ferramentas cortando", "etiqueta com texto"],
      consistencyGroup: "m1-materiais",
    },
    usedIn: ["BOBI-M01-L08 A02"],
    file: "bobi-l08-bloco-plastico.png",
  },
  {
    id: "l08-porta-lapis-stringing",
    kind: "illustration",
    label: "Porta-lápis com stringing",
    emoji: "🕸️",
    description:
      "O mesmo porta-lápis de l08-porta-lapis, vazio (sem lápis) e recém-impresso, com vários fios finos de plástico estendidos entre as bordas dos compartimentos. Base encostada e camadas alinhadas: o único defeito são os fios. Resultado fictício.",
    production: {
      view: "idêntica a l08-porta-lapis",
      size: "512x512",
      background: "transparent",
      mustShow: ["fios finos entre os compartimentos"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "cantos levantados", "camadas deslocadas", "setas ou textos"],
      consistencyGroup: "l08-projetos",
    },
    usedIn: ["BOBI-M01-L08 A04"],
    file: "bobi-l08-porta-lapis-stringing.png",
  },

  // ───────────────────────────── AV01 ─────────────────────────────
  {
    id: "av01-organizador-compartimentos",
    kind: "item",
    label: "Organizador com compartimentos",
    emoji: "🗃️",
    description:
      "Organizador de bancada impresso em roxo #8D71A7 (cor diferente de L04 para não repetir a imagem): fileira de furos com lápis em pé e, ao lado, nichos com cabos enrolados, cada um separado. Variação do organizador de L04.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma escala de av01-vaso-decorativo e av01-porta-retrato",
      size: "512x512",
      background: "transparent",
      mustShow: ["lápis em compartimentos próprios", "cabos em nichos próprios"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO],
      consistencyGroup: "av01-projetos",
    },
    usedIn: ["BOBI-M01-AV01 Q03"],
    file: "bobi-av01-organizador-compartimentos.png",
  },
  {
    id: "av01-vaso-decorativo",
    kind: "item",
    label: "Vaso decorativo sem divisões",
    emoji: "🏺",
    description:
      "Vaso decorativo impresso em roxo #8D71A7, boca larga, interior único sem divisões (visível pela abertura). Diferença-chave: tudo ficaria misturado dentro dele.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), boca visível",
      size: "512x512",
      background: "transparent",
      mustShow: ["interior único sem divisões"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "plantas ou flores", "lápis organizados"],
      consistencyGroup: "av01-projetos",
    },
    usedIn: ["BOBI-M01-AV01 Q03"],
    file: "bobi-av01-vaso-decorativo.png",
  },
  {
    id: "av01-porta-retrato",
    kind: "item",
    label: "Porta-retrato com moldura de osso",
    emoji: "🖼️",
    description:
      "Porta-retrato impresso em roxo #8D71A7 com moldura decorada por ossinhos e um apoio traseiro, contendo uma imagem simples de paisagem. Diferença-chave: não guarda objetos.",
    production: {
      view: "3/4 frontal levemente elevada (~20°)",
      size: "512x512",
      background: "transparent",
      mustShow: ["moldura com ossinhos", "apoio traseiro"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "foto de pessoa real"],
      consistencyGroup: "av01-projetos",
    },
    usedIn: ["BOBI-M01-AV01 Q03"],
    file: "bobi-av01-porta-retrato.png",
  },
  {
    id: "av01-peca-stringing",
    kind: "illustration",
    label: "Peça com stringing (avaliação)",
    emoji: "🕸️",
    description:
      "Peça diferente da L07 para evitar memorização: suporte em forma de 'U' com duas hastes verticais altas e finas, em roxo #8D71A7, com fios finos e inequívocos de plástico ligando as hastes. Base encostada e camadas alinhadas: único defeito são os fios.",
    production: {
      view: "3/4 frontal levemente elevada (~20°), mesma câmera do grupo m1-defeitos-fdm",
      size: "512x512",
      background: "transparent",
      mustShow: ["fios finos entre as duas hastes"],
      mustNotShow: [SEM_MARCAS, SEM_CARAMELO, "outros defeitos", "setas ou textos"],
      consistencyGroup: "m1-defeitos-fdm",
    },
    usedIn: ["BOBI-M01-AV01 Q05"],
    file: "bobi-av01-peca-stringing.png",
  },
];
