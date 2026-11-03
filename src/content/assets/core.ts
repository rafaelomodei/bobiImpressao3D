import type { AssetInput } from "../types";

/**
 * Assets centrais: Caramelo (todas as poses), oficina, itens fabricáveis, minijogo
 * e ícones de interface. Os assets de cada lição estão em m1.ts, m2.ts e m3.ts.
 * Guia de produção: docs/design/sprites-pendentes.md.
 */

const CARAMELO_BASE = {
  view: "3/4 frontal, corpo inteiro sentado ou em pé conforme a pose, olhando levemente para a direita (para o balão de fala)",
  size: "512x512",
  background: "transparent" as const,
  consistencyGroup: "caramelo-master",
  mustNotShow: ["texto", "logotipos", "sombras volumétricas", "gradientes intensos", "fundo branco no lugar de transparência"],
};

const pose = (
  id: string,
  label: string,
  emoji: string,
  description: string,
  extra: { mustShow: string[]; frames?: number; fps?: number; loop?: boolean; status?: "placeholder" | "ready" },
  usedIn: string[],
): AssetInput => {
  const { status = "placeholder", ...production } = extra;
  return {
    id: `caramelo-${id}`,
    kind: "character",
    label,
    emoji,
    description: `Caramelo, cachorro caramelo brasileiro (ficha-mãe v0.1). ${description}`,
    production: {
      ...CARAMELO_BASE,
      ...production,
      mustShow: ["pelagem caramelo com focinho e peito creme", "óculos de oficina na testa", ...production.mustShow],
    },
    usedIn,
    file: `bobi-caramelo-${id}.png`,
    status,
  };
};

export const ASSETS: AssetInput[] = [
  pose("idle", "Caramelo parado", "🐶", "Pose neutra, respirando, rabo parado.", { mustShow: ["olhos abertos", "boca fechada sorrindo"], frames: 4, fps: 4, loop: true }, ["trilha", "oficina", "avatar"]),
  pose("talk", "Caramelo falando", "🐶", "Boca abrindo e fechando, uma pata levemente levantada.", { mustShow: ["boca em 2 estados (aberta/fechada)"], frames: 4, fps: 8, loop: true }, ["abertura das lições", "balões de fala"]),
  pose("explain", "Caramelo explicando", "🐶", "Aponta com a pata para o lado direito (onde fica a imagem/pergunta), expressão atenta.", { mustShow: ["pata apontando para a direita"], frames: 4, fps: 6, loop: true }, ["preBlocks de explicação", "abertura"]),
  pose("hint", "Caramelo dando dica", "💡", "Cabeça inclinada, uma pata no queixo, lâmpada pequena desenhada acima da cabeça.", { mustShow: ["cabeça inclinada", "pata no queixo"], frames: 3, fps: 6, loop: true }, ["dica após dois erros"]),
  pose("celebrate", "Caramelo comemorando", "🎉", "Pulando com as quatro patas fora do chão, língua para fora, rabo abanando.", { mustShow: ["patas no ar", "rabo abanando"], frames: 6, fps: 12, loop: false }, ["acerto", "conclusão da lição", "aprovação"]),
  pose("concern", "Caramelo preocupado", "🐶", "Orelhas baixas, sobrancelhas levantadas no meio, expressão de 'quase!' — acolhedora, nunca triste demais.", { mustShow: ["orelhas baixas"], frames: 3, fps: 6, loop: false }, ["erro", "reprovação na avaliação"]),
  pose("alert", "Caramelo em alerta de segurança", "⚠️", "Em pé, postura firme, uma pata levantada em sinal de 'pare', expressão séria mas calma.", { mustShow: ["pata em sinal de pare", "óculos de proteção nos olhos"] }, ["falas de segurança (M2 L15, L06)"]),
  pose("unlocked", "Caramelo mostrando desbloqueio", "🔓", "Segurando com as duas patas um item brilhando à frente do peito (o item é desenhado à parte).", { mustShow: ["patas segurando à frente"], frames: 4, fps: 8, loop: false }, ["desbloqueio de mundo", "item fabricado", "upgrade"]),

  {
    id: "oficina-bancada",
    kind: "scene",
    label: "Bancada da oficina",
    emoji: "🛠️",
    description:
      "Fundo da oficina do Caramelo: bancada de madeira clara, parede creme (#FFF8EE) com quadro de ferramentas, prateleira com 5 nichos vazios (onde aparecem os itens fabricados), espaço central livre para a impressora.",
    production: {
      view: "frontal reta, câmera na altura da bancada",
      size: "1080x720",
      background: "scene",
      mustShow: ["5 nichos de prateleira vazios", "espaço central livre"],
      mustNotShow: ["marcas reais", "pessoas"],
      consistencyGroup: "oficina",
    },
    usedIn: ["/oficina"],
    file: "bobi-oficina-bancada.png",
  },
  ...(["idle", "printing", "finished"] as const).flatMap((state) =>
    (["mini", "ajustada", "auto"] as const).map(
      (tier): AssetInput => ({
        id: `machine-${tier}-${state}`,
        kind: "machine",
        label: `Bobi ${tier === "mini" ? "Mini" : tier === "ajustada" ? "Ajustada" : "Auto"} — ${state === "idle" ? "parada" : state === "printing" ? "imprimindo" : "pronta"}`,
        emoji: "🖨️",
        description: `Impressora FDM fictícia original, tier ${tier}. Mini: estrutura simples aberta, eixo Z com um fuso, botões de nivelamento manuais (4 roldanas sob a mesa). Ajustada: mesma máquina com reforços laterais diagonais roxos (#523568). Auto: igual à Ajustada + pequeno sensor ao lado do bico com LED laranja. Estado ${state}: ${state === "idle" ? "mesa vazia, bico parado no canto" : state === "printing" ? "bico sobre a mesa depositando filete, peça genérica pela metade (o item é sobreposto à parte)" : "peça pronta sobre a mesa, bico recolhido, LED verde"}.`,
        production: {
          view: "3/4 frontal, câmera levemente elevada (~20°), mesma escala e âncora para todos os tiers e estados",
          size: "640x640",
          background: "transparent",
          mustShow: ["carretel de filamento laranja no topo", "mesa de impressão visível"],
          mustNotShow: ["logotipos ou nomes de marcas reais", "fumaça", "fogo"],
          consistencyGroup: "machine-bobi",
          ...(state === "printing" ? { frames: 6, fps: 8, loop: true } : {}),
        },
        usedIn: ["/oficina"],
        file: `bobi-machine-${tier}-${state}.png`,
      }),
    ),
  ),
  ...[
    ["chaveiro", "Chaveiro bobi.", "🔑", "chaveiro retangular de cantos arredondados com 'bobi.' em relevo e furo para argola"],
    ["cubo-calibracao", "Cubo de calibração", "🧊", "cubo 20 mm com letras X, Y e Z em baixo-relevo em três faces e linhas de camada visíveis"],
    ["organizador", "Organizador de bancada", "🗃️", "organizador com 3 compartimentos de alturas diferentes, um com lápis e outro com cabo enrolado"],
    ["suporte-ferramentas", "Suporte para ferramentas", "🧰", "suporte de parede com ganchos segurando espátula e alicate de corte"],
    ["porta-carretel", "Porta-carretel", "🧵", "base com dois apoios e eixo horizontal segurando um carretel de filamento laranja"],
  ].map(
    ([id, label, emoji, desc]): AssetInput => ({
      id: `item-${id}`,
      kind: "item",
      label,
      emoji,
      description: `Item fabricado na oficina, impresso em PLA laranja (#FD7301): ${desc}. Linhas de camada sutis e visíveis.`,
      production: {
        view: "3/4 frontal levemente elevada, item centralizado, mesma escala relativa da família",
        size: "256x256",
        background: "transparent",
        mustShow: ["linhas de camada sutis"],
        mustNotShow: ["marcas reais", "texto além de 'bobi.' no chaveiro"],
        consistencyGroup: "itens-oficina",
      },
      usedIn: ["/oficina (catálogo, inventário e prateleira)"],
      file: `bobi-item-${id}.png`,
    }),
  ),
  {
    id: "minijogo-mesa",
    kind: "diagram",
    label: "Mesa de nivelamento (vista de cima)",
    emoji: "🔲",
    description:
      "Mesa de impressão vista de cima, quadrada, superfície texturizada cinza-clara, 4 roldanas de ajuste nos cantos (desenhadas como círculos com ranhuras) e 4 marcadores circulares de checagem a 1/5 de cada canto.",
    production: {
      view: "ortográfica de cima (top-down), sem perspectiva",
      size: "720x720",
      background: "transparent",
      mustShow: ["4 roldanas de canto", "4 pontos de checagem"],
      mustNotShow: ["bico aquecido tocando mão", "valores numéricos reais"],
      consistencyGroup: "minijogo-nivelamento",
    },
    usedIn: ["/oficina/nivelar"],
    file: "bobi-minijogo-mesa.png",
  },
  ...(["too-close", "ok", "too-far"] as const).map(
    (r): AssetInput => ({
      id: `minijogo-linha-${r}`,
      kind: "diagram",
      label: r === "ok" ? "Primeira camada ideal" : r === "too-close" ? "Bico perto demais" : "Bico longe demais",
      emoji: r === "ok" ? "✅" : "〰️",
      description:
        r === "ok"
          ? "Close lateral (corte) do bico sobre a mesa depositando linha levemente achatada e contínua, bem grudada."
          : r === "too-close"
            ? "Close lateral do bico quase encostado na mesa: linha transparente/falhada, raspada, com material acumulado nas laterais."
            : "Close lateral do bico alto: linha redonda, solta, enrolando e sem contato com a mesa em alguns pontos.",
      production: {
        view: "corte lateral 2D, bico à esquerda movendo para a direita",
        size: "384x192",
        background: "transparent",
        mustShow: ["bico", "linha depositada", "superfície da mesa"],
        mustNotShow: ["mãos", "valores numéricos"],
        consistencyGroup: "minijogo-nivelamento",
      },
      usedIn: ["/oficina/nivelar (resultado por canto)"],
      file: `bobi-minijogo-linha-${r}.png`,
    }),
  ),
  ...[
    ["xp", "XP", "⭐", "estrela dourada em relevo, com estrela creme embutida e duas faíscas"],
    ["fios", "Fios", "🧵", "carretel creme e roxo com filamento laranja em camadas e ponta solta — moeda do jogo"],
    ["streak", "Sequência", "🔥", "chama laranja em relevo, com miolo creme e faíscas de energia"],
    ["trilha", "Trilha", "🗺️", "rota de filamento laranja com três marcos roxos e destino brilhante"],
    ["oficina", "Oficina", "🛠️", "Bobi Mini ilustrada em 3/4, com carretel, carro X, hotend e mesa"],
    ["ranking", "Ranking", "🏆", "troféu laranja com estrela creme, alças e base roxas"],
    ["perfil", "Perfil", "🐶", "retrato do Caramelo com óculos de oficina laranja e lentes azuis"],
    ["cadeado", "Bloqueado", "🔒", "cadeado roxo arredondado, arco creme, chaveiro laranja e patinha em relevo"],
    ["trofeu-avaliacao", "Avaliação de domínio", "🏅", "medalha dourada com estrela creme, fita roxa e linhas de camada no aro"],
  ].map(
    ([id, label, emoji, desc]): AssetInput => ({
      id: `ui-${id}`,
      kind: "icon",
      label,
      emoji,
      description: `Sprite ilustrado de interface: ${desc}. Contorno roxo-escuro, volume leve e acabamento alinhado ao Caramelo e à Bobi Mini.`,
      production: {
        view: "frontal, ícone",
        size: "256x256 PNG RGBA",
        background: "transparent",
        mustNotShow: ["texto", "ícones de terceiros"],
        consistencyGroup: "ui-icons",
      },
      usedIn: ["interface"],
      file: `bobi-ui-${id}.png`,
    }),
  ),
];
