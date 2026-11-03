// Grava o GIF de demonstração do README (docs/media/bobi-demo.gif): um jogador novo
// faz o onboarding, resolve a L01 inteira (com erros, "Entenda os termos" e dica),
// nivela a mesa da oficina e imprime o primeiro chaveiro.
//
// Só roda no modo local: precisa de `pnpm local:up` e de `pnpm dev` no ar (o jogador
// gif@bobi.local é apagado e recriado a cada execução). Precisa do ffmpeg instalado.
// Uso: pnpm demo:gif                      → http://localhost:3000
//      DEMO_BASE_URL=http://localhost:3200 pnpm demo:gif
import { chromium } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const BASE = process.env.DEMO_BASE_URL ?? "http://localhost:3000";
const OUT = "docs/media/bobi-demo.gif";
const EMAIL = "gif@bobi.local";
const VIEW = { width: 390, height: 844 };

if (!existsSync(".env.development.local")) {
  console.error("✖ Rode `pnpm local:up` antes: o GIF é gravado contra o Supabase local.");
  process.exit(1);
}
process.loadEnvFile(".env.development.local");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!["localhost", "127.0.0.1"].includes(new URL(url).hostname)) {
  console.error("✖ Só para o Supabase local.");
  process.exit(1);
}

/* --- Jogador novo, com sessão aberta sem Google (mesmo método de dev-session.mjs) --- */
const admin = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
for (let page = 1; ; page++) {
  const { data } = await admin.auth.admin.listUsers({ page, perPage: 200 });
  const old = data.users.find((u) => u.email === EMAIL);
  if (old) await admin.auth.admin.deleteUser(old.id);
  if (old || data.users.length < 200) break;
}
await admin.auth.admin.createUser({ email: EMAIL, email_confirm: true });
const { data: link, error } = await admin.auth.admin.generateLink({ type: "magiclink", email: EMAIL });
if (error) throw error;
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });
const { data: verified, error: vErr } = await anon.auth.verifyOtp({ token_hash: link.properties.hashed_token, type: "magiclink" });
if (vErr) throw vErr;
const value = "base64-" + Buffer.from(JSON.stringify(verified.session)).toString("base64url");
const name = `sb-${new URL(url).hostname.split(".")[0]}-auth-token`;
const CHUNK = 3180;
const parts = value.length <= CHUNK ? [[name, value]] : Array.from({ length: Math.ceil(value.length / CHUNK) }, (_, i) => [`${name}.${i}`, value.slice(i * CHUNK, (i + 1) * CHUNK)]);
const cookies = parts.map(([n, v]) => ({ name: n, value: v, domain: new URL(BASE).hostname, path: "/", sameSite: "Lax" }));

/* --- Toque visível e sem o indicador do Next no vídeo --- */
const INIT = () => {
  const style = document.createElement("style");
  style.textContent = `nextjs-portal{display:none!important}
  .demo-tap{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;pointer-events:none;z-index:2147483647;
  background:rgba(82,53,104,.35);border:3px solid rgba(82,53,104,.85);animation:demo-tap .6s ease-out forwards}
  @keyframes demo-tap{from{transform:scale(.4);opacity:1}to{transform:scale(1.4);opacity:0}}`;
  document.addEventListener("DOMContentLoaded", () => document.head.appendChild(style));
  addEventListener("pointerdown", (e) => {
    const dot = document.createElement("div");
    dot.className = "demo-tap";
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 700);
  }, true);
};

const browser = await chromium.launch();

// Aquecimento: o `next dev` compila cada rota na primeira visita; fora do vídeo.
{
  const warm = await browser.newContext({ viewport: VIEW });
  await warm.addCookies(cookies);
  const p = await warm.newPage();
  for (const r of ["/", "/onboarding", "/trilha", "/licao/l01", "/oficina", "/oficina/nivelar", "/perfil"])
    await p.goto(BASE + r).catch(() => undefined);
  await warm.close();
  // A visita à lição reservou a atividade para o "aparelho" do aquecimento (DD008): libera.
  await admin.from("activity_leases").delete().eq("user_id", verified.user.id);
}

const videoDir = mkdtempSync(path.join(tmpdir(), "bobi-gif-"));
const ctx = await browser.newContext({ viewport: VIEW, recordVideo: { dir: videoDir, size: VIEW } });
await ctx.addInitScript(INIT);
const page = await ctx.newPage();
const T0 = Date.now();
const pause = (ms) => page.waitForTimeout(ms);
const tap = async (locator, wait = 500) => {
  await locator.click();
  await pause(wait);
};
const check = () => tap(page.getByRole("button", { name: "Verificar" }), 900);
const next = () => tap(page.getByRole("button", { name: /^(Continuar|Concluir)$/ }), 700);

// Boas-vindas
await page.goto(BASE + "/");
await page.waitForLoadState("networkidle");
// O botão do modo local não existe na versão publicada: fora do GIF.
await page.getByRole("button", { name: /modo local/ }).evaluate((b) => b.closest("form")?.remove()).catch(() => undefined);
const loadedAt = Date.now();
await pause(1800);
await ctx.addCookies(cookies);

// Onboarding
await page.goto(BASE + "/onboarding");
await page.waitForLoadState("networkidle"); // digitar antes da hidratação apaga o campo
await pause(800);
await page.getByLabel("Como quer ser chamado?").pressSequentially("maker_ana", { delay: 70 });
await tap(page.getByText("Carretel de filamento"));
await page.getByLabel("Data de nascimento").fill("2012-05-10");
await pause(600);
await tap(page.getByRole("button", { name: "Começar a aprender" }), 1600);

// Trilha → L01
await page.getByRole("link", { name: /L01 · O que é impressão 3D/ }).waitFor();
await pause(1200);
await tap(page.getByRole("link", { name: /L01 · O que é impressão 3D/ }), 1500);
await tap(page.getByRole("button", { name: "Continuar" }), 1300);
await tap(page.getByRole("button", { name: "Vamos descobrir!" }), 1500);

// A01: erro → "Entenda os termos" → erro → dica → acerto
await tap(page.getByRole("radio", { name: /corta material de um bloco/ }));
await check();
await pause(1200);
await tap(page.getByRole("button", { name: /Entenda os termos/ }), 3200);
await tap(page.getByRole("button", { name: "Tentar de novo" }));
await tap(page.getByRole("radio", { name: /fotografia/ }));
await check();
await tap(page.getByRole("button", { name: /Ver dica/ }), 2600);
await tap(page.getByRole("button", { name: "Tentar de novo" }));
await tap(page.getByRole("radio", { name: /deposita material/ }));
await check();
await pause(1300);
await next();

// A02: associação
for (const [l, r] of [
  ["Modelo 3D", "Representação digital do objeto."],
  ["Impressora 3D", "Máquina que imprime a peça."],
  ["Peça impressa", "Objeto físico produzido."],
]) {
  await tap(page.getByRole("button", { name: l, exact: true }), 300);
  await tap(page.getByRole("button", { name: r }), 400);
}
await check();
await pause(900);
await next();

// A03: ordenação
for (const t of ["Escolher ou criar um modelo 3D.", "Preparar o arquivo para a impressora.", "Imprimir a peça."])
  await tap(page.getByRole("list", { name: "Cartões disponíveis" }).getByRole("button", { name: t }), 450);
await check();
await pause(900);
await next();

// A04: diagnóstico visual → conclusão
await tap(page.getByRole("radio", { name: /parcialmente construído/ }), 700);
await check();
await pause(900);
await next();
await page.getByText("Lição concluída!").waitFor();
await pause(3200);

// Oficina: nivelar a mesa (cenário inicial fl=+2, fr=-3, bl=+3, br=+1) e imprimir
await tap(page.getByRole("link", { name: "Ir para a oficina" }), 1600);
await tap(page.getByRole("link", { name: "Nivelar a mesa" }), 1300);
const corner = async (label, dir, n) => {
  await tap(page.getByRole("button", { name: new RegExp(`^${label}`) }), 300);
  for (let i = 0; i < n; i++) await tap(page.getByRole("button", { name: new RegExp(dir) }), 220);
};
await corner("Frente esquerda", "Aproximar bico", 2);
await corner("Frente direita", "Afastar bico", 3);
await corner("Fundo esquerdo", "Aproximar bico", 3);
await corner("Fundo direito", "Aproximar bico", 1);
await tap(page.getByRole("button", { name: "Imprimir camada de teste" }), 600);
await page.getByText("Primeira camada perfeita!").waitFor();
await pause(1800);
await tap(page.getByRole("link", { name: "Voltar para a oficina" }), 1200);
await tap(page.getByRole("button", { name: "Imprimir" }).first(), 2800);
await page.reload();
await pause(600);
await tap(page.getByRole("button", { name: "Coletar peça" }), 2400);

const video = page.video();
await ctx.close();
await browser.close();
const webm = await video.path();

/* --- WebM → GIF (paleta própria, 10 fps, 300 px de largura) --- */
// Corta o início: carregamento em branco e o instante antes de sumir o botão do modo local.
const skip = ((loadedAt - T0) / 1000 + 0.2).toFixed(2);
mkdirSync(path.dirname(OUT), { recursive: true });
const filters = "fps=10,scale=300:-1:flags=lanczos";
const palette = path.join(videoDir, "palette.png");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", skip, "-i", webm, "-vf", `${filters},palettegen=max_colors=128:stats_mode=diff`, palette]);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", skip, "-i", webm, "-i", palette, "-lavfi", `${filters} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle`, OUT]);
rmSync(videoDir, { recursive: true, force: true });
console.log(`✔ ${OUT} (${(statSync(OUT).size / 1024 / 1024).toFixed(1)} MB)`);
