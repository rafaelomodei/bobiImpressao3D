# Direção de interface, sprites, animação e narrativa — bobi.

**Data:** 02/11/2026  
**Status:** objetivos de consistência, referência de UX e mascote **definidos pelo responsável**; tokens, animações e roteiros abaixo são **diretrizes candidatas**, ainda sem aprovação de arte final.  
**Mascote oficial:** Caramelo, **cachorro caramelo brasileiro**.  
**Fontes internas:** [guia de arte existente](direcao-de-arte.md) · [skill de sprites](../../.agents/skills/bobi-sprite-studio/SKILL.md) · [oficina](../gameplay/pd007-oficina-e-progressao.md).

## 1. Referência de UX, sem clonagem de identidade

O bobi. deve aproveitar padrões conhecidos de aplicativos gamificados, particularmente **Duolingo**: caminho visível de progresso, passos pequenos, respostas com retorno imediato, botões grandes, cores vivas, telas limpas, sensação de conquista e mascote participativo.

**Separação obrigatória:** inspiração em **padrões funcionais de UX** não significa replicar identidade distintiva de terceiros. **Não copiar** logotipo, ilustrações, mascote, tipografia proprietária, textos, sons, disposição distintiva de telas, ícones autorais nem paleta exata como um pacote idêntico. O bobi. deve ter aparência reconhecível própria, com elementos ligados à impressão 3D, ao cachorro Caramelo e ao vocabulário da oficina.

## 2. Sistema visual candidato (tokens iniciais)

Tokens abaixo são uma **hipótese de implementação**, não aprovação de identidade final. Eles fornecem consistência até a homologação de uma ficha-mãe e design system.

| Token | Valor sugerido | Uso |
|---|---|---|
| `color.brand.primary` | `#219A70` | Ações principais, caminho e estados positivos |
| `color.brand.primaryDark` | `#167957` | Pressionado / contorno contextual |
| `color.brand.warm` | `#E7A14A` | Identidade Caramelo, detalhes de recompensa |
| `color.accent.blue` | `#3C87D6` | Informação e elementos de oficina |
| `color.accent.purple` | `#7364C7` | Itens especiais/desbloqueios |
| `color.feedback.error` | `#CA4F50` | Erro com texto/ícone, nunca só por cor |
| `color.background` | `#F8FAF6` | Superfície base |
| `color.surface` | `#FFFFFF` | Cards e controles |
| `color.text.primary` | `#25313D` | Texto principal |

**Forma:** cantos arredondados consistentes, espaçamento com base em escala de 4/8, contorno legível, cards simples, botões grandes com estados ativos/desativados/carregando/correto/incorreto. Sombra mínima para botões, sem gradiente intenso.

**Tipografia:** selecionar fonte aberta com boa legibilidade em português (candidata: Nunito Sans ou outra), usar escala consistente, não utilizar tipografia proprietária de concorrentes.

**Acessibilidade básica:** contraste adequado, opção de foco visível para teclado, feedback com texto e ícone (não apenas cor), ação por toque e clique para minijogos, tamanho de alvo confortável e preferência por movimento reduzido.

## 3. Padrão obrigatório de produção de assets

**Regra do responsável:** depois de aprovado um elemento, todos os sprites, poses, ícones e itens dessa família devem seguir **exatamente a mesma direção visual**.

**Processo de aprovação e controle:**
1. Criar **ficha-mãe** do cachorro Caramelo: silhouette, proporções, olhos, orelhas, focinho, cores, perspectiva, contornos e acessórios.
2. Fazer referência-mestra em vistas (frente, 3/4, perfil, costas), expressões e pose neutra.
3. Registrar versão aprovada da ficha e IDs no catálogo.
4. Gerar **um sprite por arquivo** ou frames de animação; exportar RGBA real quando necessário.
5. Executar QA de proporção, cores, espessura de traço, transparência, recorte e alinhamento de frames.
6. Impedir publicação de recursos incompatíveis com a ficha-mãe; alterações na ficha exigem nova versão, não variação silenciosa.

**Direção provisória:** cartoon flat 2D, silhuetas simples, cores chapadas, contornos consistentes e sem sombras volumétricas. Objetos 3D da oficina podem ter representação isométrica **original**, mas dentro da mesma família de desenho, espessura e paleta.

**Esquema de nomes:** `bobi-<familia>-<asset>-<estado>-<frame>.png`. Exemplos de *nomes planejados* (arquivos não criados): `bobi-caramelo-explain-idle-01.png`, `bobi-machine-mini-printing-01.png`.

## 4. Bíblia inicial de comportamento e linguagem

### Caramelo — único personagem principal homologado
- **Papel:** apresentar desafios, explicar conceitos, reagir à resolução, orientar erros e celebrar progresso.
- **Voz:** português brasileiro natural, frases curtas e informativas, leve humor ligado à oficina; **não** infantilizar nem humilhar o jogador.
- **Explicação:** uma ideia por balão, com vocabulário introduzido progressivamente.
- **Erro:** indicar o raciocínio ou a observação faltante; nunca dizer que o aprendiz é incapaz.
- **Segurança:** tom claro e firme; não transformar riscos físicos em brincadeiras.
- **Nar­ração/voz sintetizada:** **não aprovada como recurso obrigatório**; todo conteúdo essencial existe como texto primeiro. Gravação, TTS, custo, licenças e escolha da voz ficam para decisão futura.

| Evento | Estado visual sugerido | Exemplo de fala inédita | Efeito |
|---|---|---|---|
| Início de missão | `explain` | “Temos uma missão nova na oficina. Vamos ver o que precisa ser feito?” | Balão + transição curta |
| Acerto | `celebrate-small` | “Isso! Você reconheceu onde o material é depositado.” | Confete leve opcional |
| Erro | `hint` | “Olhe de novo para a primeira camada. Onde aparece a diferença?” | Destacar evidência |
| Desbloqueio | `unlocked` | “Boa! Uma melhoria nova ficou disponível para sua máquina.” | Animação de item |
| Impressão em andamento | `watch` | “A máquina virtual está trabalhando. Você pode voltar depois.” | Contador do servidor |
| Falha simulada | `investigate` | “Deu para perceber um defeito. Que pista a peça está mostrando?” | Comparação visual |
| Segurança | `alert` | “Parte quente e peça em movimento: aqui a gente observa sem tocar.” | Alerta e instrução |

**Pipo e Lia:** aparecem em histórico de descoberta como sugestões, **não são personagens homologados**. Não gerar voz, sprite ou narrativa vinculante para eles até decisão de elenco.

## 5. Animações — estados padronizados por família

**Cachorro Caramelo:** `idle`, `talk`, `explain`, `hint`, `celebrate`, `concern`, `alert`, `unlocked`.

**Máquinas virtuais:** `locked`, `idle`, `adjust-level`, `printing`, `paused`, `finished`, `upgrade`, `error`.

**Objetos:** `locked`, `preview`, `fabricating`, `collected`, `equipped`.

Registrar por animação: `asset_id`, `master_version`, `state`, `frames`, `fps/frame_duration_ms`, `anchor`, `loop`, `duration`, `audio_cue_optional`, `reduced_motion_fallback`.

**Critério:** mesma silhueta, câmera, escala e origem entre frames. Uma sequência PNG ou Lottie só é “animação” quando os quadros e metadados existem e funcionam; um mockup não é GIF funcional.

**Estratégia inicial de implementação:** começar com CSS/transformações discretas para UI e reações simples; trocar por spritesheets ou animações vetoriais após homologar os masters. Não obrigar áudio ou efeitos pesados no fluxo de 1–5 minutos.

## 6. Telas e componentes a desenhar

- **Trilha:** caminho de missões, nós bloqueados, concluídos e ativos, progresso e mundo atual.
- **Lição:** desafio com imagem, alternativas grandes, balão curto do Caramelo, botão de resposta e feedback.
- **Oficina:** máquina visível, projetos, inventário, upgrades e minijogo de calibração.
- **Perfil:** apelido, avatar, conquistas, XP e Fios.
- **Ranking global:** classificação única opt-in por XP semanal elegível, cartões simples, dados mínimos e privacidade.

**Padrão de estados:** todas as telas terão `loading`, `empty`, `error`, `success`; salvar e permitir retomar após perda de conexão quando aplicável.

## 7. Critérios de aprovação visual ainda abertos

- Silhueta e expressões definitivas do cachorro Caramelo.
- Paleta, tipografia e iconografia oficiais (os tokens acima são **propostos**).
- Grid e densidade do mapa de trilha, layouts mobile/desktop e componentes centrais.
- Personagens adicionais, narração em voz, efeitos de áudio e política de acessibilidade/movimento.
- Masters de máquinas/objetos, perspectivas e animações definitivas.

**Não gerar sprites ou imagens neste PR.** Este documento especifica a consistência e o fluxo editorial; a skill existente gera ou revisa ativos quando as ferramentas correspondentes estiverem disponíveis.
