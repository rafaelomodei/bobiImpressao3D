"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUserId } from "@/lib/dal";
import { getPlayerSnapshot, spendFios } from "@/lib/game/server";
import { getWorkshopState, printDurationMs } from "@/lib/game/workshop";
import {
  CORNERS,
  CORNER_FEEDBACK,
  ITEMS,
  LEVEL_RANGE,
  UPGRADES,
  WORKSHOP_UNLOCK,
  cornerResult,
  levelingScenario,
  meets,
  printMinutes,
  type Corner,
  type CornerResult,
} from "@/lib/game/workshop-catalog";
import { createAdminClient } from "@/lib/supabase/admin";

type ActionResult = { ok: true; message: string } | { ok: false; message: string };

async function ensureWorkshop(userId: string) {
  const db = createAdminClient();
  await db.from("player_workshop").upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });
  return db;
}

const adjustSchema = z.object(
  Object.fromEntries(CORNERS.map((c) => [c, z.number().int().min(-2 * LEVEL_RANGE).max(2 * LEVEL_RANGE)])) as Record<
    Corner,
    z.ZodNumber
  >,
);

export type LevelResult = {
  ok: boolean;
  corners: Record<Corner, { result: CornerResult; feedback: string }>;
};

/**
 * Minijogo de nivelamento (PD007 §3). O cliente envia os ajustes feitos em cada
 * canto; o servidor aplica sobre o cenário autoral e devolve o resultado da
 * primeira camada simulada. Não representa física real.
 */
export async function submitLeveling(adjust: Record<Corner, number>, auto = false): Promise<LevelResult | { error: string }> {
  const userId = await requireUserId();
  const parsed = adjustSchema.safeParse(adjust);
  if (!parsed.success) return { error: "Ajuste inválido." };
  const state = await getWorkshopState(userId);
  if (!state.unlocked) return { error: "A oficina ainda está fechada." };
  if (auto && !state.upgrades.includes("nivelamento-auto")) return { error: "Sem sensor de nivelamento." };

  const db = await ensureWorkshop(userId);
  const { data: ws } = await db.from("player_workshop").select("level_attempts").eq("user_id", userId).single();
  const scenario = levelingScenario(ws?.level_attempts ?? 0);
  const corners = Object.fromEntries(
    CORNERS.map((c) => {
      const result = cornerResult(auto ? 0 : scenario[c] + parsed.data[c]);
      return [c, { result, feedback: CORNER_FEEDBACK[result] }];
    }),
  ) as LevelResult["corners"];
  const ok = CORNERS.every((c) => corners[c].result === "ok");
  if (ok) {
    await db
      .from("player_workshop")
      .update({ leveled_at: new Date().toISOString(), level_attempts: (ws?.level_attempts ?? 0) + 1, updated_at: new Date().toISOString() })
      .eq("user_id", userId);
    revalidatePath("/oficina");
  }
  return { ok, corners };
}

export async function startPrint(itemId: string): Promise<ActionResult> {
  const userId = await requireUserId();
  const item = ITEMS.find((i) => i.id === itemId);
  if (!item) return { ok: false, message: "Projeto não encontrado." };
  const snap = await getPlayerSnapshot(userId);
  if (!meets(WORKSHOP_UNLOCK, snap.completedLessons, snap.passedAssessments)) return { ok: false, message: "A oficina ainda está fechada." };
  if (!meets(item.requires, snap.completedLessons, snap.passedAssessments)) return { ok: false, message: `Bloqueado: ${item.requires.label}.` };

  const state = await getWorkshopState(userId);
  if (!state.leveled) return { ok: false, message: "Nivele a mesa antes da primeira impressão." };
  if (state.activePrint) return { ok: false, message: "Já tem uma fabricação em andamento. Uma por vez!" };

  const db = await ensureWorkshop(userId);
  const spendKey = `print:${item.id}:${randomUUID()}`;
  if (!(await spendFios(db, userId, spendKey, item.costFios, `Fabricação: ${item.name}`)))
    return { ok: false, message: `Faltam Fios: este projeto custa ${item.costFios}.` };

  const now = Date.now();
  const { error } = await db.from("virtual_prints").insert({
    user_id: userId,
    item_id: item.id,
    machine_id: state.machineName,
    started_at: new Date(now).toISOString(),
    ready_at: new Date(now + printDurationMs(printMinutes(item, state.upgrades))).toISOString(),
  });
  if (error) {
    // Outra fabricação começou ao mesmo tempo: devolve os Fios.
    if (item.costFios > 0)
      await db.from("wallet_ledger").insert({ user_id: userId, event_key: `refund:${spendKey}`, fios: item.costFios, reason: "Estorno de fabricação" });
    return { ok: false, message: "Já tem uma fabricação em andamento. Uma por vez!" };
  }
  revalidatePath("/oficina");
  return { ok: true, message: `${item.name} entrou na impressora!` };
}

/** Coleta só quando o relógio do servidor confirma o fim (PD005, RF045). */
export async function collectPrint(): Promise<ActionResult> {
  const userId = await requireUserId();
  const db = createAdminClient();
  const { data: print } = await db
    .from("virtual_prints")
    .select("id, item_id, ready_at")
    .eq("user_id", userId)
    .eq("state", "printing")
    .maybeSingle();
  if (!print) return { ok: false, message: "Nenhuma fabricação em andamento." };
  if (new Date(print.ready_at).getTime() > Date.now()) return { ok: false, message: "Ainda imprimindo. Falta pouco!" };

  const { data: done } = await db
    .from("virtual_prints")
    .update({ state: "collected", collected_at: new Date().toISOString() })
    .eq("id", print.id)
    .eq("state", "printing")
    .select("id");
  if (!done?.length) return { ok: false, message: "Essa peça já foi coletada." };

  const { data: inv } = await db.from("inventory_entries").select("quantity").eq("user_id", userId).eq("item_id", print.item_id).maybeSingle();
  await db
    .from("inventory_entries")
    .upsert({ user_id: userId, item_id: print.item_id, quantity: (inv?.quantity ?? 0) + 1, updated_at: new Date().toISOString() });
  revalidatePath("/oficina");
  const item = ITEMS.find((i) => i.id === print.item_id);
  return { ok: true, message: `${item?.name ?? "Peça"} guardada na prateleira!` };
}

export async function buyUpgrade(upgradeId: string): Promise<ActionResult> {
  const userId = await requireUserId();
  const upgrade = UPGRADES.find((u) => u.id === upgradeId);
  if (!upgrade) return { ok: false, message: "Melhoria não encontrada." };
  const state = await getWorkshopState(userId);
  const avail = state.upgradesAvailable.find((u) => u.id === upgradeId);
  if (!avail?.unlocked) return { ok: false, message: `Bloqueado: ${upgrade.requires.label}.` };
  if (avail.owned) return { ok: false, message: "Você já tem essa melhoria." };

  const db = await ensureWorkshop(userId);
  // Chave fixa por melhoria: impossível comprar duas vezes (RNF013).
  const { data: dup } = await db
    .from("wallet_ledger")
    .select("id")
    .eq("user_id", userId)
    .eq("event_key", `upgrade:${upgrade.id}`)
    .maybeSingle();
  if (dup) return { ok: false, message: "Não foi possível comprar agora." };
  if (!(await spendFios(db, userId, `upgrade:${upgrade.id}`, upgrade.costFios, `Melhoria: ${upgrade.name}`)))
    return { ok: false, message: `Faltam Fios: custa ${upgrade.costFios}.` };
  await db
    .from("player_workshop")
    .update({ upgrades: [...state.upgrades, upgrade.id], updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  revalidatePath("/oficina");
  return { ok: true, message: `Sua impressora virou ${upgrade.machineName}!` };
}
