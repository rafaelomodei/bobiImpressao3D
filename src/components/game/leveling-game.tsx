"use client";

import Link from "next/link";
import Image from "next/image";
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
  // Resultado da camada de teste em tela cheia: no celular o retorno não pode ficar escondido abaixo da dobra.
  const [showResult, setShowResult] = useState(false);
  const [pending, startTransition] = useTransition();
  const offset = (c: Corner) => (auto ? 0 : scenario[c] + adjust[c]);
  usePreloadSounds(["tap", "click", "print-start", "correct", "wrong", "complete"]);

  const change = (delta: number) => {
    playSound("click");
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
          else {
            // Ao voltar, o canto selecionado já é o primeiro que precisa de ajuste.
            const firstBad = CORNERS.find((c) => r.corners[c].result !== "ok");
            if (firstBad) setSelected(firstBad);
          }
        }
      } catch {
        setError("Sem conexão. Tente de novo.");
      }
      setShowResult(true);
    });

  const failing = result && !result.ok;

  if (showResult && (result || error)) {
    return (
      <LevelResultScreen
        result={error ? null : result}
        error={error}
        onBack={() => {
          setShowResult(false);
          setError(null);
        }}
      />
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-6 pb-32">
      <div className="flex items-center gap-3">
        <Link href="/oficina" aria-label="Fechar" className="grid size-10 place-items-center rounded-xl text-2xl font-black text-structure-soft hover:bg-structure-line/60">
          ✕
        </Link>
        <h1 className="text-2xl font-black">{auto ? "Conferir nivelamento" : "Nivelar a mesa"}</h1>
      </div>

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
              <div className="relative mx-auto aspect-square w-full max-w-72">
                <Image
                  src="/sprites/bobi-minijogo-mesa.png"
                  alt="Mesa de impressão vista de cima, com quatro roldanas e quatro pontos de checagem"
                  fill
                  priority
                  sizes="288px"
                  className="object-contain"
                />
                {CORNERS.map((c) => {
                  const pos = { fl: "bottom-[14%] left-[14%]", fr: "bottom-[14%] right-[14%]", bl: "top-[14%] left-[14%]", br: "top-[14%] right-[14%]" }[c];
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
                      className={`absolute z-10 ${pos} grid size-16 place-items-center rounded-full border-4 text-xl font-black transition ${
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

          {failing && (
            <button type="button" className="btn-ghost" onClick={() => setShowResult(true)}>
              Ver de novo a camada de teste
            </button>
          )}

          <footer className="fixed inset-x-0 bottom-0 border-t-2 border-structure-line bg-surface pb-[env(safe-area-inset-bottom)]">
            <div className="mx-auto flex w-full max-w-xl px-4 py-4">
              <button type="button" className="btn-primary" disabled={pending} onClick={test}>
                {pending ? "Imprimindo teste…" : "Imprimir camada de teste"}
              </button>
            </div>
          </footer>
      </>
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

const LINE_STYLE: Record<CornerResult, { sprite: string; title: string }> = {
  ok: { sprite: "/sprites/bobi-minijogo-linha-ok.png", title: "Linhas uniformes" },
  "too-close": { sprite: "/sprites/bobi-minijogo-linha-too-close.png", title: "Achatadas e falhadas" },
  "too-far": { sprite: "/sprites/bobi-minijogo-linha-too-far.png", title: "Redondas e soltas" },
};

/** Resultado da camada de teste ocupando a tela inteira, com saída clara para voltar a ajustar. */
function LevelResultScreen({
  result,
  error,
  onBack,
}: {
  result: LevelResult | null;
  error: string | null;
  onBack: () => void;
}) {
  const ok = result?.ok ?? false;
  const good = result ? CORNERS.filter((c) => result.corners[c].result === "ok").length : 0;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resultado-camada"
      className={`animate-slide-up fixed inset-0 z-40 overflow-y-auto ${ok ? "bg-feedback-success-soft" : error ? "bg-background" : "bg-feedback-error-soft"}`}
    >
      <div className="mx-auto flex min-h-full w-full max-w-xl flex-col gap-5 px-4 pt-8 pb-32 text-center">
        <Caramelo pose={ok ? "celebrate" : "concern"} size={120} className="mx-auto" />
        {error ? (
          <>
            <h2 id="resultado-camada" className="text-2xl font-black">Não deu para imprimir o teste</h2>
            <p className="font-bold">{error}</p>
          </>
        ) : ok ? (
          <>
            <h2 id="resultado-camada" className="text-2xl font-black text-feedback-success-pressed">Primeira camada perfeita!</h2>
            <p className="font-bold">Linhas uniformes nos quatro cantos. A impressora está pronta para imprimir.</p>
          </>
        ) : (
          <>
            <h2 id="resultado-camada" className="text-2xl font-black text-feedback-error-pressed">A camada de teste não ficou boa</h2>
            <p className="font-bold">
              {good} de 4 cantos certos. Veja as linhas de cada canto e ajuste o bico onde aparece ✖.
            </p>
          </>
        )}
        {result && <CornerPreview results={result.corners} />}
      </div>
      <footer className="fixed inset-x-0 bottom-0 border-t-2 border-structure-line bg-surface pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex w-full max-w-xl px-4 py-4">
          {ok ? (
            <Link href="/oficina" className="btn-primary" autoFocus>
              Voltar para a oficina
            </Link>
          ) : (
            <button type="button" className={error ? "btn-primary" : "btn-danger"} autoFocus onClick={onBack}>
              {error ? "Tentar de novo" : "Ajustar o bico"}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

function CornerPreview({ results }: { results: LevelResult["corners"] }) {
  return (
    <section aria-labelledby="camada" className="flex w-full flex-col gap-2 text-left">
      <h3 id="camada" className="font-black">
        Camada de teste
      </h3>
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
              <Image src={LINE_STYLE[r.result].sprite} alt="" aria-hidden width={384} height={192} className="mt-1 w-full" />
              <p className="font-bold">{r.feedback}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
