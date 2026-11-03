import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { PageLoading } from "@/components/page-loading";
import { requireAdmin } from "@/lib/admin";
import { PERIODS, loadReport, type Period } from "@/lib/admin-report";
import { signOutAdmin } from "./actions";
import {
  AssessmentsTable,
  DailyChart,
  ExitsSection,
  HardestTable,
  KpiGrid,
  LessonsTable,
  PlayersTable,
  RetentionSection,
  Section,
} from "./dashboard";

export const metadata: Metadata = { title: "Painel administrativo" };

/**
 * Painel de relatórios (DD026, RF039): somente leitura. Mostra uso, aprendizagem,
 * tempo por atividade, saídas e retenção depois de um erro.
 */
export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b-2 border-structure-line bg-surface">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Logo className="text-2xl" />
            <span className="badge">Painel administrativo</span>
          </div>
          <form action={signOutAdmin}>
            <button type="submit" className="btn-ghost min-h-10 w-auto px-3 text-sm">
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6">
        <Suspense fallback={<PageLoading />}>
          <Dashboard searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}

async function Dashboard({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  // Relatório sempre do momento da requisição (usa a hora atual).
  await connection();
  await requireAdmin();
  const { dias } = await searchParams;
  const days = (PERIODS as readonly number[]).includes(Number(dias)) ? (Number(dias) as Period) : 30;
  const report = await loadReport(days);
  const generated = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(report.generatedAt));

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black">Como a turma está aprendendo</h1>
          <p className="text-sm text-structure-soft-text">
            Últimos {days} dias · atualizado em {generated} (horário de Brasília)
          </p>
        </div>
        <nav aria-label="Período" className="flex gap-1 rounded-2xl border-2 border-structure-line bg-surface p-1">
          {PERIODS.map((p) => (
            <Link
              key={p}
              href={`/admin?dias=${p}`}
              aria-current={p === days ? "page" : undefined}
              className={`rounded-xl px-3 py-1.5 text-sm font-black ${
                p === days ? "bg-structure-purple text-white" : "text-structure-soft-text hover:bg-background"
              }`}
            >
              {p} dias
            </Link>
          ))}
        </nav>
      </div>

      {report.kpis.players === 0 ? (
        <div className="card flex flex-col gap-2">
          <p className="font-black">Ainda não há jogadores.</p>
          <p className="text-structure-soft-text">
            Os indicadores aparecem assim que alguém criar o perfil e responder às primeiras atividades. No modo local,{" "}
            <code className="font-mono">pnpm local:demo</code> cria jogadores de demonstração.
          </p>
        </div>
      ) : (
        <>
          <KpiGrid kpis={report.kpis} />
          <Section title="Jogadores ativos por dia" description="Pessoas que responderam ou abriram uma atividade no dia. Passe o mouse para ver as respostas.">
            <DailyChart points={report.daily} />
          </Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <RetentionSection retention={report.retention} />
            <ExitsSection exits={report.exits} />
          </div>
          <Section title="Trilha: lição por lição" description="Quem começou e concluiu cada lição no período, acerto de primeira, erros e tempo de resposta.">
            <LessonsTable lessons={report.lessons} />
          </Section>
          <div className="grid gap-6 lg:grid-cols-2">
            <Section title="Atividades mais difíceis" description="Maior taxa de erro na primeira tentativa (mínimo de 2 jogadores).">
              <HardestTable rows={report.hardest} />
            </Section>
            <Section title="Avaliações de domínio" description="Aprovação a partir de 4 de 5 acertos (PD003).">
              <AssessmentsTable rows={report.assessments} />
            </Section>
          </div>
          <Section title="Jogadores" description="Só apelido e faixa etária: nome, e-mail e data de nascimento não aparecem (RNF015).">
            <PlayersTable rows={report.players} />
          </Section>
        </>
      )}
    </>
  );
}
