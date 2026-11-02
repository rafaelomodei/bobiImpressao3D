"use client";

import { useActionState } from "react";
import { AVATARS } from "@/lib/avatars";
import { completeOnboarding, type OnboardingState } from "./actions";

export function OnboardingForm({ today }: { today: string }) {
  const [state, action, pending] = useActionState<OnboardingState, FormData>(
    completeOnboarding,
    {},
  );
  const v = state.values ?? {};

  return (
    <form action={action} className="flex flex-col gap-8" noValidate>
      <section className="flex flex-col gap-2">
        <label htmlFor="nickname" className="text-lg font-extrabold">
          Como quer ser chamado?
        </label>
        <p className="text-sm text-structure-soft-text">
          Seu apelido aparece no bobi. no lugar do seu nome. Não use seu nome completo.
        </p>
        <input
          id="nickname"
          name="nickname"
          defaultValue={v.nickname}
          autoComplete="off"
          maxLength={20}
          placeholder="ex.: maker_42"
          aria-invalid={Boolean(state.errors?.nickname)}
          aria-describedby="nickname-erro"
          className="field"
        />
        <FieldError id="nickname-erro" message={state.errors?.nickname} />
      </section>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-lg font-extrabold">Escolha seu avatar</legend>
        <div className="grid grid-cols-3 gap-3">
          {AVATARS.map((a, i) => (
            <label key={a.id} className="avatar-option">
              <input
                type="radio"
                name="avatar_id"
                value={a.id}
                defaultChecked={v.avatar_id ? v.avatar_id === a.id : i === 0}
                className="sr-only"
              />
              <span
                className="grid size-16 place-items-center rounded-full text-3xl"
                style={{ background: a.bg }}
                aria-hidden
              >
                {a.emoji}
              </span>
              <span className="text-center text-xs font-bold">{a.label}</span>
            </label>
          ))}
        </div>
        <FieldError message={state.errors?.avatar_id} />
      </fieldset>

      <section className="flex flex-col gap-2">
        <label htmlFor="birth_date" className="text-lg font-extrabold">
          Data de nascimento
        </label>
        <p className="text-sm text-structure-soft-text">
          Usamos só para ajustar recursos à sua idade. Ninguém mais vê essa informação.
        </p>
        <input
          id="birth_date"
          name="birth_date"
          type="date"
          max={today}
          defaultValue={v.birth_date}
          aria-invalid={Boolean(state.errors?.birth_date)}
          aria-describedby="birth-erro"
          className="field"
        />
        <FieldError id="birth-erro" message={state.errors?.birth_date} />
      </section>

      <FieldError message={state.errors?.form} />

      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Salvando…" : "Começar a aprender"}
      </button>
    </form>
  );
}

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-1 text-sm font-bold text-feedback-error">
      <span aria-hidden>⚠</span> {message}
    </p>
  );
}
