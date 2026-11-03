"use client";

import { useEffect, useState } from "react";
import type {
  Answer,
  PublicActivity,
  PublicAsset,
  PublicChoiceActivity,
  PublicMatchingActivity,
  PublicOrderingActivity,
} from "@/content/public-types";
import { AssetView } from "./asset-view";

export type Verdict = { correct: boolean; wrongIds?: string[] } | null;

type Props<A> = {
  activity: A;
  assets: Record<string, PublicAsset>;
  answer: Answer | null;
  onChange: (a: Answer | null) => void;
  verdict: Verdict;
  /** Desabilita a interação enquanto o feedback é exibido. */
  locked: boolean;
};

/** Escolhe o componente do motor pelo tipo da atividade (DD002). */
export function ActivityView(props: Props<PublicActivity>) {
  const { activity } = props;
  switch (activity.type) {
    case "multiple_choice":
    case "visual_diagnosis":
      return <ChoiceActivity {...props} activity={activity} />;
    case "matching":
      return <MatchingActivity {...props} activity={activity} />;
    case "ordering":
      return <OrderingActivity {...props} activity={activity} />;
  }
}

export function isComplete(activity: PublicActivity, answer: Answer | null): boolean {
  if (!answer) return false;
  if (answer.kind === "choice") return Boolean(answer.optionId);
  if (answer.kind === "matching" && activity.type === "matching")
    return activity.left.every((l) => answer.pairs[l.id]);
  if (answer.kind === "ordering" && activity.type === "ordering") return answer.order.length === activity.items.length;
  return false;
}

/* ------------------------------------------------------------------------- */
/* Múltipla escolha e diagnóstico visual                                      */
/* ------------------------------------------------------------------------- */

function ChoiceActivity({ activity, assets, answer, onChange, verdict, locked }: Props<PublicChoiceActivity>) {
  const selected = answer?.kind === "choice" ? answer.optionId : null;
  const visual = activity.options.some((o) => o.assetId);

  // Atalhos 1–5 no teclado.
  useEffect(() => {
    if (locked) return;
    const onKey = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= activity.options.length) onChange({ kind: "choice", optionId: activity.options[n - 1].id });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activity.options, locked, onChange]);

  return (
    <div
      role="radiogroup"
      aria-label={activity.statement}
      className={visual ? "grid grid-cols-2 gap-3 sm:grid-cols-3" : "flex flex-col gap-3"}
    >
      {activity.options.map((o, i) => {
        const isSel = selected === o.id;
        const state = isSel ? (verdict ? (verdict.correct ? "correct" : "wrong") : "selected") : undefined;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={isSel}
            disabled={locked}
            data-state={state}
            onClick={() => onChange({ kind: "choice", optionId: o.id })}
            className={`choice ${visual ? "flex-col items-stretch text-center text-sm" : "min-h-16 text-base"} ${
              visual && activity.options.length === 3 && i === 2 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            {o.assetId ? <AssetView asset={assets[o.assetId]} size="md" /> : <span className="key-hint">{i + 1}</span>}
            <span className="flex-1">{o.text}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Associação: toque em um item de cada coluna para formar o par              */
/* ------------------------------------------------------------------------- */

const PAIR_COLORS = ["#523568", "#C2410C", "#1D6FA3", "#8A5A00", "#6B3FA0"];

function MatchingActivity({ activity, assets, answer, onChange, verdict, locked }: Props<PublicMatchingActivity>) {
  const pairs = answer?.kind === "matching" ? answer.pairs : {};
  const [pickLeft, setPickLeft] = useState<string | null>(null);
  const [pickRight, setPickRight] = useState<string | null>(null);
  const pairIndex = (leftId: string) => activity.left.findIndex((l) => l.id === leftId);
  const rightOwner = (rightId: string) => Object.keys(pairs).find((k) => pairs[k] === rightId);

  const commit = (leftId: string, rightId: string) => {
    const next = { ...pairs };
    for (const k of Object.keys(next)) if (next[k] === rightId) delete next[k];
    next[leftId] = rightId;
    onChange({ kind: "matching", pairs: next });
    setPickLeft(null);
    setPickRight(null);
  };

  const tapLeft = (id: string) => {
    if (pairs[id]) {
      const next = { ...pairs };
      delete next[id];
      onChange(Object.keys(next).length ? { kind: "matching", pairs: next } : null);
      return;
    }
    if (pickRight) commit(id, pickRight);
    else setPickLeft(pickLeft === id ? null : id);
  };
  const tapRight = (id: string) => {
    const owner = rightOwner(id);
    if (owner) {
      const next = { ...pairs };
      delete next[owner];
      onChange(Object.keys(next).length ? { kind: "matching", pairs: next } : null);
      return;
    }
    if (pickLeft) commit(pickLeft, id);
    else setPickRight(pickRight === id ? null : id);
  };

  const stateFor = (leftId: string | undefined, picked: boolean) => {
    if (verdict && leftId) {
      if (verdict.correct) return "correct";
      if (verdict.wrongIds?.includes(leftId)) return "wrong";
    }
    if (picked) return "selected";
    return undefined;
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <p className="sr-only">Toque em um item da esquerda e depois no par correspondente da direita.</p>
      <ul className="flex flex-col gap-3">
        {activity.left.map((l) => {
          const idx = pairIndex(l.id);
          const paired = Boolean(pairs[l.id]);
          return (
            <li key={l.id}>
              <button
                type="button"
                disabled={locked}
                aria-pressed={pickLeft === l.id || paired}
                data-state={stateFor(paired ? l.id : undefined, pickLeft === l.id)}
                onClick={() => tapLeft(l.id)}
                className="choice min-h-20 flex-col justify-center text-center text-sm"
                style={paired && !verdict ? { borderColor: PAIR_COLORS[idx], boxShadow: `0 4px 0 ${PAIR_COLORS[idx]}` } : undefined}
              >
                {l.assetId && <AssetView asset={assets[l.assetId]} size="sm" />}
                {paired && <PairDot color={PAIR_COLORS[idx]} n={idx + 1} />}
                <span>{l.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col gap-3">
        {activity.right.map((r) => {
          const owner = rightOwner(r.id);
          const idx = owner ? pairIndex(owner) : -1;
          return (
            <li key={r.id}>
              <button
                type="button"
                disabled={locked}
                aria-pressed={pickRight === r.id || Boolean(owner)}
                data-state={stateFor(owner, pickRight === r.id)}
                onClick={() => tapRight(r.id)}
                className="choice min-h-20 flex-col justify-center text-center text-sm font-semibold"
                style={owner && !verdict ? { borderColor: PAIR_COLORS[idx], boxShadow: `0 4px 0 ${PAIR_COLORS[idx]}` } : undefined}
              >
                {owner && <PairDot color={PAIR_COLORS[idx]} n={idx + 1} />}
                <span>{r.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PairDot({ color, n }: { color: string; n: number }) {
  return (
    <span
      className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full text-xs font-black text-white"
      style={{ background: color }}
      aria-label={`par ${n}`}
    >
      {n}
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Ordenação: toque nos cartões na ordem certa                                */
/* ------------------------------------------------------------------------- */

function OrderingActivity({ activity, assets, answer, onChange, verdict, locked }: Props<PublicOrderingActivity>) {
  const order = answer?.kind === "ordering" ? answer.order : [];
  const byId = new Map(activity.items.map((i) => [i.id, i]));
  const set = (next: string[]) => onChange(next.length ? { kind: "ordering", order: next } : null);
  const placedState = verdict ? (verdict.correct ? "correct" : "wrong") : undefined;

  return (
    <div className="flex flex-col gap-5">
      <ol aria-label="Sua sequência" className="flex min-h-24 flex-col gap-2 rounded-2xl border-2 border-dashed border-structure-line p-2">
        {order.length === 0 && (
          <li className="py-6 text-center text-sm font-bold text-structure-soft-text">Toque nos cartões abaixo, na ordem certa.</li>
        )}
        {order.map((id, i) => {
          const item = byId.get(id)!;
          return (
            <li key={id} className="animate-pop">
              <button
                type="button"
                disabled={locked}
                data-state={placedState}
                onClick={() => set(order.filter((x) => x !== id))}
                className="choice min-h-14 text-sm"
                aria-label={`${i + 1}º: ${item.text}. Toque para remover.`}
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-structure-purple text-xs font-black text-white">
                  {i + 1}
                </span>
                {item.assetId && (
                  <span className="w-24 shrink-0">
                    <AssetView asset={assets[item.assetId]} size="sm" />
                  </span>
                )}
                <span className="min-w-0 flex-1 break-words">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <ul aria-label="Cartões disponíveis" className="flex flex-col gap-2">
        {activity.items.map((item) => {
          const used = order.includes(item.id);
          return (
            <li key={item.id}>
              <button
                type="button"
                disabled={locked || used}
                data-state={used ? "used" : undefined}
                onClick={() => set([...order, item.id])}
                className="choice min-h-14 text-sm"
              >
                {item.assetId && (
                  <span className="w-24 shrink-0">
                    <AssetView asset={assets[item.assetId]} size="sm" />
                  </span>
                )}
                <span className="min-w-0 flex-1 break-words">{item.text}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
