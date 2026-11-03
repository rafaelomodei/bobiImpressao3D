"use client";

import { SoundButton } from "@/components/sound-toggle";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import type { PublicActivity, PublicAsset } from "@/content/public-types";
import { LEASE_RENEW_MS } from "@/lib/game/rules";
import { AssetView } from "./asset-view";
import { Caramelo, CarameloSays } from "./caramelo";

/* ------------------------------------------------------------------------- */
/* Identificação do aparelho para a reserva de atividade (DD008)              */
/* ------------------------------------------------------------------------- */

const KEY = "bobi-device-id";
function readDevice(): string {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    // Sem armazenamento (aba anônima restrita): id por sessão de página.
    return (globalThis as { __bobiDevice?: string }).__bobiDevice ??= crypto.randomUUID();
  }
}
const noop = () => () => {};
export function useDeviceId(): string | null {
  return useSyncExternalStore(noop, readDevice, () => null);
}

/** Renova a reserva a cada 30 s; avisa quando outro aparelho assumiu. */
export function useLeaseHeartbeat(active: boolean, renew: () => Promise<boolean>, onLost: () => void) {
  useEffect(() => {
    if (!active) return;
    const t = setInterval(async () => {
      try {
        if (!(await renew())) onLost();
      } catch {
        // Sem conexão: tenta de novo no próximo ciclo (DD007).
      }
    }, LEASE_RENEW_MS);
    return () => clearInterval(t);
  }, [active, renew, onLost]);
}

/* ------------------------------------------------------------------------- */
/* Telemetria para o painel administrativo (DD026)                            */
/* ------------------------------------------------------------------------- */

/** Onde a pessoa está agora: usado ao sair pelo X e ao sair do app. */
export type ExitInfo = { contextId: string; activityId: string | null; afterError: boolean };

/** Cronômetro da resposta: `reset` quando a atividade aparece ou a pessoa tenta de novo. */
export function useAnswerTimer() {
  const start = useRef(0);
  return useMemo(
    () => ({
      reset: () => {
        start.current = performance.now();
      },
      elapsed: () => Math.max(0, Math.round(performance.now() - start.current)),
    }),
    [],
  );
}

/**
 * Avisa o servidor quando a pessoa sai do app no meio de uma atividade
 * (fecha a aba, troca de app, bloqueia a tela). Um aviso por saída; volta a armar
 * quando a página fica visível de novo. sendBeacon sobrevive ao fechamento.
 */
export function useExitBeacon(info: ExitInfo | null) {
  const current = useRef(info);
  useEffect(() => {
    current.current = info;
  });
  useEffect(() => {
    let sent = false;
    const send = () => {
      const i = current.current;
      if (!i || sent) return;
      sent = true;
      try {
        navigator.sendBeacon("/api/telemetria", new Blob([JSON.stringify(i)], { type: "application/json" }));
      } catch {
        // sem suporte a beacon: o evento se perde, o jogo segue.
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") send();
      else sent = false;
    };
    window.addEventListener("pagehide", send);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pagehide", send);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}

/* ------------------------------------------------------------------------- */
/* Estrutura de tela                                                           */
/* ------------------------------------------------------------------------- */

export function PlayerTopBar({
  progress,
  onExit,
  label,
}: {
  progress: number;
  onExit: () => void;
  label: string;
}) {
  return (
    <header className="sticky top-0 z-10 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-4 px-4 py-4">
        <button type="button" onClick={onExit} aria-label="Sair da lição" className="grid size-10 place-items-center rounded-xl text-2xl font-black text-structure-soft hover:bg-structure-line/60">
          ✕
        </button>
        <div
          className="progress-track flex-1"
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <div className="progress-fill" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        <SoundButton />
      </div>
    </header>
  );
}

export function ActivityHeader({ activity, assets }: { activity: PublicActivity; assets: Record<string, PublicAsset> }) {
  return (
    <div className="flex flex-col gap-4">
      {activity.preBlocks.map((b, i) =>
        b.kind === "speech" ? (
          <CarameloSays key={i} text={b.text} pose={b.pose} size={72} />
        ) : (
          <figure key={i} className="flex flex-col gap-1">
            <AssetView asset={assets[b.assetId]} size="lg" />
            <figcaption className="text-center text-sm font-bold text-structure-soft-text">
              {b.kind === "animation" ? "▶ " : ""}
              {b.caption}
            </figcaption>
          </figure>
        ),
      )}
      <div>
        <p className="badge mb-2">{activity.pedagogicalLabel}</p>
        <h1 className="text-xl leading-snug font-black sm:text-2xl">{activity.statement}</h1>
      </div>
      {activity.stimulusAssetId && <AssetView asset={assets[activity.stimulusAssetId]} size="lg" />}
    </div>
  );
}

export type FooterState =
  | { kind: "idle"; canCheck: boolean; pending: boolean }
  | { kind: "correct"; feedback: string }
  | { kind: "wrong"; feedback: string; hint?: string }
  | { kind: "recorded" }
  | { kind: "offline" };

/** Rodapé fixo: "Verificar" → faixa verde (acerto) ou vermelha (erro) com feedback. */
export function FeedbackFooter({
  state,
  onCheck,
  onContinue,
  onRetry,
  onHint,
  hintShown,
  continueLabel = "Continuar",
}: {
  state: FooterState;
  onCheck: () => void;
  onContinue: () => void;
  onRetry: () => void;
  onHint?: () => void;
  hintShown?: boolean;
  continueLabel?: string;
}) {
  // Enter confirma / continua.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.target instanceof HTMLButtonElement) return;
      if (state.kind === "idle" && state.canCheck && !state.pending) onCheck();
      else if (state.kind === "correct" || state.kind === "recorded") onContinue();
      else if (state.kind === "wrong") onRetry();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onCheck, onContinue, onRetry]);

  const tone =
    state.kind === "correct"
      ? "bg-feedback-success-soft"
      : state.kind === "wrong"
        ? "bg-feedback-error-soft"
        : "border-t-2 border-structure-line bg-surface";

  return (
    <footer className={`fixed inset-x-0 bottom-0 z-20 pb-[env(safe-area-inset-bottom)] ${tone} ${state.kind === "idle" ? "" : "animate-slide-up"}`}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
        {state.kind === "correct" && (
          <div role="status" className="flex flex-1 items-center gap-3 text-feedback-success-pressed">
            <Caramelo pose="celebrate" size={76} className="-my-3 shrink-0" />
            <div>
              <p className="text-lg font-black">Mandou bem!</p>
              <p className="font-bold">{state.feedback}</p>
            </div>
          </div>
        )}
        {state.kind === "wrong" && (
          <div role="alert" className="flex flex-1 flex-col gap-2 text-feedback-error-pressed">
            <div className="flex items-center gap-3">
              {/* O Caramelo aparece junto da mensagem: no celular ele fica sempre à vista. */}
              <Caramelo pose={state.hint ? "hint" : "concern"} size={76} className="-my-3 shrink-0" />
              <div>
                <p className="text-lg font-black">Quase! Vamos de novo.</p>
                <p className="font-bold">{state.feedback}</p>
              </div>
            </div>
            {state.hint && hintShown && (
              <p className="rounded-xl bg-surface p-3 text-sm font-bold text-structure-deep">
                💡 <span className="sr-only">Dica:</span> {state.hint}
              </p>
            )}
          </div>
        )}
        {state.kind === "recorded" && (
          <p role="status" className="flex-1 font-black text-structure-purple">
            Resposta registrada. O resultado aparece no final.
          </p>
        )}
        {state.kind === "offline" && (
          <p role="alert" className="flex-1 font-bold text-feedback-error-pressed">
            ⚠ Sem conexão. Sua resposta continua marcada; tente enviar de novo.
          </p>
        )}
        {state.kind === "idle" && <div className="hidden flex-1 sm:block" />}

        <div className="flex gap-3 sm:w-56 sm:flex-col">
          {state.kind === "idle" && (
            <button type="button" className="btn-primary" disabled={!state.canCheck || state.pending} onClick={onCheck}>
              {state.pending ? "Verificando…" : "Verificar"}
            </button>
          )}
          {state.kind === "offline" && (
            <button type="button" className="btn-primary" onClick={onCheck}>
              Enviar de novo
            </button>
          )}
          {(state.kind === "correct" || state.kind === "recorded") && (
            <button type="button" className="btn-success" onClick={onContinue} autoFocus>
              {continueLabel}
            </button>
          )}
          {state.kind === "wrong" && (
            <>
              {state.hint && !hintShown && onHint && (
                <button type="button" className="btn-secondary" onClick={onHint}>
                  💡 Ver dica
                </button>
              )}
              <button type="button" className="btn-danger" onClick={onRetry} autoFocus>
                Tentar de novo
              </button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------------- */
/* Telas auxiliares                                                            */
/* ------------------------------------------------------------------------- */

export function CenterScreen({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-10 text-center">{children}</main>;
}

export function ConflictScreen({ onTransfer, busy }: { onTransfer: () => void; busy: boolean }) {
  return (
    <CenterScreen>
      <Caramelo pose="concern" size={140} />
      <h1 className="text-2xl font-black">Você já está estudando em outro aparelho</h1>
      <p className="text-structure-soft-text">
        Só dá para fazer uma atividade por vez. Se continuar aqui, o outro aparelho é pausado. Tudo o que já foi confirmado fica salvo.
      </p>
      <div className="flex w-full flex-col gap-3">
        <button type="button" className="btn-primary" onClick={onTransfer} disabled={busy}>
          {busy ? "Transferindo…" : "Continuar neste aparelho"}
        </button>
        <Link href="/trilha" className="btn-secondary">
          Voltar para a trilha
        </Link>
      </div>
    </CenterScreen>
  );
}

export function LeaseLostScreen({ onReclaim }: { onReclaim: () => void }) {
  return (
    <CenterScreen>
      <Caramelo pose="concern" size={140} />
      <h1 className="text-2xl font-black">A atividade continuou em outro aparelho</h1>
      <p className="text-structure-soft-text">O que você já confirmou está salvo. Quer trazer a atividade de volta para cá?</p>
      <div className="flex w-full flex-col gap-3">
        <button type="button" className="btn-primary" onClick={onReclaim}>
          Continuar aqui
        </button>
        <Link href="/trilha" className="btn-secondary">
          Voltar para a trilha
        </Link>
      </div>
    </CenterScreen>
  );
}

export function LoadingScreen() {
  return (
    <CenterScreen>
      <Caramelo pose="idle" size={120} className="animate-float" />
      <p className="font-black text-structure-soft-text">Preparando a bancada…</p>
    </CenterScreen>
  );
}

export function ErrorScreen({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <CenterScreen>
      <Caramelo pose="concern" size={120} />
      <p className="text-lg font-black">{message}</p>
      {onRetry && (
        <button type="button" className="btn-primary" onClick={onRetry}>
          Tentar de novo
        </button>
      )}
      <Link href="/trilha" className="btn-secondary">
        Voltar para a trilha
      </Link>
    </CenterScreen>
  );
}

/** Número que sobe de 0 até o valor (respeita movimento reduzido via CSS/JS). */
export function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = reduced ? 1 : Math.min(1, (t - start) / 700);
      setN(Math.round(value * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n}</>;
}
