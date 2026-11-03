import type { Metadata } from "next";
import { signOut } from "@/app/auth/actions";
import { PageShell } from "@/components/page-shell";
import { RankingToggle } from "@/components/game/ranking-toggle";
import { getAvatar } from "@/lib/avatars";
import { ageFromBirthDate, requireProfile } from "@/lib/dal";
import { getPlayerSnapshot } from "@/lib/game/server";
import { getWorkshopState } from "@/lib/game/workshop";

export const metadata: Metadata = { title: "Perfil" };

export default function PerfilPage() {
  return (
    <PageShell title="Perfil">
      <Perfil />
    </PageShell>
  );
}

async function Perfil() {
  const profile = await requireProfile();
  const avatar = getAvatar(profile.avatar_id);
  const [snap, ws] = await Promise.all([getPlayerSnapshot(profile.user_id), getWorkshopState(profile.user_id)]);
  const adult = ageFromBirthDate(profile.birth_date) >= 18;
  const lessonsDone = snap.completedLessons.size;
  const printed = Object.values(ws.inventory).reduce((s, n) => s + n, 0);

  const achievements = [
    { icon: "🐾", title: "Primeiro passo", desc: "Concluir a primeira lição", done: lessonsDone >= 1 },
    { icon: "🏅", title: "Mundo 1 dominado", desc: "Passar na avaliação do Mundo 1", done: snap.passedAssessments.has("BOBI-M01-AV01") },
    { icon: "🛠️", title: "Mão na massa", desc: "Passar na avaliação do Mundo 2", done: snap.passedAssessments.has("BOBI-M02-AV02") },
    { icon: "🔑", title: "Primeira impressão", desc: "Passar na avaliação do Mundo 3", done: snap.passedAssessments.has("BOBI-M03-AV03") },
    { icon: "🔥", title: "Embalado", desc: "Sequência de 3 dias", done: snap.streak >= 3 },
    { icon: "📏", title: "Mesa no prumo", desc: "Nivelar a mesa na oficina", done: ws.leveled },
    { icon: "📦", title: "Colecionador", desc: "Fabricar 3 peças", done: printed >= 3 },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="card flex items-center gap-4">
        <span className="grid size-20 shrink-0 place-items-center rounded-full text-4xl" style={{ background: avatar.bg }} aria-label={avatar.label} role="img">
          {avatar.emoji}
        </span>
        <div>
          <p className="text-2xl font-black">{profile.nickname}</p>
          <p className="text-sm font-bold text-structure-soft-text">{lessonsDone}/24 lições · {snap.passedAssessments.size}/3 avaliações</p>
        </div>
      </div>

      <section aria-labelledby="estatisticas" className="grid grid-cols-2 gap-3">
        <h2 id="estatisticas" className="sr-only">Estatísticas</h2>
        <Stat icon="🔥" value={snap.streak} label="dias de sequência" />
        <Stat icon="⭐" value={snap.xp} label="XP total" />
        <Stat icon="🧵" value={snap.fios} label="Fios" />
        <Stat icon="📦" value={printed} label="peças fabricadas" />
      </section>

      <section aria-labelledby="conquistas" className="flex flex-col gap-3">
        <h2 id="conquistas" className="text-lg font-black">Conquistas</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {achievements.map((a) => (
            <li key={a.title} className={`card flex items-center gap-3 p-3 ${a.done ? "border-brand-caramel" : "opacity-60"}`}>
              <span aria-hidden className={`grid size-12 place-items-center rounded-2xl text-2xl ${a.done ? "bg-brand-cream" : "bg-locked grayscale"}`}>
                {a.icon}
              </span>
              <div>
                <p className="font-black">{a.title}</p>
                <p className="text-sm text-structure-soft-text">
                  {a.desc}
                  <span className="sr-only">{a.done ? " (conquistada)" : " (ainda não)"}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="privacidade" className="card flex flex-col gap-3">
        <h2 id="privacidade" className="text-lg font-black">Ranking e privacidade</h2>
        {adult ? (
          <RankingToggle initial={profile.ranking_opt_in} />
        ) : (
          <p className="text-sm text-structure-soft-text">O ranking global é só para maiores de 18 anos. Seu XP semanal aparece só para você.</p>
        )}
        <p className="text-xs text-structure-soft-text">No ranking aparecem apenas seu apelido e avatar. Nome, foto e e-mail do Google nunca são exibidos.</p>
      </section>

      <form action={signOut}>
        <button type="submit" className="btn-secondary">Sair</button>
      </form>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <span aria-hidden className="text-3xl">{icon}</span>
      <div>
        <p className="text-2xl leading-none font-black">{value}</p>
        <p className="text-xs font-bold text-structure-soft-text">{label}</p>
      </div>
    </div>
  );
}
