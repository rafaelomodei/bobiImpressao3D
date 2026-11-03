// Modo 100% local: sobe o Supabase em Docker (banco + auth + API), aplica as
// migrações e grava .env.development.local apontando o `pnpm dev` para ele.
// O .env.local (projeto remoto) não é tocado; `pnpm local:down` volta ao remoto.
// Uso: pnpm local:up
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const cli = (args, opts = {}) => execFileSync("pnpm", ["exec", "supabase", ...args], { encoding: "utf8", ...opts });

try {
  execFileSync("docker", ["info"], { stdio: "ignore" });
} catch {
  console.error("✖ Docker não está rodando. Inicie o Docker Desktop (ou o serviço docker) e tente de novo.");
  process.exit(1);
}

console.log("Subindo o Supabase local (a primeira vez baixa as imagens e demora alguns minutos)…");
cli(["start"], { stdio: "inherit" });

const status = JSON.parse(cli(["status", "-o", "json"]));
const pick = (...keys) => keys.map((k) => status[k]).find(Boolean);
const url = pick("API_URL");
const publishable = pick("PUBLISHABLE_KEY");
const secret = pick("SECRET_KEY");
if (!url || !publishable?.startsWith("sb_publishable_") || !secret?.startsWith("sb_secret_")) {
  console.error("✖ Não encontrei as chaves sb_publishable_/sb_secret_ no `supabase status`. Saída:", status);
  process.exit(1);
}

writeFileSync(
  ".env.development.local",
  `# Gerado por pnpm local:up — Supabase local em Docker. Apague com pnpm local:down.
# Tem prioridade sobre o .env.local no \`pnpm dev\`.
NEXT_PUBLIC_SUPABASE_URL=${url}
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=${publishable}
SUPABASE_SECRET_KEY=${secret}
# Botão "Entrar sem Google (modo local)" na tela inicial (só funciona com Supabase em localhost).
BOBI_DEV_LOGIN=1
# Fabricações da oficina em segundos, para testar rápido. Remova para tempos reais.
BOBI_FAST_PRINTS=1
`,
);

// Conta do painel /admin (a tela de entrada não cria contas, DD026).
execFileSync("node", ["scripts/admin-create.mjs", "--local"], { stdio: "inherit" });

console.log(`
✔ Supabase local no ar: ${url}
  Studio (ver tabelas): ${status.STUDIO_URL ?? "http://127.0.0.1:54323"}
  E-mails de teste:     ${status.INBUCKET_URL ?? status.MAILPIT_URL ?? "http://127.0.0.1:54324"}

Agora rode:  pnpm dev   →  http://localhost:3000  →  "Entrar sem Google (modo local)"
Painel admin: http://localhost:3000/admin/entrar  (admin@bobi.local / bobi-admin-2026)
Para voltar ao Supabase remoto: pnpm local:down
`);
