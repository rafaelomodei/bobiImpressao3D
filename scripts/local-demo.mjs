// Gera jogadores de DEMONSTRAÇÃO no Supabase local para o painel /admin ter o que mostrar.
// São dados sintéticos (contas demo-XX@bobi.local, apelidos demo_*), nunca reais.
// Só roda com o Supabase em localhost. Rodar de novo apaga e recria os jogadores demo.
// Uso: pnpm local:demo [quantidade=24]
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

for (const f of [".env.development.local", ".env.local"]) if (existsSync(f)) process.loadEnvFile(f);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
if (!["localhost", "127.0.0.1"].includes(new URL(url || "http://x").hostname)) {
  console.error("✖ Só para o Supabase local. Rode `pnpm local:up` antes (o banco remoto nunca recebe dados demo).");
  process.exit(1);
}
const db = createClient(url, process.env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
const COUNT = Math.min(60, Math.max(1, Number(process.argv[2]) || 24));

/* --- Conteúdo: ids de lições, atividades e avaliações lidos dos arquivos --- */
const lessons = [];
const assessments = {};
for (const w of ["m1", "m2", "m3"]) {
  const dir = path.join("src/content/mundos", w);
  for (const file of readdirSync(dir).sort()) {
    const src = readFileSync(path.join(dir, file), "utf8");
    const lessonId = src.match(/id: "(BOBI-M0\d-L\d{2})"/)?.[1];
    const avId = src.match(/id: "(BOBI-M0\d-AV\d{2})"/)?.[1];
    if (lessonId) lessons.push({ id: lessonId, activities: [...src.matchAll(/id: "(A\d{2})"/g)].map((m) => m[1]) });
    if (avId) assessments[avId.slice(5, 8)] = { id: avId, questions: [...src.matchAll(/id: "(Q\d{2})"/g)].map((m) => m[1]) };
  }
}
lessons.sort((a, b) => a.id.localeCompare(b.id));

/* --- Aleatoriedade reprodutível --- */
let seed = 20261103;
const rand = () => ((seed = (seed * 1664525 + 1013904223) % 2 ** 32) / 2 ** 32);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const chance = (p) => rand() < p;
const DAY = 86400_000;

const NAMES = ["ana", "beto", "caio", "duda", "edu", "fefa", "gabi", "hugo", "isa", "joao", "kaka", "leo", "malu", "nina", "otto", "pri", "rafa", "sol", "teo", "uli", "vivi", "will", "yara", "zeca"];
const AVATARS = ["caramelo-oculos", "carretel", "bico-quente", "engrenagem", "chaveiro", "cubo"];

/* --- Limpa demos anteriores (cascata apaga perfil e progresso) --- */
for (let page = 1; ; page++) {
  const { data } = await db.auth.admin.listUsers({ page, perPage: 200 });
  for (const u of data.users) if (/^demo-\d+@bobi\.local$/.test(u.email ?? "")) await db.auth.admin.deleteUser(u.id);
  if (data.users.length < 200) break;
}

const rows = { attempts: [], events: [], progress: [], ledger: [], assessments: [], profiles: [] };
const now = Date.now();

for (let n = 1; n <= COUNT; n++) {
  const email = `demo-${String(n).padStart(2, "0")}@bobi.local`;
  const { data, error } = await db.auth.admin.createUser({ email, email_confirm: true });
  if (error) throw error;
  const uid = data.user.id;
  const skill = 0.45 + rand() * 0.45; // chance de acertar cada tentativa
  const grit = 0.5 + rand() * 0.45; // chance de continuar depois de errar
  const speed = 0.6 + rand() * 1.4; // multiplicador de tempo de resposta
  const age = chance(0.6) ? 11 + Math.floor(rand() * 7) : 18 + Math.floor(rand() * 25);
  const joined = now - (2 + rand() * 28) * DAY;
  rows.profiles.push({
    user_id: uid,
    nickname: `demo_${NAMES[(n - 1) % NAMES.length]}${n > NAMES.length ? n : ""}`,
    avatar_id: pick(AVATARS),
    birth_date: new Date(now - age * 365.25 * DAY - rand() * 300 * DAY).toISOString().slice(0, 10),
    ranking_opt_in: age >= 18 && chance(0.5),
    created_at: new Date(joined).toISOString(),
  });

  let t = joined + 60_000;
  let quitForGood = false;
  const at = () => new Date(t).toISOString();
  const nextSession = () => {
    t += (0.5 + rand() * 2.5) * DAY;
    return t < now;
  };

  for (const lesson of lessons) {
    if (quitForGood || t >= now) break;
    rows.events.push({ user_id: uid, event: "activity_open", context_id: lesson.id, activity_id: null, after_error: false, created_at: at() });
    t += 8_000 + rand() * 15_000; // abertura do Caramelo
    let errors = 0;
    let abandoned = false;
    for (const act of lesson.activities) {
      for (let attemptNo = 1; ; attemptNo++) {
        const dur = Math.round((3_000 + rand() * 20_000) * speed * (attemptNo > 1 ? 0.6 : 1));
        t += dur;
        const correct = chance(Math.min(0.97, skill + (attemptNo - 1) * 0.18));
        rows.attempts.push({
          user_id: uid, context_id: lesson.id, activity_id: act, content_version: "demo", attempt_no: attemptNo,
          is_correct: correct, hint_used: attemptNo > 2 && chance(0.6), is_review: false, answer: {}, duration_ms: dur, created_at: at(),
        });
        if (correct) break;
        errors++;
        t += 2_000 + rand() * 4_000;
        if (!chance(grit)) {
          // Saiu logo após o erro: pelo X, fechando o app ou só parando.
          const how = rand();
          if (how < 0.45) rows.events.push({ user_id: uid, event: "activity_exit", context_id: lesson.id, activity_id: act, after_error: true, created_at: at() });
          else if (how < 0.85) rows.events.push({ user_id: uid, event: "app_left", context_id: lesson.id, activity_id: act, after_error: true, created_at: at() });
          if (chance(0.35) || !nextSession()) {
            quitForGood = true;
            abandoned = true;
            break;
          }
          rows.events.push({ user_id: uid, event: "activity_open", context_id: lesson.id, activity_id: null, after_error: false, created_at: at() });
        }
      }
      if (abandoned) break;
      t += 1_500 + rand() * 2_500;
    }
    if (abandoned) {
      rows.progress.push({ user_id: uid, lesson_id: lesson.id, content_version: "demo", current_step: 1, status: "in_progress", first_completed_at: null, last_completed_at: null, completions: 0, updated_at: at() });
      break;
    }
    rows.progress.push({
      user_id: uid, lesson_id: lesson.id, content_version: "demo", current_step: 0, status: "completed",
      first_completed_at: at(), last_completed_at: at(), completions: 1, updated_at: at(),
    });
    rows.ledger.push({
      user_id: uid, event_key: `lesson:${lesson.id}:first`, xp: Math.max(5, 20 - 2 * errors), fios: 10,
      competitive_xp: Math.max(5, 20 - 2 * errors), reason: `Demo ${lesson.id}`, day: at().slice(0, 10),
    });

    // Fim do mundo: avaliação de domínio (pode reprovar e tentar de novo).
    const av = lesson.id.endsWith("L08") || lesson.id.endsWith("L16") || lesson.id.endsWith("L24") ? assessments[lesson.id.slice(5, 8)] : null;
    if (av && !chance(0.15)) {
      for (let tries = 0; tries < 3 && t < now; tries++) {
        const started = at();
        rows.events.push({ user_id: uid, event: "activity_open", context_id: av.id, activity_id: null, after_error: false, created_at: started });
        let score = 0;
        for (const q of av.questions) {
          const dur = Math.round((6_000 + rand() * 25_000) * speed);
          t += dur;
          const correct = chance(Math.min(0.95, skill + 0.1 + tries * 0.1));
          score += correct ? 1 : 0;
          rows.attempts.push({
            user_id: uid, context_id: av.id, activity_id: q, content_version: "demo", attempt_no: 1,
            is_correct: correct, hint_used: false, is_review: false, answer: {}, duration_ms: dur, created_at: at(),
          });
        }
        const passed = score >= 4;
        rows.assessments.push({ user_id: uid, assessment_id: av.id, content_version: "demo", status: "finished", score, passed, started_at: started, finished_at: at() });
        if (passed) {
          rows.ledger.push({ user_id: uid, event_key: `assessment:${av.id}:first`, xp: 30 - 3 * (5 - score), fios: 15, competitive_xp: 30 - 3 * (5 - score), reason: `Demo ${av.id}`, day: at().slice(0, 10) });
          break;
        }
        if (!nextSession()) break;
      }
      if (!rows.assessments.some((a) => a.user_id === uid && a.assessment_id === av.id && a.passed)) break;
    }
    // Entre lições: às vezes continua na mesma sessão, às vezes volta outro dia.
    if (chance(0.45)) {
      if (!nextSession()) break;
    } else t += 20_000 + rand() * 60_000;
  }
}

/* --- Grava (descarta o que passou de agora) --- */
const past = (r) => (r.created_at ?? r.first_completed_at ?? r.started_at ?? r.updated_at ?? "") <= new Date(now).toISOString();
async function insert(table, list) {
  for (let i = 0; i < list.length; i += 500) {
    const { error } = await db.from(table).insert(list.slice(i, i + 500));
    if (error) throw new Error(`${table}: ${error.message}`);
  }
}
await insert("profiles", rows.profiles);
await insert("activity_attempts", rows.attempts.filter(past));
await insert("session_events", rows.events.filter(past));
await insert("lesson_progress", rows.progress.filter(past));
await insert("assessment_attempts", rows.assessments.filter(past));
await insert("wallet_ledger", rows.ledger);

console.log(`✔ ${COUNT} jogadores de demonstração criados: ${rows.attempts.length} respostas, ${rows.events.length} eventos.
  Abra http://localhost:3000/admin/entrar e entre com a conta de demonstração.`);
