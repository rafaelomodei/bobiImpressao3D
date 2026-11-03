import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ageFromBirthDate, requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Ranking" };

export default function RankingPage() {
  return (
    <PageShell title="Ranking semanal">
      <Ranking />
    </PageShell>
  );
}

/** DD015: lista global só para 18+ com opt-in; menores veem o próprio XP semanal. */
async function Ranking() {
  const profile = await requireProfile();
  const adulto = ageFromBirthDate(profile.birth_date) >= 18;

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <p className="text-sm font-bold text-structure-soft-text">Seu XP nesta semana</p>
        <p className="text-4xl font-black">0 XP</p>
      </div>
      <div className="card text-structure-soft-text">
        {adulto
          ? "O ranking global abre quando as primeiras lições estiverem no ar. Você poderá escolher participar."
          : "Por enquanto, o ranking global é só para maiores de 18 anos. Continue somando XP: seu progresso fica aqui."}
      </div>
    </div>
  );
}
