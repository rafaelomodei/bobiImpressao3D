import Image from "next/image";
import type { PlayerSnapshot } from "@/lib/game/server";

/** Barra superior: sequência, meta do dia, XP e Fios. */
export function StatsBar({ snapshot }: { snapshot: Pick<PlayerSnapshot, "streak" | "goalMetToday" | "xp" | "fios"> }) {
  return (
    <div className="sticky top-0 z-20 border-b-2 border-structure-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2.5">
        <span
          className={`stat-pill ${snapshot.goalMetToday ? "text-brand-primary-pressed" : "text-structure-soft"}`}
          title={snapshot.goalMetToday ? "Meta de hoje cumprida" : "Faça uma lição hoje para manter a sequência"}
        >
          <Image src="/sprites/bobi-ui-streak.svg" alt="" aria-hidden width={20} height={20} className={`size-5 ${snapshot.goalMetToday ? "" : "grayscale"}`} />
          {snapshot.streak}
          <span className="sr-only"> dias de sequência{snapshot.goalMetToday ? ", meta de hoje cumprida" : ""}</span>
        </span>
        <span className="stat-pill text-brand-caramel-pressed">
          <Image src="/sprites/bobi-ui-xp.svg" alt="" aria-hidden width={20} height={20} className="size-5" />
          {snapshot.xp}
          <span className="sr-only"> XP</span>
        </span>
        <span className="stat-pill text-structure-purple">
          <Image src="/sprites/bobi-ui-fios.svg" alt="" aria-hidden width={20} height={20} className="size-5" />
          {snapshot.fios}
          <span className="sr-only"> Fios</span>
        </span>
      </div>
    </div>
  );
}
