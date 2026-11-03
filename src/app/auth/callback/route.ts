import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Retorno do Google via Supabase: troca o código pela sessão. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect(`${origin}/?erro=login`);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return NextResponse.redirect(`${origin}/?erro=login`);

  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  return NextResponse.redirect(`${origin}${profile ? "/trilha" : "/onboarding"}`);
}
