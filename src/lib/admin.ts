import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Conta administrativa de demonstração (DD026). O projeto está em estudo: a credencial
 * fica visível na tela de entrada do painel para quem for avaliar a aplicação.
 * A conta é criada na primeira entrada. Para esconder e desativar a criação
 * automática (ex.: antes de abrir ao público), defina BOBI_ADMIN_DEMO=0.
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
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/admin/entrar");
  if (!(await isAdminUser(userId))) redirect("/admin/entrar?erro=sem-acesso");
  return userId;
});

/** Cria (se preciso) a conta de demonstração e garante o papel de administrador. */
export async function ensureDemoAdmin(): Promise<void> {
  const admin = createAdminClient();
  const created = await admin.auth.admin.createUser({
    email: DEMO_ADMIN.email,
    password: DEMO_ADMIN.password,
    email_confirm: true,
  });
  let userId = created.data.user?.id;
  if (!userId) {
    // Já existe: localiza e repõe a senha de demonstração.
    for (let page = 1; !userId && page <= 20; page++) {
      const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
      userId = data.users.find((u) => u.email === DEMO_ADMIN.email)?.id;
      if (data.users.length < 200) break;
    }
    if (!userId) throw new Error("Conta de demonstração não encontrada.");
    await admin.auth.admin.updateUserById(userId, { password: DEMO_ADMIN.password });
  }
  const { error } = await admin.from("admin_users").upsert({ user_id: userId }, { onConflict: "user_id" });
  if (error) throw new Error(`Falha ao registrar administrador: ${error.message}`);
}
