# Decisões de desenvolvimento — bobi.

**Data:** 02/11/2026  
**Responsável:** Rafael Geovani Omodei  
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
| DD009 | E-mail do código de acesso | Supabase Auth com código (OTP); SMTP próprio antes de qualquer usuário externo | Padrão proposto | Teste com usuários |
| DD010 | Ferramentas de desenvolvimento | pnpm, Tailwind CSS, Zod, Vitest, Playwright, Supabase CLI | Padrão proposto | Incremento A |

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

## DD009 — E-mail do código de acesso

**Padrão proposto:** login por **código de uso único (OTP) do Supabase Auth**, configurado para enviar código (não link mágico). O envio de e-mail padrão do Supabase é limitado e serve só para desenvolvimento; **antes de testar com qualquer usuário externo**, configurar SMTP próprio (provedor a escolher, por exemplo Resend ou Amazon SES).

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

## Pendências que continuam abertas

| ID | Tema | Precisa estar decidido antes de |
|---|---|---|
| PD007 | Oficina: máquinas, custos, minijogo, cancelamento (ver [seção 8](../gameplay/pd007-oficina-e-progressao.md)) | Incremento C |
| — | Variações das avaliações AV01–AV03 (RF044): escrever e revisar | Fim do incremento D |
| — | Personagem-mestre do Caramelo | Arte definitiva (placeholders até lá) |
| — | Regra de empate do ranking global | Ranking |
| PT001 | Idade, privacidade e menores | Qualquer conta real de menor; anúncios; ranking público |
| PD010 | Gestão editorial e painel administrativo | Edição de conteúdo fora do Git |
| PD011 | Metas de desempenho e recuperação | Lançamento |
| PD012 | Aceite do MVP e avaliação pedagógica | Lançamento |
