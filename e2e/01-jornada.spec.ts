import { expect, test, type Page } from "@playwright/test";

const SHOTS = process.env.E2E_SHOTS ?? "test-results/telas";
const shot = (page: Page, name: string) => page.screenshot({ path: `${SHOTS}/${name}.png`, fullPage: false });
const check = (page: Page) => page.getByRole("button", { name: "Verificar" }).click();
const next = (page: Page) => page.getByRole("button", { name: /^(Continuar|Concluir)$/ }).click();

test("jornada: onboarding, L01 completa, oficina, perfil e ranking", async ({ page }) => {
  await page.goto("/trilha");
  await expect(page).toHaveURL(/onboarding/);
  await page.getByLabel("Como quer ser chamado?").fill("teste_e2e");
  await page.getByText("Carretel de filamento").click();
  await page.getByLabel("Data de nascimento").fill("1990-05-10");
  await shot(page, "01-onboarding");
  await page.getByRole("button", { name: "Começar a aprender" }).click();
  await expect(page).toHaveURL(/trilha/);
  await expect(page.getByText("Começar", { exact: true })).toBeVisible();
  await shot(page, "02-trilha-inicial");

  await page.getByRole("link", { name: /L01 · O que é impressão 3D/ }).click();
  await expect(page.getByText("Já imaginou transformar")).toBeVisible();
  await shot(page, "03-licao-abertura");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: "Vamos descobrir!" }).click();

  // A01 — dois erros liberam a dica (DD006)
  await page.getByRole("radio", { name: /corta material de um bloco/ }).click();
  await shot(page, "04-atividade-selecionada");
  await check(page);
  await expect(page.getByText("Quase! Vamos de novo.")).toBeVisible();
  await expect(page.getByText(/retira material de um bloco/)).toBeVisible();
  await shot(page, "05-feedback-erro");
  await page.getByRole("button", { name: "Tentar de novo" }).click();
  await page.getByRole("radio", { name: /fotografia/ }).click();
  await check(page);
  await page.getByRole("button", { name: /Ver dica/ }).click();
  await expect(page.getByText(/acrescenta material para formar um objeto com volume/)).toBeVisible();
  await shot(page, "06-dica");
  await page.getByRole("button", { name: "Tentar de novo" }).click();
  await page.getByRole("radio", { name: /deposita material/ }).click();
  await check(page);
  await expect(page.getByText("Mandou bem!")).toBeVisible();
  await shot(page, "07-feedback-acerto");
  await next(page);

  // A02 — associação
  for (const [l, r] of [
    ["Modelo 3D", "Representação digital do objeto."],
    ["Impressora 3D", "Máquina responsável pela fabricação."],
    ["Peça impressa", "Objeto físico produzido."],
  ]) {
    await page.getByRole("button", { name: l, exact: true }).click();
    await page.getByRole("button", { name: r }).click();
  }
  await shot(page, "08-associacao");
  await check(page);
  await expect(page.getByText("Mandou bem!")).toBeVisible();
  await next(page);

  // A03 — ordenação
  for (const t of ["Escolher ou criar um modelo 3D.", "Preparar o arquivo para a impressora.", "Imprimir a peça."]) {
    await page.getByRole("list", { name: "Cartões disponíveis" }).getByRole("button", { name: t }).click();
  }
  await shot(page, "09-ordenacao");
  await check(page);
  await expect(page.getByText("Mandou bem!")).toBeVisible();
  await next(page);

  // A04 — diagnóstico visual
  await page.getByRole("radio", { name: /parcialmente construído/ }).click();
  await shot(page, "10-diagnostico-visual");
  await check(page);
  await next(page);
  await expect(page.getByText("Lição concluída!")).toBeVisible();
  await expect(page.getByText(/Meta do dia cumprida/)).toBeVisible();
  // DD023: dois erros na A01 descontam 20% do XP da lição.
  await expect(page.getByText("2 erros nesta lição: 16 de 20 XP.", { exact: false })).toBeVisible();
  await page.waitForTimeout(900);
  await shot(page, "11-conclusao");

  await page.getByRole("link", { name: "Ir para a oficina" }).click();
  await expect(page.getByText("Oficina do Caramelo")).toBeVisible();
  await expect(page.getByText("15").first()).toBeVisible(); // 10 Fios da lição + 5 da meta
  await shot(page, "12-oficina");

  // Nivelamento: cenário inicial fl=+2, fr=-3, bl=+3, br=+1
  await page.getByRole("link", { name: "Nivelar a mesa" }).click();
  await page.getByRole("button", { name: "Imprimir camada de teste" }).click();
  await expect(page.getByText("Camada de teste")).toBeVisible();
  await shot(page, "13-nivelamento-erro");
  const corner = async (name: string, dir: "Aproximar bico" | "Afastar bico", n: number) => {
    await page.getByRole("button", { name: new RegExp(`^${name}`) }).click();
    for (let i = 0; i < n; i++) await page.getByRole("button", { name: new RegExp(dir) }).click();
  };
  await corner("Frente esquerda", "Aproximar bico", 2);
  await corner("Frente direita", "Afastar bico", 3);
  await corner("Fundo esquerdo", "Aproximar bico", 3);
  await corner("Fundo direito", "Aproximar bico", 1);
  await page.getByRole("button", { name: "Imprimir camada de teste" }).click();
  await expect(page.getByText("Primeira camada perfeita!")).toBeVisible();
  await shot(page, "14-nivelamento-ok");
  await page.getByRole("link", { name: "Voltar para a oficina" }).click();

  // Fabricação (BOBI_FAST_PRINTS=1: minutos viram segundos)
  await page.getByRole("button", { name: "Fabricar" }).first().click();
  await expect(page.getByText(/Imprimindo: Chaveiro/)).toBeVisible();
  await shot(page, "15-imprimindo");
  await page.waitForTimeout(2500);
  await page.reload();
  await page.getByRole("button", { name: "Coletar peça" }).click();
  await expect(page.getByText(/guardada na prateleira/)).toBeVisible();
  await shot(page, "16-coletado");

  await page.goto("/perfil");
  await expect(page.getByText("Primeiro passo")).toBeVisible();
  await page.getByRole("switch", { name: "Participar do ranking semanal global" }).check();
  await expect(page.getByText("Você entrou no ranking semanal.")).toBeVisible();
  await shot(page, "17-perfil");

  await page.goto("/ranking");
  await expect(page.getByRole("list", { name: "Classificação da semana" }).getByText("teste_e2e")).toBeVisible();
  await shot(page, "18-ranking");

  // Retomada (PD003): responde A01 da L02, recarrega e volta na A02
  await page.goto("/trilha");
  await shot(page, "19-trilha-apos-l01");
  await page.getByRole("link", { name: /L02 ·/ }).click();
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByRole("button", { name: /testar/i }).click();
  await page.getByRole("radio", { name: /camadas sucessivas/ }).click();
  await check(page);
  await expect(page.getByText("Mandou bem!")).toBeVisible();
  await page.reload();
  await expect(page.getByText(/2\/4/)).toBeVisible();
  await shot(page, "20-retomada");
});
