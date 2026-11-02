import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Oficina" };

export default function OficinaPage() {
  return (
    <PageShell title="Oficina">
      <EmBreve />
    </PageShell>
  );
}

/** DD004: oficina depois do conteúdo homologado e da homologação de PD007. */
async function EmBreve() {
  await requireProfile();
  return (
    <div className="card flex flex-col items-center gap-3 py-10 text-center">
      <span className="text-5xl" aria-hidden>🛠️</span>
      <p className="text-lg font-extrabold">A oficina do Caramelo está em montagem</p>
      <p className="text-structure-soft-text">
        Em breve você vai fabricar itens virtuais, calibrar a mesa e melhorar sua impressora.
      </p>
    </div>
  );
}
