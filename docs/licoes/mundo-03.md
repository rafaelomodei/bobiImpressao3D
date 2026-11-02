# Mundo 3 — Primeira impressão: L17–L24

**Projeto:** bobi. · **Proposta:** 02/11/2026  
**Situação:** **PROPOSTA PARA HOMOLOGAÇÃO**. PD004 já aprovou os temas e a missão final, mas **estas atividades e gabaritos ainda precisam de aprovação**.  
**Mascote:** Caramelo, cachorro caramelo brasileiro.  
**Padrão:** híbrido, 2–4 minutos por lição, quatro interações, explicações curtas.

Documentos relacionados: [Termo de Abertura](../termo-de-abertura.md), [Mundo 1](mundo-01.md), [Base técnica](../knowledge/bobi_base_de_conhecimento_impressao_3d.md) e [AV03 proposta](../avaliacoes/mundo-03-av03.md).

## Regras comuns herdadas

- Quatro atividades por lição; concluir após resolvê-las corretamente, inclusive após erros e dicas. **Sem vidas** em microlições.
- Duração-alvo 1–5 minutos; sem cronômetro eliminatório. Exibir feedback explicativo e permitir novas tentativas.
- Persistir atividades confirmadas, permitir retomar e registrar primeira tentativa/dicas; uma execução ativa por conta.
- Primeira conclusão: **20 XP e 10 Fios**; primeira revisão válida por dia: **5 XP**, sem Fios; sem duplicações.
- Quatro tipos de atividades já homologados: múltipla escolha, ordenação, associação e diagnóstico visual.
- Todos os fatiadores, perfis e prévias serão **ilustrações originais**, não cópias de interfaces de fabricantes. Nenhum fatiamento ou G-code real e nenhuma impressora física são necessários.
- **L24:** a impressão guiada ocorre numa animação curta e didática, sem fila. A oficina virtual de PD005 (**tempo fictício de 2–15 minutos**) é um mecanismo distinto e **não pode bloquear** a L24.

## Especificações de lições

### L17 — O arquivo do objeto

**Código:** BOBI-M03-L17 · **Pré-requisito:** Mundo 2 liberado por AV02 ou avanço por domínio · **Próxima:** L18 · **Fontes:** STD-01, BAM-03, ULT-02.

**Objetivo:** Diferenciar informações de geometria, contêiner 3MF e instruções para máquina, com escopo do formato explícito.

**Abertura do Caramelo:** “Um chaveiro digital pode ter arquivos diferentes. Vamos descobrir o que cada um pode guardar?”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · associação | Ligue STL, 3MF e G-code ao papel no contexto FDM. | STL ↔ representação geométrica; 3MF ↔ formato de manufatura aditiva que pode conter geometria e outros dados; G-code ↔ instruções da máquina. | “Geometria e instruções de fabricação não são a mesma coisa.” |
| A02 · múltipla escolha | “Um STL sozinho contém temperatura e percurso de uma impressora específica?” Opções: não, precisa de preparação / sim, sempre / é uma imagem. | Não, STL não contém instruções de máquina. | “O fatiador considera equipamento, material e parâmetros.” |
| A03 · visual | Mostre cartões STL (malha), 3MF (projeto ilustrativo) e G-code (trajetórias). “Qual apresenta instruções para a máquina?” | G-code compatível com a máquina do cenário. | “Arquivos que descrevem geometria não necessariamente trazem comandos executáveis.” |
| A04 · aplicação | “Todo 3MF contém os mesmos dados de perfil e instruções?” Opções: não / sim, obrigatoriamente / é só imagem. | Não; depende do arquivo e da aplicação. | “3MF é extensível e nem todo arquivo incorpora todas as configurações.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Você descobriu a diferença entre representar a peça e instruir a fabricação!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Ícones para STL, 3MF e G-code, chaveiro em malha, trajeto esquemático; sem código real.

**Critério de aceite:** Não tratar formatos como equivalentes nem sugerir que qualquer G-code funciona em qualquer máquina. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L18 — Conheça o fatiador

**Código:** BOBI-M03-L18 · **Pré-requisito:** L17 concluída ou avanço por domínio · **Próxima:** L19 · **Fontes:** ULT-02, BAM-03, ORC-01.

**Objetivo:** Reconhecer a função de preparar o modelo e gerar instruções de fabricação com contexto de impressora/material.

**Abertura do Caramelo:** “O modelo está pronto. Quem transforma o projeto em orientações para a impressora?”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “Para que serve um fatiador?” Opções: preparar modelo/instruções / imprimir papel / guardar filamento. | Preparar modelo e gerar instruções. | “O fatiador faz a ponte entre a geometria e a fabricação.” |
| A02 · associação | Associe modelo, fatiador, prévia e instruções. | Modelo ↔ forma; fatiador ↔ preparo; prévia ↔ inspeção de trajetórias; instruções ↔ comandos compatíveis. | “Visualizar o resultado previsto não é o mesmo que executar a fabricação.” |
| A03 · ordenação | Ordene abrir modelo, escolher contexto da máquina/material, fatiar e inspecionar prévia. | Abrir → contexto → fatiar → inspecionar. | “A prévia vem depois do preparo.” |
| A04 · diagnóstico visual | Interface original indica 'ainda não fatiado'. “O que falta antes de ver as camadas?” | Executar fatiamento válido. | “A prévia depende das trajetórias calculadas.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Agora você conhece o papel do fatiador!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Tela genérica original e quatro estágios de preparação.

**Critério de aceite:** Ensinar o fluxo sem copiar interface de fabricante. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L19 — Tamanho e posição

**Código:** BOBI-M03-L19 · **Pré-requisito:** L18 concluída ou avanço por domínio · **Próxima:** L20 · **Fontes:** ORC-01, PRU-05.

**Objetivo:** Diferenciar escala, rotação e posição, interpretando o limite de uma mesa virtual.

**Abertura do Caramelo:** “O chaveiro está gigante e fora da mesa. Vamos arrumar seu tamanho e posição!”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “Qual ação altera as dimensões do chaveiro?” Opções: escala / rotação / mover. | Escala. | “A rotação muda orientação; mover altera localização.” |
| A02 · associação | Associe escala, rotação e posição às mudanças visuais. | Escala ↔ tamanho; rotação ↔ orientação; posição ↔ localização na mesa. | “A peça pode mudar de lugar sem aumentar.” |
| A03 · visual | Área válida de 100 mm na direção indicada; compare modelos de 40 e 120 mm. “Qual excede o limite?” | Peça de 120 mm. | “Compare apenas a dimensão e o limite explicitados.” |
| A04 · aplicação | Chaveiro está fora da área, mas tem tamanho correto. “O que fazer?” Opções: reposicionar / ampliar / ignorar. | Reposicionar dentro da área válida. | “Não é necessário aumentar a peça para mudar sua posição.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Você já sabe ajustar tamanho, orientação e posição!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Chaveiro com duas escalas e mesa virtual dimensionada.

**Critério de aceite:** Usar dimensões fornecidas, sem adivinhar dados de impressoras reais. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L20 — Escolhendo a máquina

**Código:** BOBI-M03-L20 · **Pré-requisito:** L19 concluída ou avanço por domínio · **Próxima:** L21 · **Fontes:** ORC-01, CRE-01.

**Objetivo:** Reconhecer compatibilidade entre perfil de máquina, área útil e projeto no cenário.

**Abertura do Caramelo:** “Duas máquinas, um chaveiro. Qual perfil combina com o que vamos fabricar?”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “Por que escolher perfil de máquina correto?” Opções: compatibilizar instruções / alterar cor / renomear arquivo. | Compatibilizar preparação com equipamento. | “O perfil define características da máquina usada para o preparo.” |
| A02 · associação | Associe volume útil, diâmetro de bico configurado e perfil de máquina. | Volume ↔ limites de dimensões; bico ↔ parâmetro de extrusão; perfil ↔ conjunto de configurações. | “Cada informação serve a uma verificação.” |
| A03 · visual | Chaveiro de 80 mm na direção exibida; máquinas fictícias com 100 e 60 mm, demais dimensões válidas. “Qual cabe?” | A máquina com 100 mm de área útil na direção. | “80 mm excedem o limite de 60 mm.” |
| A04 · diagnóstico | Perfil aberto não corresponde à impressora virtual selecionada. “O que fazer?” | Corrigir perfil antes de gerar instruções. | “Instruções precisam corresponder à máquina.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Perfil e espaço precisam combinar com o projeto!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Máquinas fictícias com dimensões didáticas, aviso de incompatibilidade.

**Critério de aceite:** Não sugerir compatibilidade com base só no nome ou em uma dimensão. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L21 — Escolhendo o filamento

**Código:** BOBI-M03-L21 · **Pré-requisito:** L20 concluída ou avanço por domínio · **Próxima:** L22 · **Fontes:** PRU-06, ORC-01.

**Objetivo:** Diferenciar material e perfil e identificar incompatibilidades simples no fatiador virtual.

**Abertura do Caramelo:** “Já escolhemos a máquina. Agora precisamos conferir qual filamento vamos usar!”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | Impressora FDM fictícia aceita PLA. “Qual material escolher?” Opções: PLA compatível / resina líquida / papel. | Filamento PLA compatível. | “A impressora FDM do cenário usa filamento.” |
| A02 · associação | Ligue carretel PLA, perfil de material e impressora FDM aos seus papéis. | Carretel ↔ material físico; perfil ↔ parâmetros do material; impressora ↔ fabrica. | “Material e configurações são coisas diferentes.” |
| A03 · diagnóstico visual | Carretel rotulado PLA e perfil PETG selecionado. “Qual inconsistência aparece?” | Perfil e material divergentes. | “Compare o rótulo do filamento com a configuração.” |
| A04 · aplicação | “Uma temperatura fixa funciona para todo PLA e toda impressora?” Opções: não, varia / sim, sempre / depende só da cor. | Não; depende de equipamento, material e perfil. | “Não existe recomendação universal válida em todo contexto.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Você sabe conferir se material e perfil estão de acordo!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Dois carretéis rotulados e interface de perfil fictício.

**Critério de aceite:** Evitar recomendações universais de temperatura e de desempenho. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L22 — A altura das camadas

**Código:** BOBI-M03-L22 · **Pré-requisito:** L21 concluída ou avanço por domínio · **Próxima:** L23 · **Fontes:** ORC-01, PRU-05.

**Objetivo:** Associar espessura das camadas à quantidade de camadas e à aparência ilustrada, sem universalizar tempo/resistência.

**Abertura do Caramelo:** “Camadas finas ou grossas? Vamos comparar dois jeitos virtuais de imprimir o mesmo objeto.”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · comparação visual | Duas peças de mesma altura, com camadas de 0,12 e 0,28 mm em perfis válidos do exemplo. “Qual terá mais camadas?” | A opção de 0,12 mm. | “Camadas mais finas exigem mais níveis para a mesma altura.” |
| A02 · associação | Ligue fina, grossa e altura final aos desenhos. | Fina ↔ degraus menores; grossa ↔ degraus mais visíveis no exemplo; altura final ↔ permanece igual. | “Espessura das camadas e altura total são grandezas diferentes.” |
| A03 · múltipla escolha | “Altura de camada pode influenciar o acabamento visual?” Opções: sim, conforme geometria / nunca / só muda cor. | Sim, pode influenciar aparência. | “Os degraus entre camadas podem ficar mais ou menos perceptíveis.” |
| A04 · aplicação | “Camada mais fina sempre reduz tempo e aumenta resistência?” Opções: não, depende de parâmetros / sim / depende só do nome. | Não, não há regra universal. | “Tempo e resistência dependem de outros fatores.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Você entendeu que camadas diferentes podem mudar o resultado visual!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Cortes esquemáticos do mesmo objeto com duas espessuras indicadas.

**Critério de aceite:** Não atribuir previsão física exata nem universalizar resistência. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L23 — Olhe antes de imprimir

**Código:** BOBI-M03-L23 · **Pré-requisito:** L22 concluída ou avanço por domínio · **Próxima:** L24 · **Fontes:** BAM-03, ORC-01, ULT-02.

**Objetivo:** Inspecionar prévias simples e identificar anomalias claras antes da fabricação virtual.

**Abertura do Caramelo:** “O fatiador mostrou a prévia. Vamos conferir se nosso chaveiro vai ficar do jeito esperado!”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · múltipla escolha | “Para que serve a prévia do fatiamento?” Opções: inspecionar trajetórias / garantir sucesso físico / imprimir em papel. | Inspecionar camadas e trajetórias previstas. | “A prévia ajuda a conferir; não garante sucesso no mundo real.” |
| A02 · diagnóstico visual | Duas prévias do mesmo chaveiro: furo livre e furo coberto. “Qual merece revisão?” | A que mostra furo fechado. | “O furo precisa estar livre para usar a argola.” |
| A03 · associação | Associe prévia, área útil e perfil material às verificações. | Prévia ↔ trajetórias; área útil ↔ cabimento; perfil ↔ compatibilidade do material. | “São conferências distintas antes de seguir.” |
| A04 · aplicação | A prévia não preserva a abertura funcional. “O que fazer?” Opções: revisar preparo / ignorar / aprovar porque fatiou. | Revisar modelo/preparação antes de continuar. | “Gerar trajetórias não significa que estejam corretas.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Inspecionar antes de imprimir ajuda a reconhecer problemas no preparo!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Prévia de camadas genérica, furo aberto e fechado, alertas.

**Critério de aceite:** Enfatizar limites da prévia e a checagem funcional do furo. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
### L24 — Imprima seu primeiro chaveiro

**Código:** BOBI-M03-L24 · **Pré-requisito:** L23 concluída ou avanço por domínio · **Próxima:** AV03 · **Fontes:** ULT-02, ORC-01, SAF-01.

**Objetivo:** Concluir preparação, inspeção e execução simulada guiada de um chaveiro no bobi., sem fatiamento físico ou tempo de espera bloqueante.

**Abertura do Caramelo:** “Chegou a missão final! Vamos fabricar um chaveiro **virtual** usando tudo que aprendemos.”

| ID/formato | Enunciado ou tarefa | Resposta correta | Feedback em caso de erro |
|---|---|---|---|
| A01 · seleção visual | Entre chaveiro 3D com furo, JPG e escultura sem abertura, “Qual modelo escolher?” | Modelo 3D do chaveiro com furo funcional. | “O modelo precisa ter geometria 3D e a abertura para a argola.” |
| A02 · configuração | Oficina virtual FDM aceita PLA. Escolha entre FDM+PLA/perfil correto, FDM+resina e perfil de outra máquina. | FDM, PLA e perfil compatível. | “Material, impressora e perfil precisam combinar.” |
| A03 · inspeção visual | Três prévias: chaveiro dentro da mesa e furo livre; fora da mesa; furo coberto. “Qual pode avançar?” | Dentro da mesa, com furo livre e perfil já compatível. | “Confira área e geometria funcional antes de continuar.” |
| A04 · execução virtual | Botão 'Iniciar impressão virtual' mostra animação original curta de camadas e chaveiro simulado pronto. “Qual processo vimos?” | Deposição de material por camadas, ilustrando FDM. | “Esta é uma simulação ilustrativa, não fabricação física.” |

**Acerto:** explicar por que a escolha é válida, confirmar a interação e habilitar 'Continuar'. **Erro:** exibir a explicação específica da tabela, permitir tentar novamente e oferecer destaque visual após erros recorrentes.

**Conclusão:** “Parabéns! Você produziu seu primeiro chaveiro virtual!” **Primeira conclusão elegível:** +20 XP e +10 Fios; desbloqueia próxima etapa.

**Recursos visuais (pendentes):** Chaveiro 3D e dois distratores, cartões de perfis, três prévias e animação 2D curta.

**Critério de aceite:** Mostrar o chaveiro virtual concluído; a oficina temporizada PD005 é separada e nunca bloqueia L24. Quatro interações verificadas, feedback, retomada e idempotência da recompensa.

---
## Critérios de aceitação do Mundo 3

1. Oito lições com quatro atividades cada, explicações curtas e feedback pertinente ao erro.
2. L17 diferencia **modelo, projeto/3MF e instruções de máquina**, evitando equivalências universais entre formatos.
3. L18–L23 exigem contexto de perfil, máquina e material; não inventar temperaturas nem prometer previsões físicas.
4. L24 termina com **chaveiro virtual visível e animado**, sem operação real nem tempo de oficina bloqueante.
5. L24 libera AV03. A avaliação exige quatro acertos em cinco e só concede recompensa na primeira aprovação.
6. O motor reutiliza os tipos existentes, a persistência e as regras PD001/PD003/PD006.
7. Revisão de segurança, revisão técnica, QA de gabaritos e licença de artes antes de qualquer publicação.

## Fontes e lacunas para revisão

| Lição | IDs | Pendência |
|---|---|---|
| L17 | STD-01, BAM-03, ULT-02 | Validar fontes suplementares específicas de STL e G-code |
| L18 | ULT-02, BAM-03, ORC-01 | Conferir versão, contextualização e ilustrações |
| L19 | ORC-01, PRU-05 | Conferir versão, contextualização e ilustrações |
| L20 | ORC-01, CRE-01 | Conferir versão, contextualização e ilustrações |
| L21 | PRU-06, ORC-01 | Conferir versão, contextualização e ilustrações |
| L22 | ORC-01, PRU-05 | Conferir versão, contextualização e ilustrações |
| L23 | BAM-03, ORC-01, ULT-02 | Conferir versão, contextualização e ilustrações |
| L24 | ULT-02, ORC-01, SAF-01 | Assegurar que o resultado fictício seja identificado como virtual |

- **STD-01** — Consórcio 3MF: https://3mf.io/spec/
- **BAM-03** — Bambu Studio: https://github.com/bambulab/BambuStudio/blob/master/README.md
- **ULT-02** — Interface e fluxo Cura: https://support.ultimaker.com/articles/Knowledge/1667411132925
- **ORC-01** — OrcaSlicer Wiki: https://github.com/OrcaSlicer/OrcaSlicer/wiki
- **CRE-01** — Creality Wiki: https://wiki.creality.com/en/software
- **PRU-05** — Modelagem: https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135
- **PRU-06** — Materiais: https://help.prusa3d.com/filament-material-guide
- **SAF-01** — NIOSH/CDC: https://www.cdc.gov/niosh/bulletin/2024/safe-3d-printing.html

**Status:** roteiro para aprovação do responsável; não homologado, não implementado. Nenhum novo RF ou RNF foi definido.
