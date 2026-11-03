import type { ReactNode } from "react";
import type {
  ActivityStats,
  AssessmentStats,
  DayPoint,
  LessonStats,
  PlayerStats,
  Report,
  RetentionAfterError,
} from "@/lib/game/analytics";

/* ------------------------------------------------------------------------- */
/* Formatação                                                                  */
/* ------------------------------------------------------------------------- */

const DASH = "—";
export const pct = (v: number | null) => (v === null ? DASH : `${Math.round(v * 100)}%`);
export function duration(msValue: number | null): string {
  if (msValue === null) return DASH;
  const s = msValue / 1000;
  if (s < 60) return `${s < 10 ? s.toFixed(1).replace(".", ",") : Math.round(s)} s`;
  const m = s / 60;
  if (m < 60) return `${Math.round(m)} min`;
  const h = m / 60;
  return h < 48 ? `${Math.round(h)} h` : `${Math.round(h / 24)} dias`;
}
const dateTime = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
const shortDay = (day: string) => day.split("-").reverse().slice(0, 2).join("/");
const num = (v: number) => v.toLocaleString("pt-BR");

/* ------------------------------------------------------------------------- */
/* Estrutura                                                                   */
/* ------------------------------------------------------------------------- */

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="card flex min-w-0 flex-col gap-4">
      <div>
        <h2 className="text-lg font-black">{title}</h2>
        {description && <p className="text-sm text-structure-soft-text">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function Empty({ children = "Sem dados no período." }: { children?: ReactNode }) {
  return <p className="rounded-xl bg-background px-3 py-4 text-center text-sm font-bold text-structure-soft-text">{children}</p>;
}

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-structure-line text-left text-xs font-black tracking-wide text-structure-soft-text uppercase">
            {head.map((h, i) => (
              <th key={h} scope="col" className={`py-2 pr-4 ${i > 0 ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_td]:py-2 [&_td]:pr-4 [&_td:not(:first-child)]:text-right [&_td:not(:first-child)]:tabular-nums [&_tr]:border-b [&_tr]:border-structure-line/70">
          {children}
        </tbody>
      </table>
    </div>
  );
}

/** Barra de proporção (0–1) dentro de uma célula. */
function Meter({ value, label }: { value: number | null; label?: string }) {
  return (
    <span className="inline-flex items-center justify-end gap-2">
      <span className="h-2 w-16 overflow-hidden rounded-full bg-locked" aria-hidden>
        <span className="block h-full rounded-full bg-brand-primary" style={{ width: `${Math.round((value ?? 0) * 100)}%` }} />
      </span>
      <span className="w-10 text-right">{label ?? pct(value)}</span>
    </span>
  );
}

/* ------------------------------------------------------------------------- */
/* Indicadores                                                                 */
/* ------------------------------------------------------------------------- */

export function KpiGrid({ kpis }: { kpis: Report["kpis"] }) {
  const tiles: { label: string; value: string; note: string }[] = [
    { label: "Jogadores cadastrados", value: num(kpis.players), note: `${num(kpis.newPlayers)} novos no período` },
    { label: "Jogadores ativos", value: num(kpis.activePlayers), note: "responderam ou abriram atividade" },
    { label: "Lições concluídas", value: num(kpis.lessonsCompleted), note: "primeiras conclusões no período" },
    { label: "Respostas enviadas", value: num(kpis.answers), note: "lições e avaliações" },
    { label: "Acerto de primeira", value: pct(kpis.firstTryRate), note: "1ª tentativa nas lições" },
    { label: "Tempo por resposta", value: duration(kpis.medianAnswerMs), note: "mediana, da tela ao Verificar" },
    { label: "Uso da dica", value: pct(kpis.hintRate), note: "quando oferecida (após 2 erros)" },
    { label: "Aprovação nas avaliações", value: pct(kpis.assessmentPassRate), note: "tentativas finalizadas" },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {tiles.map((t) => (
        <li key={t.label} className="card flex flex-col gap-0.5 p-4">
          <span className="text-xs font-black tracking-wide text-structure-soft-text uppercase">{t.label}</span>
          <span className="text-3xl font-black tabular-nums">{t.value}</span>
          <span className="text-xs text-structure-soft-text">{t.note}</span>
        </li>
      ))}
    </ul>
  );
}

/** Uma série (jogadores ativos/dia): barras finas com dica ao passar o mouse ou focar. */
export function DailyChart({ points }: { points: DayPoint[] }) {
  const max = Math.max(1, ...points.map((p) => p.activeUsers));
  const labelEvery = Math.ceil(points.length / 10);
  const total = points.reduce((s, p) => s + p.activeUsers, 0);
  if (!total) return <Empty />;
  return (
    <figure className="flex flex-col gap-2">
      <div className="flex h-44 items-end gap-0.5 border-b-2 border-structure-line" role="list" aria-label="Jogadores ativos por dia">
        {points.map((p) => (
          <div
            key={p.day}
            role="listitem"
            tabIndex={0}
            aria-label={`${shortDay(p.day)}: ${p.activeUsers} jogadores, ${p.answers} respostas`}
            className="group relative flex h-full min-w-0 flex-1 items-end justify-center outline-none"
          >
            <span
              className="w-full max-w-6 rounded-t bg-brand-primary transition group-hover:bg-brand-primary-pressed group-focus-visible:bg-brand-primary-pressed"
              style={{ height: `${(p.activeUsers / max) * 100}%`, minHeight: p.activeUsers ? 4 : 0 }}
            />
            <span className="pointer-events-none absolute bottom-full z-10 mb-1 hidden w-max rounded-lg bg-structure-deep px-2 py-1 text-xs font-bold text-white group-hover:block group-focus-visible:block">
              {shortDay(p.day)} · {p.activeUsers} jogador{p.activeUsers === 1 ? "" : "es"} · {p.answers} respostas
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-0.5 text-[10px] font-bold text-structure-soft-text" aria-hidden>
        {points.map((p, i) => (
          <span key={p.day} className="min-w-0 flex-1 text-center">
            {i % labelEvery === 0 ? shortDay(p.day) : ""}
          </span>
        ))}
      </div>
      <figcaption className="text-xs text-structure-soft-text">Pico: {max} jogador{max === 1 ? "" : "es"} em um dia.</figcaption>
    </figure>
  );
}

const OUTCOMES = [
  { key: "continued", label: "Tentou de novo na hora", color: "bg-feedback-success" },
  { key: "returned", label: "Saiu e voltou depois", color: "bg-brand-caramel" },
  { key: "gone", label: "Saiu e não voltou", color: "bg-feedback-error" },
] as const;

export function RetentionSection({ retention: r }: { retention: RetentionAfterError }) {
  const exited = r.returned + r.gone;
  return (
    <Section
      title="O que acontece depois de um erro"
      description="Para cada resposta errada nas lições: a pessoa tentou de novo, saiu e voltou, ou não voltou? Saída = botão X, fechar/trocar de app ou mais de 30 min parada."
    >
      {r.errors === 0 ? (
        <Empty>Nenhum erro registrado no período.</Empty>
      ) : (
        <>
          <div className="flex h-6 w-full gap-0.5 overflow-hidden rounded-full" role="img" aria-label={OUTCOMES.map((o) => `${o.label}: ${r[o.key]}`).join(", ")}>
            {OUTCOMES.map((o) =>
              r[o.key] ? <span key={o.key} className={`${o.color} h-full`} style={{ width: `${(r[o.key] / r.errors) * 100}%` }} /> : null,
            )}
          </div>
          <ul className="flex flex-col gap-2">
            {OUTCOMES.map((o) => (
              <li key={o.key} className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 font-bold">
                  <span className={`size-3 shrink-0 rounded-full ${o.color}`} aria-hidden />
                  {o.label}
                </span>
                <span className="tabular-nums">
                  <b>{pct(r[o.key] / r.errors)}</b> <span className="text-structure-soft-text">({num(r[o.key])})</span>
                </span>
              </li>
            ))}
          </ul>
          <dl className="grid grid-cols-2 gap-3 border-t-2 border-structure-line pt-3 text-sm">
            <div>
              <dt className="text-structure-soft-text">Erros analisados</dt>
              <dd className="text-xl font-black tabular-nums">{num(r.errors)}</dd>
            </div>
            <div>
              <dt className="text-structure-soft-text">Viraram acerto depois</dt>
              <dd className="text-xl font-black tabular-nums">{pct(r.recovered / r.errors)}</dd>
            </div>
            <div>
              <dt className="text-structure-soft-text">Tempo até voltar (mediana)</dt>
              <dd className="text-xl font-black tabular-nums">{duration(r.medianReturnMs)}</dd>
            </div>
            <div>
              <dt className="text-structure-soft-text">Como saíram</dt>
              <dd className="font-bold">
                {exited === 0
                  ? DASH
                  : `X: ${r.exitKinds.button} · app: ${r.exitKinds.app} · parou: ${r.exitKinds.idle}`}
              </dd>
            </div>
          </dl>
        </>
      )}
    </Section>
  );
}

export function ExitsSection({ exits }: { exits: Report["exits"] }) {
  return (
    <Section title="Onde as pessoas saem" description="Saídas no meio de uma lição ou avaliação: pelo botão X ou saindo do app (fechar a aba, trocar de app, bloquear a tela).">
      {exits.total === 0 ? (
        <Empty>Nenhuma saída no meio de atividade no período.</Empty>
      ) : (
        <>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-structure-soft-text">Saídas</dt>
              <dd className="text-xl font-black tabular-nums">{num(exits.total)}</dd>
            </div>
            <div>
              <dt className="text-structure-soft-text">Logo após erro</dt>
              <dd className="text-xl font-black tabular-nums">{pct(exits.afterError / exits.total)}</dd>
            </div>
            <div>
              <dt className="text-structure-soft-text">Botão X · app</dt>
              <dd className="text-xl font-black tabular-nums">
                {exits.button} · {exits.app}
              </dd>
            </div>
          </dl>
          <Table head={["Onde", "Saídas", "Após erro"]}>
            {exits.spots.map((s) => (
              <tr key={`${s.contextLabel}-${s.activity}`}>
                <td>
                  <span className="block font-bold">{s.activity}</span>
                  <span className="text-xs text-structure-soft-text">{s.contextLabel}</span>
                </td>
                <td>{s.count}</td>
                <td>{s.afterError}</td>
              </tr>
            ))}
          </Table>
        </>
      )}
    </Section>
  );
}

export function LessonsTable({ lessons }: { lessons: LessonStats[] }) {
  if (!lessons.some((l) => l.started)) return <Empty />;
  return (
    <Table head={["Lição", "Começaram", "Concluíram", "Acerto de 1ª", "Erros/jogador", "Tempo/resposta", "Saídas"]}>
      {lessons.map((l) => (
        <tr key={l.id} className={l.started ? "" : "text-structure-soft-text"}>
          <td className="font-bold">
            <span className="mr-2 text-xs font-black text-structure-soft">M{l.world}</span>
            {l.label}
          </td>
          <td>{l.started}</td>
          <td>
            <Meter value={l.started ? Math.min(1, l.completed / l.started) : null} label={String(l.completed)} />
          </td>
          <td>{pct(l.firstTryRate)}</td>
          <td>{l.errorsPerPlayer === null ? DASH : l.errorsPerPlayer.toFixed(1).replace(".", ",")}</td>
          <td>{duration(l.medianMs)}</td>
          <td>{l.exits || DASH}</td>
        </tr>
      ))}
    </Table>
  );
}

export function HardestTable({ rows }: { rows: ActivityStats[] }) {
  if (!rows.length) return <Empty>Ainda não há atividades com erros suficientes para comparar.</Empty>;
  return (
    <Table head={["Atividade", "Erro de 1ª", "Tempo", "Dica"]}>
      {rows.map((r) => (
        <tr key={`${r.contextId}-${r.activityId}`}>
          <td>
            <span className="block font-bold">{r.title}</span>
            <span className="text-xs text-structure-soft-text">
              {r.contextLabel} · {r.players} jogadores
            </span>
          </td>
          <td>
            <Meter value={r.firstTryErrorRate} />
          </td>
          <td>{duration(r.medianMs)}</td>
          <td>{pct(r.hintRate)}</td>
        </tr>
      ))}
    </Table>
  );
}

export function AssessmentsTable({ rows }: { rows: AssessmentStats[] }) {
  if (!rows.some((r) => r.finished)) return <Empty>Nenhuma avaliação finalizada no período.</Empty>;
  return (
    <Table head={["Avaliação", "Feitas", "Aprovação", "Nota"]}>
      {rows.map((r) => (
        <tr key={r.id}>
          <td>
            <span className="block font-bold">{r.label}</span>
            {r.hardest && (
              <span className="text-xs text-structure-soft-text">
                Mais difícil: {r.hardest.title} ({pct(r.hardest.correctRate)} de acerto)
              </span>
            )}
          </td>
          <td>{r.finished}</td>
          <td>
            <Meter value={r.passRate} />
          </td>
          <td>{r.avgScore === null ? DASH : `${r.avgScore.toFixed(1).replace(".", ",")}/5`}</td>
        </tr>
      ))}
    </Table>
  );
}

export function PlayersTable({ rows }: { rows: PlayerStats[] }) {
  const shown = rows.slice(0, 50);
  return (
    <>
      <Table head={["Apelido", "Faixa", "Última atividade", "Lições", "XP", "Respostas", "Acerto de 1ª"]}>
        {shown.map((p) => (
          <tr key={p.nickname}>
            <td className="font-bold">{p.nickname}</td>
            <td>{p.adult ? "18+" : "menor"}</td>
            <td>{p.lastSeen ? dateTime.format(new Date(p.lastSeen)) : "sem atividade no período"}</td>
            <td>{p.lessonsCompleted}/24</td>
            <td>{num(p.xp)}</td>
            <td>{p.answers}</td>
            <td>{pct(p.firstTryRate)}</td>
          </tr>
        ))}
      </Table>
      {rows.length > shown.length && (
        <p className="text-xs text-structure-soft-text">Mostrando os 50 mais recentes de {rows.length} jogadores.</p>
      )}
    </>
  );
}
