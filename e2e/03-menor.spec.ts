import { createClient } from "@supabase/supabase-js";
import { expect, test } from "@playwright/test";

/** DD025: para menores de 18 o ranking não existe (aba, página e opção no perfil). */
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);

async function setBirthDate(date: string) {
  const { data } = await admin.auth.admin.listUsers();
  const user = data.users.find((u) => u.email === "e2e@bobi.test");
  expect(user, "rode antes pnpm e2e:session e a jornada").toBeTruthy();
  const { error } = await admin.from("profiles").update({ birth_date: date, ranking_opt_in: false }).eq("user_id", user!.id);
  expect(error).toBeNull();
}

test("menor de idade não vê o ranking em lugar nenhum", async ({ page }) => {
  await setBirthDate("2014-06-01");
  try {
    await page.goto("/trilha");
    const nav = page.getByRole("navigation", { name: "Navegação principal" });
    await expect(nav.getByRole("link", { name: "Trilha" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Ranking" })).toHaveCount(0);

    await page.goto("/ranking");
    await expect(page.getByRole("heading", { name: "Essa página não existe" })).toBeVisible();
    await expect(page.getByText(/ranking/i)).toHaveCount(0);

    await page.goto("/perfil");
    await expect(page.getByRole("heading", { name: "Preferências" })).toBeVisible();
    await expect(page.getByText(/ranking/i)).toHaveCount(0);
  } finally {
    await setBirthDate("1990-05-10");
  }
  await page.goto("/trilha");
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Ranking" })).toBeVisible();
});
