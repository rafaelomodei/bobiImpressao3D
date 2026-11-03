import { Suspense, type ReactNode } from "react";

/** Estrutura padrão das telas do app: título estático + conteúdo do usuário em Suspense. */
export function PageShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6">
      <h1 className="text-2xl font-black">{title}</h1>
      <Suspense fallback={<div className="card animate-pulse text-structure-soft-text">Carregando…</div>}>
        {children}
      </Suspense>
    </main>
  );
}
