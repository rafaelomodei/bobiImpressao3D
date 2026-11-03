# l02 — torre crescendo camada por camada

**asset id:** `l02-torre-estagios`<br>
**uso:** abertura da L02 — “Criando camada por camada”<br>
**formato de entrega:** PNG animado (APNG), 512 × 512, RGBA, loop contínuo

## sequência

| Quadro | Arquivo-fonte | Estado | Duração |
|---:|---|---|---:|
| 1 | `bobi-l02-torre-estagios-01.png` | base baixa; bico deposita | 500 ms |
| 2 | `bobi-l02-torre-estagios-02.png` | torre em ~30%; bico no topo | 500 ms |
| 3 | `bobi-l02-torre-estagios-03.png` | torre em ~50%; bico no topo | 500 ms |
| 4 | `bobi-l02-torre-estagios-04.png` | torre em ~75%; bico no topo | 500 ms |
| 5 | `bobi-l02-torre-estagios-05.png` | torre completa; bico recolhido | 500 ms |

## invariantes

- câmera frontal levemente elevada, mesa e base da torre fixas;
- mesma largura, escala, paleta e contorno da torre em todos os quadros;
- crescimento somente de baixo para cima, com camadas contínuas e sem lacunas;
- o primeiro quadro permanece uma imagem estática legível quando animação não for exibida.

O arquivo consumido pela aplicação é `public/sprites/bobi-l02-torre-estagios.png`.
