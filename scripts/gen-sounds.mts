/**
 * Gera os efeitos sonoros do bobi. por síntese (sem amostras de terceiros).
 * Saída: public/sounds/<nome>.mp3 (precisa de ffmpeg no PATH).
 *
 *   pnpm sounds:gen
 *
 * Cada som é descrito por notas/ruídos simples, então dá para ajustar o timbre
 * aqui e regenerar. Para trocar por um arquivo pronto, basta substituir o .mp3
 * com o mesmo nome (lista e uso em docs/design/sons.md).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SR = 44100;
type Wave = "sine" | "triangle" | "square" | "saw";

class Track {
  buf: Float32Array;
  constructor(seconds: number) {
    this.buf = new Float32Array(Math.ceil(seconds * SR));
  }

  /** Nota com envelope ataque/decaimento exponencial, glissando opcional e filtro passa-baixa. */
  note(
    at: number,
    freq: number,
    dur: number,
    o: { wave?: Wave; vol?: number; attack?: number; to?: number; vibrato?: number; lowpass?: number; harmonics?: number[] } = {},
  ) {
    const { wave = "sine", vol = 0.5, attack = 0.005, to = freq, vibrato = 0, lowpass = 0, harmonics = [] } = o;
    const start = Math.floor(at * SR);
    const n = Math.floor(dur * SR);
    let phase = 0;
    const phases = harmonics.map(() => 0);
    let lp = 0;
    const a = lowpass ? 1 - Math.exp((-2 * Math.PI * lowpass) / SR) : 1;
    for (let i = 0; i < n && start + i < this.buf.length; i++) {
      const t = i / SR;
      const k = i / n;
      const f = freq * Math.pow(to / freq, k) * (1 + vibrato * Math.sin(2 * Math.PI * 6 * t));
      phase += f / SR;
      let v = osc(wave, phase);
      harmonics.forEach((h, j) => {
        phases[j] += (f * (j + 2)) / SR;
        v += h * Math.sin(2 * Math.PI * phases[j]);
      });
      lp += a * (v - lp);
      const env = Math.min(1, t / attack) * Math.exp((-5 * t) / dur) * (1 - Math.pow(k, 8));
      this.buf[start + i] += lp * env * vol;
    }
    return this;
  }

  /** Ruído filtrado (cliques, sopros, motor). */
  noise(at: number, dur: number, o: { vol?: number; lowpass?: number; lowpassTo?: number; attack?: number } = {}) {
    const { vol = 0.3, lowpass = 3000, lowpassTo = lowpass, attack = 0.002 } = o;
    const start = Math.floor(at * SR);
    const n = Math.floor(dur * SR);
    let lp = 0;
    let seed = 12345;
    for (let i = 0; i < n && start + i < this.buf.length; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      const white = (seed / 0x7fffffff) * 2 - 1;
      const k = i / n;
      const cut = lowpass * Math.pow(lowpassTo / lowpass, k);
      const a = 1 - Math.exp((-2 * Math.PI * cut) / SR);
      lp += a * (white - lp);
      const t = i / SR;
      const env = Math.min(1, t / attack) * Math.exp((-4 * t) / dur) * (1 - Math.pow(k, 6));
      this.buf[start + i] += lp * env * vol;
    }
    return this;
  }

  /** Normaliza para o pico pedido e aplica saturação suave. */
  render(peak = 0.85): Float32Array {
    let max = 0;
    for (const v of this.buf) max = Math.max(max, Math.abs(v));
    const g = max ? peak / max : 1;
    return this.buf.map((v) => Math.tanh(v * g * 1.1) / Math.tanh(1.1));
  }
}

function osc(w: Wave, p: number) {
  const x = p - Math.floor(p);
  switch (w) {
    case "sine":
      return Math.sin(2 * Math.PI * x);
    case "triangle":
      return 1 - 4 * Math.abs(x - 0.5);
    case "square":
      return x < 0.5 ? 1 : -1;
    case "saw":
      return 2 * x - 1;
  }
}

// Notas (Hz)
const N = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, Bb4: 466.16,
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, E6: 1318.51, G6: 1567.98, C7: 2093.0, E7: 2637.02,
};
const bell = (t: Track, at: number, f: number, dur = 0.5, vol = 0.5) =>
  t.note(at, f, dur, { wave: "sine", vol, harmonics: [0.35, 0.12, 0.05] });

/** Catálogo: nome → peso relativo (pico) e síntese. Os nomes são o contrato com src/lib/sound.ts. */
const SOUNDS: Record<string, { peak: number; make: () => Track }> = {
  // Toque em opção, cartão ou canto: clique curto e macio.
  tap: { peak: 0.45, make: () => new Track(0.08).note(0, 1400, 0.05, { to: 800, vol: 0.6 }).noise(0, 0.015, { vol: 0.15, lowpass: 5000 }) },
  // Acerto: duas notas subindo, brilhantes (sinal universal de "certo").
  correct: { peak: 0.8, make: () => { const t = new Track(0.6); bell(t, 0, N.A5, 0.25, 0.5); bell(t, 0.09, N.E6, 0.5, 0.55); return t; } },
  // Erro: "bonk" grave e curto, sem ser punitivo.
  wrong: {
    peak: 0.7,
    make: () =>
      new Track(0.45)
        .note(0, N.Bb4 / 1.5, 0.14, { wave: "square", vol: 0.35, lowpass: 900 })
        .note(0.13, N.F4 / 1.5, 0.3, { wave: "square", vol: 0.4, lowpass: 700, to: N.E4 / 1.5 }),
  },
  // Dica: brilho rápido ("ideia!").
  hint: { peak: 0.6, make: () => { const t = new Track(0.6); [N.G6, N.C7, N.E7].forEach((f, i) => bell(t, i * 0.06, f, 0.35, 0.35)); return t; } },
  // Resposta registrada na avaliação (neutra, não revela acerto).
  recorded: { peak: 0.55, make: () => new Track(0.25).note(0, 500, 0.12, { to: 900, vol: 0.5 }).note(0.06, 900, 0.15, { vol: 0.3 }) },
  // Lição concluída: arpejo + acorde.
  complete: {
    peak: 0.85,
    make: () => {
      const t = new Track(1.6);
      [N.C5, N.E5, N.G5].forEach((f, i) => t.note(i * 0.1, f, 0.22, { wave: "triangle", vol: 0.45, harmonics: [0.2] }));
      [N.C5, N.E5, N.G5, N.C6].forEach((f) => t.note(0.32, f, 1.1, { wave: "triangle", vol: 0.28, vibrato: 0.004, harmonics: [0.15] }));
      bell(t, 0.32, N.C7, 0.8, 0.12);
      return t;
    },
  },
  // XP/Fios entrando: moeda.
  reward: {
    peak: 0.65,
    make: () =>
      new Track(0.5)
        .note(0, N.B5, 0.08, { wave: "square", vol: 0.3, lowpass: 4000 })
        .note(0.075, N.E6, 0.4, { wave: "square", vol: 0.3, lowpass: 4000 }),
  },
  // Meta do dia / sequência: sopro subindo + sino.
  goal: {
    peak: 0.7,
    make: () => {
      const t = new Track(0.9).noise(0, 0.35, { vol: 0.25, lowpass: 400, lowpassTo: 4000, attack: 0.15 });
      bell(t, 0.28, N.G5, 0.5, 0.45);
      bell(t, 0.36, N.D5 * 2, 0.55, 0.4);
      return t;
    },
  },
  // Desbloqueio (oficina, mundo, melhoria): cascata brilhante.
  unlock: {
    peak: 0.75,
    make: () => {
      const t = new Track(1.3);
      [N.C6, N.E6, N.G6, N.C7, N.E7].forEach((f, i) => bell(t, i * 0.055, f, 0.7, 0.3));
      t.noise(0, 0.5, { vol: 0.06, lowpass: 8000, attack: 0.05 });
      return t;
    },
  },
  // Aprovação na avaliação: fanfarra maior.
  pass: {
    peak: 0.9,
    make: () => {
      const t = new Track(2.0);
      [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => t.note(i * 0.11, f, 0.24, { wave: "triangle", vol: 0.45, harmonics: [0.25] }));
      [N.C5, N.E5, N.G5, N.C6, N.E6].forEach((f) => t.note(0.46, f, 1.4, { wave: "saw", vol: 0.12, lowpass: 2500, vibrato: 0.004 }));
      [N.C6, N.E6, N.G6, N.C7].forEach((f, i) => bell(t, 0.5 + i * 0.07, f, 0.6, 0.18));
      return t;
    },
  },
  // Não passou: descida suave, acolhedora.
  fail: {
    peak: 0.6,
    make: () => {
      const t = new Track(1.0);
      [N.G4, N.E4, N.D4].forEach((f, i) => t.note(i * 0.18, f, i === 2 ? 0.6 : 0.22, { wave: "triangle", vol: 0.45 }));
      return t;
    },
  },
  // Impressora começando: bipe de confirmação + motor de passo acelerando.
  "print-start": {
    peak: 0.6,
    make: () => {
      const t = new Track(1.2).note(0, 2000, 0.08, { wave: "square", vol: 0.2, lowpass: 5000 });
      t.note(0.12, 180, 0.95, { wave: "square", vol: 0.25, to: 520, lowpass: 1400 });
      t.note(0.12, 360, 0.95, { wave: "triangle", vol: 0.12, to: 1040 });
      t.noise(0.12, 0.95, { vol: 0.06, lowpass: 1500 });
      return t;
    },
  },
  // Impressão pronta: três bipes de máquina + sino.
  "print-done": {
    peak: 0.7,
    make: () => {
      const t = new Track(1.1);
      [0, 0.16, 0.32].forEach((at) => t.note(at, 2200, 0.09, { wave: "square", vol: 0.25, lowpass: 6000 }));
      bell(t, 0.5, N.C6, 0.55, 0.5);
      bell(t, 0.5, N.G6, 0.55, 0.25);
      return t;
    },
  },
  // Coletar peça / item na prateleira: "pop" subindo.
  collect: {
    peak: 0.7,
    make: () => {
      const t = new Track(0.6).note(0, 300, 0.09, { to: 1100, vol: 0.6 });
      bell(t, 0.08, N.E6, 0.4, 0.3);
      return t;
    },
  },
  // Compra na oficina: moedas em sequência.
  purchase: {
    peak: 0.65,
    make: () => {
      const t = new Track(0.7);
      [N.E6, N.G6, N.C7].forEach((f, i) => t.note(i * 0.07, f, 0.25, { wave: "square", vol: 0.22, lowpass: 5000 }));
      t.noise(0, 0.12, { vol: 0.1, lowpass: 6000 });
      return t;
    },
  },
  // Ajuste do parafuso de nivelamento: catraca.
  click: {
    peak: 0.4,
    make: () => new Track(0.06).noise(0, 0.018, { vol: 0.5, lowpass: 7000 }).note(0, 2600, 0.02, { wave: "square", vol: 0.1, lowpass: 6000 }),
  },
};

const outDir = join(import.meta.dirname, "..", "public", "sounds");
mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), "bobi-sounds-"));
try {
  for (const [name, def] of Object.entries(SOUNDS)) {
    const wav = join(tmp, `${name}.wav`);
    writeFileSync(wav, toWav(def.make().render(def.peak)));
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "96k", join(outDir, `${name}.mp3`)]);
    console.log(`✔ ${name}.mp3`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

function toWav(samples: Float32Array): Buffer {
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((v, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), i * 2));
  const h = Buffer.alloc(44);
  h.write("RIFF", 0);
  h.writeUInt32LE(36 + data.length, 4);
  h.write("WAVEfmt ", 8);
  h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20);
  h.writeUInt16LE(1, 22);
  h.writeUInt32LE(SR, 24);
  h.writeUInt32LE(SR * 2, 28);
  h.writeUInt16LE(2, 32);
  h.writeUInt16LE(16, 34);
  h.write("data", 36);
  h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}
