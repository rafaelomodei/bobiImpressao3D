"use server";

import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Entrada do painel administrativo com e-mail e senha (DD026). Só entra numa conta
 * que já existe e está em admin_users (criada por `pnpm admin:create`); esta tela
 * não cria contas. Jogadores continuam entrando só com Google (DD011).
 */
export async function signInAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/admin/entrar?erro=credenciais");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/admin/entrar?erro=credenciais");

  if (!(await isAdminUser(data.user.id))) {
    await supabase.auth.signOut();
    redirect("/admin/entrar?erro=sem-acesso");
  }
  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/entrar");
}
