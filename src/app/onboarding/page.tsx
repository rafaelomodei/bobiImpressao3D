import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Logo } from "@/components/logo";
import { getOwnProfile, todayInSaoPaulo } from "@/lib/dal";
import { OnboardingForm } from "./onboarding-form";
import { PageLoading } from "@/components/page-loading";

export default function OnboardingPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 px-4 py-8">
      <Logo className="text-3xl" />
      <div>
        <h1 className="text-2xl font-extrabold">Bem-vindo à oficina!</h1>
        <p className="text-structure-soft-text">Só três coisinhas antes da primeira missão.</p>
      </div>
      <Suspense fallback={<PageLoading />}>
        <OnboardingGate />
      </Suspense>
    </main>
  );
}

async function OnboardingGate() {
  const profile = await getOwnProfile();
  if (profile) redirect("/trilha");
  return <OnboardingForm today={todayInSaoPaulo()} />;
}
