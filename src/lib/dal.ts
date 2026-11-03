import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  user_id: string;
  nickname: string;
  avatar_id: string;
  birth_date: string;
  ranking_opt_in: boolean;
};

/** Usuário autenticado (claims verificadas do JWT) ou redireciona para boas-vindas. */
export const requireUserId = cache(async (): Promise<string> => {
  // Dados do jogador só na requisição: com o App Shell (partialPrefetching) a página é
  // pré-renderizada com os cookies, e a validação do JWT usa Date.now() (expiração),
  // o que o Next proíbe durante o prerender. As telas já mostram o carregamento no lugar.
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/");
  return userId;
});

/** Perfil do jogador; null se o onboarding ainda não foi feito. */
export const getOwnProfile = cache(async (): Promise<Profile | null> => {
  const userId = await requireUserId();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("user_id, nickname, avatar_id, birth_date, ranking_opt_in")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(`Falha ao carregar perfil: ${error.message}`);
  return data;
});

/** Perfil obrigatório para as telas do app; sem perfil → onboarding. */
export async function requireProfile(): Promise<Profile> {
  const profile = await getOwnProfile();
  if (!profile) redirect("/onboarding");
  return profile;
}

/** Idade mínima para recursos sociais/competitivos, como o ranking global (DD015). */
export const ADULT_AGE = 18;

export function isAdult(profile: Pick<Profile, "birth_date">): boolean {
  return ageFromBirthDate(profile.birth_date) >= ADULT_AGE;
}

/** Idade completa em anos na data atual (America/Sao_Paulo, DD005). */
export function ageFromBirthDate(birthDate: string, today = todayInSaoPaulo()): number {
  const [by, bm, bd] = birthDate.split("-").map(Number);
  const [ty, tm, td] = today.split("-").map(Number);
  let age = ty - by;
  if (tm < bm || (tm === bm && td < bd)) age -= 1;
  return age;
}

export function todayInSaoPaulo(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
