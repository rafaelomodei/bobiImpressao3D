"use server";

import { revalidatePath } from "next/cache";
import { ageFromBirthDate, requireProfile } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

/** RF047: entrar/sair do ranking global. DD015: somente maiores de 18. */
export async function setRankingOptIn(optIn: boolean): Promise<{ ok: boolean; message: string }> {
  const profile = await requireProfile();
  if (optIn && ageFromBirthDate(profile.birth_date) < 18)
    return { ok: false, message: "O ranking global é só para maiores de 18 anos." };
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").update({ ranking_opt_in: optIn }).eq("user_id", profile.user_id);
  if (error) return { ok: false, message: "Não foi possível salvar agora." };
  revalidatePath("/perfil");
  revalidatePath("/ranking");
  return { ok: true, message: optIn ? "Você entrou no ranking semanal." : "Você saiu do ranking." };
}
