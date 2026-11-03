import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { findAssessment, toPublicAssessment } from "@/content";
import { AssessmentPlayer } from "@/components/game/assessment-player";
import { LoadingScreen } from "@/components/game/player-parts";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Avaliação de domínio" };

export default function AvaliacaoPage({ params }: PageProps<"/avaliacao/[id]">) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Avaliacao params={params} />
    </Suspense>
  );
}

async function Avaliacao({ params }: { params: PageProps<"/avaliacao/[id]">["params"] }) {
  await requireProfile();
  const { id } = await params;
  const found = findAssessment(id);
  if (!found) notFound();
  return <AssessmentPlayer assessment={toPublicAssessment(found.assessment, found.world)} />;
}
