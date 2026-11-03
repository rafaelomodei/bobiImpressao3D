import { defineConfig, devices } from "@playwright/test";

/**
 * E2E local: `node scripts/dev-session.mjs --reset` cria a sessão de teste
 * (sem Google) e `pnpm e2e` roda contra o build de produção na porta 3100.
 */
export default defineConfig({
  testDir: "e2e",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: "http://localhost:3100",
    storageState: "e2e/.auth/state.json",
    ...devices["Pixel 7"],
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "pnpm start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    env: { BOBI_FAST_PRINTS: "1" },
    timeout: 60_000,
  },
});
