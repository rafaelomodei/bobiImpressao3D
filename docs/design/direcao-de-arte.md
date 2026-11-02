# Direção de arte e inventário de recursos — bobi.

**Estado:** guia operacional provisório; **não** é uma identidade gráfica homologada.  
**Atualização:** 01/11/2026.

## Decisões confirmadas

- Nome do jogo: **bobi.** (minúsculas, com ponto).
- Slogan: **O jeito divertido de aprender impressão 3D.**
- Mascote oficial: **Caramelo, um cachorro caramelo brasileiro**.
- Plataforma educacional gamificada com interface predominantemente **2D**.
- O Caramelo apresenta situações, dá explicações curtas e contextualiza feedbacks, sem diálogos longos ou professor.
- O currículo inicial contém M1–M3 e 24 lições; os recursos pedagógicos devem funcionar sem impressora física.

**Não confirmado:** desenho final do cachorro, acessórios, roupas, paleta de cores, tipografia, proporções, formato das orelhas, poses finais e demais personagens (Pipo/Lia são referências de exploração histórica, não elenco homologado).

## Recomendações técnicas provisórias para sprites

- Adotar ilustração 2D com silhueta legível em tamanho pequeno, formas simples e cores sólidas.
- Explorar como *hipótese* estilo cartoon flat, contornos consistentes, ausência de sombras/gradientes pesados; quantidade de cores por sprite limitada para facilitar consistência. A paleta final depende de aprovação.
- Preferir PNG RGBA com transparência real para sprites, sem confundir fundo branco com alpha.
- Em sprites de um mesmo personagem, manter proporções, perspectiva, escala e ponto de ancoragem idênticos entre quadros.
- Evitar ilhas brancas, buracos não intencionais entre preenchimentos, objetos encostados e cortes nas bordas.
- Produzir **personagem-mestre (turnaround e expressões)** antes de gerar lotes de poses. Não registrar uma referência gerada como aprovada sem confirmação.

## Catálogo inicial de recursos

| ID sugerido | Tipo | Aplicação | Estado |
|---|---|---|---|
| CAR-MASTER | Personagem-mestre | Silhueta, frente, perfil, 3/4 e costas | A definir |
| CAR-EXP | Expressões | Explicar, incentivar, corrigir e comemorar | A definir |
| L01-CHAIN | Peça/chaveiro | Modelo digital → impressão → físico | Especificado, arte pendente |
| L02-TOWER | Diagrama | Torre por camadas, progressão e lacuna didática | Especificado, arte pendente |
| L03-FLOW | Diagrama | Ideia → modelo 3D → fatiador → fabricação | Especificado, arte pendente |
| L04-OBJECTS | Objetos | Sólidos geométricos, organizador, protótipo e alternativas | Especificado, arte pendente |
| UI-ICONS | Interface | Trilha, oficina, XP, Fios, progresso e feedback | A definir |

O catálogo não substitui as fichas aprovadas de [L01–L04](../licoes/mundo-01.md). Qualquer visual de cachorro deve respeitar a identidade confirmada.

## Convenção sugerida de produção

Nome: `bobi-<categoria>-<asset>-<estado>-<frame>.png`.

Metadados mínimos por ativo: `id`, `kind`, `lesson_id`, `width`, `height`, `format`, `anchor`, `state`, `version`, `reference`, `review_status`, `license_status`.

Exemplo **ilustrativo**, não recurso criado:

```json
{
  "id": "caramelo-exp-01",
  "kind": "character_sprite",
  "lesson_id": "BOBI-M01-L01",
  "width": 512,
  "height": 512,
  "format": "png",
  "anchor": "center-bottom",
  "state": "explain",
  "version": "draft-1",
  "reference": "CAR-MASTER",
  "review_status": "pending",
  "license_status": "original-pending-review"
}
```

## Regra de revisão

Cada entrega deve especificar o que **foi produzido**, o que é **somente prompt**, o que foi **verificado**, o que ainda **depende de aprovação visual** e as licenças de uso. Imagens ilustrativas encontradas na web **não** se tornam automaticamente recursos autorizados para o jogo.

**Fonte de origem deste guia:** `skill-sprite.md` disponível nos materiais do projeto; adaptado para eliminar a antiga referência de mascote tartaruga e referências não presentes no repositório.
