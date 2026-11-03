// Cria (ou reutiliza) um usuário de teste e grava a sessão em e2e/.auth/state.json
// para o Playwright, sem passar pelo Google. Somente para testes locais.
// Uso: node scripts/dev-session.mjs [email] [--reset]
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ref = new URL(url).hostname.split(".")[0];
const email = process.argv.find((a) => a.includes("@")) ?? "e2e@bobi.test";
const reset = process.argv.includes("--reset");
const base = process.env.E2E_BASE_URL ?? "http://localhost:3100";

const admin = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

if (reset) {
  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const u = data.users.find((x) => x.email === email);
  if (u) await admin.auth.admin.deleteUser(u.id); // cascata apaga perfil e progresso
}

await admin.auth.admin.createUser({ email, email_confirm: true }).catch(() => undefined);
const { data: link, error } = await admin.auth.admin.generateLink({ type: "magiclink", email });
if (error) throw error;
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
const { data: verified, error: vErr } = await anon.auth.verifyOtp({ token_hash: link.properties.hashed_token, type: "magiclink" });
if (vErr) throw vErr;

const value = "base64-" + Buffer.from(JSON.stringify(verified.session)).toString("base64url");
const name = `sb-${ref}-auth-token`;
const CHUNK = 3180;
const parts = value.length <= CHUNK ? [[name, value]] : Array.from({ length: Math.ceil(value.length / CHUNK) }, (_, i) => [`${name}.${i}`, value.slice(i * CHUNK, (i + 1) * CHUNK)]);
const { hostname } = new URL(base);
const cookies = parts.map(([n, v]) => ({ name: n, value: v, domain: hostname, path: "/", expires: -1, httpOnly: false, secure: false, sameSite: "Lax" }));

mkdirSync("e2e/.auth", { recursive: true });
writeFileSync("e2e/.auth/state.json", JSON.stringify({ cookies, origins: [] }, null, 2));
console.log(`Sessão de ${email} (${verified.user.id}) gravada em e2e/.auth/state.json`);
