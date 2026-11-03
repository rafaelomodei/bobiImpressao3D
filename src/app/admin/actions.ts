"use server";

import { redirect } from "next/navigation";
import { DEMO_ADMIN, demoAdminEnabled, ensureDemoAdmin, isAdminUser } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Entrada do painel administrativo com e-mail e senha (DD026). O login Google
 * continua sendo o único acesso de jogadores (DD011); esta conta não joga.
 */
export async function signInAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/admin/entrar?erro=credenciais");

  const supabase = await createClient();
  let { data, error } = await supabase.auth.signInWithPassword({ email, password });

  // Primeira entrada com a conta de demonstração: cria a conta e tenta de novo.
  const isDemo = email === DEMO_ADMIN.email && password === DEMO_ADMIN.password;
  if (error && isDemo && demoAdminEnabled()) {
    try {
      await ensureDemoAdmin();
    } catch {
      redirect("/admin/entrar?erro=indisponivel");
    }
    ({ data, error } = await supabase.auth.signInWithPassword({ email, password }));
  }
  if (error || !data.user) redirect("/admin/entrar?erro=credenciais");

  if (!(await isAdminUser(data.user.id))) {
    if (isDemo && demoAdminEnabled()) await ensureDemoAdmin();
    else {
      await supabase.auth.signOut();
      redirect("/admin/entrar?erro=sem-acesso");
    }
  }
  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/entrar");
}
