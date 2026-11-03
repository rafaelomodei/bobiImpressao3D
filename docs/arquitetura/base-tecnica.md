# Arquitetura inicial do bobi. — decisão técnica e recorte de implementação

**Data:** 02/11/2026  
**Status:** stack **confirmada** pelo responsável; arquitetura detalhada **proposta**, a revisar no bootstrap. Decisões que destravam a implementação estão em [decisões de desenvolvimento](decisoes-de-desenvolvimento.md).  
**Referência de requisitos:** [Termo de Abertura](../termo-de-abertura.md).  
**Importante:** documentação, não implementação. Não altera RF/RNF nem os PDs homologados.

## 1. Stack confirmada

| Camada | Escolha | Uso |
|---|---|---|
| Aplicação | **Next.js + React + TypeScript** | Interface, roteamento, renderização, servidor de aplicação |
| Experiência instalável | **PWA** | App web responsivo instalável; **sempre on-line**, sem modo offline (DD007) |
| Hospedagem/deploy | **Vercel** | Builds, previews por PR e ambiente de produção |
| Plataforma de dados | **Supabase** | **PostgreSQL**, autenticação, persistência, arquivos e, se útil, Realtime |
| Provedor explicitamente excluído | **Firebase** | Não usar Firebase para dados, auth nem hosting |

Ferramentas de apoio têm padrão proposto em [DD010](decisoes-de-desenvolvimento.md#dd010--ferramentas-de-desenvolvimento) (pnpm, Tailwind CSS, Zod, Vitest, Playwright, Supabase CLI). Não fixar versões sem inspecionar compatibilidade atual.

**Referências técnicas oficiais (consultar na implementação):**
- Supabase + Next.js: https://supabase.com/docs/guides/auth/server-side
- Supabase + Vercel: https://supabase.com/kb/faqs/database/nextjs-on-vercel
- Integração Vercel/Supabase: https://vercel.com/integrations/supabase

### 1.1 Variáveis de ambiente

Modelo versionado em [`.env.example`](../../.env.example); valores reais ficam em `.env.local` (ignorado pelo Git) e, nos ambientes da Vercel, nas variáveis do projeto.

| Variável | Exposição | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Navegador | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Navegador | Chave publicável (`sb_publishable_…`), sujeita às políticas RLS |
| `SUPABASE_SECRET_KEY` | **Somente servidor** | Chave secreta (`sb_secret_…`), ignora RLS; usar só em correção, recompensas e seeds |
| `SUPABASE_PROJECT_NAME` / `SUPABASE_PROJECT_REF` | Ferramentas | Identificação do projeto para a Supabase CLI |
| `SUPABASE_DB_PASSWORD` | Ferramentas | Senha do Postgres para `supabase link` e migrações |
| `BOBI_ADMIN_DEMO` | Somente servidor | `0` esconde da tela `/admin/entrar` a credencial da conta administrativa de demonstração (DD026); padrão: visível |

Regras: nunca commitar `.env`/`.env.local`; nunca prefixar a chave secreta com `NEXT_PUBLIC_`; trocar a chave secreta no painel do Supabase se ela vazar.

## 2. Princípios de arquitetura

1. **Conteúdo separado da interface:** lições, atividades e avaliações em **tabelas do Supabase**, versionadas e carregadas por seed revisado em PR; gabaritos em esquema privado e correção no servidor ([DD001](decisoes-de-desenvolvimento.md#dd001--conteúdo-no-supabase-e-correção-no-servidor)).
2. **Quatro componentes de exercício** homologados: múltipla escolha, associação, ordenação e diagnóstico visual. Rótulos como "aplicação" ou "configuração" são mapeados conforme o [mapa de tipos](mapa-de-tipos-de-atividade.md) (DD002). Não codificar uma tela específica por lição.
3. **Progressão validada no servidor:** conclusão de atividades, XP, Fios, inventário, fabricação e pontuação de ranking não são concedidos apenas a partir de estado do navegador.
4. **Postgres como fonte de verdade** de perfis, sessões, progresso, carteira e fabricação; transações e chaves idempotentes para recompensas.
5. **Supabase Auth com provedor Google** como único método de acesso ([DD011](decisoes-de-desenvolvimento.md#dd011--login-somente-com-google)), integrado às sessões SSR do Next.js; nome e foto do Google não são copiados para `profiles` (DD014).
6. **Políticas de acesso** no Supabase por usuário (RLS) para objetos de jogador; ações administrativas/privilegiadas somente em backend autenticado e autorizado.
7. **Uma atividade educacional ativa por conta** (PD001), com transferência confirmada entre dispositivos, expiração de lease e preservação de passos já confirmados.
8. **Uma fabricação virtual ativa por conta** (PD005), avançando por timestamps validados no servidor inclusive com o navegador fechado; janela fictícia entre **2 e 15 minutos**, definida por catálogo e upgrades depois da homologação de PD007.
9. **Ranking único global**, sem ligas/grupos, mantendo o conceito homologado de ciclo **semanal opt-in** e XP competitivo elegível (PD008). Preservar restrições de privacidade já definidas.
10. **Sem integração com impressora real, CAD ou fatiamento STL/3MF operacional** no MVP.

## 3. Modelo inicial de dados (proposta, não migração criada)

| Entidade | Campos-chave sugeridos | Uso |
|---|---|---|
| `profiles` | `user_id`, `nickname`, `avatar_id`, `birth_date` (DD015), `privacy_settings` | Perfil e preferências de exibição |
| `content_versions` | `content_id`, `version`, `published_at`, `checksum` | Conteúdo imutável publicado |
| `lesson_progress` | `user_id`, `lesson_id`, `content_version`, `status`, `completed_at` | Progresso e desbloqueios |
| `activity_attempts` | `user_id`, `activity_id`, `attempt_no`, `is_correct`, `hint_used`, `confirmed_at` | Retomada e análise pedagógica |
| `activity_leases` | `user_id`, `lesson_id`, `device_session_id`, `expires_at` | Controle de simultaneidade |
| `wallet_ledger` | `user_id`, `event_key`, `currency`, `delta`, `created_at` | XP/Fios auditáveis e idempotência |
| `machine_definitions` | `id`, `tier`, `capabilities_json`, `content_version` | Catálogo versionado de máquinas |
| `player_machines` | `user_id`, `machine_id`, `upgrade_state`, `unlocked_at` | Equipamentos do jogador |
| `inventory_entries` | `user_id`, `item_definition_id`, `quantity` | Materiais e itens virtuais |
| `virtual_prints` | `user_id`, `project_id`, `machine_id`, `started_at`, `ready_at`, `state` | Fabricação independente da conexão |
| `weekly_rank_scores` | `user_id`, `week_start`, `eligible_xp`, `opt_in` | Ranking global semanal |
| `lessons` / `activities` / `activity_options` | `lesson_id`, `activity_id`, `type`, `pedagogical_label`, `content_version` | Conteúdo público de leitura (DD001) |
| `private.answer_keys` | `activity_id`, `content_version`, `answer_key`, `feedback_by_option`, `hint` | Gabarito e feedback, nunca expostos ao navegador |
| `assessment_attempts` | `user_id`, `assessment_id`, `variant_id`, `score`, `passed`, `finished_at` | Avaliações de domínio e variações (RF044) |
| `daily_activity` | `user_id`, `day` (`America/Sao_Paulo`), `goal_met`, `streak_count` | Meta diária, sequência e revisão válida do dia (DD005) |
| `session_events` | `user_id`, `event` (`activity_open`/`activity_exit`/`app_left`), `context_id`, `activity_id`, `after_error` | Saídas e retenção após erro para o painel administrativo (DD026) |
| `admin_users` | `user_id` | Contas com acesso ao painel `/admin`, somente leitura (DD026) |

*Estrutura conceitual*: tabelas, nomes e tipos definitivos serão definidos com migrações, constraints, índices, RLS e testes. Não armazenar respostas/gabaritos de uma forma que comprometa a verificação servidor; o conteúdo publicado precisa ser assinado/versionado ou protegido por regras de acesso adequadas.

## 4. Fases técnicas

**Ordem de execução decidida (DD004): A → B → D → C.** O conteúdo homologado (D) vem antes da oficina (C), cujas regras ainda dependem da homologação de PD007. Os rótulos A–D foram mantidos para não quebrar referências.

### Incremento A — Fundação
Next.js/PWA, layout responsivo, rotas `/trilha`, `/licao/[id]`, `/oficina`, `/perfil`, `/ranking`; tokens de interface bobi., Supabase configurado, variáveis de ambiente de desenvolvimento e preview. **Nenhuma credencial real deve ser commitada**.

### Incremento B — Primeira lição vertical
L01 funcionando do início ao fim: quatro atividades, feedback, persistência, primeira recompensa elegível de 20 XP/10 Fios, retomada e desbloqueio L02. Testes de sessão duplicada, refresh, reenvio de conclusão e idempotência.

### Incremento C — Oficina vertical
Uma máquina inicial fictícia, um item imprimível, minigame de nivelamento virtual, iniciar/acompanhar/finalizar fabricação com base no horário do servidor e persistir inventário. Usar valores de teste no catálogo, não preços/regras econômicas aprovadas antes de PD007.

### Incremento D — Escala educacional
Incorporar 24 lições e AV01–AV03, parametrizar o catálogo, evoluir animações, progresso, ranking semanal global opt-in e validação de ponta a ponta. Expandir catálogo conforme PD007 homologado.

## 5. Condição de privacidade antes do lançamento

**Decisão operacional para protótipos internos:** não exigir campo de idade nas telas iniciais da demo. Isso **não autoriza** abrir cadastro real a menores sem concluir PT001, nem remover controles de acesso/segurança.

O produto foi concebido também para usuários a partir de 10 anos. A Lei 15.211/2025 (ECA Digital, em vigor em março de 2026) e a LGPD exigem análise de obrigações pertinentes à faixa etária, publicidade, perfis e jogos. **Não presumir que omitir uma pergunta de idade elimina as obrigações legais.** Aferição proporcional de idade, controles de menores e lançamento público permanecem condicionados à avaliação técnica/jurídica PT001.

Fontes oficiais de contexto legal:
- ANPD: https://www.gov.br/anpd/pt-br/assuntos/eca-digital/
- Ministério da Justiça: https://www.gov.br/mj/pt-br/assuntos/sua-protecao/sedigi/eca-digital/eca-digital-1

**Não implementar anúncios ou expor menores em ranking público enquanto os controles aplicáveis não estiverem homologados.**

## 6. Fora do escopo deste documento

Não define valores finais de upgrades, preços, custos virtuais, catálogo completo de modelos, algoritmo de calibragem, política de publicação ou metas de desempenho. Esses pontos pertencem a PD007, PD010, PD011 e PD012, a detalhar e homologar em documentos próprios.
