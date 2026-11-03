import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { assetEntry, world } from "./schema";
import type { AssetInput, WorldInput } from "./types";

const WORLDS = ["m1", "m2", "m3"] as const;

async function loadAssets(): Promise<AssetInput[]> {
  const all: AssetInput[] = [];
  for (const name of ["core", ...WORLDS]) {
    const file = path.join(__dirname, "assets", `${name}.ts`);
    if (!existsSync(file)) continue;
    const mod = await import(`./assets/${name}.ts`);
    all.push(...(mod.ASSETS as AssetInput[]));
  }
  return all;
}

function assetRefs(w: WorldInput): string[] {
  const refs: string[] = [];
  const acts = [...w.lessons.flatMap((l) => {
    if (l.intro.visualAssetId) refs.push(l.intro.visualAssetId);
    return l.activities;
  }), ...w.assessment.questions];
  for (const a of acts) {
    if (a.stimulusAssetId) refs.push(a.stimulusAssetId);
    for (const b of a.preBlocks ?? []) if ("assetId" in b) refs.push(b.assetId);
    if (a.type === "multiple_choice" || a.type === "visual_diagnosis")
      for (const o of a.options) if (o.assetId) refs.push(o.assetId);
    if (a.type === "matching") for (const p of a.pairs) if (p.leftAssetId) refs.push(p.leftAssetId);
    if (a.type === "ordering") for (const i of a.items) if (i.assetId) refs.push(i.assetId);
  }
  return refs;
}

describe("catálogo de assets", () => {
  it("todas as entradas são válidas e únicas", async () => {
    const assets = await loadAssets();
    const ids = new Set<string>();
    for (const a of assets) {
      expect(() => assetEntry.parse(a), a.id).not.toThrow();
      expect(ids.has(a.id), `asset duplicado: ${a.id}`).toBe(false);
      ids.add(a.id);
    }
  });
});

describe.each(WORLDS)("mundo %s", (name) => {
  const file = path.join(__dirname, "mundos", name, "index.ts");
  it.skipIf(!existsSync(file))("é válido pelo schema", async () => {
    const mod = await import(`./mundos/${name}/index.ts`);
    const input = mod.default as WorldInput;
    const parsed = world.safeParse(input);
    if (!parsed.success) throw new Error(JSON.stringify(parsed.error.issues, null, 2));
    const nums = parsed.data.lessons.map((l) => l.number);
    expect(nums).toEqual([...nums].sort((a, b) => a - b));
  });
  it.skipIf(!existsSync(file))("só referencia assets catalogados", async () => {
    const mod = await import(`./mundos/${name}/index.ts`);
    const ids = new Set((await loadAssets()).map((a) => a.id));
    const missing = assetRefs(mod.default).filter((r) => !ids.has(r));
    expect(missing).toEqual([]);
  });
});
