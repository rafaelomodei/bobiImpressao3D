/**
 * Conta de teste para quem avalia o projeto (DD029). É um jogador comum, com todo o
 * progresso já gravado no banco por `pnpm tester:create` (lições, avaliações, Fios):
 * o jogo não tem nenhuma regra especial para ela. Entra por e-mail e senha em /teste,
 * sem Google. A credencial fica visível porque o projeto está em estudo; para esconder,
 * defina BOBI_TESTER_DEMO=0. Mantenha estes valores iguais aos de scripts/tester-create.mjs.
 */
export const DEMO_TESTER = {
  email: "avaliador@bobi.local",
  password: "bobi-teste-2026",
} as const;

export function demoTesterEnabled(): boolean {
  return process.env.BOBI_TESTER_DEMO !== "0";
}
