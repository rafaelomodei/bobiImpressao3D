import { Suspense } from "react";
import { CarameloPlaceholder } from "@/components/caramelo-placeholder";
import { GoogleButton } from "@/components/google-button";
import { Logo } from "@/components/logo";

/** DD012: boas-vindas com login Google antes de qualquer lição. */
export default function WelcomePage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between gap-8 px-4 py-10">
      <header className="flex flex-col items-center gap-2 text-center">
        <Logo className="text-5xl" />
        <p className="text-lg font-bold text-structure-soft-text">
          O jeito divertido de aprender impressão 3D.
        </p>
      </header>

      <section className="flex flex-col items-center gap-6 text-center">
        <CarameloPlaceholder size={180} />
        <div className="card relative w-full text-left">
          <p className="font-extrabold">Oi! Eu sou o Caramelo. 🐾</p>
          <p className="mt-1 text-structure-soft-text">
            Vou te mostrar como uma ideia vira um objeto de verdade, camada por camada.
          </p>
        </div>
        <ul className="grid w-full gap-2 text-left text-sm font-bold">
          <li className="card flex items-center gap-3 p-3">
            <span aria-hidden className="text-2xl">⏱️</span> Missões de 2 a 5 minutos
          </li>
          <li className="card flex items-center gap-3 p-3">
            <span aria-hidden className="text-2xl">🖨️</span> Não precisa ter impressora
          </li>
          <li className="card flex items-center gap-3 p-3">
            <span aria-hidden className="text-2xl">🔑</span> Termine imprimindo um chaveiro virtual
          </li>
        </ul>
      </section>

      <footer className="flex flex-col gap-3">
        <Suspense fallback={null}>
          <LoginError searchParams={searchParams} />
        </Suspense>
        <GoogleButton />
        <p className="text-center text-xs text-structure-soft-text">
          Ao entrar, você usa sua conta Google só para acessar o bobi. Seu nome e sua foto não aparecem para ninguém.
        </p>
      </footer>
    </main>
  );
}

async function LoginError({ searchParams }: { searchParams: PageProps<"/">["searchParams"] }) {
  const { erro } = await searchParams;
  if (erro !== "login") return null;
  return (
    <p role="alert" className="text-center text-sm font-bold text-feedback-error">
      ⚠ Não deu para entrar agora. Tente de novo.
    </p>
  );
}
