# Minijogo de nivelamento — contrato visual v0.1

**Data:** 03/11/2026  
**Estado:** direção de produção para a família `minijogo-nivelamento`; revisão visual do responsável pendente.  
**Escopo:** representação didática, não instrução física ou previsão de impressão real.

## Mesa interativa

- Arquivo: `bobi-minijogo-mesa.png` · `720 × 720` · PNG RGBA.
- Câmera ortográfica superior, sem perspectiva, inclinação ou bico na imagem.
- Mesa quadrada cinza-clara com quatro roldanas laranja e quatro pontos de checagem.
- Pontos de toque: centros a 25%/75% do canvas em X e Y. Os botões de interface ficam centrados sobre esses marcadores e preservam toque, clique, foco e rótulo acessível.

## Diagnóstico da primeira camada

Os três arquivos têm `384 × 192`, PNG RGBA, e o mesmo corte lateral: bico à esquerda, percurso do filamento para a direita, mesa cinza no terço inferior. A única variação é o comportamento visual da linha.

| Estado | Arquivo | Evidência visual |
|---|---|---|
| `too-close` | `bobi-minijogo-linha-too-close.png` | Linha achatada, falhada e com acúmulo lateral |
| `ok` | `bobi-minijogo-linha-ok.png` | Linha contínua, levemente achatada e aderida |
| `too-far` | `bobi-minijogo-linha-too-far.png` | Fio redondo, solto e sem contato em trechos |

### Carro X e hotend padronizados

- Duas guias horizontais creme, contornadas em roxo-escuro, atravessam o quadro de uma extremidade à outra e entram/saem por trás do carro.
- O carro laranja arredondado tem ventoinha roxa circular, duas fendas de ventilação à direita e **um único** bico triangular laranja centralizado abaixo.
- O conjunto é o mesmo padrão visual da Bobi Mini; a linha de diagnóstico muda, mas a barra, o carro e a origem do bico não.

## Linguagem visual e segurança

- Contorno roxo-escuro, bico roxo/laranja, filamento `#FD7301`, mesa cinza-clara e fundo transparente.
- Sem mãos, pessoas, valores numéricos, marcas, texto dentro da arte, fumaça ou fogo.
- O resultado é sempre acompanhado pelo texto explicativo da interface; a ilustração reforça a observação e não substitui o feedback acessível.
