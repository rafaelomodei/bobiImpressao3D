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
| DD007 | Comportamento sem conexão | Respostas e recompensas só são confirmadas on-line; PWA guarda interface e imagens | Padrão proposto | Incremento A/B |
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

## DD007 — Sem conexão

**Padrão proposto:**

- O PWA guarda em cache a interface, as fontes e as imagens das lições já abertas.
- **Confirmar resposta, concluir lição, receber XP/Fios e iniciar fabricação exigem conexão**, porque são validados no servidor (PD001).
- Sem conexão, a tela mostra mensagem clara (RNF016) e mantém a resposta selecionada para reenviar; nada é contado até a confirmação do servidor.
- A fabricação virtual continua avançando no servidor com o app fechado (RF045).

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
| Primeira conclusão | `lesson:<id>:first` | 20 / 10 |
| Revisão válida do dia | `review:<id>:<dia>` | 5 / 0 |
| Primeira aprovação | `assessment:<id>:first` | 30 / 15 |
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

## Pendências que continuam abertas

| ID | Tema | Precisa estar decidido antes de |
|---|---|---|
| PD007 | Oficina: máquinas, custos, minijogo, cancelamento (ver [seção 8](../gameplay/pd007-oficina-e-progressao.md)) | Incremento C |
| — | Variações das avaliações AV01–AV03 (RF044): escrever e revisar | Fim do incremento D |
| — | Personagem-mestre do Caramelo | Arte definitiva (placeholders até lá) |
| — | Regra de empate do ranking global | Ranking |
| PT001 | Idade, privacidade e menores (inclui Family Link no login Google, DD011) | Qualquer conta real de menor; anúncios |
| — | Credenciais OAuth do Google configuradas no Supabase | Primeiro login |
| PD010 | Gestão editorial e painel administrativo | Edição de conteúdo fora do Git |
| PD011 | Metas de desempenho e recuperação | Lançamento |
| PD012 | Aceite do MVP e avaliação pedagógica | Lançamento |
| DD017 | Revisão pedagógica dos textos marcados como "redigido pela equipe técnica" | Teste com usuários |
| DD021 | Homologar ou substituir os valores de teste da oficina (PD007) | Lançamento |
| RF044 | Escrever variações das avaliações | Fim do incremento D |
| DD022 | Produzir os 188 assets de `sprites-pendentes.md` | Teste com usuários |
