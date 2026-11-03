"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DEV_LOGIN_EMAIL, devLoginEnabled } from "@/lib/dev-login";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function getOrigin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

/** DD011: único método de acesso é a conta Google. */
export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${await getOrigin()}/auth/callback`,
      queryParams: { prompt: "select_account" },
    },
  });
  if (error || !data.url) redirect("/?erro=login");
  redirect(data.url);
}

/**
 * Modo local (sem Google): cria/usa a conta jogador@bobi.local no Supabase do Docker
 * e abre a sessão por link mágico gerado pelo servidor. Bloqueado fora do modo local.
 */
export async function signInLocal() {
  if (!devLoginEnabled()) redirect("/?erro=login");
  const admin = createAdminClient();
  await admin.auth.admin.createUser({ email: DEV_LOGIN_EMAIL, email_confirm: true });
  const { data: link, error } = await admin.auth.admin.generateLink({ type: "magiclink", email: DEV_LOGIN_EMAIL });
  if (error || !link.properties?.hashed_token) redirect("/?erro=login&motivo=modo-local");
  const supabase = await createClient();
  const { error: otpError } = await supabase.auth.verifyOtp({ type: "magiclink", token_hash: link.properties.hashed_token });
  if (otpError) redirect(`/?erro=login&motivo=${encodeURIComponent(otpError.message)}`);
  redirect("/trilha");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
