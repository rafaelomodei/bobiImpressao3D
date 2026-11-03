"use client";

import { setSoundOn, useSoundOn } from "@/lib/sound";

/** Botão compacto (barra do player) para ligar/desligar os efeitos sonoros. */
export function SoundButton() {
  const on = useSoundOn();
  return (
    <button
      type="button"
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      aria-label={on ? "Desligar sons" : "Ligar sons"}
      className="grid size-10 place-items-center rounded-xl text-xl hover:bg-structure-line/60"
    >
      <span aria-hidden>{on ? "🔊" : "🔇"}</span>
    </button>
  );
}

/** Interruptor do perfil, no mesmo padrão do ranking. */
export function SoundSwitch() {
  const on = useSoundOn();
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 font-bold">
      Efeitos sonoros
      <input
        type="checkbox"
        role="switch"
        checked={on}
        onChange={(e) => setSoundOn(e.target.checked)}
        className="h-7 w-12 cursor-pointer appearance-none rounded-full bg-locked transition before:block before:size-6 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-white before:shadow before:transition checked:bg-brand-primary checked:before:translate-x-5.5"
      />
    </label>
  );
}
