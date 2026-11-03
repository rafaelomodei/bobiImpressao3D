"use server";

import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Entrada da conta de teste com e-mail e senha (DD029). Só entra numa conta que já
 * existe (criada por `pnpm tester:create`); não cria contas nem envia e-mail. O
 * cadastro público por e-mail continua bloqueado no banco, então só contas internas
 * têm senha. A conta do painel administrativo entra por /admin/entrar.
 */
export async function signInTester(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirect("/teste?erro=credenciais");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/teste?erro=credenciais");

  if (await isAdminUser(data.user.id)) {
    await supabase.auth.signOut();
    redirect("/teste?erro=admin");
  }
  redirect("/trilha");
}
