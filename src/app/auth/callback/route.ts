import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Retorno do Google via Supabase: troca o código pela sessão. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  const fail = (reason: string) => {
    // Visível nos logs da Vercel; o motivo curto vai para a tela de boas-vindas.
    console.error(`[auth/callback] login falhou: ${reason}`);
    const url = new URL("/", origin);
    url.searchParams.set("erro", "login");
    url.searchParams.set("motivo", reason.slice(0, 200));
    return NextResponse.redirect(url);
  };

  if (!code) {
    // O Supabase devolve error/error_description quando o provedor falha (ex.: segredo do Google errado).
    const reason = searchParams.get("error_description") ?? searchParams.get("error") ?? "sem código de retorno";
    return fail(reason);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return fail(error?.message ?? "sessão sem usuário");

  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  return NextResponse.redirect(`${origin}${profile ? "/trilha" : "/onboarding"}`);
}
