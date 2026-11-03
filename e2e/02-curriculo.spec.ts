import { createClient } from "@supabase/supabase-js";
import { expect, test, type Page } from "@playwright/test";
import m1 from "../src/content/mundos/m1";
import m2 from "../src/content/mundos/m2";
import m3 from "../src/content/mundos/m3";
import type { WorldInput } from "../src/content/types";

/**
 * Joga todo o currículo respondendo pelo conteúdo (gabarito do repositório):
 * garante que cada atividade é respondível na interface e que o servidor
 * aceita o gabarito. Roda depois de 01-jornada.spec.ts (mesmo usuário, L01 concluída).
 */
type Act = WorldInput["lessons"][number]["activities"][number];

async function answer(page: Page, a: Act) {
  if (a.type === "multiple_choice" || a.type === "visual_diagnosis") {
    const opt = a.options.find((o) => o.id === a.correctOptionId)!;
    await page.getByRole("radio").filter({ has: page.getByText(opt.text, { exact: true }) }).click();
  } else if (a.type === "matching") {
    for (const p of a.pairs) {
      await page.getByRole("button").filter({ has: page.getByText(p.left, { exact: true }) }).first().click();
      await page.getByRole("button").filter({ has: page.getByText(p.right, { exact: true }) }).first().click();
    }
  } else {
    const bank = page.getByRole("list", { name: "Cartões disponíveis" });
    for (const i of a.items) await bank.getByRole("button").filter({ has: page.getByText(i.text, { exact: true }) }).click();
  }
  await page.getByRole("button", { name: "Verificar" }).click();
}

test.beforeAll(async () => {
  process.loadEnvFile(".env.local");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!);
  const { data } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const user = data.users.find((u) => u.email === "e2e@bobi.test")!;
  // Começa a L02 do zero (o outro teste deixou uma rodada pela metade).
  await admin.from("lesson_progress").delete().eq("user_id", user.id).eq("lesson_id", "BOBI-M01-L02");
  // A reserva de atividade do teste anterior (outro "aparelho") ainda vale por 2 min (DD008).
  await admin.from("activity_leases").delete().eq("user_id", user.id);
});

test("currículo completo: 23 lições e 3 avaliações", async ({ page }) => {
  test.setTimeout(15 * 60_000);
  for (const w of [m1, m2, m3] as WorldInput[]) {
    for (const lesson of w.lessons) {
      if (lesson.slug === "l01") continue;
      await page.goto(`/licao/${lesson.slug}`);
      for (let i = 0; i < lesson.intro.lines.length - 1; i++) await page.getByRole("button", { name: "Continuar", exact: true }).click();
      await page.getByRole("button", { name: lesson.intro.cta, exact: true }).click();
      for (const a of lesson.activities) {
        await expect(page.getByRole("heading", { name: a.statement })).toBeVisible();
        await answer(page, a);
        await expect(page.getByText("Mandou bem!"), `${lesson.id} ${a.id}`).toBeVisible();
        await page.getByRole("button", { name: /^(Continuar|Concluir)$/ }).click();
      }
      await expect(page.getByText("Lição concluída!")).toBeVisible();
    }
    const av = w.assessment;
    await page.goto(`/avaliacao/${av.slug}`);
    await page.getByRole("button", { name: "Começar avaliação" }).click();
    for (const q of av.questions) {
      await expect(page.getByRole("heading", { name: q.statement })).toBeVisible();
      await answer(page, q);
      if (q !== av.questions.at(-1)) await page.getByRole("button", { name: "Próxima" }).click();
    }
    await expect(page.getByText("Aprovado!"), av.id).toBeVisible();
    await expect(page.getByText(/Você acertou 5 de 5/)).toBeVisible();
    await page.screenshot({ path: `test-results/telas/av-${av.slug}.png` });
  }
  await page.goto("/trilha");
  await page.screenshot({ path: "test-results/telas/trilha-completa.png", fullPage: true });
});
