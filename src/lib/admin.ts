import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Conta administrativa de demonstração (DD026). O projeto está em estudo: a credencial
 * fica visível na tela de entrada do painel para quem for avaliar a aplicação.
 * A conta já existe no banco: é criada uma vez por `pnpm admin:create` (e pelo
 * `pnpm local:up` no modo local); a tela de entrada não cria contas.
 * Para esconder a credencial (ex.: antes de abrir ao público), defina BOBI_ADMIN_DEMO=0.
 * Mantenha estes valores iguais aos de scripts/admin-create.mjs.
 */
export const DEMO_ADMIN = {
  email: "admin@bobi.local",
  password: "bobi-admin-2026",
} as const;

export function demoAdminEnabled(): boolean {
  return process.env.BOBI_ADMIN_DEMO !== "0";
}

export async function isAdminUser(userId: string): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`Falha ao verificar administrador: ${error.message}`);
  return Boolean(data);
}

/** Painel: exige sessão de uma conta listada em admin_users; senão volta para a entrada do painel. */
export const requireAdmin = cache(async (): Promise<string> => {
  await connection(); // ver requireUserId em dal.ts (Date.now() no prerender)
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/admin/entrar");
  if (!(await isAdminUser(userId))) redirect("/admin/entrar?erro=sem-acesso");
  return userId;
});
