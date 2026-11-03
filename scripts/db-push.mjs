// Aplica as migrações de supabase/migrations no projeto remoto pelo pooler IPv4.
// Uso: pnpm db:push [--dry-run]
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const { SUPABASE_PROJECT_REF: ref, SUPABASE_DB_PASSWORD: pw, SUPABASE_DB_POOLER_HOST: host } = process.env;
if (!ref || !pw || !host) {
  console.error("Defina SUPABASE_PROJECT_REF, SUPABASE_DB_PASSWORD e SUPABASE_DB_POOLER_HOST no .env.local.");
  process.exit(1);
}

const url = `postgresql://postgres.${ref}:${encodeURIComponent(pw)}@${host}:5432/postgres`;
const extra = process.argv.slice(2);
const result = spawnSync("supabase", ["db", "push", "--db-url", url, ...extra], {
  stdio: "inherit",
  shell: false,
});
process.exit(result.status ?? 1);
