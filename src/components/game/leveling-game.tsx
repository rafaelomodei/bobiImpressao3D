"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitLeveling, type LevelResult } from "@/app/(app)/oficina/actions";
import {
  CORNERS,
  CORNER_LABEL,
  LEVEL_RANGE,
  type Corner,
  type CornerResult,
} from "@/lib/game/workshop-catalog";
import { playSound, usePreloadSounds } from "@/lib/sound";
import { Caramelo, CarameloSays } from "./caramelo";

/**
 * Minijogo de nivelamento (PD007 §3): quatro cantos, botões −/+ (toque e clique),
 * representação didática da distância e primeira camada simulada.
 */
export function LevelingGame({ scenario, auto }: { scenario: Record<Corner, number>; auto: boolean }) {
  const router = useRouter();
  const zero = { fl: 0, fr: 0, bl: 0, br: 0 } as Record<Corner, number>;
  const [adjust, setAdjust] = useState(zero);
  const [selected, setSelected] = useState<Corner>("fl");
  const [result, setResult] = useState<LevelResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const offset = (c: Corner) => (auto ? 0 : scenario[c] + adjust[c]);
  usePreloadSounds(["tap", "click", "print-start", "correct", "wrong", "complete"]);

  const change = (delta: number) => {
    playSound("click");
    setResult(null);
    setAdjust((a) => ({ ...a, [selected]: Math.max(-2 * LEVEL_RANGE, Math.min(2 * LEVEL_RANGE, a[selected] + delta)) }));
  };

  const test = () =>
    startTransition(async () => {
      playSound("print-start");
      try {
        const r = await submitLeveling(adjust, auto);
        if ("error" in r) {
          playSound("wrong");
          setError(r.error);
        } else {
          playSound(r.ok ? "complete" : "wrong", 600);
          setResult(r);
          setError(null);
          if (r.ok) router.refresh();
        }
      } catch {
        setError("Sem conexão. Tente de novo.");
      }
    });

  const failing = result && !result.ok;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-6 pb-32">
      <div className="flex items-center gap-3">
        <Link href="/oficina" aria-label="Fechar" className="grid size-10 place-items-center rounded-xl text-2xl font-black text-structure-soft hover:bg-structure-line/60">
          ✕
        </Link>
        <h1 className="text-2xl font-black">{auto ? "Conferir nivelamento" : "Nivelar a mesa"}</h1>
      </div>

      {result?.ok ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <Caramelo pose="celebrate" size={140} />
          <p className="text-2xl font-black text-feedback-success">Primeira camada perfeita!</p>
          <p className="font-bold">Linhas uniformes nos quatro cantos. A impressora está pronta para fabricar.</p>
          <CornerPreview results={result.corners} />
          <Link href="/oficina" className="btn-primary">
            Voltar para a oficina
          </Link>
        </div>
      ) : (
        <>
          <CarameloSays
            pose={failing ? "hint" : "explain"}
            text={
              auto
                ? "O sensor mediu os cantos sozinho. Mesmo assim, a gente confere a primeira camada antes de imprimir."
                : failing
                  ? "Olhe as linhas de cada canto: achatadas e falhadas pedem afastar o bico; redondas e soltas pedem aproximar."
                  : "Escolha um canto e ajuste até o bico ficar na distância ideal. Depois, faça a camada de teste."
            }
          />

          {!auto && (
            <>
              <div className="relative mx-auto aspect-square w-full max-w-72 rounded-3xl border-4 border-structure-deep/80 bg-[repeating-linear-gradient(45deg,#ece6f1_0_6px,#f6f2f9_6px_12px)]">
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs font-black text-structure-soft-text uppercase">
                  Mesa (vista de cima)
                </span>
                {CORNERS.map((c) => {
                  const pos = { fl: "bottom-3 left-3", fr: "bottom-3 right-3", bl: "top-3 left-3", br: "top-3 right-3" }[c];
                  const r = result?.corners[c].result;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        playSound("tap");
                        setSelected(c);
                      }}
                      aria-pressed={selected === c}
                      aria-label={`${CORNER_LABEL[c]}${r ? `: ${r === "ok" ? "ok" : "precisa de ajuste"}` : ""}`}
                      className={`absolute ${pos} grid size-16 place-items-center rounded-full border-4 text-xl font-black transition ${
                        selected === c ? "scale-110 border-brand-primary bg-brand-cream-soft" : "border-structure-line bg-surface"
                      }`}
                    >
                      {r ? (r === "ok" ? "✔" : "✖") : "◎"}
                    </button>
                  );
                })}
              </div>

              <section aria-labelledby="ajuste" className="card flex flex-col gap-4">
                <h2 id="ajuste" className="text-center font-black">
                  {CORNER_LABEL[selected]}
                </h2>
                <NozzleGauge offset={offset(selected)} />
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="btn-secondary" onClick={() => change(-1)}>
                    ▼ Aproximar bico
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => change(1)}>
                    ▲ Afastar bico
                  </button>
                </div>
              </section>
            </>
          )}

          {result && <CornerPreview results={result.corners} />}
          {error && (
            <p role="alert" className="font-bold text-feedback-error">
              ⚠ {error}
            </p>
          )}

          <footer className="fixed inset-x-0 bottom-0 border-t-2 border-structure-line bg-surface pb-[env(safe-area-inset-bottom)]">
            <div className="mx-auto flex w-full max-w-xl px-4 py-4">
              <button type="button" className="btn-primary" disabled={pending} onClick={test}>
                {pending ? "Imprimindo teste…" : "Imprimir camada de teste"}
              </button>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}

/** Vista lateral didática: bico acima da mesa; a faixa tracejada é a distância ideal. */
function NozzleGauge({ offset }: { offset: number }) {
  const gap = 18 + offset * 7; // px
  const label = offset === 0 ? "Distância ideal" : offset < 0 ? "Perto demais" : "Longe demais";
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 200 110" className="w-full max-w-64" role="img" aria-label={`Distância do bico: ${label}`}>
        <rect x="20" y="92" width="160" height="12" rx="3" fill="#8D71A7" />
        <line x1="20" x2="180" y1={92 - 18} y2={92 - 18} stroke="#1F8A4C" strokeWidth="2" strokeDasharray="6 4" />
        <g transform={`translate(0 ${Math.max(-30, 92 - 18 - gap)})`}>
          <rect x="80" y="0" width="40" height="40" rx="6" fill="#523568" />
          <path d="M88 40 h24 l-8 14 h-8 z" fill="#F29507" stroke="#241241" strokeWidth="2" />
        </g>
      </svg>
      <p className={`font-black ${offset === 0 ? "text-feedback-success" : "text-structure-purple"}`}>{label}</p>
    </div>
  );
}

const LINE_STYLE: Record<CornerResult, { icon: string; title: string }> = {
  ok: { icon: "▬▬▬", title: "Linhas uniformes" },
  "too-close": { icon: "▭ ▭", title: "Achatadas e falhadas" },
  "too-far": { icon: "∿∿∿", title: "Redondas e soltas" },
};

function CornerPreview({ results }: { results: LevelResult["corners"] }) {
  return (
    <section aria-labelledby="camada" className="flex w-full flex-col gap-2">
      <h2 id="camada" className="font-black">
        Camada de teste
      </h2>
      <ul className="grid grid-cols-2 gap-2">
        {CORNERS.map((c) => {
          const r = results[c];
          return (
            <li
              key={c}
              className={`rounded-2xl border-2 p-3 text-left text-sm ${r.result === "ok" ? "border-feedback-success/50 bg-feedback-success-soft" : "border-feedback-error/50 bg-feedback-error-soft"}`}
            >
              <p className="font-black">
                {r.result === "ok" ? "✔" : "✖"} {CORNER_LABEL[c]}
              </p>
              <p aria-hidden className="font-mono text-lg tracking-widest">
                {LINE_STYLE[r.result].icon}
              </p>
              <p className="font-bold">{r.feedback}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
