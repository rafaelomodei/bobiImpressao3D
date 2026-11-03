# Oficina — contrato visual de sprites v0.1

**Data:** 03/11/2026  
**Estado:** direção de produção para a família `itens-oficina`; sujeita à revisão visual do responsável.  
**Referência:** Bobi Mini e catálogo em `docs/design/sprites-pendentes.md`.

## Câmera e enquadramento únicos

- Vista frontal em 3/4 pela esquerda do observador, com câmera aproximadamente 20° acima da mesa.
- Não girar individualmente cada prop: a rotação nasce somente dessa câmera-mestra.
- Canvas: `256 × 256`, PNG RGBA, fundo realmente transparente.
- Centro horizontal da peça: `x = 128 px`.
- Linha de contato/base: `y = 210 px` (82% da altura). Bases, pés ou a aresta inferior encostam nessa linha; nenhum item usa sombra externa para sugerir altura.
- Área útil: margem transparente mínima de 20 px; a silhueta ocupa em regra 62–72% da largura.

## Linguagem material

- PLA laranja `#FD7301`, realces creme e contorno roxo-escuro consistente com a Bobi Mini.
- Formas arredondadas, cores chapadas e linhas de camada horizontais discretas. Sem gradiente intenso, realismo, textura fotográfica, marca externa ou texto — exceto `bobi.` em relevo no chaveiro.
- Cada item é legível em 40 px: manter a silhueta mais importante que detalhes pequenos.

## Uso na oficina

O catálogo e a prateleira exibem o sprite completo. Durante a fabricação, a mesma arte é sobreposta à plataforma da impressora, centralizada e com a linha-base alinhada ao plano da mesa; o recorte vertical mostra a peça crescendo sem mudar câmera, escala ou origem.

## Família entregue

| Arquivo | Silhueta obrigatória |
|---|---|
| `bobi-item-chaveiro.png` | Etiqueta arredondada, furo aberto e `bobi.` em relevo |
| `bobi-item-cubo-calibracao.png` | Cubo com X, Y e Z em baixo-relevo |
| `bobi-item-organizador.png` | Três compartimentos de alturas diferentes |
| `bobi-item-suporte-ferramentas.png` | Placa com ganchos, espátula e alicate |
| `bobi-item-porta-carretel.png` | Base, dois apoios, eixo e carretel |
