import "server-only";
import { z } from "zod";
import type { Db } from "./server";

/** Eventos de sessão usados pelo painel administrativo (DD026). */
export type SessionEvent = "activity_open" | "activity_exit" | "app_left";

export const contextIdSchema = z.string().regex(/^BOBI-M0\d-(L\d{2}|AV\d{2})$/);
export const activityIdSchema = z.string().regex(/^(A|Q)\d{2}$/);
/** Tempo de resposta medido no aparelho; acima de 1 h é descartado (aba esquecida). */
export const durationSchema = z.number().int().min(0).max(3_600_000);

export const exitInfoSchema = z.object({
  contextId: contextIdSchema,
  activityId: activityIdSchema.nullable().optional(),
  afterError: z.boolean().optional(),
});
export type ExitInfo = z.infer<typeof exitInfoSchema>;

export function cleanDuration(ms: unknown): number | null {
  const r = durationSchema.safeParse(typeof ms === "number" ? Math.round(ms) : ms);
  return r.success ? r.data : null;
}

/**
 * Registra um evento de sessão. Telemetria nunca quebra o jogo:
 * falhas são ignoradas (a lição continua mesmo se o registro não for gravado).
 */
export async function logSessionEvent(
  db: Db,
  userId: string,
  event: SessionEvent,
  info: { contextId: string; activityId?: string | null; afterError?: boolean },
): Promise<void> {
  try {
    await db.from("session_events").insert({
      user_id: userId,
      event,
      context_id: info.contextId,
      activity_id: info.activityId ?? null,
      after_error: Boolean(info.afterError),
    });
  } catch {
    // sem conexão com o banco: o evento se perde, o jogo segue (DD007).
  }
}
