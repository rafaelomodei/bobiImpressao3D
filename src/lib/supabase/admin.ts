import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";

/**
 * Cliente com a chave secreta: ignora RLS. Usar somente em código de servidor,
 * depois de obter o usuário pela sessão (requireUserId) e sempre filtrando por user_id.
 */
export function createAdminClient() {
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!key?.startsWith("sb_secret_")) throw new Error("SUPABASE_SECRET_KEY ausente ou inválida.");
  return createSupabaseClient(publicEnv.NEXT_PUBLIC_SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
