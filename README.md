# bobi.

**O jeito divertido de aprender impressão 3D.**

Plataforma educacional gamificada para aprender impressão 3D com microlições, desafios visuais, simulações didáticas e progressão autônoma. Mascote: **Caramelo**, um cachorro caramelo brasileiro. Acessórios relacionados à impressão 3D serão definidos na direção de arte.

## Documentação

- [Termo de Abertura e Requisitos](docs/termo-de-abertura.md) — decisões, escopo do MVP e pendências.
- [Lições L01–L04](docs/licoes/mundo-01.md) — especificações homologadas da primeira metade do Mundo 1.
- [Lições L05–L08](docs/licoes/mundo-01-l05-l08.md) — especificações homologadas da segunda metade do Mundo 1.
- [Avaliação de domínio AV01](docs/avaliacoes/mundo-01-av01.md) — cinco questões, aprovação com quatro acertos, desbloqueio do Mundo 2.
- [Mundo 2 — L09–L16](docs/licoes/mundo-02.md) — oito lições com especificações homologadas.
- [Avaliação AV02](docs/avaliacoes/mundo-02-av02.md) — avaliação de domínio homologada do Mundo 2.
- [Mundo 3 — L17–L24](docs/licoes/mundo-03.md) — oito lições com especificações homologadas.
- [Avaliação AV03](docs/avaliacoes/mundo-03-av03.md) — avaliação de domínio homologada do Mundo 3.
- [Base técnica de impressão 3D](docs/knowledge/bobi_base_de_conhecimento_impressao_3d.md) — catálogo de fontes e proposta curricular completa (M4–M10 ainda não homologados).
- [Mapa de consolidação de materiais anteriores](docs/discovery/consolidacao-2026-11-01.md) — critérios para separar homologações atuais de hipóteses antigas.
- [Questionário mestre histórico (19/10/2026)](docs/discovery/questionario-mestre-2026-10-19.md) — arquivo de referência, não normativo.
- [Ficha-mãe visual do Caramelo v0.1](docs/design/referencias/caramelo/README.md) — prancha de referência selecionada para a produção dos sprites.
- [Direção de arte](docs/design/direcao-de-arte.md) — identidade confirmada do cachorro Caramelo e tarefas visuais ainda abertas.
- [Skill de produção de sprites](.agents/skills/bobi-sprite-studio/SKILL.md) — fluxo operacional de criação e QA visual, adaptado à identidade atual.
- [Base técnica e arquitetura](docs/arquitetura/base-tecnica.md) — stack confirmada: Next.js/PWA + Supabase + Vercel; arquitetura inicial proposta.
- [Decisões de desenvolvimento](docs/arquitetura/decisoes-de-desenvolvimento.md) — DD001–DD016: conteúdo no Supabase, tipos de atividade, desbloqueio, ordem dos incrementos, login Google, onboarding, paleta, perfil, idade e padrões de interface.
- [Mapa de tipos de atividade](docs/arquitetura/mapa-de-tipos-de-atividade.md) — componente do motor para cada atividade com rótulo não canônico.
- [PD007 — Oficina e progressão](docs/gameplay/pd007-oficina-e-progressao.md) — proposta de minijogo, máquinas, upgrades, inventário e ranking global.
- [Sistema visual, narrativa e animação](docs/design/sistema-visual-narrativa-e-animacao.md) — diretrizes candidatas para UX, sprites e falas do Caramelo.
- [Design system](docs/design/design-system.md) — tokens, componentes e telas implementados.
- [Sprites e ilustrações pendentes](docs/design/sprites-pendentes.md) — 188 assets com instruções de produção (gerado por `pnpm sprites:report`); as 8 poses do Caramelo já estão prontas.
- [Efeitos sonoros](docs/design/sons.md) — catálogo, quando cada som toca e como regenerar.
- [Skill de gameplay e narrativa](.agents/skills/bobi-game-director/SKILL.md) — regras de consistência e criação de mecânicas e diálogos.

**Responsável:** Rafael Geovani Omodei. **Levantamento iniciado:** 19/10/2026. **Última homologação pedagógica:** 02/11/2026. **MVP curricular:** 24/24 lições e 3/3 avaliações homologadas; implementação e revisões finais pendentes.

## Situação atual

| Frente | Status |
|---|---|
| Currículo M1–M3 (24 lições, 3 avaliações) | Homologado |
| Stack e decisões de desenvolvimento (DD001–DD004, DD011–DD015) | Decidido |
| Padrões técnicos e de interface (DD005–DD008, DD010, DD016) | Padrão proposto |
| Oficina, máquinas e upgrades (PD007) | Proposta |
| Arte do Caramelo | Referência visual v0.1 selecionada; ficha definitiva pendente |
| Paleta da interface | Laranja/roxo decidido (DD013); tokens v0.2 candidatos |
| Código | Jogável: 24 lições, 3 avaliações, oficina (valores de teste), perfil e ranking — arte provisória |

## Como rodar

Requisitos: Node 24+, pnpm, acesso ao projeto Supabase.

```bash
pnpm install
cp .env.example .env.local   # preencha os valores (ver docs/arquitetura/base-tecnica.md §1.1)
pnpm dev                     # http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` | Build de produção |
| `pnpm lint` / `pnpm typecheck` | Lint e checagem de tipos |
| `pnpm db:push` | Aplica `supabase/migrations` no projeto remoto (`--dry-run` para simular) |
| `pnpm test` | Valida o conteúdo (schema Zod + catálogo de assets) |
| `pnpm e2e:session` | Cria o usuário `e2e@bobi.test` e uma sessão local sem Google (apaga o progresso anterior) |
| `pnpm e2e` | Playwright: jornada completa + todo o currículo, contra `pnpm start` na porta 3100 (rode `pnpm build` antes) |
| `pnpm sprites:report` | Gera `docs/design/sprites-pendentes.md` a partir do catálogo |
| `pnpm sounds:gen` | Regenera `public/sounds/*.mp3` (precisa de `ffmpeg`) |

`BOBI_FAST_PRINTS=1` faz as fabricações da oficina durarem segundos em vez de minutos (somente testes locais).

### Onde está cada coisa

| Caminho | Conteúdo |
|---|---|
| `src/content/mundos/` | Lições e avaliações homologadas transcritas (server-only, DD017) |
| `src/content/assets/` | Catálogo de sprites/ilustrações (DD022) |
| `src/content/engine.ts` | Projeção pública e correção das atividades (DD018) |
| `src/lib/game/` | Regras (XP, desbloqueio, sequência), carteira, reserva de atividade e oficina |
| `src/components/game/` | Motor de atividades, players de lição/avaliação, oficina e minijogo |
| `supabase/migrations/` | Perfis, progresso, tentativas, carteira, meta diária, avaliações, reservas, oficina e ranking |

Login: somente Google (DD011). Para testar localmente, `http://localhost:3000/**` precisa estar nas *Redirect URLs* do Supabase Auth.

> Projeto em definição. Os conteúdos técnicos e recursos visuais devem ser revisados antes da publicação. A proteção de dados e os mecanismos apropriados a contas de menores permanecem uma pendência técnica obrigatória para o lançamento ao público correspondente.
