import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Lição" };

/** Rota reservada para o motor de lições (incremento B). */
export default function LicaoPage({ params }: PageProps<"/licao/[id]">) {
  return (
    <PageShell title="Lição">
      <Licao params={params} />
    </PageShell>
  );
}

async function Licao({ params }: { params: PageProps<"/licao/[id]">["params"] }) {
  await requireProfile();
  const { id } = await params;
  return (
    <div className="card flex flex-col gap-3">
      <p className="font-extrabold">A lição {id} chega no incremento B.</p>
      <Link href="/trilha" className="font-bold text-structure-purple underline">
        Voltar para a trilha
      </Link>
    </div>
  );
}
