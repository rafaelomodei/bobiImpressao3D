import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Caramelo, CarameloSays } from "@/components/game/caramelo";
import { StatsBar } from "@/components/game/stats-bar";
import { WorkshopView } from "@/components/game/workshop-view";
import { requireProfile } from "@/lib/dal";
import { getPlayerSnapshot } from "@/lib/game/server";
import { getWorkshopState } from "@/lib/game/workshop";
import { PageLoading } from "@/components/page-loading";

export const metadata: Metadata = { title: "Oficina" };

export default function OficinaPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <Suspense fallback={<PageLoading label="Abrindo a oficina…" />}>
        <Oficina />
      </Suspense>
    </main>
  );
}

async function Oficina() {
  const profile = await requireProfile();
  const [snap, state] = await Promise.all([getPlayerSnapshot(profile.user_id), getWorkshopState(profile.user_id)]);

  return (
    <>
      <StatsBar snapshot={snap} />
      <div className="flex flex-col gap-6 px-4 py-6">
        <h1 className="text-2xl font-black">Oficina do Caramelo</h1>
        {state.unlocked ? (
          <WorkshopView state={state} />
        ) : (
          <div className="card flex flex-col items-center gap-4 py-8 text-center">
            <Caramelo pose="explain" size={110} />
            <p className="text-lg font-black">A oficina abre quando você concluir a primeira lição.</p>
            <p className="text-structure-soft-text">
              Aqui você vai nivelar a mesa, imprimir itens virtuais e melhorar sua impressora.
            </p>
            <Link href="/licao/l01" className="btn-primary">
              Começar a L01
            </Link>
          </div>
        )}
        <CarameloSays
          pose="alert"
          size={56}
          text="Tudo aqui é simulação didática: tempos, nivelamento e peças não equivalem a uma impressora real."
        />
      </div>
    </>
  );
}
