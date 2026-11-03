# Design system — bobi.

**Status:** implementado (03/11/2026, DD017–DD022) sobre os tokens candidatos v0.2 (DD013). Código: `src/app/globals.css` e `src/components/game/`.

Usa **padrões funcionais** de apps gamificados de idioma (trilha de nós, uma atividade por tela, botões grandes "pressionáveis", rodapé de feedback colorido, celebração na conclusão) com **identidade própria**: laranja/roxo do Caramelo, creme de oficina, verde só para "correto", vocabulário de impressão 3D. Não copia logotipo, mascote, ilustrações, sons, textos nem a paleta de terceiros.

## Tokens (Tailwind `@theme`)

| Token | Valor | Uso |
|---|---|---|
| `brand-primary` / `-pressed` | `#FD7301` / `#C2410C` | Ação principal, nó atual, barra de progresso. **Texto roxo profundo sobre laranja** (branco não passa contraste). |
| `brand-caramel` / `-pressed` | `#F29507` / `#B86E00` | XP, nós concluídos, Caramelo |
| `brand-cream` / `-cream-soft` | `#FDD182` / `#FFF1D6` | Seleção, balões, arte provisória |
| `structure-purple` / `-pressed` | `#523568` / `#3A2449` | Cabeçalho de mundo, botão secundário forte, Fios |
| `structure-deep` | `#241241` | Texto |
| `structure-soft` / `-soft-text` / `-line` | `#8D71A7` / `#5B4A6E` / `#E6DCEF` | Bordas, texto secundário |
| `feedback-success` (+ `-pressed`, `-soft`) | `#1F8A4C` | **Somente** acerto (texto ≥ 18 px em branco) |
| `feedback-error` (+ `-pressed`, `-soft`) | `#C63D3D` | Erro, sempre com ícone ✖ e texto |
| `locked` / `-pressed` | `#E9E3EE` / `#CBBFD6` | Nós bloqueados, botão desabilitado |
| `background` / `surface` | `#FFF8EE` / `#FFFFFF` | Fundo / cartões |

Fonte: Nunito (Google Fonts, aberta), pesos 400–900. Escala de espaçamento 4/8. Raio padrão 16 px (`rounded-2xl`).

## Componentes

| Classe / componente | Descrição |
|---|---|
| `btn-primary`, `btn-secondary`, `btn-purple`, `btn-success`, `btn-danger`, `btn-ghost` | Botão 3D: sombra inferior de 4 px na cor "pressed"; ao tocar desce 4 px. Maiúsculas, 52 px de altura mínima. |
| `.choice` + `data-state` (`selected`, `correct`, `wrong`, `used`) | Cartão de alternativa/peça. `wrong` treme (`animate-shake`). |
| `.bubble` | Balão de fala do Caramelo, com seta à esquerda. |
| `.progress-track` / `.progress-fill` | Barra de progresso com brilho. |
| `.badge`, `.stat-pill`, `.card` | Etiquetas, contadores e cartões. |
| `Caramelo` / `CarameloSays` | Mascote por pose (`idle, talk, explain, hint, celebrate, concern, alert, unlocked`) + balão. SVG provisório. |
| `AssetView` | Mostra a arte do catálogo ou o cartão provisório (emoji + rótulo, borda tracejada). |
| `ActivityView` | Motor dos 4 tipos: múltipla escolha, diagnóstico visual (cartões com imagem), associação (toque esquerda → direita, pares numerados por cor) e ordenação (toque nos cartões na ordem; toque de novo remove). |
| `FeedbackFooter` | Rodapé fixo: Verificar → faixa verde "Mandou bem!" ou vermelha "Quase! Vamos de novo." com feedback; "Ver dica" a partir do 2º erro. Enter confirma. |
| `StatsBar` | Sequência 🔥, XP ⭐ e Fios 🧵 no topo da trilha e da oficina. |

## Telas

- **Boas-vindas / onboarding** (incremento A).
- **Trilha:** cabeçalho de mundo fixo (roxo), nós circulares em zigue-zague; concluído = caramelo com ✔, atual = laranja com balão "Começar/Continuar", bloqueado = lilás com 🔒; avaliação = medalha em quadrado arredondado.
- **Lição (tela cheia):** ✕ + barra de progresso; abertura com falas do Caramelo; uma atividade por tela; conclusão com XP/Fios animados, meta do dia, resumo e convite para a oficina.
- **Avaliação:** introdução com regras, 5 questões sem revelar acerto, resultado com explicação e "Revisar Lxx".
- **Oficina:** máquina com estado (nivelar / livre / imprimindo com cronômetro do servidor / pronta para coletar), projetos, melhorias e prateleira.
- **Nivelar:** mesa vista de cima com 4 cantos, medidor lateral do bico, camada de teste por canto.
- **Perfil:** estatísticas, conquistas, opt-in do ranking (18+), sair.
- **Ranking:** XP da semana, lista global opt-in, empates com a mesma posição.

## Acessibilidade

Foco visível roxo; alternativas com `role="radio"`; atalhos 1–5 e Enter; feedback sempre com ícone + texto; `prefers-reduced-motion` desliga animações; alvos de toque ≥ 44 px; mensagens de erro/conexão com `role="alert"`.

## Carregamento e retorno de ações

- **Carregamento de tela:** sempre `PageLoading` (`src/components/page-loading.tsx`) — Caramelo e texto centralizados no espaço livre da tela, nunca um cartão no topo.
- **Resultado que o jogador precisa ver:** se a ação muda o que ele deve fazer em seguida (ex.: camada de teste do nivelamento), o retorno abre em **tela cheia** com o botão de próxima ação fixo no rodapé. Nada de resultado surgindo abaixo da dobra, onde no celular ele só aparece rolando.
- **Tela de login:** só marca, Caramelo, uma fala e o botão Google; cabe sem rolagem a partir de 360×640.
- **Feedback de resposta:** o Caramelo aparece dentro da faixa de feedback (comemorando no acerto, preocupado ou dando dica no erro), ao lado da mensagem, nunca solto no fim da página.
- **Trilha:** pata = lição disponível ou em andamento; selo com ✔ = concluída; cadeado = bloqueada; medalha = avaliação.
- **Menu inferior:** sem fundo no botão inteiro; a aba ativa ganha uma pastilha creme com borda laranja suave em volta do ícone e rótulo laranja. Na barra lateral (desktop), a linha ativa recebe o mesmo tratamento.
