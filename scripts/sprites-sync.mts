// Lista os arquivos em public/sprites e grava src/content/assets/ready.generated.ts.
// Roda sozinho antes de `dev` e `build`: basta soltar o PNG com o nome do catálogo.
// Uso manual: pnpm sprites:sync
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const files = readdirSync(join(root, "public", "sprites"))
  .filter((f) => /\.(png|svg|webp)$/i.test(f))
  .sort();
const out = join(root, "src", "content", "assets", "ready.generated.ts");
const body = `// Arquivo gerado por \`pnpm sprites:sync\` a partir de public/sprites. Não edite à mão.
export const READY_SPRITES: readonly string[] = ${JSON.stringify(files, null, 2)};
`;
let current = "";
try {
  current = readFileSync(out, "utf8");
} catch {}
if (current !== body) writeFileSync(out, body);
console.log(`sprites prontos: ${files.length}`);
