# Decisões de desenvolvimento — bobi.

**Data:** 02/11/2026  
**Responsável:** Rafael Geovani Omodei  
**Atualização:** 03/11/2026 — DD017–DD022 (implementação jogável); 02/11/2026 — DD011–DD016 (login Google, onboarding, paleta, perfil, idade/ranking e padrões de interface).  
**Finalidade:** registrar as decisões que destravam a implementação, separando o que foi **decidido pelo responsável** do que é **padrão proposto** (vale até objeção). Complementa a [base técnica](base-tecnica.md) e não altera RF/RNF nem o conteúdo das lições homologadas.

## Legenda de status

| Status | Significado |
|---|---|
| **Decidido** | Escolha explícita do responsável; registrada no [Termo de Abertura](../termo-de-abertura.md). |
| **Decidido por delegação** | O responsável pediu que a equipe técnica escolhesse a opção mais lógica; pode ser revista. |
| **Padrão proposto** | Valor adotado para não bloquear o desenvolvimento; muda com uma simples objeção registrada em PR. |
| **Pendente** | Precisa de decisão antes da etapa indicada. |

## Resumo

| ID | Tema | Decisão | Status | Bloqueia |
|---|---|---|---|---|
| DD001 | Armazenamento do conteúdo e proteção do gabarito | Tabelas no Supabase; gabarito em esquema privado; correção no servidor | **Decidido** | Incremento B |
| DD002 | Tipos de atividade fora dos quatro homologados | Mapear todos para os quatro tipos; rótulo original vira subtítulo pedagógico | **Decidido** | Incremento B/D |
| DD003 | "Avanço por domínio" nos pré-requisitos | Fora do MVP; desbloqueio somente sequencial | **Decidido** | Incremento B |
| DD004 | Ordem dos incrementos | A → B → D → C; PD007 homologado em paralelo | **Decidido por delegação** | Planejamento |
| DD005 | Fuso horário de "dia" e "semana" | `America/Sao_Paulo`; semana de segunda 00:00 a domingo 23:59 | Padrão proposto | Incremento B |
| DD006 | Quando oferecer dica | Após **dois erros** na mesma atividade | Padrão proposto | Incremento B |
| DD007 | Comportamento sem conexão | **Sempre on-line**: sem modo offline nem cache de lições; sem internet, aviso com o Caramelo preocupado e o jogo fica bloqueado | **Decidido** (03/11/2026) | — |
| DD008 | Atividade única por conta | Reserva da atividade (lease) com renovação periódica e transferência confirmada | Padrão proposto | Incremento B |
| DD009 | ~~E-mail do código de acesso~~ | **Substituída por DD011** | Substituída | — |
| DD010 | Ferramentas de desenvolvimento | pnpm, Tailwind CSS, Zod, Vitest, Playwright, Supabase CLI | Padrão proposto | Incremento A |
| DD011 | Método de login | **Somente Google** (OAuth via Supabase Auth) | **Decidido** | Incremento A |
| DD012 | Primeiro acesso | Tela de boas-vindas com Caramelo e "Entrar com Google" antes de qualquer lição | **Decidido** | Incremento A |
| DD013 | Paleta da interface | Laranja e roxo da ficha do Caramelo; verde só para "correto" | **Decidido** | Incremento A |
| DD014 | Identidade exibida | Apelido + avatar bobi.; nome e foto do Google nunca exibidos | **Decidido** | Incremento A/B |
| DD015 | Idade e ranking | Data de nascimento no onboarding; ranking global só para 18+ | **Decidido** | Ranking |
| DD016 | Padrões de interface | Mobile-first, abas inferiores, uma atividade por tela, tema claro | Padrão proposto | Incremento A |
| DD017 | Conteúdo no MVP | Módulos TypeScript `server-only` validados por Zod; tabelas de conteúdo no Supabase depois | Decidido por delegação | — |
| DD018 | Proteção do gabarito | Correção em server actions; ids opacos e embaralhamento estável para pares e ordem | Decidido por delegação | — |
| DD019 | Recompensas e meta diária | Livro-razão com chave idempotente; meta = 1 lição/revisão por dia; XP competitivo = XP elegível | Decidido por delegação | — |
| DD020 | Avaliações e variações | Banco-base homologado, uma resposta por questão, resultado no final; variações (RF044) ainda pendentes | Decidido por delegação | — |
| DD021 | Oficina jogável antes de PD007 | Catálogo com **valores de teste**: abre após L01; 5 itens; 2 melhorias; nivelamento em 4 cantos | Decidido por delegação | Homologação PD007 |
| DD026 | Papel administrativo e painel de relatórios | Administrador só **observa**: painel `/admin` com uso, aprendizagem, tempo, saídas e retenção após erro; sem criação de conteúdo; conta de demonstração visível | Decidido | — |
| DD022 | Assets provisórios | Cartão provisório (emoji + rótulo) até a arte existir; catálogo gera `sprites-pendentes.md` | Decidido por delegação | Arte final |

---

## DD001 — Conteúdo no Supabase e correção no servidor

**Decisão:** lições, atividades, avaliações e variações ficam em **tabelas do Supabase (Postgres)**, que passam a ser a fonte operacional do aplicativo. Os documentos em `docs/licoes` e `docs/avaliacoes` continuam sendo a **fonte de homologação** (o que foi aprovado).

**Como funciona (proposta de implementação):**

1. **Esquema público de leitura** com o que o aluno pode ver: mundos, lições, enunciados, alternativas, pares, cartões, mídia e falas do Caramelo.
2. **Esquema privado** (não exposto pela API do Supabase) com gabaritos, feedback por alternativa e regras de correção. O navegador **nunca recebe a resposta correta antes de responder**.
3. **Correção no servidor:** o cliente envia a resposta para uma função do servidor (route handler ou função Postgres `security definer`), que corrige, grava a tentativa, devolve o feedback e, quando elegível, lança XP/Fios no `wallet_ledger` com chave idempotente.
4. **Versionamento:** cada publicação gera um `content_version` imutável; tentativas e progresso apontam para a versão usada (RNF011, RNF012). Corrigir uma lição publicada cria nova versão, não altera a anterior.
5. **Como o conteúdo entra no banco no MVP:** por **arquivos de seed/migração versionados no repositório**, revisados em PR. Assim a revisão e o histórico ficam no Git enquanto PD010 (gestão editorial) não define um painel administrativo.
6. **Validação:** o seed passa por validação de schema (Zod) antes de ir ao banco: tipos permitidos, uma resposta correta por múltipla escolha, pares completos, ordem completa, IDs de mídia existentes.

**Consequência:** o painel editorial (RF037/RF038) continua fora do MVP; a estrutura de tabelas já nasce preparada para ele.

## DD002 — Mapeamento para os quatro tipos de atividade

**Decisão:** o motor tem somente os quatro componentes homologados: **múltipla escolha**, **associação**, **ordenação** e **diagnóstico visual**. Os rótulos usados nas fichas ("aplicação", "configuração", "seleção visual" etc.) são preservados como `pedagogical_label`, exibido apenas como subtítulo ou usado em relatórios. Nenhum tipo novo é criado.

**Regra de mapeamento:**

- **Diagnóstico visual:** a resposta depende de **observar um detalhe** em uma imagem ou cena (defeito, dimensão, posição, estado da máquina, prévia).
- **Múltipla escolha:** escolher a alternativa correta por conhecimento ou julgamento, **mesmo que as alternativas tenham figuras** (`option.media`).
- **Associação** e **ordenação:** mantidas, com cartões de texto ou imagem.
- **Bloco de animação:** quando a ficha prevê animação antes da pergunta (L24 A04), ela é um bloco de apresentação **não pontuado**, seguido da pergunta.

A tabela completa, atividade por atividade, está em [mapa de tipos de atividade](mapa-de-tipos-de-atividade.md). O mapeamento **não altera enunciados, alternativas, gabaritos nem feedbacks homologados**.

## DD003 — Avanço por domínio fora do MVP

**Decisão:** no MVP, cada lição é liberada **somente pela conclusão da anterior**, e a aprovação na avaliação de domínio libera o mundo seguinte. A expressão "ou avanço por domínio" das fichas fica **reservada para uma versão futura**, junto com RF003 (avaliação inicial) e CDU002, que precisarão de especificação própria.

As fichas homologadas **não são reescritas**; o pré-requisito alternativo simplesmente não é oferecido no MVP.

## DD004 — Ordem dos incrementos

**Decisão (por delegação):** **A → B → D → C**.

| Ordem | Incremento | Por quê |
|---|---|---|
| 1 | **A — Fundação** | Base do app, login, layout e Supabase. |
| 2 | **B — L01 completa** | Prova o motor de lições de ponta a ponta. |
| 3 | **D — 24 lições e 3 avaliações** | Todo esse conteúdo **já está aprovado**; entrega um aplicativo de estudo completo e testável com pessoas. |
| 4 | **C — Oficina** | As regras da oficina (PD007) **ainda são proposta**. Construí-la depois evita retrabalho caso custos, máquinas ou minijogo mudem. |

**Em paralelo:** homologação do PD007 e direção de arte do Caramelo. Se o PD007 for homologado antes de D terminar, a oficina pode começar junto. Até lá, a rota `/oficina` existe com estado "em breve", sem regras provisórias expostas ao aluno.

## DD005 — Fuso horário

**Padrão proposto:** meta diária, sequência de estudos, "primeira revisão válida do dia" e ciclo semanal do ranking usam **`America/Sao_Paulo`**, calculados no servidor. A semana do ranking vai de segunda 00:00 a domingo 23:59. Um fuso único evita manipulação pelo relógio do aparelho e simplifica o MVP, cujo público é brasileiro. Fuso por usuário pode vir depois.

## DD006 — Dica após dois erros

**Padrão proposto:** a dica é oferecida após **dois erros** na mesma atividade, padronizando "erros recorrentes" das fichas com o número já usado em L02 e L03. O uso de dica é registrado separadamente da primeira tentativa (PD003), sem penalidade.

## DD007 — Sempre on-line

**Decisão (03/11/2026):** o bobi **depende sempre de internet** para jogar. Não há modo offline: nenhum *service worker*, nenhum cache de lições, imagens ou respostas para uso sem conexão. Substitui o padrão proposto anterior, que previa guardar interface e imagens no aparelho.

**Por quê:** correção, XP, Fios, progresso e fabricação são validados no servidor (PD001, DD018) e o gabarito nunca vai para o aparelho. Jogar sem conexão exigiria enviar o gabarito ou aceitar respostas não confirmadas — os dois contrariam decisões já tomadas — e um cache parcial só criaria a impressão de que dá para jogar.

**Como funciona:**

- O app continua **instalável** como PWA (manifesto e ícones), só sem funcionamento offline.
- Quando o aparelho perde a conexão, um aviso cobre a tela: **Caramelo preocupado** (pose `concern`), título "Sem internet" e o texto "O bobi precisa de internet para jogar…", com o botão **Tentar de novo**. O aviso some sozinho quando a internet volta (`src/components/offline-screen.tsx`, eventos `online`/`offline` do navegador). Fica montado e escondido desde o carregamento para que a imagem do Caramelo já esteja baixada quando a rede cair.
- Se a conexão cair no meio de uma resposta, o rodapé do player mostra o aviso de conexão (RNF016) e nada é contado até o servidor confirmar.
- Abrir o app já sem internet mostra a página de erro do próprio navegador, porque não há nada guardado no aparelho — consequência aceita desta decisão.
- A fabricação virtual continua avançando no servidor com o app fechado (RF045), sem depender do aparelho.

## DD008 — Atividade única por conta

**Padrão proposto:** ao abrir uma lição ou avaliação, o servidor cria uma reserva (`activity_leases`) para o dispositivo. O cliente renova a reserva a cada 30 segundos; ela expira após **2 minutos** sem renovação. Se outro dispositivo tentar abrir uma atividade, aparece a pergunta de transferência (RF043): ao confirmar, a reserva anterior é invalidada e respostas não confirmadas daquele aparelho são descartadas; o que já foi confirmado é preservado. Valores ajustáveis após testes.

## DD009 — E-mail do código de acesso (substituída)

> **Substituída por [DD011](#dd011--login-somente-com-google) em 02/11/2026.** Texto original mantido para histórico.

**Padrão proposto (original):** login por **código de uso único (OTP) do Supabase Auth**, configurado para enviar código (não link mágico). O envio de e-mail padrão do Supabase é limitado e serve só para desenvolvimento; **antes de testar com qualquer usuário externo**, configurar SMTP próprio (provedor a escolher, por exemplo Resend ou Amazon SES).

## DD010 — Ferramentas de desenvolvimento

**Padrão proposto**, conferindo versões atuais no momento da instalação:

| Necessidade | Ferramenta |
|---|---|
| Gerenciador de pacotes | pnpm |
| Estilo | Tailwind CSS, com os tokens de [sistema visual](../design/sistema-visual-narrativa-e-animacao.md) |
| Validação de dados e conteúdo | Zod |
| Testes de unidade/integração | Vitest |
| Testes de ponta a ponta | Playwright |
| Banco e migrações | Supabase CLI (ambiente local + projeto de desenvolvimento na nuvem) |

## DD011 — Login somente com Google

**Decisão do responsável:** o único método de acesso é **"Entrar com Google"**, via provedor Google do Supabase Auth. Não há código por e-mail, senha nem link mágico. Substitui DD009 e altera a forma de autenticação de RF001/RF002 (registrado no Termo).

**Por quê:** elimina envio de e-mail, SMTP próprio e tela de código; o fluxo vira um clique.

**Configuração necessária (uma vez):**
1. Google Cloud Console: criar tela de consentimento OAuth e um *OAuth Client ID* do tipo "Web application".
2. Em *Authorized redirect URIs*, cadastrar `https://<project-ref>.supabase.co/auth/v1/callback`.
3. Supabase > Authentication > Sign In / Providers > Google: ativar e colar *Client ID* e *Client Secret*.
4. Supabase > Authentication > URL Configuration: *Site URL* de produção e *Redirect URLs* para `http://localhost:3000/**` e os domínios de preview da Vercel.

**Atenção (vai para PT001):** contas Google de crianças abaixo de 13 anos no Brasil são supervisionadas pelo Family Link, e o acesso a apps de terceiros pode depender de aprovação dos responsáveis. Isso precisa ser verificado antes de abrir o produto ao público de 10–12 anos.

## DD012 — Primeiro acesso com login

**Decisão do responsável:** a primeira tela é de **boas-vindas**: Caramelo, logo, slogan, até três frases do que o aluno vai aprender e o botão "Entrar com Google". Nenhuma lição é acessível sem conta.

**Fluxo:** boas-vindas → Google → (primeira vez) apelido → avatar → data de nascimento (DD015) → trilha com a L01 destacada. Quem já tem conta vai direto para a trilha, retomando a atividade pendente.

**Recomendação de UX para compensar a barreira:** a tela de boas-vindas deve mostrar o produto (ilustração da trilha e do chaveiro virtual), não só o logo, e o onboarding inteiro deve caber em menos de 1 minuto.

## DD013 — Paleta laranja e roxo

**Decisão do responsável:** a interface segue as cores da [ficha do Caramelo v0.1](../design/referencias/caramelo/README.md): **laranja** para ações e marca, **roxo profundo** para estrutura. O verde deixa de ser cor principal (evita aproximação com a identidade do Duolingo) e fica restrito ao feedback "correto". Tokens candidatos v0.2 em [sistema visual](../design/sistema-visual-narrativa-e-animacao.md#2-sistema-visual-candidato-tokens-iniciais).

## DD014 — Apelido e avatar; dados do Google ocultos

**Decisão do responsável:** no primeiro acesso o aluno escolhe um **apelido** e um **avatar pronto** do bobi. (temas do Caramelo e da oficina). **Nome real e foto do Google nunca aparecem** no app, em perfis ou no ranking, e não são copiados para a tabela `profiles` (RNF015). O e-mail fica apenas na autenticação.

**Regras do apelido (padrão proposto):** 3 a 20 caracteres, letras, números e `_`; único; filtro de palavras impróprias; pode ser trocado no perfil. Avatares iniciais: 6 a 8 opções sem custo; avatares extras ficam para conquistas/cosméticos (RF028).

## DD015 — Data de nascimento e ranking global

**Decisão do responsável:** o onboarding pede **data de nascimento**. O ranking global semanal mostra somente contas com **18 anos ou mais** que fizeram opt-in. Menores veem o próprio XP semanal, sem aparecer nem ver a lista global.

**Consequências:**
- A data é dado pessoal: guardar só a data (ou ano e mês, se bastar), com acesso restrito ao próprio usuário e ao servidor; não exibir.
- A data autodeclarada **não resolve PT001**: idade declarada é uma salvaguarda mínima, não aferição. Contas reais de menores, anúncios e regras do ECA Digital continuam dependentes de PT001.
- A mesma faixa etária será usada para elegibilidade de anúncios (PD009) quando eles existirem.

## DD016 — Padrões de interface

**Padrão proposto** (valem até objeção):

| Tema | Padrão |
|---|---|
| Formato | **Mobile-first**, em retrato; no desktop, coluna central de até ~480 px na lição e layout com barra lateral na navegação. |
| Navegação | **Abas inferiores** no celular: Trilha, Oficina, Ranking, Perfil. Oficina aparece como "em breve" até o incremento C. |
| Trilha | Caminho vertical por mundo, nós com estados bloqueado / disponível / concluído; avaliação de domínio como nó especial ao fim do mundo; Caramelo acompanha o nó atual. |
| Lição | **Uma atividade por tela**, barra de progresso no topo, botão "Verificar" fixo embaixo, feedback em painel inferior (correto em verde, erro com dica e "Tentar de novo"), "Continuar" após acerto, confirmação ao sair. |
| Avaliação | Mesmo layout, sem feedback por questão; resultado e revisão só ao final (PD003). |
| Tema | Somente **tema claro** no MVP; tema escuro depois. |
| Som e animação | Sons curtos opcionais, desligados por padrão; respeitar "reduzir movimento" do sistema. |
| Acessibilidade | Alvos de toque ≥ 44 px, foco visível, feedback com ícone + texto, contraste AA. |

## DD017 — Conteúdo em módulos `server-only` no MVP

**Decisão (por delegação, 03/11/2026):** as 24 lições e 3 avaliações homologadas foram transcritas para `src/content/mundos/m{1,2,3}/*.ts`, validadas pelo schema Zod de `src/content/schema.ts` (teste `pnpm test` e na carga do servidor). O registro `src/content/index.ts` é `server-only`; o navegador recebe só a projeção pública (`src/content/public-types.ts`).

**Por quê:** entrega o objetivo de DD001 (gabarito nunca exposto, correção no servidor, conteúdo revisado em PR, validação por schema) sem esperar o modelo de tabelas de conteúdo. `CONTENT_VERSION` é o hash do conteúdo validado e é gravado em cada tentativa/progresso (RNF011).

**Próximo passo:** quando PD010 definir o painel editorial, gerar seeds das tabelas `lessons/activities/private.answer_keys` a partir destes módulos — o schema já é o contrato.

**Textos não homologados:** onde a ficha não trazia um campo exigido pelo motor (dicas, títulos, alguns feedbacks, distratores das avaliações), o texto foi redigido pela equipe técnica e está marcado no código com `// redigido pela equipe técnica`; avaliações com distratores redigidos têm `authoredDistractors: true`. **Precisam de revisão pedagógica.**

## DD018 — Correção no servidor e ids opacos

**Decisão:** toda resposta vai para uma server action que corrige, grava `activity_attempts` e avança `lesson_progress` com atualização condicional (`current_step` esperado), impedindo dupla conclusão (RNF017). Na associação e na ordenação, os ids enviados ao navegador são hashes (`opaqueId`) e a ordem é embaralhada de forma estável, para que o HTML não revele pares nem sequência. A dica aparece a partir do 2º erro na rodada (DD006); uso de dica fica registrado.

## DD019 — Recompensas, meta diária e sequência

**Decisão:** `wallet_ledger` com `unique(user_id, event_key)`:

| Evento | Chave | XP / Fios |
|---|---|---|
| Primeira conclusão | `lesson:<id>:first` | 20 / 10 (XP descontado por erros, DD023) |
| Revisão válida do dia | `review:<id>:<dia>` | 5 / 0 (XP descontado por erros, DD023) |
| Primeira aprovação | `assessment:<id>:first` | 30 / 15 (XP descontado por questão errada, DD023) |
| Meta diária | `daily:<dia>` | 10 / 5 |

A meta diária é cumprida com **uma lição ou revisão concluída** no dia (`America/Sao_Paulo`). Sequência = dias consecutivos com meta até hoje (ou ontem). XP competitivo = XP dos eventos acima (já limitados por dia), somado por semana de segunda a domingo. Gastos de Fios na oficina são lançamentos negativos sem XP.

## DD020 — Avaliações de domínio

**Decisão:** uma tentativa aberta por avaliação; cada questão é respondida uma vez, sem revelar acerto; o resultado (acertos, explicação por questão e links para revisar as lições indicadas) aparece no final. Aprovação com 4/5 libera o próximo mundo. Nova tentativa usa o mesmo banco-base até as variações de RF044 serem escritas e homologadas.

## DD021 — Oficina jogável com valores de teste

**Decisão:** para ter um loop jogável, a oficina foi implementada com valores **provisórios** em `src/lib/game/workshop-catalog.ts`. Eles **não** homologam PD007.

- Abre após concluir a L01 (primeiro marco curricular).
- Máquina: Bobi Mini → Bobi Ajustada (kit de estabilidade, 60 Fios, após AV02, −25% no tempo) → Bobi Auto (sensor, 100 Fios, após AV03, nivelamento assistido).
- Itens: chaveiro (grátis, 2 min, L01), cubo de calibração (10, 3 min, L04), organizador (20, 5 min, AV01), suporte de ferramentas (30, 8 min, L16), porta-carretel (40, 10 min, AV02).
- Minijogo: 4 cantos, escala didática de −3 a +3, botões "aproximar/afastar", camada de teste com sintoma por canto (achatada/falhada, redonda/solta, uniforme). Nivelar é exigido antes da primeira fabricação; pode refazer quando quiser. Sem custo por erro.
- Fabricação: uma ativa por conta (índice único), fim calculado pelo relógio do servidor, coleta só após `ready_at`. A peça vai para a prateleira (inventário); coletar não dá XP nem Fios.
- Teste local: `BOBI_FAST_PRINTS=1` transforma minutos em segundos.

## DD022 — Assets provisórios e catálogo de sprites

**Decisão:** cada imagem citada no conteúdo tem entrada no catálogo (`src/content/assets/*.ts`) com descrição, câmera, tamanho, fundo, o que deve e não pode aparecer, grupo de consistência e arquivo. Enquanto `status` for `placeholder`, a interface mostra um cartão provisório com emoji e rótulo. `pnpm sprites:report` gera [sprites-pendentes.md](../design/sprites-pendentes.md), a lista de produção. O Caramelo usa um SVG provisório com variação por pose (`src/components/game/caramelo.tsx`).

## DD023 — XP proporcional aos erros

**Contexto:** com DD019, quem errava várias vezes e terminava a lição recebia o mesmo XP de quem acertou de primeira. O XP deixava de medir domínio e o ranking semanal premiava só a quantidade de lições.

**Decisão:** o XP da conclusão é descontado pelos erros da rodada.

- Cada resposta errada tira **10% do XP base**. O jogador sempre recebe **pelo menos 25%** do XP base, para que terminar a lição continue valendo a pena.
- Fórmula (`xpAfterErrors` em `src/lib/game/rules.ts`): `max(teto(base × 0,25), arred(base × (1 − 0,1 × erros)))`.
- **Lição (primeira conclusão, base 20):** 0 erro = 20 · 1 = 18 · 2 = 16 · 3 = 14 · 5 = 10 · 8 ou mais = 5.
- **Revisão do dia (base 5):** 0 = 5 · 1 = 5 (arredonda) · 2 = 4 · 3 = 4 · 5 ou mais = 2.
- **Avaliação (primeira aprovação, base 30):** cada questão errada conta como erro. 5/5 = 30 · 4/5 = 27.
- "Erro" = tentativa errada registrada em `activity_attempts` desde o início da rodada (`run_started_at`): várias tentativas erradas na mesma atividade contam várias vezes. Retomar a lição em outro dia não zera os erros da rodada.
- **Fios e meta diária não mudam**: Fios continuam fixos por conclusão (são a moeda da oficina, não medida de domínio), e a meta diária vale 10 XP / 5 Fios independentemente dos erros.
- O desconto vale também para o XP competitivo do ranking (o lançamento já sai descontado).
- A tela de conclusão mostra quantos erros houve e quanto do XP base foi ganho ("3 erros nesta lição: 14 de 20 XP").
- Recompensa continua idempotente: a chave do evento não muda, então refazer a lição não recupera o XP perdido na primeira conclusão. Revisões dos dias seguintes podem render XP de revisão normalmente.

**Por quê 10% e piso de 25%:** o erro tem custo visível, mas pequeno; a lição tem 4 a 6 atividades e a dica só aparece no 2º erro, então um aluno que precisa da dica em uma atividade ainda leva 80%. O piso evita que o jogador desista no meio por achar que não vai ganhar nada. Valores ficam em `XP_PENALTY_PER_ERROR` e `XP_MIN_SHARE` e podem ser ajustados na homologação.

## DD024 — Efeitos sonoros e sprites do Caramelo

**Sons.** O jogo toca efeitos curtos em acerto, erro, dica, conclusão, recompensa, meta do dia, desbloqueio, aprovação/reprovação e nas ações da oficina (fabricar, pronto, coletar, comprar, nivelar). Os sons são sintetizados pelo projeto (`scripts/gen-sounds.mts`), sem licença de terceiros; ficam ligados por padrão, com interruptor por aparelho no Perfil e botão 🔊 no player. Catálogo e regras em [sons.md](../design/sons.md).

**Sprites do Caramelo.** As 8 poses finais (`public/sprites/bobi-caramelo-<pose>.png`, 512×512, fundo transparente) substituem o SVG provisório em todo o jogo (falas, feedback, conclusão, oficina, tela de boas-vindas) e no avatar "Caramelo de óculos". São servidas por `next/image` (WebP/AVIF no tamanho exibido). Como os PNGs são estáticos, a animação por quadros do catálogo fica para uma entrega futura; até lá, celebrar/desbloquear flutuam e a pose de preocupação balança, via CSS (desligado com movimento reduzido). **Sprites da impressora e da bancada.** A oficina mostra `bobi-machine-<tier>-<estado>.png` conforme a melhoria instalada e o estado (parada, imprimindo, pronta), sobre o fundo `bobi-oficina-bancada.png`. Quando falta a arte de um tier, usa a Mini no mesmo estado.

**Detecção automática.** Um asset fica "pronto" quando o arquivo com o nome do catálogo existe em `public/sprites`. `pnpm sprites:sync` (roda sozinho antes de `dev` e `build`) grava a lista em `src/content/assets/ready.generated.ts`; o conteúdo, a oficina e o relatório de sprites leem dela. Entregar arte nova = soltar o PNG com o nome certo; não precisa editar o catálogo.

## DD025 — Recursos só para adultos ficam invisíveis para menores

**Contexto:** o ranking global é só para maiores de 18 (DD015). Antes, o menor via a aba "Ranking", abria a página e lia "só para maiores de 18"; no Perfil via a seção "Ranking e privacidade" com o mesmo aviso. Mostrar o que não pode usar só gera frustração e curiosidade.

**Decisão:** para quem tem menos de 18 anos (`isAdult` em `src/lib/dal.ts`, idade calculada em America/Sao_Paulo), o recurso não existe:

- **Menu:** a aba Ranking não é renderizada. Abas marcadas `adultsOnly` em `src/components/nav-list.tsx` ficam ocultas por padrão e só aparecem depois que o servidor confirma a idade, então nem piscam para o menor.
- **Página:** `/ranking` responde com a página "Essa página não existe" (`notFound()`), sem título nem texto que revele o ranking.
- **Perfil:** a seção "Ranking e privacidade" some; ficam só Preferências.
- **Servidor:** `setRankingOptIn` continua recusando opt-in de menor, e a função `weekly_ranking` continua filtrando por idade.
- Quando a pessoa faz 18 anos, a aba aparece sozinha (a idade é recalculada a cada acesso). O opt-in continua desligado até ela ativar.

Novos recursos restritos por idade devem seguir o mesmo padrão: `adultsOnly` no menu, `notFound()` na rota e nenhuma menção na interface.

## DD026 — Papel administrativo: relatórios, não criação de conteúdo

**Contexto:** o termo de abertura previa um "administrador/editor" voltado à gestão de conteúdo (RF037, RF038), e RF039 pedia métricas mínimas de uso e aprendizagem. No MVP o conteúdo é versionado no Git (DD001 §5, DD017), então um painel editorial não traz ganho agora. O que falta é **enxergar o comportamento de quem joga**: se está aprendendo, onde erra, quanto tempo leva e se desiste depois de errar.

**Decisão:** o papel administrativo do MVP é **somente leitura**. O painel `/admin` mostra relatórios; não cria mundos, lições, atividades nem altera progresso de jogadores.

**Acesso.**

- Quem pode abrir: contas listadas na tabela `admin_users` (sem políticas RLS; só o servidor lê com a chave secreta). `requireAdmin` em `src/lib/admin.ts` protege a página.
- Entrada própria em `/admin/entrar`, com e-mail e senha, **só para contas que já existem**: a tela não cria conta, não envia e-mail e não tem cadastro. Jogadores continuam entrando só com Google (DD011); a opção de e-mail aparece apenas no caminho do painel. A conta administrativa não joga (não tem perfil e fica fora de todos os indicadores).
- **Conta de demonstração**, visível na tela de entrada porque o projeto está em estudo e precisa ser avaliado: `admin@bobi.local` / `bobi-admin-2026`. É criada uma vez por ambiente com `pnpm admin:create` (remoto) — já criada no projeto publicado em 03/11/2026 — e automaticamente pelo `pnpm local:up` no modo local. `pnpm admin:create <email> <senha>` cria outras contas administrativas. `BOBI_ADMIN_DEMO=0` esconde a credencial da tela — obrigatório antes de abrir o app ao público, junto com a troca da senha.
- O provedor de e-mail do Supabase Auth precisa ficar **ligado** para esse login funcionar. Para que ninguém crie conta por e-mail direto pela API, o trigger `block_public_email_signup` em `auth.users` (migração `20261103150000`) recusa todo cadastro com provedor `email` fora dos domínios internos `@bobi.local` e `@bobi.test` (painel, modo local e e2e, criados pelo servidor com e-mail já confirmado). O Google não é afetado. A opção "desativar cadastros" do Supabase não foi usada porque é global e também bloquearia novos jogadores pelo Google.
- O painel mostra só **apelido e faixa etária** (menor / 18+). Nome, e-mail, foto e data de nascimento não aparecem (RNF015, DD014, DD015).

**O que é medido (telemetria nova).**

| Dado | Onde | Como |
|---|---|---|
| Tempo de resposta | `activity_attempts.duration_ms` | Do momento em que a atividade (ou a nova tentativa) aparece até "Verificar", medido no aparelho; acima de 1 h é descartado |
| Abertura de lição/avaliação | `session_events` `activity_open` | Ao reservar a atividade (DD008) |
| Saída pelo botão X | `session_events` `activity_exit` | Com a atividade em que estava e se a última resposta estava errada (`after_error`) |
| Saída do app | `session_events` `app_left` | Fechar a aba, trocar de app ou bloquear a tela no meio da atividade; enviado por `navigator.sendBeacon` para `/api/telemetria` |

Telemetria nunca quebra o jogo: falhas ao gravar eventos são ignoradas.

**Indicadores do painel** (`src/lib/game/analytics.ts`, testados em `analytics.test.ts`), filtráveis por 7, 30 ou 90 dias:

- **Visão geral:** jogadores cadastrados e novos, jogadores ativos, primeiras conclusões de lição, respostas enviadas, acerto na primeira tentativa, tempo mediano por resposta, uso da dica quando oferecida (após 2 erros, DD006) e aprovação nas avaliações.
- **Jogadores ativos por dia** (dia em America/Sao_Paulo, DD005).
- **Retenção após erro:** para cada resposta errada em lição, o que veio depois — *tentou de novo na hora* (respondeu em até 30 min sem sair), *saiu e voltou depois* ou *saiu e não voltou*; como saiu (botão X, saiu do app ou ficou mais de 30 min parado); tempo mediano até voltar; e quantos erros viraram acerto depois na mesma atividade. Avaliações ficam fora porque não dão feedback imediato.
- **Onde as pessoas saem:** total de saídas no meio da atividade, quantas logo após um erro, e os pontos (lição + atividade) com mais saídas.
- **Trilha lição por lição:** começaram, concluíram, acerto de primeira, erros por jogador, tempo mediano e saídas.
- **Atividades mais difíceis:** maior erro na primeira tentativa (mínimo de 2 jogadores), tempo e uso de dica.
- **Avaliações de domínio:** tentativas finalizadas, aprovação, nota média e questão com menor acerto.
- **Jogadores:** apelido, faixa etária, última atividade, lições concluídas, XP, respostas e acerto de primeira.

**Dados de demonstração:** `pnpm local:demo` cria jogadores sintéticos (`demo-XX@bobi.local`, apelidos `demo_*`) no Supabase **local** para o painel ter o que mostrar. O script se recusa a rodar contra o banco remoto.

**Consequências:** RF039 passa a implementado; RF037/RF038 (versionar e publicar conteúdo pela interface) continuam fora do MVP e dependem de PD010. Os registros anteriores a esta decisão não têm `duration_ms` nem eventos de sessão, então os indicadores de tempo e saída valem a partir de 03/11/2026.

## Pendências que continuam abertas

| ID | Tema | Precisa estar decidido antes de |
|---|---|---|
| PD007 | Oficina: máquinas, custos, minijogo, cancelamento (ver [seção 8](../gameplay/pd007-oficina-e-progressao.md)) | Incremento C |
| — | Variações das avaliações AV01–AV03 (RF044): escrever e revisar | Fim do incremento D |
| — | Personagem-mestre do Caramelo | Arte definitiva (placeholders até lá) |
| — | Regra de empate do ranking global | Ranking |
| PT001 | Idade, privacidade e menores (inclui Family Link no login Google, DD011) | Qualquer conta real de menor; anúncios |
| — | Credenciais OAuth do Google configuradas no Supabase | Primeiro login |
| PD010 | Gestão editorial (o painel de **relatórios** já existe, DD026; edição de conteúdo continua no Git) | Edição de conteúdo fora do Git |
| DD026 | Esconder a conta de demonstração (`BOBI_ADMIN_DEMO=0`), trocar a senha e criar contas administrativas nominais (`pnpm admin:create`) | Abertura ao público |
| PD011 | Metas de desempenho e recuperação | Lançamento |
| PD012 | Aceite do MVP e avaliação pedagógica | Lançamento |
| DD017 | Revisão pedagógica dos textos marcados como "redigido pela equipe técnica" | Teste com usuários |
| DD021 | Homologar ou substituir os valores de teste da oficina (PD007) | Lançamento |
| RF044 | Escrever variações das avaliações | Fim do incremento D |
| DD022 | Produzir os 188 assets de `sprites-pendentes.md` | Teste com usuários |
