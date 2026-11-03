# bobi.

**O jeito divertido de aprender impressão 3D.**

Plataforma educacional gamificada para aprender impressão 3D com microlições, desafios visuais, simulações didáticas e progressão autônoma. Mascote: **Caramelo**, um cachorro caramelo brasileiro. Acessórios relacionados à impressão 3D serão definidos na direção de arte.

## Jogar agora

**https://bobi-roan.vercel.app** — versão publicada, sem instalar nada. Entre com uma conta Google, escolha apelido, avatar e data de nascimento, e comece pela L01.

| Link | O que abre |
|---|---|
| [bobi-roan.vercel.app](https://bobi-roan.vercel.app) | Tela de entrada (login Google) |
| [/trilha](https://bobi-roan.vercel.app/trilha) | Trilha dos 3 mundos (24 lições + 3 avaliações) |
| [/oficina](https://bobi-roan.vercel.app/oficina) | Oficina do Caramelo (abre depois da L01) |
| [/perfil](https://bobi-roan.vercel.app/perfil) | Perfil, conquistas e preferências (som) |
| [/ranking](https://bobi-roan.vercel.app/ranking) | Ranking semanal (só maiores de 18) |
| [/admin](https://bobi-roan.vercel.app/admin/entrar) | Painel administrativo de relatórios (conta de demonstração abaixo) |

As páginas internas pedem login; sem sessão, você volta para a entrada. Cada push na `main` publica uma nova versão automaticamente (Vercel).

## Painel administrativo (relatórios)

O administrador **observa**, não cria conteúdo ([DD026](docs/arquitetura/decisoes-de-desenvolvimento.md#dd026--papel-administrativo-relatórios-não-criação-de-conteúdo)). Em `/admin` aparecem: jogadores ativos por dia, acerto na primeira tentativa, tempo por resposta, uso da dica, o que acontece depois de um erro (tentou de novo, saiu e voltou, não voltou), onde as pessoas saem (botão X ou fechando o app), cada lição da trilha, as atividades mais difíceis, as avaliações e a lista de jogadores (só apelido e faixa etária).

**Conta de demonstração** (projeto em estudo, visível de propósito para avaliação):

| E-mail | Senha |
|---|---|
| `admin@bobi.local` | `bobi-admin-2026` |

Entre por **/admin/entrar** (há um link "Área administrativa" na tela inicial). Jogadores entram só com Google; o login por e-mail existe apenas nesse caminho e só para contas administrativas que já existem — a tela não cria conta. A conta já está criada na versão publicada; no modo local o `pnpm local:up` cria. Para criar em outro ambiente ou adicionar outra conta: `pnpm admin:create [email senha]` (`--local` para o Supabase local). Antes de abrir o app ao público, defina `BOBI_ADMIN_DEMO=0` para esconder a credencial e troque a senha.

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
- [Sprites e ilustrações pendentes](docs/design/sprites-pendentes.md) — 188 assets com instruções de produção (gerado por `pnpm sprites:report`); soltar o PNG com o nome do catálogo em `public/sprites` basta para ele aparecer (detecção automática).
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
| Código | Publicado e jogável: 24 lições, 3 avaliações, oficina (valores de teste), perfil, ranking 18+ e efeitos sonoros |
| Arte no jogo | Caramelo (8 poses), impressoras, bancada, itens, minijogo e ícones prontos; ilustrações das lições ainda provisórias |

## Rodar localmente

Requisitos: **Node 24+** e **pnpm** (`corepack enable`). Para o modo 100% local, também **Docker** rodando.

```bash
pnpm install
```

### Opção A — 100% local, sem Google e sem conta no Supabase (recomendado para desenvolver)

Sobe banco, autenticação e API do Supabase em containers Docker, aplica todas as migrações e libera um botão de login de teste.

```bash
pnpm local:up   # 1ª vez baixa as imagens (alguns minutos); grava .env.development.local
pnpm dev        # http://localhost:3000
```

Na tela inicial, clique em **"Entrar sem Google (modo local)"**: o jogo cria a conta `jogador@bobi.local` no Supabase local e abre a sessão. Daí em diante é o jogo completo — lições, avaliações, oficina, perfil e ranking.

| Endereço | Para quê |
|---|---|
| http://localhost:3000 | O jogo |
| http://127.0.0.1:54323 | Supabase Studio local (tabelas, usuários, dados) |
| http://127.0.0.1:54321 | API do Supabase local |

| Comando | O que faz |
|---|---|
| `pnpm local:up` | Sobe o Supabase local e aponta o `pnpm dev` para ele |
| `pnpm local:reset` | Zera o banco local e reaplica as migrações (apaga o progresso) |
| `pnpm local:demo` | Cria 24 jogadores de demonstração (dados sintéticos) para o painel `/admin` ter o que mostrar |
| `pnpm local:down` | Para os containers e volta o `pnpm dev` para o Supabase remoto (`.env.local`) |

Como funciona: `local:up` escreve `.env.development.local`, que no `pnpm dev` tem prioridade sobre o `.env.local`. Nele vão a URL e as chaves do Supabase local, `BOBI_DEV_LOGIN=1` (botão de login local) e `BOBI_FAST_PRINTS=1` (fabricações da oficina em segundos). O botão de login local só aparece com o Supabase em `localhost` e nunca na Vercel. O login Google não funciona neste modo (o Supabase local não tem credenciais Google).

### Opção B — contra o Supabase remoto (mesmo banco da versão publicada)

Para testar com os dados e o login Google reais. Precisa das chaves do projeto.

```bash
cp .env.example .env.local   # preencha URL, chave publicável e chave secreta (ver base-tecnica.md §1.1)
pnpm dev                     # http://localhost:3000
```

`http://localhost:3000/**` precisa estar nas *Redirect URLs* do Supabase Auth para o login Google voltar ao ambiente local. Se `pnpm local:up` foi usado antes, rode `pnpm local:down` para o `pnpm dev` voltar a ler o `.env.local`.

### Todos os comandos

| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor de desenvolvimento |
| `pnpm build` / `pnpm start` | Build e servidor de produção |
| `pnpm lint` / `pnpm typecheck` | Lint e checagem de tipos |
| `pnpm test` | Testes unitários (conteúdo, regras de XP, sequência, oficina) |
| `pnpm local:up` / `local:reset` / `local:down` | Modo 100% local com Supabase em Docker |
| `pnpm local:demo` | Jogadores de demonstração no Supabase local para o painel `/admin` |
| `pnpm db:push` | Aplica `supabase/migrations` no projeto remoto (`--dry-run` para simular) |
| `pnpm admin:create` | Cria/atualiza a conta do painel `/admin` no projeto remoto (`--local` para o Supabase local) |
| `pnpm e2e:session` | Cria o usuário `e2e@bobi.test` e uma sessão sem Google para o Playwright |
| `pnpm e2e` | Playwright: jornada completa, menor de idade e todo o currículo, na porta 3100 (rode `pnpm build` antes) |
| `pnpm sprites:sync` | Atualiza a lista de sprites prontos (roda sozinho antes de `dev` e `build`) |
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

Login: somente Google em produção (DD011); o login sem Google existe apenas no modo local (Opção A).

> Projeto em definição. Os conteúdos técnicos e recursos visuais devem ser revisados antes da publicação. A proteção de dados e os mecanismos apropriados a contas de menores permanecem uma pendência técnica obrigatória para o lançamento ao público correspondente.
