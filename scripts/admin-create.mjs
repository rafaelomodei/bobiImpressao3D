// Cria (ou atualiza) a conta administrativa do painel /admin e dá a ela o papel de
// administrador (tabela admin_users). A tela /admin/entrar só faz login: a conta
// precisa existir antes. Rodar uma vez por ambiente (DD026).
// Uso: pnpm admin:create            → projeto remoto (.env.local)
//      pnpm admin:create --local    → Supabase local (.env.development.local)
//      pnpm admin:create email@x senha   → outra conta administrativa
import { createClient } from "@supabase/supabase-js";
import { existsSync } from "node:fs";

// Mesma credencial exibida em /admin/entrar (src/lib/admin.ts).
const DEMO = { email: "admin@bobi.local", password: "bobi-admin-2026" };

const local = process.argv.includes("--local");
const envFile = local ? ".env.development.local" : ".env.local";
if (!existsSync(envFile)) {
  console.error(`✖ ${envFile} não encontrado.${local ? " Rode `pnpm local:up` antes." : ""}`);
  process.exit(1);
}
process.loadEnvFile(envFile);

const [email = DEMO.email, password = DEMO.password] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (password.length < 8) {
  console.error("✖ A senha precisa ter pelo menos 8 caracteres.");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

const created = await db.auth.admin.createUser({ email, password, email_confirm: true });
let userId = created.data.user?.id;
if (!userId) {
  // Já existe: localiza e repõe a senha informada.
  for (let page = 1; !userId; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    userId = data.users.find((u) => u.email === email)?.id;
    if (data.users.length < 200) break;
  }
  if (!userId) throw created.error ?? new Error("Conta não encontrada.");
  const { error } = await db.auth.admin.updateUserById(userId, { password });
  if (error) throw error;
}
const { error } = await db.from("admin_users").upsert({ user_id: userId }, { onConflict: "user_id" });
if (error) throw new Error(`admin_users: ${error.message} (a migração do painel foi aplicada?)`);

console.log(`✔ Conta administrativa pronta em ${new URL(url).host}: ${email}`);
