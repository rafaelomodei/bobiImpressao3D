"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import {
  beginLesson,
  leaveActivity,
  renewLease,
  submitLessonAnswer,
  type Completion,
} from "@/app/(jogo)/licao/[id]/actions";
import type { Answer, PublicLesson } from "@/content/public-types";
import { playSound, usePreloadSounds, useSoundSequence, type SoundName } from "@/lib/sound";
import { ActivityView, isComplete, type Verdict } from "./activities";
import { AssetView } from "./asset-view";
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
  | { kind: "intro"; line: number }
  | { kind: "activity"; step: number }
  | { kind: "done"; completion: Completion };

export function LessonPlayer({ lesson }: { lesson: PublicLesson }) {
  const router = useRouter();
  const deviceId = useDeviceId();
  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [isReview, setIsReview] = useState(false);
  const [resumeStep, setResumeStep] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [footer, setFooter] = useState<FooterState>({ kind: "idle", canCheck: false, pending: false });
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [hintShown, setHintShown] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [pendingCompletion, setPendingCompletion] = useState<Completion | null>(null);
  const [pending, startTransition] = useTransition();
  const total = lesson.activities.length;
  usePreloadSounds(["tap", "correct", "wrong", "hint", "complete", "reward", "goal", "unlock"]);

  const begin = useCallback(
    (force: boolean) => {
      if (!deviceId) return;
      startTransition(async () => {
        try {
          const r = await beginLesson(lesson.slug, deviceId, force);
          if (!r.ok) {
            if (r.reason === "conflict") setPhase({ kind: "conflict" });
            else if (r.reason === "locked") setPhase({ kind: "error", message: "Essa missão ainda está bloqueada. Conclua a anterior primeiro." });
            else setPhase({ kind: "error", message: "Não encontramos essa lição." });
            return;
          }
          setIsReview(r.isReview);
          setResumeStep(r.currentStep);
          // Retomada: volta direto para a próxima atividade pendente (PD003).
          setPhase(r.currentStep > 0 ? { kind: "activity", step: r.currentStep } : { kind: "intro", line: 0 });
        } catch {
          setPhase({ kind: "error", message: "Sem conexão com a oficina. Confira a internet e tente de novo." });
        }
      });
    },
    [deviceId, lesson.slug],
  );

  useEffect(() => {
    if (deviceId) begin(false);
  }, [deviceId, begin]);

  const renew = useCallback(() => (deviceId ? renewLease(deviceId) : Promise.resolve(true)), [deviceId]);
  const onLost = useCallback(() => setPhase({ kind: "lease-lost" }), []);
  useLeaseHeartbeat(phase.kind === "activity" || phase.kind === "intro", renew, onLost);

  const resetActivity = () => {
    setAnswer(null);
    setVerdict(null);
    setHintShown(false);
    setHintUsed(false);
    setFooter({ kind: "idle", canCheck: false, pending: false });
  };

  const exit = () => {
    if (deviceId) void leaveActivity(deviceId).catch(() => undefined);
    router.push("/trilha");
  };

  if (phase.kind === "loading" || !deviceId) return <LoadingScreen />;
  if (phase.kind === "conflict") return <ConflictScreen busy={pending} onTransfer={() => begin(true)} />;
  if (phase.kind === "lease-lost") return <LeaseLostScreen onReclaim={() => begin(true)} />;
  if (phase.kind === "error") return <ErrorScreen message={phase.message} onRetry={() => begin(false)} />;
  if (phase.kind === "done") return <LessonDone lesson={lesson} completion={phase.completion} isReview={isReview} />;

  if (phase.kind === "intro") {
    const line = lesson.intro.lines[phase.line];
    const last = phase.line >= lesson.intro.lines.length - 1;
    return (
      <>
        <PlayerTopBar progress={0} onExit={exit} label="Progresso da lição" />
        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 pt-2 pb-40">
          <p className="badge self-start">
            {lesson.worldTitle} · L{String(lesson.number).padStart(2, "0")}
            {isReview ? " · revisão" : ""}
          </p>
          <h1 className="text-3xl font-black">{lesson.title}</h1>
          {lesson.intro.visualAssetId && <AssetView asset={lesson.assets[lesson.intro.visualAssetId]} size="lg" />}
          <CarameloSays key={phase.line} text={line.text} pose={line.pose} size={96} />
        </main>
        <footer className="fixed inset-x-0 bottom-0 border-t-2 border-structure-line bg-surface pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex w-full max-w-2xl justify-end px-4 py-4">
            <button
              type="button"
              autoFocus
              className="btn-primary sm:w-56"
              onClick={() => setPhase(last ? { kind: "activity", step: resumeStep } : { kind: "intro", line: phase.line + 1 })}
            >
              {last ? lesson.intro.cta : "Continuar"}
            </button>
          </div>
        </footer>
      </>
    );
  }

  const step = phase.step;
  const activity = lesson.activities[step];
  const locked = footer.kind !== "idle" && footer.kind !== "offline";
  const progress = (step + (footer.kind === "correct" ? 1 : 0)) / total;

  const check = () => {
    if (!answer || !isComplete(activity, answer)) return;
    setFooter({ kind: "idle", canCheck: true, pending: true });
    startTransition(async () => {
      try {
        const r = await submitLessonAnswer({ slug: lesson.slug, activityId: activity.id, answer, hintUsed, deviceId });
        if (!r.ok) {
          if (r.reason === "lease-lost") setPhase({ kind: "lease-lost" });
          else if (r.reason === "stale") {
            resetActivity();
            begin(false);
          } else setFooter({ kind: "offline" });
          return;
        }
        setVerdict({ correct: r.correct, wrongIds: r.wrongIds });
        playSound(r.correct ? "correct" : "wrong");
        if (r.correct) {
          setFooter({ kind: "correct", feedback: r.feedback });
          if (r.completion) setPendingCompletion(r.completion);
        } else {
          setFooter({ kind: "wrong", feedback: r.feedback, hint: r.hint });
        }
      } catch {
        setFooter({ kind: "offline" });
      }
    });
  };

  const next = () => {
    if (pendingCompletion) {
      router.refresh();
      setPhase({ kind: "done", completion: pendingCompletion });
      return;
    }
    resetActivity();
    setPhase({ kind: "activity", step: step + 1 });
  };

  const retry = () => {
    setVerdict(null);
    // Associação: mantém os pares certos e libera só os errados.
    if (answer?.kind === "matching" && verdict?.wrongIds) {
      const pairs = { ...answer.pairs };
      for (const id of verdict.wrongIds) delete pairs[id];
      setAnswer(Object.keys(pairs).length ? { kind: "matching", pairs } : null);
      setFooter({ kind: "idle", canCheck: false, pending: false });
    } else {
      setAnswer(null);
      setFooter({ kind: "idle", canCheck: false, pending: false });
    }
  };

  const onChange = (a: Answer | null) => {
    playSound("tap");
    setAnswer(a);
    setFooter({ kind: "idle", canCheck: isComplete(activity, a), pending: false });
  };

  return (
    <>
      <PlayerTopBar progress={progress} onExit={exit} label={`Atividade ${step + 1} de ${total}`} />
      <main key={activity.id} className="animate-pop mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 pt-2 pb-56">
        <p className="text-sm font-black tracking-wide text-structure-soft-text uppercase">
          {activity.title} · {step + 1}/{total}
        </p>
        <ActivityHeader activity={activity} assets={lesson.assets} />
        <ActivityView activity={activity} assets={lesson.assets} answer={answer} onChange={onChange} verdict={verdict} locked={locked} />
        {footer.kind === "wrong" && (
          <div className="flex justify-center">
            <Caramelo pose={footer.hint ? "hint" : "concern"} size={72} />
          </div>
        )}
      </main>
      <FeedbackFooter
        state={footer}
        onCheck={check}
        onContinue={next}
        onRetry={retry}
        hintShown={hintShown}
        onHint={() => {
          playSound("hint");
          setHintShown(true);
          setHintUsed(true);
        }}
        continueLabel={step === total - 1 && footer.kind === "correct" ? "Concluir" : "Continuar"}
      />
    </>
  );
}

function LessonDone({ lesson, completion, isReview }: { lesson: PublicLesson; completion: Completion; isReview: boolean }) {
  const totalXp = completion.xp + (completion.dailyGoal?.xp ?? 0);
  const totalFios = completion.fios + (completion.dailyGoal?.fios ?? 0);
  const sequence: [SoundName, number][] = [["complete", 0]];
  if (totalXp > 0) sequence.push(["reward", 900]);
  if (completion.dailyGoal) sequence.push(["goal", 1400]);
  if (completion.unlockedWorkshop) sequence.push(["unlock", 2000]);
  useSoundSequence(sequence);
  return (
    <CenterScreen>
      <Caramelo pose="celebrate" size={160} />
      <div>
        <h1 className="text-3xl font-black text-brand-primary-pressed">{isReview ? "Revisão concluída!" : "Lição concluída!"}</h1>
        <p className="mt-2 text-lg font-bold">{lesson.outro.line}</p>
      </div>
      <div className="grid w-full grid-cols-2 gap-3">
        <Reward label="XP" icon="⭐" value={totalXp} color="bg-brand-caramel" />
        <Reward label="Fios" icon="🧵" value={totalFios} color="bg-structure-purple" />
      </div>
      {completion.baseXp > completion.xp && (
        <p className="text-sm font-bold text-structure-soft-text">
          {completion.errors} erro{completion.errors === 1 ? "" : "s"} nesta lição: {completion.xp} de {completion.baseXp} XP.
          Acertar de primeira rende o XP completo.
        </p>
      )}
      {completion.dailyGoal && <p className="badge text-sm">🔥 Meta do dia cumprida: +{completion.dailyGoal.xp} XP e +{completion.dailyGoal.fios} Fios</p>}
      {!completion.firstTime && totalXp === 0 && (
        <p className="text-sm text-structure-soft-text">Revisões extras no mesmo dia não somam XP, mas fixam o conteúdo.</p>
      )}
      <div className="card w-full text-left">
        <p className="mb-2 text-sm font-black text-structure-soft-text uppercase">Você aprendeu</p>
        <ul className="flex flex-col gap-1 font-bold">
          {lesson.outro.summary.map((s) => (
            <li key={s}>✔ {s}</li>
          ))}
        </ul>
      </div>
      {completion.unlockedWorkshop && (
        <p className="card w-full border-brand-primary bg-brand-cream-soft font-bold">🛠️ A oficina do Caramelo abriu! Fabrique seu primeiro chaveiro.</p>
      )}
      <div className="flex w-full flex-col gap-3">
        <Link href="/trilha" className="btn-primary">
          Continuar
        </Link>
        {completion.unlockedWorkshop && (
          <Link href="/oficina" className="btn-secondary">
            Ir para a oficina
          </Link>
        )}
      </div>
    </CenterScreen>
  );
}

function Reward({ label, icon, value, color }: { label: string; icon: string; value: number; color: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border-2 ${color === "bg-brand-caramel" ? "border-brand-caramel" : "border-structure-purple"}`}>
      <p className={`${color} py-1 text-xs font-black tracking-wide text-white uppercase`}>
        {label === "XP" ? <span className="text-structure-deep">Total de XP</span> : "Fios ganhos"}
      </p>
      <p className="animate-pop py-3 text-3xl font-black">
        <span aria-hidden>{icon}</span> <CountUp value={value} />
      </p>
    </div>
  );
}
