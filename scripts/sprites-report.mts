// Gera docs/design/sprites-pendentes.md a partir do catálogo de assets.
// Uso: pnpm sprites:report
import { writeFileSync } from "node:fs";
import { ASSETS as core } from "../src/content/assets/core.ts";
import { ASSETS as m1 } from "../src/content/assets/m1.ts";
import { ASSETS as m2 } from "../src/content/assets/m2.ts";
import { ASSETS as m3 } from "../src/content/assets/m3.ts";

type A = (typeof core)[number];
const groups: [string, A[]][] = [
  ["Núcleo: Caramelo, oficina, itens, minijogo e ícones", core],
  ["Mundo 1 — Descoberta", m1],
  ["Mundo 2 — Oficina", m2],
  ["Mundo 3 — Primeira impressão", m3],
];
const all = groups.flatMap(([, a]) => a);
const pending = all.filter((a) => (a.status ?? "placeholder") !== "ready");
const esc = (s: string) => s.replace(/\|/g, "\\|");

let md = `# Sprites e ilustrações pendentes — bobi.

> **Arquivo gerado** por \`pnpm sprites:report\` a partir de \`src/content/assets/*.ts\`. Não edite à mão: altere o catálogo e gere de novo.

**Total catalogado:** ${all.length} · **Pendentes:** ${pending.length} · **Prontos:** ${all.length - pending.length}

## Como entregar um asset

1. Produzir seguindo a [ficha-mãe do Caramelo](referencias/caramelo/README.md), a [direção de arte](direcao-de-arte.md) e a [skill de sprites](../../.agents/skills/bobi-sprite-studio/SKILL.md): cartoon flat 2D, contorno \`#241241\` consistente, cores chapadas da paleta v0.2, sem marcas reais, sem texto embutido (exceto quando o item pede).
2. Respeitar **vista/câmera**, **tamanho**, **fundo**, **deve mostrar** e **não pode mostrar** de cada linha. Imagens com o mesmo **grupo de consistência** precisam compartilhar objeto, câmera, escala e âncora — produza o grupo inteiro de uma vez.
3. Exportar como \`public/sprites/<arquivo>\` (PNG RGBA com transparência real quando o fundo é \`transparent\`; ícones também em SVG).
4. Animações: um arquivo por quadro (\`…-01.png\`, \`…-02.png\`) ou spritesheet horizontal com o mesmo nome, com os quadros/fps indicados; sempre um quadro estático equivalente para \`prefers-reduced-motion\`.
5. No catálogo, mudar \`status\` do asset para \`"ready"\`. A interface troca o cartão provisório (emoji + rótulo) pela arte automaticamente.
6. QA: proporção, espessura de traço, transparência, recorte, alinhamento entre quadros e legibilidade em 96 px de altura (cartões do celular).

## Resumo por família

| Família | Pendentes |
|---|---:|
${groups.map(([t, a]) => `| ${t} | ${a.filter((x) => (x.status ?? "placeholder") !== "ready").length} |`).join("\n")}
`;

for (const [title, assets] of groups) {
  md += `\n## ${title}\n`;
  const byGroup = new Map<string, A[]>();
  for (const a of assets) {
    const g = a.production.consistencyGroup ?? "(avulsos)";
    byGroup.set(g, [...(byGroup.get(g) ?? []), a]);
  }
  for (const [g, list] of byGroup) {
    md += `\n### Grupo \`${g}\`\n\n| Arquivo | O que desenhar | Vista / tamanho / fundo | Deve mostrar | Não pode mostrar | Uso |\n|---|---|---|---|---|---|\n`;
    for (const a of list) {
      const p = a.production;
      const anim = p.frames ? `<br>**Animação:** ${p.frames} quadros, ${p.fps ?? "?"} fps, ${p.loop ? "em loop" : "sem loop"}` : "";
      md += `| \`${a.file}\`<br>${a.emoji} ${esc(a.label)}${(a.status ?? "placeholder") === "ready" ? " ✅" : ""} | ${esc(a.description)} | ${esc(p.view)}<br>${p.size ?? "512x512"} · ${p.background ?? "transparent"}${anim} | ${esc((p.mustShow ?? []).join("; ")) || "—"} | ${esc((p.mustNotShow ?? []).join("; ")) || "—"} | ${esc(a.usedIn.join("; "))} |\n`;
    }
  }
}
writeFileSync("docs/design/sprites-pendentes.md", md);
console.log(`docs/design/sprites-pendentes.md: ${pending.length} pendentes de ${all.length}`);
