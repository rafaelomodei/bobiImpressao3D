# mapeamento de assets pendentes por atividade

**Data:** 03/11/2026

**Objetivo:** transformar o backlog de arte em lotes de produção ligados às atividades que o aprendiz vê no jogo.
**Fontes de verdade:** `src/content/assets/{m1,m2,m3}.ts`, `src/content/mundos/` e `sprites-pendentes.md`.

## Leitura rápida

- Há **190 assets catalogados**: **115 prontos** e **75 pendentes** (atualizado em 03/11/2026; a contagem viva está em [sprites-pendentes.md](sprites-pendentes.md)).
- **Entregues em 03/11/2026 (22 curriculares):** L02 `l02-torre` (5: base, metade, lacuna, completa e a animação `l02-torre-estagios`, com quadro estático para movimento reduzido); L04 (7: `l04-video-figuras`, `l04-foto-figuras`, `l04-solidos-geometricos`, `l04-organizador-lapis-cabos`, `l04-caixa-prototipo`, `l04-chaveiro-nome`, `l04-escultura-cachorro`); L09 `l09-bobi-mini-partes` (5); L14 `l14-base` (3); L19 `l19-limite` (2). Os demais pendentes continuam todos curriculares.
- **Entregues em 03/11/2026, lote 2 (16 curriculares):** L06 (3: `l06-carretel-filamento`, `l06-recipiente-resina`, `l06-resina-alerta`); L07 (4: `l07-peca-referencia`, `l07-peca-stringing`, `l07-peca-warping`, `l07-peca-deslocamento`); L08 (6: `l08-bancada-baguncada`, `l08-bloco-plastico`, `l08-enfeite-osso`, `l08-porta-copos`, `l08-porta-lapis`, `l08-porta-lapis-stringing`); AV01 (3: `av01-organizador-compartimentos`, `av01-porta-retrato`, `av01-vaso-decorativo`).
- **Entregues em 03/11/2026, lote 3 (24 curriculares):** L05 (3: `l05-ferramenta-removendo`, `l05-injecao-molde`, `l05-tres-processos`); L11 (10: caminho do filamento, cartões de bico, carretel, extrusor e hotend, esquema sem filamento, opções filamento conectado / peça pronta / tela touch e tubo Bowden); L12 (5: atitudes dedos / não tocar / remover, filamento vira trilha e hotend quente); L15 (6: área livre, pictogramas de calor, emissões e movimento, e riscos da oficina). `av01-peca-stringing` também foi substituído por uma versão nova.
- **Entregues em 03/11/2026, lote 3b (15 curriculares):** L16 (6: bancada obstruída, checklist da oficina, checklist com ventilação pendente e destaques de carretel, obstrução e tela) e AV02 (9: bico, borda levantada, carretel, cenário sem avaliação, eixos XYZ, extrusor e os três riscos — cor, encaixe e perda de aderência). Observação: `av02-eixos-xyz` usa vermelho/verde/azul nos eixos (convenção comum em 3D), fora da paleta do jogo.
- **Retrabalho sugerido (L07, diagnóstico visual):** no tamanho das opções (~110 px) o defeito quase não aparece em `l07-peca-stringing` (fios finos e claros demais) e `l07-peca-warping` (cantos pouco erguidos); `l07-peca-deslocamento` usa outra escala e enquadramento (mesa maior), quebrando o grupo de consistência com a peça de referência. Basta substituir os arquivos com o mesmo nome.
- Números abaixo descrevem o backlog original (38 prontos / 152 pendentes) e servem de plano de produção; os grupos acima já saíram da fila.
- Distribuição: **Mundo 1: 44**, **Mundo 2: 60**, **Mundo 3: 48**.
- Há **21 atividades de diagnóstico visual**. Elas exigem **65 assets pendentes** diretamente na interação; representam o lote mais importante para ensinar a reconhecer peças, defeitos, componentes, segurança e prévias.
- A aplicação já está preparada: assim que um arquivo com o nome previsto for adicionado a `public/sprites/`, o cartão provisório é substituído pela imagem, sem mudança no conteúdo da lição.

## Ordem recomendada

1. Produzir cada **grupo de consistência** completo; não misturar ângulos, escala ou estilo entre opções da mesma pergunta.
2. Começar pelas atividades de diagnóstico visual, pois nelas a imagem é a evidência da resposta, não uma decoração.
3. Dentro de cada mundo, entregar primeiro a abertura e as opções da atividade que compartilham a mesma cena; depois os materiais de explicação e avaliação.
4. Usar os sprites prontos como referência imediata: formas arredondadas, contorno roxo-profundo espesso, paleta laranja/roxo/creme e luz em blocos discretos. Evitar acabamento realista, gradientes pesados e marcas reais; usar transparência real quando indicada. A ficha-mãe do Caramelo é referência de estilo, mas não muda os masters já existentes.

## Lotes completos por mundo

Cada linha é uma unidade de produção. Os IDs são os itens que ainda precisam ser desenhados; a última coluna mostra onde aparecem. A ficha detalhada de câmera, dimensão, fundo e elementos obrigatórios permanece em [sprites-pendentes.md](sprites-pendentes.md).

### Mundo 1 — Descoberta (44)

| Lote | Qtd. | Assets pendentes | Atividades atendidas |
|---|---:|---|---|
| `l01-chaveiro` | 4 | `l01-chaveiro-fluxo`, `l01-chaveiro-digital`, `l01-chaveiro-imprimindo`, `l01-chaveiro-pronto` | L01 abertura; A04 |
| `m1-processos-fabricacao` | 6 | `l01-maquina-deposita`, `l01-maquina-corta`, `l01-impressora-papel`, `l05-injecao-molde`, `l05-ferramenta-removendo`, `l05-tres-processos` | L01 A01; L05 A01/A03/A04; AV01 Q01 |
| `l02-torre` | 6 | `l02-torre-estagios`, `l02-torre-base`, `l02-torre-metade`, `l02-torre-completa`, `l02-torre-lacuna`, `l02-trilha-camada` | L02 abertura; A02/A03/A04 |
| `l03-chaveiro-caramelo` | 1 | `l03-ideia-ao-objeto` | L03 abertura |
| `l04-objetos` | 6 | `l04-aplicacoes`, `l04-solidos-geometricos`, `l04-organizador-lapis-cabos`, `l04-caixa-prototipo`, `l04-escultura-cachorro`, `l04-chaveiro-nome` | L04 abertura; A01/A02/A03/A04 |
| `l04-a01-recursos` | 2 | `l04-video-figuras`, `l04-foto-figuras` | L04 A01 |
| `l06-tecnologias` | 2 | `l06-fdm-e-resina`, `l06-esquema-luz-resina` | L06 abertura; A03 |
| `m1-materiais` | 4 | `l06-carretel-filamento`, `l06-recipiente-resina`, `l06-resina-alerta`, `l08-bloco-plastico` | L06 A01/A04; L08 A02 |
| `m1-defeitos-fdm` | 5 | `l07-peca-referencia`, `l07-peca-stringing`, `l07-peca-warping`, `l07-peca-deslocamento`, `av01-peca-stringing` | L07 A01/A02/A03; AV01 Q05 |
| `l08-bancada` | 1 | `l08-bancada-baguncada` | L08 abertura |
| `l08-projetos` | 4 | `l08-enfeite-osso`, `l08-porta-copos`, `l08-porta-lapis`, `l08-porta-lapis-stringing` | L08 A01/A04 |
| `av01-projetos` | 3 | `av01-organizador-compartimentos`, `av01-vaso-decorativo`, `av01-porta-retrato` | AV01 Q03 |

### Mundo 2 — Oficina (60)

| Lote | Qtd. | Assets pendentes | Atividades atendidas |
|---|---:|---|---|
| `bobi-mini-3q` | 1 | `l09-oficina-bobi-mini` | L09 abertura |
| `l09-bobi-mini-partes` | 5 | `l09-impressora-pontos`, `l09-destaque-bico`, `l09-destaque-extrusor`, `l09-destaque-mesa`, `l09-destaque-carretel` | L09 A01/A02/A04; L14 A01 |
| `l09-funcoes` | 3 | `l09-funcao-depositar`, `l09-funcao-armazenar`, `l09-funcao-sustentar` | L09 A04 |
| `l10-eixos` | 6 | `l10-eixos-xyz`, `l10-seta-z`, `l10-seta-x`, `l10-seta-y`, `l10-anim-camadas`, `av02-eixos-xyz` | L10 abertura; A01/A02/A03; AV02 Q02 |
| `contextos-avulsos-m2` | 3 | `l10-arquiteturas`, `l13-cartao-perfil-pla`, `av02-cenario-sem-avaliacao` | L10 A04; L13 A04; AV02 Q05 |
| `l11-esquema` | 3 | `l11-caminho-filamento`, `l11-tubo-bowden`, `l11-esquema-sem-filamento` | L11 abertura; A03/A04 |
| `l11-cartoes` | 4 | `l11-cartao-carretel`, `l11-cartao-extrusor`, `l11-cartao-hotend`, `l11-cartao-bico` | L11 A01/A02 |
| `l11-opcoes` | 3 | `l11-opcao-filamento-conectado`, `l11-opcao-tela-touch`, `l11-opcao-peca-pronta` | L11 A04 |
| `l12-hotend` | 2 | `l12-filamento-vira-trilha`, `l12-hotend-quente` | L12 abertura; A03 |
| `l12-atitudes` | 3 | `l12-atitude-nao-tocar`, `l12-atitude-dedos`, `l12-atitude-remover` | L12 A03 |
| `l13-materiais` | 4 | `l13-rolos-oficina`, `l13-carretel-pla`, `l13-recipiente-resina`, `l13-folha-papel` | L13 abertura; A02 |
| `l14-base` | 3 | `l14-mesa-primeira-camada`, `l14-base-aderida`, `l14-base-canto-erguido` | L14 abertura; A03 |
| `l15-pictogramas` | 4 | `l15-riscos-oficina`, `l15-picto-calor`, `l15-picto-movimento`, `l15-picto-emissoes` | L15 abertura; A03 |
| `l15-situacoes` | 3 | `l15-mao-bico-quente`, `l15-area-livre`, `l15-filamento-carretel` | L15 A01 |
| `l16-checklist` | 2 | `l16-checklist-oficina`, `l16-checklist-ventilacao-pendente` | L16 abertura; A04 |
| `l16-bancada` | 4 | `l16-bancada-obstruida`, `l16-destaque-obstrucao`, `l16-destaque-carretel`, `l16-destaque-tela` | L16 A01 |
| `av02-componentes` | 3 | `av02-carretel`, `av02-extrusor`, `av02-bico` | AV02 Q01 |
| `av02-aderencia` | 4 | `av02-borda-levantada`, `av02-risco-perde-aderencia`, `av02-risco-encaixe`, `av02-risco-cor` | AV02 Q04 |

### Mundo 3 — Primeira impressão (48)

| Lote | Qtd. | Assets pendentes | Atividades atendidas |
|---|---:|---|---|
| `m3-cartoes-formato` | 4 | `l17-chaveiro-arquivos`, `l17-cartao-stl`, `l17-cartao-3mf`, `l17-cartao-gcode` | L17 abertura; A01/A02/A03/A04 |
| `m3-fatiador-ui` | 3 | `l18-fatiador-tela`, `l18-fatiador-nao-fatiado`, `l20-perfil-divergente` | L18 abertura/A04; L20 A04 |
| `l18-etapas` | 4 | `l18-etapa-abrir`, `l18-etapa-contexto`, `l18-etapa-fatiar`, `l18-etapa-previa` | L18 A03 |
| `l18-acoes` | 3 | `l18-acao-cor`, `l18-acao-fatiar`, `l18-acao-enviar` | L18 A04 |
| `m3-mesa-virtual` | 2 | `l19-chaveiro-gigante`, `l19-chaveiro-fora-da-area` | L19 abertura; A04 |
| `l19-limite` | 2 | `l19-limite-peca-40mm`, `l19-limite-peca-120mm` | L19 A03 |
| `l20-maquinas` | 3 | `l20-duas-maquinas`, `l20-maquina-100mm`, `l20-maquina-60mm` | L20 abertura; A03 |
| `m3-carreteis` | 1 | `l21-carreteis` | L21 abertura |
| `l21-diagnostico` | 4 | `l21-pla-perfil-petg`, `l21-destaque-rotulo-perfil`, `l21-destaque-cor`, `l21-destaque-posicao` | L21 A03 |
| `l22-cortes` | 3 | `l22-camadas-fina-grossa`, `l22-corte-012`, `l22-corte-028` | L22 abertura; A01/A02 |
| `m3-previa-chaveiro` | 6 | `l23-previa-camadas`, `l23-previa-furo-livre`, `l23-previa-furo-coberto`, `l24-previa-ok`, `l24-previa-fora`, `l24-previa-furo-coberto` | L23 abertura; A02/A04; L24 A03 |
| `m3-bobi-mini` | 2 | `l24-missao-final`, `l24-anim-impressao-virtual` | L24 abertura; A04 |
| `l24-modelos` | 3 | `l24-modelo-chaveiro-furo`, `l24-imagem-jpg`, `l24-escultura-sem-furo` | L24 A01 |
| `l24-configs` | 3 | `l24-config-fdm-pla`, `l24-config-fdm-resina`, `l24-config-outra-maquina` | L24 A02 |
| `av03-perfil` | 2 | `av03-perfil-100mm`, `av03-perfil-60mm` | AV03 Q03 |
| `av03-previa` | 3 | `av03-previa-ok`, `av03-previa-furo-fechado`, `av03-previa-fora` | AV03 Q05 |

## Lote crítico: diagnósticos visuais

Essas atividades precisam permitir que a pessoa **veja a evidência antes de ler a legenda**. Nas opções, manter objeto, câmera, escala e enquadramento constantes; alterar somente o sinal pedagógico que diferencia a resposta.

| Atividade | O que o aprendiz deve enxergar | Assets da interação |
|---|---|---|
| L01 A04 | modelo digital × fabricação em andamento × peça pronta | `l01-chaveiro-digital`, `l01-chaveiro-imprimindo`, `l01-chaveiro-pronto` |
| L02 A04 | torre normal em construção × lacuna de camada × torre completa | `l02-torre-metade`, `l02-torre-lacuna`, `l02-torre-completa` |
| L09 A01 | mesma impressora com bico, extrusor, mesa ou carretel destacados | `l09-impressora-pontos`, `l09-destaque-bico`, `l09-destaque-extrusor`, `l09-destaque-mesa`, `l09-destaque-carretel` |
| L09 A04 | bico destacado e sua função, sem trocar a linguagem visual da máquina | `l09-destaque-bico`, `l09-funcao-depositar`, `l09-funcao-armazenar`, `l09-funcao-sustentar` |
| L10 A02 | setas X, Y e Z; só Z deve comunicar altura | `l10-seta-z`, `l10-seta-x`, `l10-seta-y` |
| L11 A04 | caminho de alimentação incompleto e três possíveis correções | `l11-esquema-sem-filamento`, `l11-opcao-filamento-conectado`, `l11-opcao-tela-touch`, `l11-opcao-peca-pronta` |
| L12 A03 | hotend quente e atitude segura × atitudes inseguras | `l12-hotend-quente`, `l12-atitude-nao-tocar`, `l12-atitude-dedos`, `l12-atitude-remover` |
| L14 A03 | primeira camada aderida × canto levantado | `l14-base-aderida`, `l14-base-canto-erguido` |
| L15 A01 | mão próxima ao bico quente × situações sem esse risco imediato | `l15-mao-bico-quente`, `l15-area-livre`, `l15-filamento-carretel` |
| L16 A01 | bancada obstruída e três regiões candidatas ao problema | `l16-bancada-obstruida`, `l16-destaque-obstrucao`, `l16-destaque-carretel`, `l16-destaque-tela` |
| AV02 Q04 | borda levantando e os riscos associados | `av02-borda-levantada`, `av02-risco-perde-aderencia`, `av02-risco-encaixe`, `av02-risco-cor` |
| L18 A04 | fatiador ainda sem prévia e ação necessária | `l18-fatiador-nao-fatiado`, `l18-acao-cor`, `l18-acao-fatiar`, `l18-acao-enviar` |
| L19 A03 | peça de 40 mm × peça de 120 mm diante de limite de 100 mm | `l19-limite-peca-40mm`, `l19-limite-peca-120mm` |
| L20 A03 | mesma peça em área útil de 100 mm × 60 mm | `l20-maquina-100mm`, `l20-maquina-60mm` |
| L21 A03 | PLA físico × perfil PETG, com destaques que isolam a inconsistência | `l21-pla-perfil-petg`, `l21-destaque-rotulo-perfil`, `l21-destaque-cor`, `l21-destaque-posicao` |
| L22 A01 | mesma altura, camadas de 0,12 mm × 0,28 mm | `l22-corte-012`, `l22-corte-028` |
| L23 A02 | prévia com furo livre × furo coberto | `l23-previa-furo-livre`, `l23-previa-furo-coberto` |
| L24 A01 | modelo 3D com furo × JPG × objeto sem abertura funcional | `l24-modelo-chaveiro-furo`, `l24-imagem-jpg`, `l24-escultura-sem-furo` |
| L24 A03 | prévia adequada × fora da mesa × furo coberto | `l24-previa-ok`, `l24-previa-fora`, `l24-previa-furo-coberto` |
| AV03 Q03 | perfis de 60 mm × 100 mm para a mesma peça de 80 mm | `av03-perfil-60mm`, `av03-perfil-100mm` |
| AV03 Q05 | prévia com furo fechado × fora da área × adequada | `av03-previa-furo-fechado`, `av03-previa-fora`, `av03-previa-ok` |

## Critérios de esboço para defeitos e máquinas

- **Defeitos:** a versão correta e a defeituosa devem mostrar a mesma peça, no mesmo ângulo, com a mesma cor, escala e luz. Mudar apenas o sintoma: lacuna, fios, canto levantado, deslocamento, furo obstruído ou área excedida.
- **Máquinas:** manter a Bobi Mini fictícia original e seus componentes reconhecíveis; para comparações de área útil, manter a mesma peça e evidenciar o limite por contorno/cota didática, nunca por marca comercial.
- **Fatiador e prévias:** usar interface fictícia, frontal e estável. Rótulos didáticos indispensáveis (por exemplo, PLA, PETG e dimensões) podem aparecer; não reproduzir interfaces de softwares reais.
- **Segurança:** mostrar risco sem drama visual: sem fogo, fumaça ou contato físico com parte quente. O contraste do sinal deve funcionar também sem depender apenas de vermelho/verde.

## Próximo recorte de produção

Para validar o padrão antes de gerar o backlog inteiro, o primeiro lote sugerido tem **15 assets** e cobre três tipos de leitura visual: parte da máquina, defeito físico e prévia digital.

1. `l09-bobi-mini-partes` (5): estabelecer a máquina-mestre e os destaques de componente.
2. `l14-base` (3): validar como a aplicação comunica defeito de peça com alteração mínima.
3. `l21-diagnostico` (4): validar leitura de inconsistência entre material e perfil.
4. `l24-previa-ok`, `l24-previa-fora`, `l24-previa-furo-coberto` (3): validar o vocabulário de área útil e a inspeção do furo funcional.

Após aprovação visual desse conjunto, os demais grupos podem ser produzidos sem rediscutir câmera, linguagem de destaque ou tratamento de defeitos.
