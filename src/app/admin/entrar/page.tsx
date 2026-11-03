import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { DEMO_ADMIN, demoAdminEnabled } from "@/lib/admin";
import { signInAdmin } from "../actions";

export const metadata: Metadata = { title: "Painel administrativo" };

const ERRORS: Record<string, string> = {
  credenciais: "E-mail ou senha incorretos.",
  "sem-acesso": "Esta conta não tem acesso ao painel administrativo.",
};

/** Entrada do painel de relatórios (DD026). Jogadores entram pela tela inicial, com Google. */
export default function AdminSignInPage({ searchParams }: PageProps<"/admin/entrar">) {
  const demo = demoAdminEnabled();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-6 px-4 py-10">
      <header className="flex flex-col items-center gap-1 text-center">
        <Logo className="text-4xl" />
        <p className="badge">Painel administrativo</p>
        <p className="mt-2 text-structure-soft-text">
          Relatórios de uso e aprendizagem: quem jogou, onde erra, quanto tempo leva e se volta depois de errar.
        </p>
      </header>

      <form action={signInAdmin} className="card flex flex-col gap-4">
        <Suspense fallback={null}>
          <SignInError searchParams={searchParams} />
        </Suspense>
        <label className="flex flex-col gap-1 font-bold">
          E-mail
          <input name="email" type="email" required autoComplete="username" className="field" defaultValue={demo ? DEMO_ADMIN.email : ""} />
        </label>
        <label className="flex flex-col gap-1 font-bold">
          Senha
          <input name="password" type="password" required autoComplete="current-password" className="field" />
        </label>
        <button type="submit" className="btn-purple">
          Entrar no painel
        </button>
      </form>

      {demo && (
        <section className="card flex flex-col gap-2 border-brand-primary bg-brand-cream-soft" aria-labelledby="demo-title">
          <h2 id="demo-title" className="font-black">Conta de demonstração</h2>
          <p className="text-sm text-structure-soft-text">
            Projeto em estudo: use esta conta para avaliar o painel. Ela só vê relatórios; não joga nem edita conteúdo.
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-sm">
            <dt className="font-sans font-bold">E-mail</dt>
            <dd className="select-all">{DEMO_ADMIN.email}</dd>
            <dt className="font-sans font-bold">Senha</dt>
            <dd className="select-all">{DEMO_ADMIN.password}</dd>
          </dl>
        </section>
      )}

      <Link href="/" className="btn-ghost">
        Voltar para o jogo
      </Link>
    </main>
  );
}

async function SignInError({ searchParams }: { searchParams: PageProps<"/admin/entrar">["searchParams"] }) {
  const { erro } = await searchParams;
  const message = typeof erro === "string" ? ERRORS[erro] : undefined;
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-feedback-error-soft px-3 py-2 text-sm font-bold text-feedback-error">
      ⚠ {message}
    </p>
  );
}
