# Mundo 1 — L05 a L08 (homologadas)

**Projeto:** bobi. — O jeito divertido de aprender impressão 3D.  
**Data de homologação:** 01/11/2026  
**Padrão pedagógico:** híbrido  
**Mascote:** Caramelo, **cachorro caramelo brasileiro**  
**Estado:** **L05, L06, L07 e L08 homologadas pelo responsável**; atividades especificadas, **não implementadas**.

**Documentação relacionada:** [L01–L04](mundo-01.md) · [Avaliação AV01](../avaliacoes/mundo-01-av01.md) · [Termo de Abertura](../termo-de-abertura.md) · [Fontes técnicas](../knowledge/bobi_base_de_conhecimento_impressao_3d.md).

## Padrão comum (herdado das lições homologadas)

- Cada lição tem abertura curta do Caramelo, **quatro atividades**, feedback explicativo contextualizado e tela de conclusão.
- Duração-alvo **2–4 minutos**, dentro da faixa aprovada de 1–5 minutos; não há eliminação por tempo.
- Questões comuns permitem novas tentativas e dicas sem perda de vidas. A conclusão requer resolver as quatro atividades obrigatórias; **a exigência de 80% se aplica às avaliações de domínio, não às microlições**.
- Persistir atividades concluídas e confirmadas, recuperar após interrupção e registrar primeira tentativa, tentativas posteriores e dicas.
- **Primeira conclusão elegível:** +20 XP e +10 Fios, uma única vez; **primeira revisão válida da lição no dia:** +5 XP e nenhum Fio; novas revisões não elegíveis não concedem recompensas.
- Conclusão libera a lição seguinte e pode contar para a meta diária conforme as regras já homologadas.
- Todas as atividades são **virtuais** e não exigem impressora real, software de fatiamento físico ou equipamento de laboratório.
- Nenhuma imagem, voz, sprite ou implementação é considerada produzida neste documento.

---

## L05 — Impressão ou fabricação tradicional?

**ID:** `BOBI-M01-L05` · **Status:** homologada · **Pré-requisito:** L04 ou avanço por domínio · **Próxima:** L06.

**Objetivo:** diferenciar fabricação **aditiva**, **subtrativa** e **por moldagem** por exemplos simples, reconhecendo como cada processo modifica o material.

### Abertura
**Caramelo:** “Nem toda máquina fabrica as coisas do mesmo jeito! Algumas colocam material, outras retiram e outras usam moldes.”

### Atividades

| ID / Formato | Desafio | Resposta esperada | Feedback orientador |
|---|---|---|---|
| A01 · Múltipla escolha visual | “Qual máquina está acrescentando material para construir uma peça?” Mostrar processos visualmente diferentes. | **Impressora FDM depositando camadas**. | A máquina FDM acrescenta material para construir a peça; uma fresadora retira material. |
| A02 · Associação | Relacionar processos e ações. | **Aditiva ↔ acrescentar material**; **subtrativa ↔ retirar material**; **moldagem ↔ dar forma ao material usando molde**. | Destacar a operação realizada sobre o material, não somente o nome do processo. |
| A03 · Diagnóstico visual | Mostrar ferramenta removendo material de um bloco. “Qual processo está sendo utilizado?” | **Fabricação subtrativa**. | A ferramenta subtrai material do bloco; não deposita camadas. |
| A04 · Aplicação | Apresentar impressora FDM, fresadora e injeção em molde. “Qual descrição diferencia corretamente os três processos?” | **FDM: deposição**; **fresadora: remoção**; **injeção: moldagem**. | Diferenciar a função dos processos e explicar as escolhas incorretas. |

**Conclusão — Caramelo:** “Você descobriu que existem maneiras diferentes de fabricar objetos!”

**Recursos visuais pendentes:** três ilustrações originais e esquemáticas de máquinas/processos com destaque para o que ocorre com o material.

**Aceite pedagógico específico:** quatro atividades concluídas, com distinção correta entre os processos após feedback e tentativas de revisão.

**Base técnica:** ULT-01 (catálogo geral) e **NIST — *What Is Additive Manufacturing?*** como referência complementar mencionada na homologação. A base original identifica uma **lacuna de fonte suplementar** para a comparação sistemática com métodos subtrativos; conferir a referência e registrar evidência antes de publicar.

---

## L06 — Filamento ou resina?

**ID:** `BOBI-M01-L06` · **Status:** homologada · **Pré-requisito:** L05 ou avanço por domínio · **Próxima:** L07.

**Objetivo:** reconhecer diferenças introdutórias entre impressoras **FDM/FFF** e impressoras de **fotopolimerização de resina**, incluindo cuidados essenciais de segurança.

### Abertura
**Caramelo:** “Você sabia que nem toda impressora 3D usa aquele rolo de filamento? Algumas usam resina líquida e luz para formar a peça!”

### Atividades

| ID / Formato | Desafio | Resposta esperada | Feedback orientador |
|---|---|---|---|
| A01 · Identificação visual | Mostrar um carretel de filamento e recipiente de resina. “Qual destes materiais normalmente alimenta uma impressora FDM?” | **Filamento**. | FDM/FFF deposita termoplástico; a resina é utilizada em outra família de processos. |
| A02 · Associação | Associar tecnologias a seus princípios. | **FDM/FFF ↔ deposição de termoplástico aquecido**; **SLA/MSLA ↔ solidificação de resina fotossensível por luz**. | Explicar a diferença entre deposição e fotopolimerização, sem assumir superioridade universal. |
| A03 · Múltipla escolha | “Uma máquina usa luz para endurecer seletivamente resina líquida. Qual tecnologia está sendo representada?” | **Fotopolimerização de resina**. | A luz promove a solidificação seletiva da resina; não se trata de deposição de filamento por bico aquecido. |
| A04 · Segurança contextual | “Caramelo encontra um recipiente de resina líquida sem cura. O que deve fazer?” | **Não manusear sem controles, orientação e EPIs adequados; procurar um adulto responsável e capacitado**. | Resina não curada pode oferecer riscos à saúde; não tratar contato como atividade recreativa. |

**Conclusão — Caramelo:** “Agora você conhece duas maneiras diferentes de imprimir em 3D!”

**Recursos visuais pendentes:** carretel, máquina FDM, tanque de resina, esquema de luz e alerta de segurança; imagens esquemáticas e originais.

**Aceite específico:** quatro atividades concluídas, com reconhecimento correto de tecnologias e conduta segura no cenário de resina.

**Restrições:** nenhuma atividade física com resina; não ensinar operação real, contato com material não curado ou procedimentos de pós-processamento neste MVP.

**Base técnica:** ULT-01; **CDC/NIOSH** para segurança e **Formlabs** para princípios de SLA, referências complementares apontadas na homologação. Conferir páginas específicas e evidência técnica antes de publicar, pois a base original declara **lacuna sobre resinas e seus riscos**.

---

## L07 — O que pode dar errado?

**ID:** `BOBI-M01-L07` · **Status:** homologada · **Pré-requisito:** L06 ou avanço por domínio · **Próxima:** L08.

**Objetivo:** reconhecer sintomas visuais de falhas introdutórias em FDM, **sem associá-los a uma causa única ou a uma correção universal**.

### Abertura
**Caramelo:** “Ops! Nem toda impressão sai como a gente imaginou. Você consegue encontrar o que aconteceu com estas peças?”

### Atividades

| ID / Formato | Desafio | Resposta esperada | Feedback orientador |
|---|---|---|---|
| A01 · Diagnóstico visual | Peça com fios finos entre duas regiões separadas. | **Stringing** (formação de fios). | Mostrar os fios e explicar o nome do sintoma; causas possíveis são múltiplas. |
| A02 · Diagnóstico visual | Peça com cantos da base levantados da superfície. | **Warping** (deformação/levantamento de bordas). | Destacar a região levantada, sem inferir causa isolada. |
| A03 · Associação | Associar três imagens a sintomas. | **Fios entre partes** ↔ stringing; **cantos levantados** ↔ warping; **camadas deslocadas lateralmente** ↔ deslocamento de camadas. | Diferenciar onde o defeito aparece e qual é sua manifestação visual. |
| A04 · Aplicação | “Caramelo viu uma falha. Qual é o melhor primeiro passo?” | **Observar os sintomas e reunir informações da impressão antes de ajustar algo**. | Diagnóstico requer contexto; não selecionar um parâmetro por impulso. |

**Exemplo de feedback:** “Esses fios são um sintoma chamado stringing. Mais de um fator pode contribuir para esse resultado.”

**Conclusão — Caramelo:** “Você começou a reconhecer sinais de que uma impressão precisa de atenção!”

**Recursos visuais pendentes:** imagens esquemáticas e originais dos três defeitos; uma peça de referência sem os sintomas para comparação.

**Aceite específico:** identificar sintomas e escolher uma investigação inicial que não presuma causa única.

**Base técnica:** `PRU-02` (primeira camada), `PRU-07` (stringing), `PRU-08` (warping), conforme catálogo técnico. A imagem de **deslocamento de camadas** exige validação técnica visual adicional antes da publicação.

---

## L08 — Primeira missão do Caramelo

**ID:** `BOBI-M01-L08` · **Status:** homologada · **Pré-requisito:** L07 ou avanço por domínio · **Próxima etapa:** avaliação `BOBI-M01-AV01`.

**Objetivo:** integrar os fundamentos de M1 em uma missão aplicada: escolher um projeto adequado, identificar material/tecnologia, ordenar preparação e reconhecer um sintoma visual.

### Abertura
**Caramelo:** “Minha bancada está uma bagunça! Preciso de um porta-lápis novo. Você me ajuda a organizar esse projeto?”

### Atividades

| ID / Formato | Desafio | Resposta esperada | Feedback orientador |
|---|---|---|---|
| A01 · Escolha visual | Selecionar entre três modelos aquele que resolve a necessidade de guardar lápis. | **Porta-lápis com compartimentos adequados**. | A melhor escolha atende à necessidade apresentada, não apenas à aparência. |
| A02 · Seleção tecnológica | Há uma impressora FDM disponível: “Qual material corresponde à alimentação dessa máquina?” | **Carretel de filamento compatível**. | Diferenciar filamento e resina para essa máquina; compatibilidade depende do contexto. |
| A03 · Ordenação | Organizar o fluxo de impressão. | **Obter modelo 3D → preparar no fatiador → fornecer instruções à impressora → imprimir a peça**. | A impressora precisa das instruções de impressão preparadas antes de iniciar. |
| A04 · Diagnóstico visual | Resultado **fictício** do porta-lápis apresenta fios entre regiões. “Qual sintoma aparece?” | **Stringing**. | Identificar manifestação visual, sem deduzir causa específica. |

**Conclusão — Caramelo:** “Conseguimos organizar meu primeiro projeto! Você já sabe como começar e o que observar se algo não sair como esperado.”

**Recursos visuais pendentes:** bancada do cachorro Caramelo, três propostas de porta-lápis/objetos, FDM ilustrada, cartões do fluxo e resultado virtual com stringing.

**Aceite específico:** concluir as quatro etapas e distinguir a preparação do projeto do sintoma mostrado no resultado fictício.

**Escopo obrigatório:** a L08 é uma **missão integradora ilustrativa**, **não** uma fabricação virtual temporizada e **não** substitui o desafio completo de chaveiro previsto para `BOBI-M03-L24`.

**Base técnica:** `ULT-02`, `BAM-03` e conceitos de L01–L07.

---

## Critérios de aceitação do bloco L05–L08

1. Exibir o contexto do cachorro Caramelo, quatro interações por lição, feedback e conclusão.
2. Aplicar gabaritos conforme o **contexto apresentado**, com explicação do erro e novas tentativas.
3. Não consumir vidas, não exigir acerto de primeira nem aplicar o critério de 80% às lições.
4. Registrar conclusões e tentativas confirmadas; recuperar progresso após interrupção.
5. Conceder +20 XP/+10 Fios na primeira conclusão elegível apenas uma vez; respeitar revisão diária e evitar duplicações.
6. Desbloquear a lição seguinte; L08 disponibiliza AV01.
7. Usar apenas simulações/ilustrações, sem operação de impressora real, resinas ou fatiamento físico.
8. Manter as restrições de segurança, direitos autorais e revisão técnica/pedagógica/visual antes da publicação.

**Estado editorial:** **homologado para especificação do produto**. Produção das imagens, implementação, validação de fontes complementares (sobretudo L05 e L06), testes e revisão final **pendentes**. Nenhum novo RF/RNF foi aprovado ou criado por este bloco.
