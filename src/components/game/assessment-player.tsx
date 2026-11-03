"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import {
  beginAssessment,
  submitAssessmentAnswer,
  type AssessmentResult,
} from "@/app/(jogo)/avaliacao/[id]/actions";
import { leaveActivity, renewLease } from "@/app/(jogo)/licao/[id]/actions";
import type { Answer, PublicAssessment } from "@/content/public-types";
import { ActivityView, isComplete } from "./activities";
import { Caramelo, CarameloSays } from "./caramelo";
import {
  ActivityHeader,
  CenterScreen,
  ConflictScreen,
  CountUp,
  ErrorScreen,
  FeedbackFooter,
  LeaseLostScreen,
  LoadingScreen,
  PlayerTopBar,
  useDeviceId,
  useLeaseHeartbeat,
  type FooterState,
} from "./player-parts";

type Phase =
  | { kind: "loading" }
  | { kind: "conflict" }
  | { kind: "lease-lost" }
  | { kind: "error"; message: string }
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "result"; result: AssessmentResult };

export function AssessmentPlayer({ assessment }: { assessment: PublicAssessment }) {
  const router = useRouter();
  const deviceId = useDeviceId();
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [answered, setAnswered] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [footer, setFooter] = useState<FooterState>({ kind: "idle", canCheck: false, pending: false });
  const [pending, startTransition] = useTransition();
  const total = assessment.questions.length;

  const begin = useCallback(
    (force: boolean) => {
      if (!deviceId) return;
      startTransition(async () => {
        try {
          const r = await beginAssessment(assessment.slug, deviceId, force);
          if (!r.ok) {
            if (r.reason === "conflict") setPhase({ kind: "conflict" });
            else if (r.reason === "locked")
              setPhase({ kind: "error", message: "Conclua as oito lições do mundo para liberar a avaliação." });
            else setPhase({ kind: "error", message: "Avaliação não encontrada." });
            return;
          }
          setAnswered(r.answered);
          const next = assessment.questions.findIndex((q) => !r.answered.includes(q.id));
          setPhase(r.answered.length > 0 && next >= 0 ? { kind: "question", index: next } : { kind: "intro" });
        } catch {
          setPhase({ kind: "error", message: "Sem conexão com a oficina. Confira a internet e tente de novo." });
        }
      });
    },
    [deviceId, assessment],
  );

  useEffect(() => {
    if (deviceId) begin(false);
  }, [deviceId, begin]);

  const renew = useCallback(() => (deviceId ? renewLease(deviceId) : Promise.resolve(true)), [deviceId]);
  const onLost = useCallback(() => setPhase({ kind: "lease-lost" }), []);
  useLeaseHeartbeat(phase.kind === "question" || phase.kind === "intro", renew, onLost);

  const exit = () => {
    if (deviceId) void leaveActivity(deviceId).catch(() => undefined);
    router.push("/trilha");
  };

  if (phase.kind === "loading" || !deviceId) return <LoadingScreen />;
  if (phase.kind === "conflict") return <ConflictScreen busy={pending} onTransfer={() => begin(true)} />;
  if (phase.kind === "lease-lost") return <LeaseLostScreen onReclaim={() => begin(true)} />;
  if (phase.kind === "error") return <ErrorScreen message={phase.message} onRetry={() => begin(false)} />;
  if (phase.kind === "result") return <AssessmentDone assessment={assessment} result={phase.result} />;

  if (phase.kind === "intro") {
    return (
      <>
        <PlayerTopBar progress={0} onExit={exit} label="Progresso da avaliação" />
        <CenterScreen>
          <p className="badge">Mundo {assessment.worldNumber} · Avaliação de domínio</p>
          <h1 className="text-3xl font-black">{assessment.title}</h1>
          <CarameloSays text={assessment.intro} pose="explain" size={96} />
          <ul className="card w-full text-left font-bold">
            <li>📝 {total} desafios</li>
            <li>🎯 Aprovação com {assessment.passMin} acertos</li>
            <li>🔁 Pode tentar de novo quantas vezes quiser</li>
            <li>💬 O resultado e as explicações aparecem no final</li>
          </ul>
          <button type="button" className="btn-primary" autoFocus onClick={() => setPhase({ kind: "question", index: 0 })}>
            Começar avaliação
          </button>
        </CenterScreen>
      </>
    );
  }

  const index = phase.index;
  const question = assessment.questions[index];

  const check = () => {
    if (!answer || !isComplete(question, answer)) return;
    setFooter({ kind: "idle", canCheck: true, pending: true });
    startTransition(async () => {
      try {
        const r = await submitAssessmentAnswer({ slug: assessment.slug, questionId: question.id, answer, deviceId });
        if (!r.ok) {
          if (r.reason === "lease-lost") setPhase({ kind: "lease-lost" });
          else begin(false);
          return;
        }
        setAnswered((a) => [...a, question.id]);
        if (r.finished) {
          router.refresh();
          setPhase({ kind: "result", result: r.result });
          return;
        }
        setFooter({ kind: "recorded" });
      } catch {
        setFooter({ kind: "offline" });
      }
    });
  };

  const next = () => {
    setAnswer(null);
    setFooter({ kind: "idle", canCheck: false, pending: false });
    const nextIdx = assessment.questions.findIndex((q, i) => i > index && !answered.includes(q.id));
    setPhase({ kind: "question", index: nextIdx >= 0 ? nextIdx : index + 1 });
  };

  return (
    <>
      <PlayerTopBar progress={answered.length / total} onExit={exit} label={`Questão ${index + 1} de ${total}`} />
      <main key={question.id} className="animate-pop mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 pt-2 pb-48">
        <p className="text-sm font-black tracking-wide text-structure-soft-text uppercase">
          Questão {index + 1}/{total} · {question.title}
        </p>
        <ActivityHeader activity={question} assets={assessment.assets} />
        <ActivityView
          activity={question}
          assets={assessment.assets}
          answer={answer}
          onChange={(a) => {
            setAnswer(a);
            setFooter({ kind: "idle", canCheck: isComplete(question, a), pending: false });
          }}
          verdict={null}
          locked={footer.kind === "recorded" || (footer.kind === "idle" && footer.pending)}
        />
      </main>
      <FeedbackFooter state={footer} onCheck={check} onContinue={next} onRetry={() => undefined} continueLabel="Próxima" />
    </>
  );
}

function AssessmentDone({ assessment, result }: { assessment: PublicAssessment; result: AssessmentResult }) {
  return (
    <CenterScreen>
      <Caramelo pose={result.passed ? "celebrate" : "concern"} size={150} />
      <div>
        <h1 className={`text-3xl font-black ${result.passed ? "text-feedback-success" : "text-structure-purple"}`}>
          {result.passed ? "Aprovado!" : "Quase lá!"}
        </h1>
        <p className="mt-1 text-lg font-bold">
          Você acertou <CountUp value={result.score} /> de {result.total}.{" "}
          {result.passed ? "" : `Precisa de ${assessment.passMin} para passar.`}
        </p>
      </div>
      {result.firstPass && (
        <p className="badge text-sm">
          ⭐ +{result.xp} XP · 🧵 +{result.fios} Fios
        </p>
      )}
      {result.unlockedWorld && (
        <p className="card w-full border-brand-primary bg-brand-cream-soft font-black">🔓 {result.unlockedWorld} liberado!</p>
      )}
      <ol className="flex w-full flex-col gap-3 text-left">
        {result.questions.map((q, i) => (
          <li key={q.id} className={`card flex flex-col gap-2 p-4 ${q.correct ? "border-feedback-success/40" : "border-feedback-error/40"}`}>
            <p className="flex items-center gap-2 font-black">
              <span aria-hidden className={q.correct ? "text-feedback-success" : "text-feedback-error"}>
                {q.correct ? "✔" : "✖"}
              </span>
              <span className="sr-only">{q.correct ? "Correta:" : "Errada:"}</span>
              Questão {i + 1} · {q.title}
            </p>
            <p className="text-sm">{q.explanation}</p>
            {!q.correct && q.review.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {q.review.map((r) => (
                  <Link key={r.slug} href={`/licao/${r.slug}`} className="badge hover:bg-brand-cream">
                    ↺ Revisar {r.title}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="flex w-full flex-col gap-3">
        <Link href="/trilha" className="btn-primary">
          Voltar para a trilha
        </Link>
        {!result.passed && (
          <a href={`/avaliacao/${assessment.slug}`} className="btn-secondary">
            Tentar de novo
          </a>
        )}
      </div>
    </CenterScreen>
  );
}
