import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getPlayerSnapshot } from "./server";
import {
  ITEMS,
  UPGRADES,
  WORKSHOP_UNLOCK,
  levelingScenario,
  machineName,
  meets,
  printMinutes,
  type Corner,
} from "./workshop-catalog";

export type WorkshopState = {
  unlocked: boolean;
  fios: number;
  machineName: string;
  upgrades: string[];
  leveled: boolean;
  scenario: Record<Corner, number>;
  activePrint: { id: number; itemId: string; startedAt: string; readyAt: string } | null;
  inventory: Record<string, number>;
  items: { id: string; unlocked: boolean; minutes: number }[];
  upgradesAvailable: { id: string; unlocked: boolean; owned: boolean }[];
  serverNow: string;
};

/** Escala de tempo só para testes locais: BOBI_FAST_PRINTS=1 transforma minutos em segundos. */
export function printDurationMs(minutes: number): number {
  return process.env.BOBI_FAST_PRINTS === "1" ? minutes * 1000 : minutes * 60_000;
}

export async function getWorkshopState(userId: string): Promise<WorkshopState> {
  const db = createAdminClient();
  const snap = await getPlayerSnapshot(userId);
  const [ws, prints, inv] = await Promise.all([
    db.from("player_workshop").select("upgrades, leveled_at, level_attempts").eq("user_id", userId).maybeSingle(),
    db
      .from("virtual_prints")
      .select("id, item_id, started_at, ready_at")
      .eq("user_id", userId)
      .eq("state", "printing")
      .maybeSingle(),
    db.from("inventory_entries").select("item_id, quantity").eq("user_id", userId),
  ]);
  const upgrades = (ws.data?.upgrades as string[] | undefined) ?? [];
  const { completedLessons: L, passedAssessments: A } = snap;

  return {
    unlocked: meets(WORKSHOP_UNLOCK, L, A),
    fios: snap.fios,
    machineName: machineName(upgrades),
    upgrades,
    leveled: Boolean(ws.data?.leveled_at),
    scenario: levelingScenario(ws.data?.level_attempts ?? 0),
    activePrint: prints.data
      ? { id: prints.data.id, itemId: prints.data.item_id, startedAt: prints.data.started_at, readyAt: prints.data.ready_at }
      : null,
    inventory: Object.fromEntries((inv.data ?? []).map((r) => [r.item_id, r.quantity])),
    items: ITEMS.map((i) => ({ id: i.id, unlocked: meets(i.requires, L, A), minutes: printMinutes(i, upgrades) })),
    upgradesAvailable: UPGRADES.map((u) => ({ id: u.id, unlocked: meets(u.requires, L, A), owned: upgrades.includes(u.id) })),
    serverNow: new Date().toISOString(),
  };
}
