# Mundo 2 — Oficina: L09–L16

**Projeto:** bobi. · **Data da proposta:** 02/11/2026  
**Situação:** **HOMOLOGADA EM 02/11/2026** — L09–L16, incluindo roteiros, desafios e gabaritos, aprovadas pelo responsável. A implementação e a revisão técnica/pedagógica para publicação permanecem pendentes.  
**Mascote:** Caramelo, cachorro caramelo brasileiro.  
**Padrão:** aprendizagem híbrida, 2–4 minutos por lição, quatro interações frequentes, explicações breves e feedback contextual.

Fontes de verdade: [Termo de Abertura](../termo-de-abertura.md) · [Mundo 1 homologado](mundo-01.md) · [Catálogo técnico](../knowledge/bobi_base_de_conhecimento_impressao_3d.md) · [Avaliação AV02 homologada](../avaliacoes/mundo-02-av02.md).

## Regras comuns herdadas (sem novos RF/RNF)

- Quatro atividades obrigatórias por lição, uma introdução curta e conclusão com resumo do conceito.
- Nas lições comuns, erro mostra explicação e permite novas tentativas/dicas; **sem vidas**, sem cronômetro eliminatório, sem 80% exigido na primeira tentativa.
- Concluir quando todas as atividades obrigatórias estiverem corretas, inclusive após ajuda.
- Persistir respostas confirmadas, registrar primeira tentativa e dicas e retomar da próxima atividade pendente; respeitar uma execução ativa por conta.
- Na primeira conclusão elegível: **20 XP + 10 Fios**; primeira revisão válida por dia: **5 XP**; operações idempotentes. O XP é descontado em 10% do valor por erro na rodada, com mínimo de 25% (DD023); os Fios não mudam. Atualizar meta diária e desbloqueio conforme regras existentes.
- Segurança: as atividades são **exclusivamente virtuais**; não mandar crianças operar, tocar, corrigir ou inspecionar partes energizadas/quentes, nem manusear produtos químicos.
- Não assumir que arquiteturas cartesianas, perfis e parâmetros de uma marca valem para todos os equipamentos.

## Lições homologadas

### L09 — Conheça sua impressora

**Código:** BOBI-M02-L09 · **Pré-requisito:** Mundo 1 aprovado por AV01 ou avanço por domínio · **Próxima:** L10 · **Fontes-base:** CRE-03.

**Objetivo observável:** Identificar bico, extrusor, mesa e carretel de uma impressora FDM e relacionar cada parte à sua função.

**Abertura:** Caramelo: “Essa é a nossa oficina! Antes de começar, precisamos conhecer as partes da impressora.”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · identificação visual | Em uma ilustração FDM com quatro pontos destacados, “Qual parte é a superfície onde a peça começa a ser construída?” | Mesa de impressão. | Se escolher bico ou extrusor: “Essas peças ajudam a conduzir ou depositar material; a mesa sustenta a peça durante a impressão.” |
| A02 · associação | Ligue **bico**, **mesa** e **carretel** às respectivas funções. | Bico ↔ depositar material; mesa ↔ apoiar a peça; carretel ↔ armazenar o filamento. | Dica: “Pense onde o material fica guardado, por onde sai e onde a peça é apoiada.” |
| A03 · múltipla escolha | “Qual componente empurra ou alimenta o filamento em direção ao sistema de aquecimento?” Opções: extrusor / mesa / ventilador. | Extrusor. | Se marcar ventilador: “O ventilador ajuda a controlar temperaturas; quem movimenta o filamento na alimentação é o extrusor.” |
| A04 · diagnóstico visual | Caramelo aponta o **bico** e pergunta: “O que essa parte faz durante a impressão FDM?” Opções: depositar material / armazenar rolo / sustentar a peça. | Depositar material na trajetória de impressão. | Se errar: “O material é armazenado no carretel e a peça é apoiada na mesa; a saída do material acontece no bico.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Agora você já consegue reconhecer as partes principais da impressora!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Impressora FDM genérica com pontos clicáveis, carretel, extrusor, bico e mesa; vista simplificada original.

**Critério específico de aceitação:** Distinguir as quatro funções e concluir quatro interações sem exigir conhecimento do modelo comercial. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L10 — A máquina ganha movimento

**Código:** BOBI-M02-L10 · **Pré-requisito:** lição L09 concluída ou avanço por domínio · **Próxima:** L11 · **Fontes-base:** CRE-03, ORC-01.

**Objetivo observável:** Reconhecer os eixos X, Y e Z em uma representação cartesiana e a diferença entre deslocamento na camada e avanço de altura.

**Abertura:** Caramelo: “Como a impressora sabe para onde ir? Vamos conhecer as direções em que as partes se movimentam!”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · associação | Na **representação cartesiana didática mostrada**, ligue X, Y e Z às setas ilustradas. | X ↔ lado a lado; Y ↔ frente/trás; Z ↔ altura. | Erro: “Observe a direção de cada seta nesta máquina ilustrada; não precisamos decorar qual peça física se move.” |
| A02 · identificação visual | “Qual seta mostra mudança de altura entre camadas?” Opções: seta vertical Z / seta lateral X / seta frente-trás Y. | Seta vertical Z. | Erro: “As novas camadas aparecem em outros níveis de altura.” |
| A03 · ordenação | Na animação guiada de uma peça simples, organize: **traçar percurso da primeira camada**, **passar ao nível seguinte**, **depositar próxima camada**. | Traçar percurso → avançar altura → depositar camada seguinte. | Erro: “Antes da camada seguinte, o sistema precisa mudar o nível de impressão.” |
| A04 · diagnóstico contextual | Mostrar uma impressora com mesa móvel e outra com cabeçote móvel. “Em todas as impressoras a mesma peça física precisa se mover no mesmo eixo?” Opções: não, depende da arquitetura / sim, somente o cabeçote se move / sim, somente a mesa se move. | Não, a distribuição de movimento varia conforme a arquitetura. | Erro: “O que importa é o movimento relativo; a mesa e o cabeçote não se movimentam igual em todos os modelos.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Você descobriu como os movimentos ajudam a construir a peça!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Setas X/Y/Z em referência cartesiana nomeada, animação 2D de caminho e duas arquiteturas esquemáticas.

**Critério específico de aceitação:** Identificar o eixo vertical, ordenar avanço por camadas e não generalizar mecanismos de movimentação. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L11 — O caminho do filamento

**Código:** BOBI-M02-L11 · **Pré-requisito:** lição L10 concluída ou avanço por domínio · **Próxima:** L12 · **Fontes-base:** CRE-03, ORC-01.

**Objetivo observável:** Reconhecer o trajeto geral do filamento em uma impressora FDM e diferenciar alimentação, aquecimento e deposição.

**Abertura:** Caramelo: “O filamento começa enrolado no carretel. Como será que ele chega até a peça?”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · ordenação | “Organize o caminho simplificado do filamento.” Cartões: bico, carretel, extrusor/alimentação, hotend. | Carretel → extrusor/alimentação → hotend → bico. | Erro: “O filamento vem do carretel, é conduzido e aquecido antes de sair pelo bico.” |
| A02 · associação | Associe **carretel**, **extrusor**, **hotend** e **bico** às funções mostradas. | Armazenar ↔ carretel; alimentar ↔ extrusor; aquecer ↔ hotend; depositar ↔ bico. | Erro: “Aquecer o material e empurrá-lo são funções diferentes.” |
| A03 · múltipla escolha | Caramelo aponta um tubo entre extrusor e cabeçote. “Todas as impressoras possuem o extrusor exatamente ao lado do bico?” Opções: não, existem arranjos como direct-drive e Bowden / sim / só modelos de resina. | Não; existem diferentes arranjos de alimentação. | Erro: “O caminho muda conforme a arquitetura, mas continua existindo alimentação e deposição.” |
| A04 · diagnóstico visual | No esquema, o carretel está cheio, mas não há filamento ligado ao caminho de alimentação. “Qual elemento está faltando no esquema?” Opções: filamento conectado à alimentação / tela touch / peça pronta. | Filamento conectado à alimentação. | Erro: “Antes de chegar ao bico, o filamento precisa seguir um caminho físico de alimentação.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Do carretel ao bico: você já conhece o caminho do filamento!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Quatro cartões do trajeto, seção esquemática genérica e duas variantes de arranjo sem marcas.

**Critério específico de aceitação:** Ordenar trajeto funcional sem confundir hotend com extrusor e sem afirmar que existe apenas um arranjo. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L12 — Por que o bico esquenta?

**Código:** BOBI-M02-L12 · **Pré-requisito:** lição L11 concluída ou avanço por domínio · **Próxima:** L13 · **Fontes-base:** CRE-03, SAF-01.

**Objetivo observável:** Reconhecer que o aquecimento controlado permite a extrusão do termoplástico e que o conjunto aquecido apresenta risco de queimadura.

**Abertura:** Caramelo: “O filamento parece rígido no rolo, mas chega à peça em trilhas. O que muda no caminho?”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “Por que o conjunto de extrusão aquece o filamento na impressão FDM?” Opções: para permitir sua extrusão/deposição / para secar a peça pronta / para pintar o objeto. | Para amolecer/fundir o termoplástico de modo adequado à extrusão. | Erro: “O calor atua no material antes de ele sair pelo bico; não é uma etapa de pintura.” |
| A02 · associação | Ligue **aquecedor/hotend**, **bico** e **peça em formação** às descrições. | Hotend ↔ aquece/controla a região de fusão; bico ↔ saída/deposição; peça ↔ material depositado em camadas. | Erro: “O aquecimento ocorre no conjunto do hotend; o bico direciona a saída do material.” |
| A03 · diagnóstico visual | Ícone indica hotend aquecido em funcionamento. “Qual atitude é segura?” Opções: não tocar no conjunto aquecido / testar com os dedos / remover material manualmente com máquina quente. | Não tocar no conjunto aquecido. | Erro: “O metal aquecido pode causar queimaduras mesmo quando não parece brilhante.” |
| A04 · ordenação | No cenário virtual, coloque as ações seguras após uma atividade: **encerrar processo**, **aguardar resfriamento indicado**, **inspecionar sem tocar em partes quentes**. | Encerrar → aguardar resfriar → inspecionar com segurança. | Erro: “Resfriar é necessário antes de qualquer contato com partes que possam estar quentes.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Agora você entende por que há aquecimento e por que precisamos respeitar o calor!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Hotend simplificado, caminho do material com aquecimento, sinal de quente e estado resfriado.

**Critério específico de aceitação:** Distinguir aquecimento/deposição e escolher sempre condutas sem contato com conjunto quente. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L13 — O que é PLA?

**Código:** BOBI-M02-L13 · **Pré-requisito:** lição L12 concluída ou avanço por domínio · **Próxima:** L14 · **Fontes-base:** PRU-06, SAF-01.

**Objetivo observável:** Reconhecer o PLA como um termoplástico utilizado em filamento FDM e escolher o material correto em uma situação simples.

**Abertura:** Caramelo: “Na oficina aparecem rolos com letras diferentes. Hoje vamos conhecer um dos filamentos mais comuns: PLA!”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “O que significa PLA neste cenário?” Opções: um tipo de material termoplástico usado como filamento / um botão da impressora / um formato de imagem. | Material termoplástico usado em filamento FDM. | Erro: “PLA descreve o material; não é arquivo nem componente da máquina.” |
| A02 · identificação visual | Mostrar carretel identificado PLA, recipiente de resina e foto de folha de papel. “Qual opção corresponde ao PLA em filamento?” | Carretel identificado PLA. | Erro: “Para essa impressora FDM do exemplo, o material está na forma de filamento.” |
| A03 · associação | Associar rótulos: **PLA**, **FDM** e **modelo 3D** às categorias. | PLA ↔ material; FDM ↔ processo/tecnologia; modelo 3D ↔ representação digital da peça. | Erro: “Material, processo e modelo digital são conceitos diferentes.” |
| A04 · aplicação | Cenário: impressora FDM didática com perfil compatível com PLA. “Qual rolo devemos escolher entre PLA compatível, resina líquida e filamento não identificado?” | Carretel PLA explicitamente compatível com o perfil. | Erro: “A compatibilidade com o equipamento e o perfil importa; não basta qualquer plástico.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Boa! PLA é um material, e não uma máquina ou uma moeda do jogo.” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Rolo de PLA, etiqueta, comparação PLA/resina e cartão de compatibilidade fictício.

**Critério específico de aceitação:** Distinguir PLA (material) de tecnologia/modelo e evitar afirmar universalidade de temperaturas, resistência, segurança alimentar ou biodegradação doméstica. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L14 — A mesa de impressão

**Código:** BOBI-M02-L14 · **Pré-requisito:** lição L13 concluída ou avanço por domínio · **Próxima:** L15 · **Fontes-base:** PRU-02, CRE-03.

**Objetivo observável:** Entender o papel da mesa/superfície de impressão e reconhecer visualmente uma primeira camada apoiada ou que começa a se soltar.

**Abertura:** Caramelo: “Uma peça precisa começar em algum lugar. Vamos olhar para a mesa onde a primeira camada é formada!”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · identificação visual | “Em qual parte da impressora a primeira camada é depositada?” Mostrar bico, mesa e carretel. | Mesa/superfície de impressão. | Erro: “A primeira camada se forma sobre uma superfície que sustenta a peça.” |
| A02 · múltipla escolha | “Por que o contato adequado da primeira camada com a superfície é importante?” Opções: ajuda a manter a peça posicionada durante o início / muda a cor do plástico / substitui o modelo digital. | Ajuda na aderência e estabilidade da peça. | Erro: “Uma base que se solta pode comprometer a impressão.” |
| A03 · diagnóstico visual | Comparar primeira camada aderida e base com canto erguido. “Qual imagem mostra possível problema de aderência/deformação?” | Peça com canto da base levantado. | Erro: “Procure a região que não permanece apoiada na superfície.” |
| A04 · aplicação segura | “A peça começou a soltar. O que fazer primeiro no nosso cenário educativo?” Opções: interromper com segurança e observar o sintoma / pressionar a peça com os dedos durante operação / puxar a peça quente. | Interromper com segurança e observar o sintoma. | Erro: “Não aproximamos mãos da mesa e do cabeçote em movimento; primeiro observamos o que ocorreu.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “A mesa sustenta a impressão, e a primeira camada merece atenção!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Mesa e primeira camada, comparativo aderido/canto erguido, área de movimento isolada.

**Critério específico de aceitação:** Relacionar mesa/aderência e escolher inspeção segura, sem identificar uma única causa do defeito. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L15 — Atenção à segurança!

**Código:** BOBI-M02-L15 · **Pré-requisito:** lição L14 concluída ou avanço por domínio · **Próxima:** L16 · **Fontes-base:** SAF-01, SAF-02.

**Objetivo observável:** Identificar riscos de calor, movimento e emissões e tomar decisões seguras em cenários introdutórios de impressão 3D.

**Abertura:** Caramelo: “Antes de mexer na oficina, precisamos reconhecer alguns perigos. Segurança vem antes da impressão!”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · diagnóstico visual | Mostrar três situações: mão perto de bico quente, área livre sinalizada e filamento em carretel. “Qual situação exige afastar a mão?” | Mão próxima ao bico/hotend aquecido. | Erro: “O conjunto aquecido pode causar queimaduras.” |
| A02 · múltipla escolha | “A impressora está trabalhando e uma peça móvel começou a se deslocar. O que fazer?” Opções: manter mãos e objetos fora da área de movimento / segurar a peça móvel / ajustar correia em operação. | Manter distância de partes móveis. | Erro: “Partes móveis podem prender dedos ou objetos.” |
| A03 · associação | Ligar risco a prevenção: **calor**, **movimento**, **emissões**. | Calor ↔ não tocar partes quentes; movimento ↔ manter área desobstruída; emissões ↔ adotar ventilação e controles adequados conforme ambiente e material. | Erro: “Cada risco pede uma medida específica; ventilação não substitui cuidado com partes quentes.” |
| A04 · aplicação | “Caramelo quer usar impressora real, mas não há supervisão nem avaliação do ambiente. O que fazer?” Opções: não iniciar e procurar orientação responsável / começar sozinho porque usa PLA / ignorar ventilação. | Não iniciar até haver orientação responsável e condições adequadas. | Erro: “Mesmo o processo com filamento exige avaliação de calor, movimento e ambiente.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “Você identificou os riscos da oficina. Segurança é parte do aprendizado!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Pictogramas originais de calor, movimento, ventilação e situação com adulto responsável.

**Critério específico de aceitação:** Reconhecer os três riscos e escolher resposta segura; nenhuma instrução de manipulação física perigosa. Quatro atividades verificáveis, salvamento e feedback contextual.

---
### L16 — Prepare a oficina

**Código:** BOBI-M02-L16 · **Pré-requisito:** lição L15 concluída ou avanço por domínio · **Próxima:** AV02 (avaliação do Mundo 2) · **Fontes-base:** SAF-01, CRE-03.

**Objetivo observável:** Aplicar uma checagem virtual inicial de segurança e reconhecer quando uma oficina não está pronta para impressão.

**Abertura:** Caramelo: “Temos o projeto, mas antes de começar quero conferir se a oficina está pronta. Me ajuda?”

| Atividade | Pergunta/desafio | Gabarito | Feedback em caso de erro |
|---|---|---|---|
| A01 · diagnóstico visual | Na bancada virtual há objetos bloqueando área de movimento. “O que precisa ser resolvido?” | Desobstruir a área antes de qualquer operação, sem acessar partes móveis em atividade. | Erro: “Um objeto próximo às partes móveis pode comprometer a segurança da operação.” |
| A02 · associação | Relacionar verificações aos motivos: área livre, ambiente/ventilação, material e supervisão. | Área livre ↔ movimento sem obstáculos; ventilação/controles ↔ exposição; material compatível ↔ processo adequado; supervisão ↔ orientação segura. | Erro: “Observe se estamos verificando espaço, ambiente, compatibilidade ou quem acompanha a atividade.” |
| A03 · ordenação | Para uma checagem **virtual**, ordenar: olhar ambiente e supervisão, conferir máquina/material compatível, analisar área livre, confirmar que pode iniciar com segurança. | Ambiente/supervisão → compatibilidade → área livre → decisão de iniciar **somente se tudo estiver adequado**. | Erro: “A decisão de iniciar vem depois das verificações. Esta ordem é didática, não um manual de operação real.” |
| A04 · aplicação | Na tela, a ventilação/controle do ambiente está sinalizado como **não verificado**. “Caramelo pode liberar a operação real?” Opções: não, falta verificar condição / sim, porque a máquina liga / sim, porque o filamento é PLA. | Não liberar; solicitar avaliação e orientação responsável. | Erro: “O fato de a impressora funcionar ou usar PLA não dispensa a avaliação do ambiente.” |

**Feedback de acerto:** reforçar a relação funcional correta, explicar brevemente o motivo e liberar `Continuar`. **Erros:** retornar a explicação específica acima e permitir nova tentativa; após dois erros, destacar visualmente o indício pertinente.

**Conclusão:** Caramelo: “A oficina virtual está organizada. Você já sabe o que verificar antes de pensar em imprimir!” **Primeira conclusão:** +20 XP e +10 Fios; libera a próxima etapa.

**Recursos necessários (ainda não criados):** Bancada virtual com itens removíveis, checklist ilustrado e estados aprovado/pendente.

**Critério específico de aceitação:** Validar quatro verificações, bloquear decisão insegura no cenário e não demandar ação real. Quatro atividades verificáveis, salvamento e feedback contextual.

---

## Critérios gerais do bloco

1. Cada uma das oito lições possui introdução, quatro interações, feedback específico, dica e conclusão.
2. O usuário aprende reconhecimento de componentes e movimentos sem precisar ter acesso físico à impressora.
3. As interações de segurança usam sempre condutas que **não exigem tocar equipamento aquecido, energizado ou em movimento**.
4. O roteiro não universaliza componentes de um modelo, valores de temperatura ou recomendações de segurança simplificadas.
5. Primeira conclusão, revisão, retomada e desbloqueio respeitam PD001, PD003 e PD006, sem nova regra financeira.
6. L16 abre a avaliação de domínio **AV02**; obter ≥4/5 na AV02 abre Mundo 3.
7. Todas as perguntas, alternativas, feedbacks e desenhos originais exigem revisão **técnica, pedagógica e visual** antes de publicação.
8. Resultado didático e tempo da oficina virtual não constituem previsão física nem autorização para operação de equipamento.

## Rastreabilidade e pendências editoriais

| ID | Principal referência do catálogo | Revisão requerida |
|---|---|---|
| L09 | CRE-03 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L10 | CRE-03, ORC-01 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L11 | CRE-03, ORC-01 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L12 | CRE-03, SAF-01 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L13 | PRU-06, SAF-01 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L14 | PRU-02, CRE-03 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L15 | SAF-01, SAF-02 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |
| L16 | SAF-01, CRE-03 | Conferir detalhe técnico do fabricante/órgão de segurança e validar ilustrações antes do release |

- **CRE-03** — Guia oficial de Ender-3 V3 (fonte específica; não universalizar): https://wiki.creality.com/en/ender-series/ender-3-v3
- **ORC-01** — Wiki oficial OrcaSlicer: https://github.com/OrcaSlicer/OrcaSlicer/wiki
- **PRU-06** — Prusa, guia comparativo de filamentos: https://help.prusa3d.com/filament-material-guide
- **PRU-02** — Prusa, problemas na primeira camada: https://help.prusa3d.com/article/first-layer-issues_1804
- **SAF-01** — NIOSH/CDC, segurança em impressão 3D: https://www.cdc.gov/niosh/bulletin/2024/safe-3d-printing.html
- **SAF-02** — NIOSH, ambientes educacionais e makerspaces: https://www.cdc.gov/niosh/publications/numbered/2024-103.html

**Pendências:** revisão de segurança de L12–L16, validação de mensagens e imagens técnicas, produção de sprites originais e testes de aprendizagem. **Status atual: homologado pelo responsável em 02/11/2026; ainda não implementado nem liberado para publicação.**
