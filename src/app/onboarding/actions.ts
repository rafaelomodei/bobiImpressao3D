"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { AVATARS } from "@/lib/avatars";
import { ageFromBirthDate, requireUserId } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type OnboardingState = {
  errors?: Partial<Record<"nickname" | "avatar_id" | "birth_date" | "form", string>>;
  values?: { nickname?: string; avatar_id?: string; birth_date?: string };
};

const schema = z.object({
  nickname: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9_]{3,20}$/, "Use de 3 a 20 letras, números ou _ (sem espaços nem acentos)."),
  avatar_id: z.enum(AVATARS.map((a) => a.id) as [string, ...string[]], {
    error: "Escolha um avatar.",
  }),
  birth_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe sua data de nascimento.")
    .refine((d) => {
      const age = ageFromBirthDate(d);
      return age >= 4 && age <= 120;
    }, "Confira a data de nascimento."),
});

export async function completeOnboarding(
  _prev: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const userId = await requireUserId();
  const raw = {
    nickname: String(formData.get("nickname") ?? ""),
    avatar_id: String(formData.get("avatar_id") ?? ""),
    birth_date: String(formData.get("birth_date") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors: OnboardingState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<OnboardingState["errors"]>;
      errors[key] ??= issue.message;
    }
    return { errors, values: raw };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("profiles").insert({ user_id: userId, ...parsed.data });

  if (error) {
    if (error.code === "23505") {
      // Chave duplicada: apelido em uso ou perfil já criado.
      const { data: existing } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();
      if (existing) redirect("/trilha");
      return { errors: { nickname: "Esse apelido já está em uso. Tente outro." }, values: raw };
    }
    return { errors: { form: "Não foi possível salvar agora. Tente de novo." }, values: raw };
  }

  redirect("/trilha");
}
