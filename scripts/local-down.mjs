// Para o Supabase local e remove .env.development.local (o `pnpm dev` volta ao .env.local).
// Os dados locais ficam no volume do Docker; use `pnpm local:reset` para zerar.
// Uso: pnpm local:down
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

try {
  execFileSync("pnpm", ["exec", "supabase", "stop"], { stdio: "inherit" });
} catch {
  console.warn("Supabase local já estava parado.");
}
rmSync(".env.development.local", { force: true });
console.log("✔ Modo local desligado. O `pnpm dev` volta a usar o .env.local.");
