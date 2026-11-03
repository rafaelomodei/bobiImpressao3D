// Cria (ou restaura) a CONTA DE TESTE usada por quem avalia o projeto (DD029).
// É um jogador comum que entra por e-mail e senha em /teste, sem Google. Não existe
// regra especial no jogo para ela: o script só grava no banco o progresso de quem já
// terminou tudo — 24 lições concluídas, as 3 avaliações aprovadas, XP e Fios dessas
// conquistas e um saldo extra de Fios para a oficina. Assim a trilha, as avaliações,
// a oficina, o perfil e o ranking aparecem liberados pelas regras normais.
//
// As conquistas gravadas ficam com data de 01/01/2026: não entram nos indicadores do
// período no painel /admin nem no XP semanal do ranking. O que a pessoa jogar depois
// conta normalmente.
//
// Uso: pnpm tester:create             → projeto remoto (.env.local)
//      pnpm tester:create --local     → Supabase local (.env.development.local)
//      pnpm tester:create --reset     → apaga a conta e recria do zero (oficina, compras e histórico)
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

// Mesma credencial exibida em /teste (src/lib/tester.ts).
const TESTER = { email: "avaliador@bobi.local", password: "bobi-teste-2026" };
const PROFILE = { nickname: "Avaliador", avatar_id: "caramelo-oculos", birth_date: "1990-01-01", ranking_opt_in: false };
const SEEDED_AT = "2026-01-01T12:00:00Z";
const SEEDED_DAY = "2026-01-01";
const EXTRA_FIOS = 500; // a oficina inteira custa 260 Fios; sobra para imprimir à vontade
// Mesmos valores de REWARDS em src/lib/game/rules.ts (conclusão sem erros).
const LESSON_REWARD = { xp: 20, fios: 10 };
const ASSESSMENT_REWARD = { xp: 30, fios: 15 };

const local = process.argv.includes("--local");
const reset = process.argv.includes("--reset");
const envFile = local ? ".env.development.local" : ".env.local";
if (!existsSync(envFile)) {
  console.error(`✖ ${envFile} não encontrado.${local ? " Rode `pnpm local:up` antes." : ""}`);
  process.exit(1);
}
process.loadEnvFile(envFile);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });

/* --- Ids de lições e avaliações, lidos do conteúdo --- */
const lessons = [];
const assessments = [];
for (const w of ["m1", "m2", "m3"]) {
  const dir = path.join("src/content/mundos", w);
  for (const file of readdirSync(dir).sort()) {
    const src = readFileSync(path.join(dir, file), "utf8");
    const lessonId = src.match(/id: "(BOBI-M0\d-L\d{2})"/)?.[1];
    const avId = src.match(/id: "(BOBI-M0\d-AV\d{2})"/)?.[1];
    if (lessonId) lessons.push(lessonId);
    if (avId) assessments.push({ id: avId, questions: [...src.matchAll(/id: "(Q\d{2})"/g)].map((m) => m[1]) });
  }
}
lessons.sort();
assessments.sort((a, b) => a.id.localeCompare(b.id));
if (lessons.length !== 24 || assessments.length !== 3) {
  console.error(`✖ Esperava 24 lições e 3 avaliações; encontrei ${lessons.length} e ${assessments.length}.`);
  process.exit(1);
}

/* --- Conta --- */
async function findUserId(email) {
  for (let page = 1; ; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => u.email === email);
    if (found) return found.id;
    if (data.users.length < 200) return null;
  }
}

let userId = await findUserId(TESTER.email);
if (userId && reset) {
  const { error } = await db.auth.admin.deleteUser(userId); // cascata apaga perfil, progresso e oficina
  if (error) throw error;
  userId = null;
}
if (userId) {
  const { error } = await db.auth.admin.updateUserById(userId, { password: TESTER.password });
  if (error) throw error;
} else {
  const { data, error } = await db.auth.admin.createUser({ email: TESTER.email, password: TESTER.password, email_confirm: true });
  if (error) throw error;
  userId = data.user.id;
}

const check = (what) => ({ error }) => {
  if (error) throw new Error(`${what}: ${error.message}`);
};

/* --- Perfil (pula o onboarding; adulto para o ranking aparecer, sem entrar nele) --- */
const { data: existingProfile } = await db.from("profiles").select("user_id").eq("user_id", userId).maybeSingle();
if (!existingProfile)
  await db.from("profiles").insert({ user_id: userId, ...PROFILE }).then(check("perfil (o apelido já existe?)"));

/* --- 24 lições concluídas --- */
await db
  .from("lesson_progress")
  .upsert(
    lessons.map((lesson_id) => ({
      user_id: userId,
      lesson_id,
      content_version: "conta-de-teste",
      current_step: 0,
      status: "completed",
      is_review: false,
      first_completed_at: SEEDED_AT,
      last_completed_at: SEEDED_AT,
      completions: 1,
      run_started_at: SEEDED_AT,
      updated_at: SEEDED_AT,
    })),
    { onConflict: "user_id,lesson_id" },
  )
  .then(check("lições"));

/* --- 3 avaliações aprovadas (5/5) --- */
const { data: passed } = await db.from("assessment_attempts").select("assessment_id").eq("user_id", userId).eq("passed", true);
const passedIds = new Set((passed ?? []).map((r) => r.assessment_id));
const missing = assessments.filter((a) => !passedIds.has(a.id));
if (missing.length)
  await db
    .from("assessment_attempts")
    .insert(
      missing.map((a) => ({
        user_id: userId,
        assessment_id: a.id,
        content_version: "conta-de-teste",
        answers: Object.fromEntries(a.questions.map((q) => [q, { answer: null, correct: true }])),
        status: "finished",
        score: a.questions.length,
        passed: true,
        started_at: SEEDED_AT,
        finished_at: SEEDED_AT,
      })),
    )
    .then(check("avaliações"));

/* --- XP e Fios das conquistas (mesmas chaves do jogo: não duplica) + Fios extras --- */
const ledger = [
  ...lessons.map((id) => ({ event_key: `lesson:${id}:first`, ...LESSON_REWARD, reason: `Conta de teste: ${id}` })),
  ...assessments.map((a) => ({ event_key: `assessment:${a.id}:first`, ...ASSESSMENT_REWARD, reason: `Conta de teste: ${a.id}` })),
  { event_key: "conta-de-teste:fios", xp: 0, fios: EXTRA_FIOS, reason: "Conta de teste: Fios para a oficina" },
].map((r) => ({ user_id: userId, competitive_xp: r.xp, day: SEEDED_DAY, created_at: SEEDED_AT, ...r }));
await db
  .from("wallet_ledger")
  .upsert(ledger, { onConflict: "user_id,event_key", ignoreDuplicates: true })
  .then(check("carteira"));

console.log(`✔ Conta de teste pronta em ${new URL(url).host}: ${TESTER.email} / ${TESTER.password}
  ${lessons.length} lições concluídas, ${assessments.length} avaliações aprovadas, oficina liberada com +${EXTRA_FIOS} Fios.
  Entrada: /teste`);
