import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AvatarBadge } from "@/components/avatar-badge";
import { getAvatar } from "@/lib/avatars";
import { isAdult, requireProfile } from "@/lib/dal";
import { addDays, dayInSaoPaulo, weekStart } from "@/lib/game/rules";
import { getPlayerSnapshot } from "@/lib/game/server";
import { createClient } from "@/lib/supabase/server";
import { PageLoading } from "@/components/page-loading";
import { UiIcon } from "@/components/ui-icon";

export const metadata: Metadata = { title: "Ranking" };

/** Sem título estático: até a idade ser checada, nada indica que o ranking existe (DD025). */
export default function RankingPage() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6">
      <Suspense fallback={<PageLoading />}>
        <Ranking />
      </Suspense>
    </main>
  );
}

type Row = { pos: number; nickname: string; avatar_id: string; xp: number };

/** PD008/DD015: ranking global único, semanal, opt-in, só 18+. Empate = mesma posição. */
async function Ranking() {
  const profile = await requireProfile();
  // DD025: para menores o ranking não existe — nem aba, nem página.
  if (!isAdult(profile)) notFound();
  const snap = await getPlayerSnapshot(profile.user_id);
  const ws = weekStart(dayInSaoPaulo());
  const fmt = (d: string) => d.split("-").reverse().slice(0, 2).join("/");

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("weekly_ranking", { week_start: ws, max_rows: 50 });
  const rows = (data as Row[] | null) ?? [];
  const failed = Boolean(error);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-black">Ranking semanal</h1>
      <div className="card flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-structure-soft-text">Seu XP nesta semana</p>
          <p className="flex items-center gap-2 text-4xl font-black"><UiIcon name="xp" size={40} /> {snap.weekXp}</p>
        </div>
        <p className="badge">{fmt(ws)} a {fmt(addDays(ws, 6))}</p>
      </div>

      {!profile.ranking_opt_in ? (
        <div className="card flex flex-col gap-3">
          <p className="font-bold">Você ainda não participa do ranking. Só aparecem apelido e avatar.</p>
          <Link href="/perfil" className="btn-primary">Ativar no perfil</Link>
        </div>
      ) : failed ? (
        <p role="alert" className="card font-bold text-feedback-error">⚠ Não deu para carregar o ranking agora.</p>
      ) : rows.length === 0 ? (
        <p className="card text-structure-soft-text">Ninguém pontuou nesta semana ainda. Faça uma lição e seja o primeiro!</p>
      ) : (
        <ol className="flex flex-col gap-2" aria-label="Classificação da semana">
          {rows.map((r) => {
            const me = r.nickname.toLowerCase() === profile.nickname.toLowerCase();
            const av = getAvatar(r.avatar_id);
            return (
              <li key={r.nickname} className={`card flex items-center gap-3 p-3 ${me ? "border-brand-primary bg-brand-cream-soft" : ""}`}>
                <span className={`w-8 text-center text-lg font-black ${r.pos <= 3 ? "text-brand-primary-pressed" : "text-structure-soft-text"}`}>
                  {r.pos <= 3 ? ["🥇", "🥈", "🥉"][r.pos - 1] : r.pos}
                </span>
                <AvatarBadge avatar={av} size={40} decorative />
                <span className="flex-1 font-black">{r.nickname}{me && <span className="ml-2 badge">você</span>}</span>
                <span className="font-black">{r.xp} XP</span>
              </li>
            );
          })}
        </ol>
      )}
      <p className="text-xs text-structure-soft-text">A pontuação reinicia toda segunda-feira (horário de Brasília). Revisões repetidas no mesmo dia não somam XP.</p>
    </div>
  );
}
