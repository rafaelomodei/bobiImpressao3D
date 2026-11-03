import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LevelingGame } from "@/components/game/leveling-game";
import { LoadingScreen } from "@/components/game/player-parts";
import { requireProfile } from "@/lib/dal";
import { getWorkshopState } from "@/lib/game/workshop";

export const metadata: Metadata = { title: "Nivelar a mesa" };

export default function NivelarPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Nivelar />
    </Suspense>
  );
}

async function Nivelar() {
  const profile = await requireProfile();
  const state = await getWorkshopState(profile.user_id);
  if (!state.unlocked) redirect("/oficina");
  return <LevelingGame scenario={state.scenario} auto={state.upgrades.includes("nivelamento-auto")} />;
}
