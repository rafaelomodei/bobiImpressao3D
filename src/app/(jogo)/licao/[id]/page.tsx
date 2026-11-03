import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { findLesson, toPublicLesson } from "@/content";
import { LessonPlayer } from "@/components/game/lesson-player";
import { LoadingScreen } from "@/components/game/player-parts";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Lição" };

export default function LicaoPage({ params }: PageProps<"/licao/[id]">) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Licao params={params} />
    </Suspense>
  );
}

async function Licao({ params }: { params: PageProps<"/licao/[id]">["params"] }) {
  await requireProfile();
  const { id } = await params;
  const found = findLesson(id);
  if (!found) notFound();
  // Somente a projeção pública vai ao navegador: sem gabarito (DD001).
  return <LessonPlayer lesson={toPublicLesson(found.lesson, found.world)} />;
}
