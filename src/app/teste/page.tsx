import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { DEMO_TESTER, demoTesterEnabled } from "@/lib/tester";
import { signInTester } from "./actions";

export const metadata: Metadata = { title: "Conta de teste" };

const ERRORS: Record<string, string> = {
  credenciais: "E-mail ou senha incorretos.",
  admin: "Esta é a conta do painel administrativo. Entre por /admin/entrar.",
};

/** Entrada da conta de teste (DD029). Jogadores entram pela tela inicial, com Google. */
export default function TesterSignInPage({ searchParams }: PageProps<"/teste">) {
  const demo = demoTesterEnabled();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <header className="flex flex-col items-center gap-1 text-center">
        <Logo className="text-4xl" />
        <p className="badge">Conta de teste</p>
        <p className="mt-2 text-structure-soft-text">
          Para avaliar o bobi: você entra como jogador, com os três mundos, as lições, as avaliações e a oficina já
          liberados.
        </p>
      </header>

      <form action={signInTester} className="card flex flex-col gap-4">
        <Suspense fallback={null}>
          <SignInError searchParams={searchParams} />
        </Suspense>
        <label className="flex flex-col gap-1 font-bold">
          E-mail
          <input name="email" type="email" required autoComplete="username" className="field" defaultValue={demo ? DEMO_TESTER.email : ""} />
        </label>
        <label className="flex flex-col gap-1 font-bold">
          Senha
          <input name="password" type="password" required autoComplete="current-password" className="field" />
        </label>
        <button type="submit" className="btn-primary">
          Entrar e jogar
        </button>
      </form>

      {demo && (
        <section className="card flex flex-col gap-2 border-brand-primary bg-brand-cream-soft" aria-labelledby="teste-title">
          <h2 id="teste-title" className="font-black">Credencial de avaliação</h2>
          <p className="text-sm text-structure-soft-text">
            Projeto em estudo: esta conta é compartilhada por quem avalia. Todo o progresso já vem concluído, então dá
            para abrir qualquer lição, refazer avaliações e usar a oficina.
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm">
            <dt className="font-sans font-bold">E-mail</dt>
            <dd className="select-all">{DEMO_TESTER.email}</dd>
            <dt className="font-sans font-bold">Senha</dt>
            <dd className="select-all">{DEMO_TESTER.password}</dd>
          </dl>
        </section>
      )}

      <Link href="/" className="btn-ghost">
        Voltar para a tela inicial
      </Link>
    </main>
  );
}

async function SignInError({ searchParams }: { searchParams: PageProps<"/teste">["searchParams"] }) {
  const { erro } = await searchParams;
  const message = typeof erro === "string" ? ERRORS[erro] : undefined;
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-feedback-error-soft px-3 py-2 text-sm font-bold text-feedback-error">
      ⚠ {message}
    </p>
  );
}
