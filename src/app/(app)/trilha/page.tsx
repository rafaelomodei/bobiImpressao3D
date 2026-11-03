import type { Metadata } from "next";
import { CarameloPlaceholder } from "@/components/caramelo-placeholder";
import { PageShell } from "@/components/page-shell";
import { MUNDOS } from "@/content/trilha";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Trilha" };

export default function TrilhaPage() {
  return (
    <PageShell title="Sua trilha">
      <Trilha />
    </PageShell>
  );
}

async function Trilha() {
  const profile = await requireProfile();

  return (
    <div className="flex flex-col gap-8">
      <div className="card flex items-center gap-4">
        <CarameloPlaceholder size={64} />
        <p>
          <span className="font-extrabold">E aí, {profile.nickname}!</span>{" "}
          <span className="text-structure-soft-text">A primeira missão chega no próximo incremento.</span>
        </p>
      </div>

      {MUNDOS.map((mundo, mi) => (
        <section key={mundo.id} aria-labelledby={`mundo-${mundo.id}`} className="flex flex-col gap-3">
          <h2
            id={`mundo-${mundo.id}`}
            className="rounded-2xl bg-structure-purple px-5 py-3 text-lg font-black text-surface"
          >
            Mundo {mi + 1} · {mundo.titulo}
          </h2>
          <ol className="flex flex-col items-center gap-3 py-2">
            {mundo.licoes.map((titulo, li) => {
              const numero = mi * 8 + li + 1;
              const atual = numero === 1;
              const offset = ["", "translate-x-10", "translate-x-14", "translate-x-10", "", "-translate-x-10", "-translate-x-14", "-translate-x-10"][li];
              return (
                <li key={titulo} className={`flex flex-col items-center gap-1 ${offset}`}>
                  <span
                    className={`grid size-16 place-items-center rounded-full text-xl font-black ${
                      atual
                        ? "bg-brand-primary text-structure-deep shadow-[0_5px_0_var(--color-brand-primary-pressed)]"
                        : "bg-structure-soft/25 text-structure-soft-text"
                    }`}
                    aria-hidden
                  >
                    {atual ? "★" : "🔒"}
                  </span>
                  <span className="max-w-40 text-center text-xs font-bold">
                    L{String(numero).padStart(2, "0")} · {titulo}
                    <span className="sr-only">{atual ? " (próxima missão)" : " (bloqueada)"}</span>
                  </span>
                </li>
              );
            })}
            <li className="flex flex-col items-center gap-1">
              <span className="grid size-20 place-items-center rounded-3xl bg-structure-soft/25 text-3xl" aria-hidden>
                🏅
              </span>
              <span className="text-xs font-bold">Avaliação do Mundo {mi + 1}</span>
            </li>
          </ol>
        </section>
      ))}
    </div>
  );
}
