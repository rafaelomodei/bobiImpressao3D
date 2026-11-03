"use client";

import { useState, useTransition } from "react";
import { setRankingOptIn } from "@/app/(app)/perfil/actions";

export function RankingToggle({ initial }: { initial: boolean }) {
  const [on, setOn] = useState(initial);
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, start] = useTransition();
  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-center justify-between gap-3 font-bold">
        Participar do ranking semanal global
        <input
          type="checkbox"
          role="switch"
          checked={on}
          disabled={pending}
          onChange={(e) => {
            const next = e.target.checked;
            setOn(next);
            start(async () => {
              const r = await setRankingOptIn(next).catch(() => ({ ok: false, message: "Sem conexão. Tente de novo." }));
              if (!r.ok) setOn(!next);
              setMsg(r.message);
            });
          }}
          className="h-7 w-12 cursor-pointer appearance-none rounded-full bg-locked transition before:block before:size-6 before:translate-x-0.5 before:translate-y-0.5 before:rounded-full before:bg-white before:shadow before:transition checked:bg-brand-primary checked:before:translate-x-5.5"
        />
      </label>
      {msg && <p role="status" className="text-sm font-bold text-structure-purple">{msg}</p>}
    </div>
  );
}
