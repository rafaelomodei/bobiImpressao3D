import { exitInfoSchema, logSessionEvent } from "@/lib/game/telemetry";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Recebe o aviso de que a pessoa saiu do app no meio de uma atividade (fechou a aba,
 * trocou de app, bloqueou a tela). Enviado por navigator.sendBeacon, que sobrevive
 * ao fechamento da página. Só grava para a sessão autenticada (DD026).
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) return new Response(null, { status: 401 });

  let body: unknown;
  try {
    body = JSON.parse(await request.text());
  } catch {
    return new Response(null, { status: 400 });
  }
  const info = exitInfoSchema.safeParse(body);
  if (!info.success) return new Response(null, { status: 400 });

  await logSessionEvent(createAdminClient(), userId, "app_left", info.data);
  return new Response(null, { status: 204 });
}
