import Link from "next/link";
import { Suspense } from "react";
import { Caramelo } from "@/components/game/caramelo";
import { GoogleButton } from "@/components/google-button";
import { Logo } from "@/components/logo";
import { signInLocal } from "@/app/auth/actions";
import { devLoginEnabled } from "@/lib/dev-login";
import { demoTesterEnabled } from "@/lib/tester";

/** DD012: boas-vindas com login Google antes de qualquer lição. */
export default function WelcomePage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-between gap-4 px-4 py-6 [@media(min-height:700px)]:gap-6 [@media(min-height:700px)]:py-10">
      <header className="flex flex-col items-center gap-2 text-center">
        <Logo className="text-4xl [@media(min-height:700px)]:text-5xl" />
        <p className="text-base font-bold text-structure-soft-text [@media(min-height:700px)]:text-lg">
          O jeito divertido de aprender impressão 3D.
        </p>
      </header>

      <section className="flex flex-col items-center gap-4 text-center">
        <Caramelo pose="talk" size={200} className="animate-pop h-[min(200px,19dvh)] w-auto" />
        <div className="card relative w-full text-left">
          <p className="font-extrabold">Oi! Eu sou o Caramelo. 🐾</p>
          <p className="mt-1 text-structure-soft-text">
            Vou te mostrar como uma ideia vira um objeto de verdade, camada por camada.
          </p>
        </div>
      </section>

      <footer className="flex flex-col gap-3">
        <Suspense fallback={null}>
          <LoginError searchParams={searchParams} />
        </Suspense>
        <GoogleButton />
        {devLoginEnabled() && (
          <form action={signInLocal}>
            <button type="submit" className="btn-secondary">
              Entrar sem Google (modo local)
            </button>
          </form>
        )}
        <p className="text-center text-xs text-structure-soft-text">
          Ao entrar, você usa sua conta Google só para acessar o bobi. Seu nome e sua foto não aparecem para ninguém.
        </p>
        <nav aria-label="Acessos de avaliação" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-bold">
          {demoTesterEnabled() && (
            <Link href="/teste" className="text-structure-purple underline underline-offset-2">
              Conta de teste (avaliação)
            </Link>
          )}
          <Link href="/admin/entrar" className="text-structure-purple underline underline-offset-2">
            Área administrativa (relatórios)
          </Link>
        </nav>
      </footer>
    </main>
  );
}

async function LoginError({ searchParams }: { searchParams: PageProps<"/">["searchParams"] }) {
  const { erro, motivo } = await searchParams;
  if (erro !== "login") return null;
  return (
    <div role="alert" className="text-center text-sm font-bold text-feedback-error">
      <p>⚠ Não deu para entrar agora. Tente de novo.</p>
      {typeof motivo === "string" && motivo && (
        <p className="mt-1 text-xs font-semibold text-structure-soft-text">Detalhe: {motivo}</p>
      )}
    </div>
  );
}
