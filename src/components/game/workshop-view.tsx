"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { buyUpgrade, collectPrint, startPrint } from "@/app/(app)/oficina/actions";
import type { WorkshopState } from "@/lib/game/workshop";
import Image from "next/image";
import { ITEMS, UPGRADES, itemSprite, machineSprite, machineTier } from "@/lib/game/workshop-catalog";
import { playSound, usePreloadSounds, type SoundName } from "@/lib/sound";
import { UiIcon } from "@/components/ui-icon";

export function WorkshopView({ state }: { state: WorkshopState }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ ok: boolean; message: string } | null>(null);
  usePreloadSounds(["print-start", "print-done", "collect", "purchase", "unlock", "wrong"]);

  const run = (fn: () => Promise<{ ok: boolean; message: string }>, success: SoundName[]) =>
    startTransition(async () => {
      try {
        const r = await fn();
        if (r.ok) success.forEach((s, i) => playSound(s, i * 350));
        else playSound("wrong");
        setToast(r);
        if (r.ok) router.refresh();
      } catch {
        setToast({ ok: false, message: "Sem conexão. Tente de novo em instantes." });
      }
    });

  return (
    <div className="flex flex-col gap-6">
      {toast && (
        <p
          role={toast.ok ? "status" : "alert"}
          className={`animate-pop rounded-2xl p-3 font-bold ${toast.ok ? "bg-feedback-success-soft text-feedback-success-pressed" : "bg-feedback-error-soft text-feedback-error-pressed"}`}
        >
          {toast.ok ? "✔" : "⚠"} {toast.message}
        </p>
      )}

      <MachineCard state={state} pending={pending} onCollect={() => run(collectPrint, ["collect"])} />

      <section aria-labelledby="projetos" className="flex flex-col gap-3">
        <h2 id="projetos" className="text-lg font-black">Projetos para fabricar</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ITEMS.map((item) => {
            const info = state.items.find((i) => i.id === item.id)!;
            const blocked = !info.unlocked;
            const cantAfford = state.fios < item.costFios;
            const busy = Boolean(state.activePrint) || !state.leveled;
            const sprite = itemSprite(item);
            return (
              <li key={item.id} className={`card flex flex-col gap-3 p-4 ${blocked ? "opacity-70" : ""}`}>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-14 place-items-center rounded-2xl bg-brand-cream-soft text-3xl">
                    {blocked ? <UiIcon name="cadeado" size={36} /> : sprite ? <Image src={sprite} alt="" width={56} height={56} className="size-14 object-contain" /> : item.emoji}
                  </span>
                  <div>
                    <p className="font-black">{item.name}</p>
                    <p className="text-sm text-structure-soft-text">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-black">
                  <span className="badge">⏱ {info.minutes} min</span>
                  <span className="badge"><UiIcon name="fios" size={14} className="mr-1 align-[-2px]" />
                    {item.costFios === 0 ? "grátis" : `${item.costFios} Fios`}</span>
                  {(state.inventory[item.id] ?? 0) > 0 && <span className="badge">📦 {state.inventory[item.id]} na prateleira</span>}
                </div>
                {blocked ? (
                  <p className="flex items-center gap-1.5 text-sm font-bold text-structure-soft-text">
                    <UiIcon name="cadeado" size={18} /> {item.requires.label}
                  </p>
                ) : (
                  <button
                    type="button"
                    className="btn-primary min-h-11 text-sm"
                    disabled={pending || busy || cantAfford}
                    onClick={() => run(() => startPrint(item.id), ["print-start"])}
                  >
                    {!state.leveled ? "Nivele a mesa primeiro" : state.activePrint ? "Impressora ocupada" : cantAfford ? "Faltam Fios" : "Fabricar"}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="melhorias" className="flex flex-col gap-3">
        <h2 id="melhorias" className="text-lg font-black">Melhorias da impressora</h2>
        <ul className="flex flex-col gap-3">
          {UPGRADES.map((u) => {
            const info = state.upgradesAvailable.find((x) => x.id === u.id)!;
            return (
              <li key={u.id} className={`card flex items-center gap-3 p-4 ${info.owned ? "border-feedback-success/40" : ""}`}>
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-2xl bg-structure-purple/10 text-2xl">
                  {info.unlocked ? u.emoji : <UiIcon name="cadeado" size={30} />}
                </span>
                <div className="flex-1">
                  <p className="font-black">
                    {u.name} <span className="text-sm font-bold text-structure-soft-text">→ {u.machineName}</span>
                  </p>
                  <p className="text-sm text-structure-soft-text">{u.description}</p>
                  {!info.unlocked && (
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                      <UiIcon name="cadeado" size={18} /> {u.requires.label}
                    </p>
                  )}
                </div>
                {info.owned ? (
                  <span className="badge">✔ Instalada</span>
                ) : (
                  <button
                    type="button"
                    className="btn-purple w-auto min-h-11 shrink-0 px-4 text-sm"
                    disabled={pending || !info.unlocked || state.fios < u.costFios}
                    onClick={() => run(() => buyUpgrade(u.id), ["purchase", "unlock"])}
                  >
                    <UiIcon name="fios" size={18} className="mr-1 align-[-3px]" />
                    {u.costFios}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="prateleira" className="flex flex-col gap-3">
        <h2 id="prateleira" className="text-lg font-black">Prateleira</h2>
        <ul className="grid grid-cols-5 gap-2 rounded-2xl border-b-8 border-brand-caramel-pressed bg-brand-cream-soft p-3">
          {ITEMS.map((item) => {
            const n = state.inventory[item.id] ?? 0;
            const sprite = itemSprite(item);
            return (
              <li key={item.id} className="flex flex-col items-center gap-1" title={item.name}>
                <span aria-hidden className={`grid size-10 place-items-center ${n ? "" : "opacity-20 grayscale"}`}>
                  {sprite ? <Image src={sprite} alt="" width={40} height={40} className="size-10 object-contain" /> : <span className="text-3xl">{item.emoji}</span>}
                </span>
                <span className="text-xs font-black">{n ? `×${n}` : "—"}</span>
                <span className="sr-only">{item.name}: {n}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function MachineCard({ state, pending, onCollect }: { state: WorkshopState; pending: boolean; onCollect: () => void }) {
  const print = state.activePrint;
  const item = print ? ITEMS.find((i) => i.id === print.itemId) : null;
  const remaining = useRemaining(print?.readyAt ?? null, state.serverNow);
  const total = print ? new Date(print.readyAt).getTime() - new Date(print.startedAt).getTime() : 1;
  const ready = print && remaining <= 0;
  const progress = print ? Math.min(1, 1 - remaining / total) : 0;
  const sprite = machineSprite(machineTier(state.upgrades), print ? (ready ? "finished" : "printing") : "idle");
  const printedItemSprite = item ? itemSprite(item) : null;

  // Bipes de "pronto" quando a fabricação termina com a oficina aberta.
  const wasPrinting = useRef(false);
  useEffect(() => {
    if (ready && wasPrinting.current) playSound("print-done");
    wasPrinting.current = Boolean(print) && !ready;
  }, [ready, print]);

  return (
    <section aria-labelledby="maquina" className="overflow-hidden rounded-3xl border-2 border-structure-line bg-surface">
      <div className="flex items-center justify-between bg-structure-purple px-5 py-3 text-white">
        <h2 id="maquina" className="text-lg font-black">🖨️ {state.machineName}</h2>
        <span className="text-sm font-bold opacity-90">{state.leveled ? "✔ Mesa nivelada" : "⚠ Mesa sem nivelar"}</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-5 text-center">
        {sprite ? (
          <div className="relative grid aspect-[3/2] w-full place-items-center overflow-hidden rounded-2xl">
            <Image
              src="/sprites/bobi-oficina-bancada.png"
              alt="Bancada da oficina do Caramelo"
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover"
            />
            <Image
              src={sprite}
              alt={`${state.machineName} ${print ? (ready ? "com a peça pronta" : "imprimindo") : "parada"}`}
              width={280}
              height={280}
              priority
              className={`absolute inset-x-0 bottom-[3%] z-10 mx-auto h-[92%] w-auto object-contain ${print && !ready ? "animate-[float_2.4s_ease-in-out_infinite]" : ""}`}
            />
            {printedItemSprite ? (
              <Image
                src={printedItemSprite}
                alt=""
                aria-hidden
                width={88}
                height={88}
                className="absolute bottom-[31%] left-1/2 z-20 size-[88px] -translate-x-1/2 object-contain"
                style={print && !ready ? { clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` } : undefined}
              />
            ) : item ? (
              <span aria-hidden className="absolute top-3 right-3 z-10 grid size-12 place-items-center rounded-full border-2 border-structure-line bg-surface text-2xl">
                {item.emoji}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="relative grid h-36 w-full place-items-center rounded-2xl border-2 border-dashed border-brand-caramel/50 bg-brand-cream-soft">
            <span aria-hidden className={`text-6xl ${print && !ready ? "animate-float" : ""}`}>🖨️</span>
            {item && (
              <span aria-hidden className="absolute bottom-3 text-3xl" style={{ clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` }}>
                {item.emoji}
              </span>
            )}
          </div>
        )}
        {!state.leveled ? (
          <>
            <p className="font-bold">Antes da primeira impressão, ajuste a distância entre o bico e a mesa nos quatro cantos.</p>
            <Link href="/oficina/nivelar" className="btn-primary">
              Nivelar a mesa
            </Link>
          </>
        ) : print && item ? (
          ready ? (
            <>
              <p className="text-lg font-black text-feedback-success">{item.name} pronto!</p>
              <button type="button" className="btn-success" disabled={pending} onClick={onCollect}>
                Coletar peça
              </button>
            </>
          ) : (
            <>
              <p className="font-black">Imprimindo: {item.name}</p>
              <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da fabricação">
                <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
              </div>
              <p className="text-2xl font-black tabular-nums">{formatMs(remaining)}</p>
              <p className="text-sm text-structure-soft-text">Pode fechar o app: a fabricação continua no servidor.</p>
            </>
          )
        ) : (
          <>
            <p className="font-bold">Impressora livre. Escolha um projeto abaixo.</p>
            <Link href="/oficina/nivelar" className="btn-ghost w-auto">
              Conferir nivelamento
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

/** Tempo restante pelo relógio do servidor (corrige a diferença do relógio do aparelho). */
function useRemaining(readyAt: string | null, serverNow: string): number {
  // Começa no horário do servidor (sem Date.now() na renderização) e avança no cliente.
  const [now, setNow] = useState(() => new Date(serverNow).getTime());
  useEffect(() => {
    if (!readyAt) return;
    const skew = new Date(serverNow).getTime() - Date.now();
    const t = setInterval(() => setNow(Date.now() + skew), 1000);
    return () => clearInterval(t);
  }, [readyAt, serverNow]);
  return readyAt ? Math.max(0, new Date(readyAt).getTime() - now) : 0;
}

function formatMs(ms: number) {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
