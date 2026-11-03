import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { WORLDS } from "@/content";
import { StatsBar } from "@/components/game/stats-bar";
import { requireProfile } from "@/lib/dal";
import { getPlayerSnapshot, type PlayerSnapshot } from "@/lib/game/server";
import { PageLoading } from "@/components/page-loading";
import { UiIcon } from "@/components/ui-icon";

export const metadata: Metadata = { title: "Trilha" };

export default function TrilhaPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col">
      <Suspense fallback={<PageLoading label="Carregando sua trilha…" />}>
        <Trilha />
      </Suspense>
    </main>
  );
}

/** Deslocamento horizontal em zigue-zague dos nós (px). */
const OFFSETS = [0, 44, 72, 44, 0, -44, -72, -44];

async function Trilha() {
  const profile = await requireProfile();
  const snap = await getPlayerSnapshot(profile.user_id);
  const current = snap.path.find((p) => p.state === "available");

  return (
    <>
      <StatsBar snapshot={snap} />
      <div className="flex flex-col gap-10 px-4 pt-4 pb-10">
        {WORLDS.map((w) => {
          const nodes = snap.path.filter((p) => p.node.world === w.number);
          const unlocked = nodes.some((n) => n.state !== "locked");
          const done = nodes.filter((n) => n.state === "completed").length;
          return (
            <section key={w.id} aria-labelledby={`mundo-${w.id}`} className="flex flex-col gap-6">
              <header
                className={`sticky top-[60px] z-10 flex items-center justify-between gap-3 rounded-2xl px-5 py-4 text-white shadow-[0_4px_0_var(--color-structure-purple-pressed)] ${
                  unlocked ? "bg-structure-purple" : "bg-structure-soft"
                }`}
              >
                <div>
                  <p className="text-xs font-black tracking-widest uppercase opacity-80">Mundo {w.number}</p>
                  <h2 id={`mundo-${w.id}`} className="text-xl font-black">
                    {w.title}
                  </h2>
                  <p className="text-sm font-bold opacity-90">{w.subtitle}</p>
                </div>
                <p className="shrink-0 rounded-xl bg-white/15 px-3 py-1 text-sm font-black">
                  {done}/{nodes.length}
                </p>
              </header>
              <ol className="flex flex-col items-center gap-5">
                {nodes.map((p, i) => (
                  <PathItem key={p.node.id} item={p} offset={OFFSETS[i % 8]} isCurrent={current?.node.id === p.node.id} />
                ))}
              </ol>
            </section>
          );
        })}
        <p className="text-center text-sm font-bold text-structure-soft-text">
          Mais mundos chegam depois do MVP: fatiamento avançado, materiais e diagnóstico.
        </p>
      </div>
    </>
  );
}

function PathItem({
  item,
  offset,
  isCurrent,
}: {
  item: PlayerSnapshot["path"][number];
  offset: number;
  isCurrent: boolean;
}) {
  const { node, state, inProgress } = item;
  const isAssessment = node.kind === "assessment";
  const href = isAssessment ? `/avaliacao/${node.slug}` : `/licao/${node.slug}`;
  const label = isAssessment ? node.title : `L${String(node.number).padStart(2, "0")} · ${node.title}`;
  const size = isAssessment ? "size-20" : "size-[72px]";
  const color =
    state === "completed"
      ? "bg-brand-caramel text-structure-deep shadow-[0_6px_0_var(--color-brand-caramel-pressed)]"
      : state === "available"
        ? "bg-brand-primary text-structure-deep shadow-[0_6px_0_var(--color-brand-primary-pressed)]"
        : "bg-locked text-structure-soft shadow-[0_6px_0_var(--color-locked-pressed)]";
  const icon =
    state === "locked" ? (
      <UiIcon name="cadeado" size={isAssessment ? 44 : 40} className="opacity-80" />
    ) : isAssessment ? (
      <UiIcon name="trofeu-avaliacao" size={48} />
    ) : state === "completed" ? (
      <UiIcon name="exercicio-concluido" size={isAssessment ? 48 : 52} />
    ) : (
      <UiIcon name="inicio-exercicio" size={isAssessment ? 48 : 52} />
    );
  const status = state === "completed" ? "concluída" : state === "available" ? "disponível" : "bloqueada";

  const circle = (
    <span
      className={`grid ${size} place-items-center ${isAssessment ? "rounded-3xl" : "rounded-full"} text-3xl font-black transition active:translate-y-1.5 active:shadow-none ${color} ${
        isCurrent ? "ring-4 ring-brand-primary/30 ring-offset-4 ring-offset-background" : ""
      }`}
      aria-hidden
    >
      {icon}
    </span>
  );

  return (
    <li className={`relative flex flex-col items-center gap-2 ${isCurrent ? "mt-10" : ""}`} style={{ transform: `translateX(${offset}px)` }}>
      {isCurrent && (
        <span className="animate-float absolute -top-11 rounded-xl border-2 border-structure-line bg-surface px-3 py-1 text-sm font-black whitespace-nowrap text-brand-primary-pressed uppercase">
          {inProgress ? "Continuar" : "Começar"}
        </span>
      )}
      {state === "locked" ? (
        <span className="flex flex-col items-center gap-2" aria-disabled>
          {circle}
          <span className="max-w-44 text-center text-xs font-bold text-structure-soft-text">
            {label}
            <span className="sr-only"> ({status})</span>
          </span>
        </span>
      ) : (
        <Link href={href} className="flex flex-col items-center gap-2 rounded-2xl">
          {circle}
          <span className="max-w-44 text-center text-xs font-extrabold">
            {label}
            <span className="sr-only"> ({status}{state === "completed" ? ", toque para revisar" : ""})</span>
          </span>
        </Link>
      )}
    </li>
  );
}
