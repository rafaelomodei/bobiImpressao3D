/**
 * Login sem Google, só para o modo 100% local (Supabase em Docker).
 * Três travas: variável BOBI_DEV_LOGIN=1, Supabase apontando para localhost
 * e nunca no ambiente da Vercel. Em produção a função sempre devolve false.
 */
export function devLoginEnabled(): boolean {
  if (process.env.BOBI_DEV_LOGIN !== "1" || process.env.VERCEL) return false;
  try {
    const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/** Conta de teste do modo local (criada sob demanda no Supabase local). */
export const DEV_LOGIN_EMAIL = "jogador@bobi.local";
