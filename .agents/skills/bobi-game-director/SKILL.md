---
name: bobi-game-director
description: Orienta o design de gameplay, oficina virtual, progressão, personagem Caramelo, roteiro de diálogos e animações do bobi., garantindo coerência com as decisões homologadas.
---

# bobi-game-director — Gameplay, narrativa e consistência

## Quando usar

- Criar ou modificar uma mecânica de jogo, minijogo de calibração, fabricação, item de inventário, equipamento ou upgrade.
- Escrever diálogos, feedbacks, textos de onboarding, reações, falas e narrações do Caramelo.
- Planejar estados e transições de animação para máquinas, personagens e itens.
- Auditar se uma proposta nova conflita com lições/decisões já homologadas.

## Fontes de verdade — ordem obrigatória

1. [Termo de Abertura](../../../docs/termo-de-abertura.md) e as fichas homologadas de lições e avaliações.
2. [Proposta de oficina e progressão](../../../docs/gameplay/pd007-oficina-e-progressao.md), separando **intenção confirmada** de **regras propostas** ainda não homologadas.
3. [Design system e guia de narrativa/animacão](../../../docs/design/sistema-visual-narrativa-e-animacao.md), identificando tokens e artes **provisórios**.
4. [Direção de arte](../../../docs/design/direcao-de-arte.md) e [skill para sprites](../bobi-sprite-studio/SKILL.md).
5. [Catálogo de fontes técnicas](../../../docs/knowledge/bobi_base_de_conhecimento_impressao_3d.md), verificando fontes específicas antes de afirmar fatos.

**Nome e personagem:** bobi. — O jeito divertido de aprender impressão 3D. **Caramelo é um cachorro caramelo brasileiro.** Nunca reutilizar a identidade provisória antiga de tartaruga/Tuca.

## Passos para criar uma mecânica

1. Declarar `feature_id`, objetivo educativo, onde aparece (lição/oficina/ranking), pré-requisitos e status de aprovação.
2. Descrever **loop do jogador**: contexto → interação → resultado → feedback → consequência → recuperação.
3. Distinguir erro didático de falha real; toda simulação é ilustrativa e não apresenta parâmetros universais ou instruções físicas perigosas.
4. Respeitar recompensas, progressão e privacidade dos PDs vigentes. **Não** criar custo de Fios, benefício, moeda, ranking, vida ou nível como aprovado sem confirmação.
5. Incluir estados `idle/loading/disabled/success/error/retry`, persistência, interrupção, clique/toque e caso de usuário sem acesso.
6. Definir critérios de aceite testáveis para mobile, desktop, erros e retomada.
7. Submeter nova regra para homologação **antes** de substituir arquivos normativos.

## Passos para diálogos e comportamento

1. Identificar `actor_id=caramelo`, `event`, `lesson_or_feature_id`, `emotion`, `message_pt_br`, `visual_state`, `sound_optional`.
2. Usar texto brasileiro breve e natural, sem jargão não apresentado, com elogios proporcionais e explicação dos erros.
3. Para erro: mencionar evidência/observação e indicar uma nova tentativa; **nunca** humilhar o jogador.
4. Para segurança: vocabulário inequívoco, sem piadas ou desafios que incentivem contato com partes quentes, em movimento ou resinas.
5. Não criar voz, áudio, dublagem ou nome de personagem extra como recurso final até aprovação; texto é fonte principal.

Exemplo de registro **provisório**:

```yaml
actor_id: caramelo
event: level_check_incorrect
feature_id: workshop-manual-leveling
emotion: investigate
visual_state: hint
message_pt_br: "Olha a primeira camada. As linhas ficaram muito afastadas; vamos tentar outro ajuste?"
audio_optional: null
approval_status: proposed
```

## Planejamento de animação

- Partir de master aprovado do elemento (mascote/máquina/objeto).
- Para cada estado, especificar: `asset_id`, `master_version`, `state`, `frames`, `anchor`, `duration_ms`, `loop`, `reduced_motion_fallback`.
- Manter paleta, silhueta, contorno, perspectiva, escala e âncora consistentes entre frames; gerar novo master somente após decisão aprovada.
- Usar animação como reforço pedagógico, sem esconder conteúdo essencial em áudio ou movimento.

## Limites invioláveis

- Nenhuma oficina virtual bloqueia lição aprovada por temporizador ou falta de moeda.
- Simulação não equivale a físico real nem dispensa segurança.
- Ranking **global único**, mas semanal e **opt-in**, com XP competitivo elegível; restrições de privacidade/idade continuam vigentes.
- Evitar clonar design do Duolingo; usar os padrões de interação como referência e criar visuais/sons originais.
- Stack: **Next.js, PWA, Supabase e Vercel**; **não usar Firebase**.
- Perfis de menores, publicidade e ranking público ficam condicionados à PT001 antes de lançamento ao público relevante.

## Resultado esperado da skill

Entregar proposta de gameplay com critérios de aceite, roteiro/estados visuais, requisitos técnicos, itens ainda não aprovados e referências de documentos internos. **Não afirmar ter gerado sprites, animações ou arquivos que não foram criados.**
