"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Efeitos sonoros (DD024). Arquivos em public/sounds/<nome>.mp3, gerados por
 * scripts/gen-sounds.mts. Web Audio para tocar sem atraso e sobrepor sons;
 * qualquer falha (sem suporte, arquivo ausente, autoplay bloqueado) é silenciosa.
 */
export type SoundName =
  | "tap"
  | "correct"
  | "wrong"
  | "hint"
  | "recorded"
  | "complete"
  | "reward"
  | "goal"
  | "unlock"
  | "pass"
  | "fail"
  | "print-start"
  | "print-done"
  | "collect"
  | "purchase"
  | "click";

/** Volume geral: efeitos de apoio, nunca mais altos que a fala de quem estiver por perto. */
const MASTER = 0.55;
const STORAGE_KEY = "bobi:som";
const CHANGE_EVENT = "bobi:som";

let ctx: AudioContext | null = null;
const buffers = new Map<SoundName, Promise<AudioBuffer | null>>();

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
}

function load(name: SoundName): Promise<AudioBuffer | null> {
  let p = buffers.get(name);
  if (!p) {
    const c = audioContext();
    if (!c) return Promise.resolve(null);
    p = fetch(`/sounds/${name}.mp3`)
      .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(r.statusText))))
      .then((b) => c.decodeAudioData(b))
      .catch(() => null);
    buffers.set(name, p);
  }
  return p;
}

/* ------------------------------------------------------------------------- */
/* Preferência (por aparelho)                                                  */
/* ------------------------------------------------------------------------- */

export function isSoundOn(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* modo privado: vale só nesta página */
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
  if (on) playSound("tap");
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useSoundOn(): boolean {
  return useSyncExternalStore(subscribe, isSoundOn, () => true);
}

/* ------------------------------------------------------------------------- */
/* Tocar                                                                       */
/* ------------------------------------------------------------------------- */

export function playSound(name: SoundName, delayMs = 0, volume = 1) {
  if (!isSoundOn()) return;
  const c = audioContext();
  if (!c) return;
  if (c.state === "suspended") void c.resume().catch(() => undefined);
  void load(name).then((buffer) => {
    if (!buffer) return;
    const src = c.createBufferSource();
    src.buffer = buffer;
    const gain = c.createGain();
    gain.gain.value = MASTER * volume;
    src.connect(gain).connect(c.destination);
    src.start(c.currentTime + delayMs / 1000);
  });
}

/** Baixa e decodifica antes do uso, para o primeiro som não atrasar. */
export function preloadSounds(names: SoundName[]) {
  if (!isSoundOn()) return;
  names.forEach((n) => void load(n));
}

/** Sequência tocada uma única vez quando a tela aparece (ex.: conclusão da lição). */
export function useSoundSequence(steps: [SoundName, number][]) {
  const played = useRef(false);
  const stepsRef = useRef(steps);
  useEffect(() => {
    if (played.current) return;
    played.current = true;
    for (const [name, at] of stepsRef.current) playSound(name, at);
  }, []);
}

export function usePreloadSounds(names: SoundName[]) {
  const key = names.join(",");
  useEffect(() => {
    preloadSounds(key.split(",") as SoundName[]);
  }, [key]);
}
