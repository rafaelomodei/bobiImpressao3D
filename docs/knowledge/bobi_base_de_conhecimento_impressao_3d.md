> **NOTA DE GOVERNANÇA — 01/11/2026:** Este catálogo preserva a pesquisa original como referência técnica. Seu currículo de 10 mundos/92 lições é uma **proposta de expansão**. A aprovação vigente é **M1–M3, 24 lições, 3 avaliações de domínio e missão final virtual**, conforme [Termo de Abertura](../termo-de-abertura.md). Os status V/I/P abaixo refletem o levantamento em 01/11/2026, **não** conferência atual de URLs ou aprovação de cada afirmação para publicação.

---
title: "bobi. — Base de fontes de conhecimento para ensino de impressão 3D"
slug: "bobi-fontes-conhecimento-impressao-3d"
version: "1.0.0"
updated_at: "2026-11-01"
language: "pt-BR"
status: "catalogo_inicial_revisado"
audience: ["equipe de produto", "autores de missões", "designers instrucionais", "agentes de IA", "desenvolvedores"]
content_scope: "FDM/FFF, materiais, fatiamento, calibração, diagnóstico, segurança e princípios de projeto"
---

# bobi. — Base de fontes de conhecimento para ensino de impressão 3D

> **Natureza deste arquivo:** índice de fontes, matriz de rastreabilidade curricular e regras editoriais para gerar **missões, questões, simuladores, dicas e feedback** no aplicativo **bobi.**. Não é uma cópia dos conteúdos de terceiros nem uma base de fatos exaustiva. Para redigir afirmações específicas, consultar a página original, verificar a versão e registrar evidência.
>
> **Data da pesquisa:** 01/11/2026. **Público:** iniciantes a partir de 10 anos, sem necessidade de possuir impressora física. **Currículo:** proposta de 10 mundos / 92 microlições; estrutura editorial ainda sujeita a validação.

## 0. Como usar esta base

1. Localize o tópico ou mundo na **seção 3 (matriz curricular)**.
2. Abra a fonte primária indicada na **seção 2 (catálogo)**; confira o conteúdo atual, suas condições e o modelo de equipamento quando aplicável.
3. Extraia **conceitos técnicos em suas próprias palavras**: descrição, contexto, causas, exceções, pré-requisitos, riscos e evidências da fonte.
4. Construa uma **competência observável** e uma atividade original que envolva decisão ou interpretação, não somente memorização de texto.
5. Registre `source_ids`, `source_urls`, `source_accessed_at`, `evidence_summary`, `technical_review_status` e `curriculum_version` no registro da missão.
6. Antes de publicar, aplique os critérios de verificação das **seções 5–7**. Se a fonte estiver inacessível, desatualizada ou incompatível com a afirmação, **não gere uma resposta categórica**; marque `requires_research`.

### Classificação das referências

- **V — Conteúdo conferido**: página foi encontrada e seu conteúdo principal pôde ser lido no levantamento de 01/11/2026. **Não significa validação de cada detalhe ou atualização futura.**
- **I — Índice/descrição conferidos**: o portal ou sumário foi consultado, mas cada subpágina e instrução técnica ainda exige leitura.
- **P — Pendente de acesso/revisão**: link institucional identificado, mas o conteúdo direto não pôde ser consultado automaticamente neste levantamento; a existência da fonte pode ter sido corroborada por anúncio oficial.

**Prioridade de evidência**: normas e documentação técnica específica > documentação oficial de fabricante/software > centros de pesquisa e segurança > material didático institucional > fóruns/relatos (somente exemplos e hipóteses, nunca prova única de causalidade).

**Advertência:** documentação do fabricante sobre um equipamento específico não deve ser convertida em regra universal de impressão 3D.

## 1. Escopo curricular do bobi.

| Bloco | Mundos | Conteúdos | Destino inicial |
|---|---|---|---|
| Iniciante | M1–M4 | fundamentos, componentes, arquivos e fatiamento, primeira camada | Prioridade do MVP; aprofundar primeiras 24 lições (M1–M3) |
| Intermediário | M5–M7 | parâmetros, resistência, suportes, falhas | Evolução após MVP |
| Avançado | M8–M10 | calibração, materiais e projetos funcionais | Evolução após MVP |
| Transversal | Todos | segurança, interpretação de evidências, vocabulário e variabilidade técnica | Presente desde a primeira aula |

**Diretriz editorial:** a trilha ensina conceitos **independentes de marca**. Trilhas opcionais de Bambu Studio, Creality Print, OrcaSlicer, PrusaSlicer e Cura podem ensinar interfaces e perfis específicos, com versão explícita.

## 2. Catálogo de fontes técnicas

Todas as URLs são externas e podem mudar. Os IDs são estáveis para manter rastreabilidade em futuras versões do currículo.

### 2.1 Bambu Lab — organização de cursos, fluxo de impressão e fatiador

#### BAM-01 — Anúncio oficial de lançamento da Bambu Lab Academy
- **URL:** https://forum.bambulab.com/t/learn-improve-and-master-your-printer-with-bambu-lab-academy/151479
- **Tipo/status:** anúncio da equipe Bambu Lab; **V**.
- **Cobertura confirmada:** curso introdutório de uso de impressora, orientação por etapas, perspectiva de progressão e recompensas relacionadas à conclusão de etapas.
- **Usar no bobi.:** referência **pedagógica e de experiência**, não como prova técnica de configurações de impressão.
- **Mundos:** transversal; M1–M3.

#### BAM-02 — Bambu Lab Academy
- **URL:** https://bambulab.com/en/support/academy
- **Tipo/status:** portal de cursos; **P** (acesso direto restringido nesta pesquisa; a existência e oferta de cursos de máquinas/softwares estão documentadas por BAM-01 e anúncio oficial abaixo).
- **Anúncio complementar:** https://forum.bambulab.com/t/bambu-lab-academy-expands-new-h2s-p2s-courses-multi-language-support/204908
- **Usar no bobi.:** levantar e comparar jornadas didáticas, temas e exercícios **após revisão humana**. Não copiar quizzes, textos, certificado ou identidade visual.
- **Mundos:** M1–M3; trilha opcional Bambu.

#### BAM-03 — Repositório oficial do Bambu Studio (README)
- **URL:** https://github.com/bambulab/BambuStudio/blob/master/README.md
- **Tipo/status:** software oficial, descrição pública; **V**.
- **Cobertura confirmada:** fluxo por projetos, preparação e prévia de G-code, organização/orientação, suportes normais e em árvore, configurações por objeto/parte, multimaterial e controle da impressão.
- **Usar no bobi.:** criar uma taxonomia de ações do fatiador sem vincular cada tarefa ao posicionamento exato de botões.
- **Mundos:** M3, M5, M6, M9.
- **Nota:** README de software não substitui documentação operacional detalhada.

#### BAM-04 — Bambu Lab Wiki
- **URL:** https://wiki.bambulab.com/en/home
- **Tipo/status:** documentação do fabricante; **P** (bloqueio de leitura automatizada neste levantamento).
- **Usar no bobi.:** futuras verificações de manuais, falhas, manutenção, materiais e periféricos específicos.
- **Regra:** não declarar um procedimento do Wiki como revisado até abrir e ler a respectiva página.

### 2.2 Creality — máquinas, fatiador e problemas de campo

#### CRE-01 — Portal oficial de software da Creality
- **URL:** https://wiki.creality.com/en/software
- **Tipo/status:** índice oficial; **I**.
- **Cobertura conferida:** famílias/documentação Creality Print **4.x, 5.x e 6.x/7.x**.
- **Usar no bobi.:** localizar documentação correspondente à versão atual do software; evitar ensinar uma interface de 4.x como se fosse de 7.x.
- **Mundos:** M3, M5, M6, M8; trilha Creality Print.

#### CRE-02 — Creality Print 4.x: índice de tutoriais
- **URL:** https://wiki.creality.com/en/software/creality-print
- **Tipo/status:** índice oficial da série 4.x; **I**.
- **Cobertura conferida:** início rápido, parâmetros de fatiamento, calibração e dúvidas frequentes.
- **Usar no bobi.:** catalogação de temas históricos e comparação entre versões; conferir subpágina antes de extrair detalhes.
- **Mundos:** M3, M5, M8.

#### CRE-03 — Ender-3 V3: guia oficial
- **URL:** https://wiki.creality.com/en/ender-series/ender-3-v3
- **Tipo/status:** página técnica oficial de modelo específico; **I** (índice e tópicos conferidos).
- **Cobertura conferida:** instalação, manutenção, primeira camada, filamento, falha de extrusão, stringing, correias e diagnóstico de problemas.
- **Usar no bobi.:** exemplos visuais de problemas reais, desde que a explicação aplicável a outras máquinas seja validada em fontes adicionais.
- **Mundos:** M2, M4, M7, M8.
- **Cuidado:** distinguir Ender-3 V3, V3 SE e V3 KE.

#### CRE-04 — Boletim oficial de atualizações Creality Wiki
- **URL:** https://wiki.creality.com/en/product-updates
- **Tipo/status:** índice oficial de novidades; **I**.
- **Cobertura conferida:** registro de atualização de **guia de usuário do Creality Print 6.0** em outubro de 2026.
- **Usar no bobi.:** gatilho de revisão do conteúdo da trilha Creality Print; não confundir boletim com manual completo.

### 2.3 OrcaSlicer — parâmetros, calibrações e preparo

#### ORC-01 — Wiki oficial do projeto OrcaSlicer (GitHub)
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki
- **Alternativa de leitura:** https://www.orcaslicer.com/wiki/
- **Tipo/status:** documentação mantida pelo projeto; **V** (página inicial e taxonomia técnica consultadas).
- **Cobertura confirmada:** configurações de impressora, material e processo; qualidade, paredes/preenchimento, velocidade, suportes, multimaterial, preparação, prévia e calibração.
- **Usar no bobi.:** principal referência para construir a **ontologia de parâmetros** do simulador: parâmetro → efeito provável → restrições → interações.
- **Mundos:** M3, M5, M6, M8, M9.
- **Cuidado:** funcionalidades experimentais ou específicas de versões devem ser explicitadas; revisar cada subartigo antes de gerar afirmações quantitativas.

#### ORC-02 — Guia de calibração OrcaSlicer
- **URL:** https://github.com/OrcaSlicer/OrcaSlicer/wiki/calibration_guide
- **Alternativa de leitura:** https://www.orcaslicer.com/wiki/calibration_guide/
- **Tipo/status:** guia técnico do projeto; **V**.
- **Cobertura confirmada:** sequência orientativa de testes de temperatura, vazão volumétrica máxima, pressure advance, flow ratio, retração, tolerância e calibrações avançadas.
- **Usar no bobi.:** desafios de interpretação de amostras e comparação entre configurações.
- **Mundos:** M7, M8, M10.
- **Cuidado:** a ordem e as condições dos testes podem mudar; testar em equipamento real **não é necessário** para concluir missões.

### 2.4 Prusa — conteúdo técnico, diagnóstico e ensino

#### PRU-01 — Prusa Academy: formato didático
- **URL:** https://help.prusa3d.com/article/prusa-academy_326256
- **Tipo/status:** descrição oficial de cursos; **V**.
- **Cobertura confirmada:** cursos de iniciantes a avançados, explicações curtas, alertas, quizzes, revisão após erros e certificação opcional.
- **Usar no bobi.:** design instrucional: feedback contextual, revisão, trilhas e glossário.
- **Mundos:** transversal.

#### PRU-02 — Problemas da primeira camada
- **URL:** https://help.prusa3d.com/article/first-layer-issues_1804
- **Tipo/status:** artigo de suporte; **V**.
- **Cobertura confirmada:** aderência, mesa, distância bico–superfície, temperatura, velocidade e brim; algumas orientações são específicas dos modelos Prusa indicados.
- **Usar no bobi.:** diferenciar **sintoma → hipótese → teste → decisão**.
- **Mundos:** M4, M7.

#### PRU-03 — Infill (preenchimento)
- **URL:** https://help.prusa3d.com/article/infill_42
- **Tipo/status:** artigo técnico; **V**.
- **Cobertura confirmada:** função do preenchimento, densidade, padrões, suporte de superfícies superiores, consumo, tempo e resistência.
- **Usar no bobi.:** comparar duas configurações em uma peça com finalidade definida.
- **Mundos:** M5, M10.
- **Cuidado:** percentuais recomendados no artigo são contextuais; não tratar um percentual como regra absoluta de resistência.

#### PRU-04 — Material de suporte
- **URL:** https://help.prusa3d.com/article/support-material_1698
- **Tipo/status:** artigo técnico; **V**.
- **Cobertura confirmada:** necessidade de suporte em balanços, orientação, suportes automáticos/manuais, tipos de estrutura e remoção.
- **Usar no bobi.:** prever onde suporte é necessário e avaliar alternativas para reduzi-lo.
- **Mundos:** M6, M10.

#### PRU-05 — Modelagem pensando na impressão 3D
- **URL:** https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135
- **Tipo/status:** artigo técnico; **V**.
- **Cobertura confirmada:** orientação, espessuras, sobreposições, tolerâncias, suportes, integridade da geometria e adequação ao processo FFF.
- **Usar no bobi.:** missões de design para fabricação, encaixes e limitações geométricas.
- **Mundos:** M6, M10.
- **Cuidado:** valores de tolerância e ângulos dependem de material, máquina, geometria e calibração.

#### PRU-06 — Guia comparativo de materiais
- **URL:** https://help.prusa3d.com/filament-material-guide
- **Tipo/status:** guia técnico comparativo; **V**.
- **Cobertura confirmada:** famílias de filamentos, requisitos de equipamento e propriedades relativas.
- **Usar no bobi.:** decisões de escolha de material conforme o caso de uso e limitações de segurança.
- **Mundos:** M2, M9, M10.
- **Cuidado:** temperaturas listadas são guias vinculados a perfis e condições, não valores universais.

#### PRU-07 — Stringing e oozing
- **URL:** https://help.prusa3d.com/article/stringing-and-oozing_1805
- **Tipo/status:** artigo de diagnóstico; **V**.
- **Cobertura confirmada:** fios entre áreas impressas e possíveis relações com retração, temperatura, filamento e condições da máquina.
- **Usar no bobi.:** árvore de hipóteses com alternativas e contraprovas; evitar uma única causa obrigatória.
- **Mundos:** M7, M8.

#### PRU-08 — Warping
- **URL:** https://help.prusa3d.com/article/warping_2011
- **Tipo/status:** artigo de diagnóstico; **V**.
- **Cobertura confirmada:** deformação e levantamento de bordas associados, entre outros fatores, à contração térmica, material e ambiente.
- **Usar no bobi.:** comparar hipóteses de aderência e ambiente sem ensinar soluções universais.
- **Mundos:** M4, M7, M9.

### 2.5 UltiMaker — curso estruturado e referência complementar do Cura

#### ULT-01 — UltiMaker Academy
- **URL:** https://academy.ultimaker.com/
- **Tipo/status:** catálogo institucional de cursos; **I**.
- **Cobertura conferida:** terminologia FFF, fluxo de impressão, materiais, design, Cura, manutenção e segurança, em níveis de operação.
- **Usar no bobi.:** validar cobertura de competências dos níveis iniciante/avançado.
- **Mundos:** M1–M10.
- **Cuidado:** algumas aulas exibidas no catálogo referem-se a versões antigas do Cura; não usá-las como referência de interface atual sem revisão.

#### ULT-02 — Visão geral da interface do UltiMaker Cura
- **URL:** https://support.ultimaker.com/articles/Knowledge/1667411132925
- **Tipo/status:** suporte oficial; **V**.
- **Cobertura confirmada:** fluxo de abrir modelo, selecionar impressora/material, preparar, visualizar e monitorar.
- **Usar no bobi.:** sequência genérica de preparação de uma impressão.
- **Mundos:** M3.

#### ULT-03 — Configurações de suporte do Cura
- **URL:** https://support.ultimaker.com/articles/Knowledge/1667417606331
- **Tipo/status:** suporte oficial; **V**.
- **Cobertura confirmada:** suportes normais e em árvore e respectivas limitações.
- **Usar no bobi.:** cenários em que uma alternativa pode sacrificar tempo, consumo ou acabamento.
- **Mundos:** M6.

### 2.6 Padrões técnicos e segurança (fontes transversais)

#### STD-01 — 3MF Consortium: especificação do formato 3MF
- **URL:** https://3mf.io/spec/
- **Tipo/status:** organismo mantenedor da especificação; **V**.
- **Cobertura confirmada:** formato 3MF para transferência de dados de manufatura aditiva; especificação de geometria e extensões.
- **Usar no bobi.:** distinguir arquivo geométrico, contêiner de projeto e instruções de máquina; **nem todo arquivo 3MF contém as mesmas informações de perfil/processo**.
- **Mundos:** M3, M10.

#### SAF-01 — NIOSH/CDC: Safe 3D Printing is for Everyone, Everywhere
- **URL:** https://www.cdc.gov/niosh/bulletin/2024/safe-3d-printing.html
- **Tipo/status:** órgão público de saúde e segurança; **V**.
- **Cobertura confirmada:** partículas, compostos emitidos, aquecimento, partes móveis, ventilação, prevenção e hierarquia de controles.
- **Usar no bobi.:** criar missões de inspeção segura antes de operar uma impressora física e explicações sobre medidas preventivas.
- **Mundos:** todos, especialmente M2, M9.

#### SAF-02 — NIOSH: guia para makerspaces, escolas e bibliotecas
- **URL:** https://www.cdc.gov/niosh/publications/numbered/2024-103.html
- **Tipo/status:** página institucional de publicação técnica; **V** para descrição/sumário; **não analisado o PDF integral**.
- **Cobertura confirmada pela página:** avaliação de riscos e recomendações para espaços de impressão 3D, incluindo ambientes educacionais.
- **Usar no bobi.:** lista de verificação e pesquisa posterior em profundidade. Para detalhes técnicos do relatório, ler e auditar o texto integral antes de usá-lo.
- **Mundos:** todos.

## 3. Matriz curricular → fontes → oportunidades de missão

**Legenda dos mundos:** M1 Descoberta; M2 Oficina; M3 Primeira impressão; M4 Primeira camada; M5 Interior da peça; M6 Geometria e suportes; M7 Detetive das falhas; M8 Calibração; M9 Materiais e cores; M10 Projeto ao produto.

| Mundo | Conhecimentos a ensinar | Fontes prioritárias | Exemplos de mecânicas de missão |
|---|---|---|---|
| **M1** | fabricação aditiva, camadas, FDM versus outras tecnologias, aplicações, processo geral | BAM-01, PRU-01, ULT-01 | escolher aplicações, ordenar etapas, reconstruir peça por camadas |
| **M2** | eixos, extrusão, hotend, bico, mesa, filamento, riscos | CRE-03, ORC-01, PRU-06, SAF-01 | localizar componentes, seguir caminho do filamento, inspecionar riscos |
| **M3** | importar modelo, STL e 3MF, preparar, orientar, escolher perfil, prévia e instruções de máquina | BAM-03, CRE-01, ORC-01, ULT-02, STD-01 | selecionar arquivo, ordenar ações, ajustar impressão virtual |
| **M4** | primeira camada, aderência, distância bico–mesa, brim, superfícies | PRU-02, CRE-03, PRU-08 | identificar sintoma por imagem, selecionar inspeção, comparar efeitos |
| **M5** | altura de camada, paredes, superfícies, preenchimento, tempo e material | ORC-01, PRU-03 | comparar corte interno, escolher compromissos de qualidade/custo |
| **M6** | balanços, pontes, orientação, suporte e marcas na superfície | PRU-04, PRU-05, ORC-01, ULT-03 | girar modelo, decidir suportes, minimizar desperdício |
| **M7** | stringing, warping, subextrusão, falha de adesão, diagnóstico | PRU-02, PRU-07, PRU-08, CRE-03, ORC-02 | árvore de diagnóstico, hipótese e teste, comparação de peças |
| **M8** | temperatura, vazão volumétrica, pressure advance, fluxo, retração e tolerância | ORC-02, ORC-01, CRE-02 | interpretar torre/testes, selecionar próxima calibração |
| **M9** | PLA, PETG, TPU, ABS/ASA, compatibilidade, umidade, cor e multimaterial | PRU-06, ORC-01, BAM-03, SAF-01 | decidir material por aplicação, simular troca de cores, reconhecer riscos |
| **M10** | tolerâncias, encaixes, orientação estrutural, custo, resistência e iteração | PRU-05, PRU-03, PRU-06, STD-01 | especificar peça funcional, comparar protótipos e justificar projeto |

### Rastreabilidade das primeiras 24 lições (MVP pedagógico)

| ID | Lição proposta | IDs de fontes | Evidência a conferir antes da redação final |
|---|---|---|---|
| L01 | O que é impressão 3D? | ULT-01, PRU-01 | conceito de FFF e aplicações |
| L02 | Criando camada por camada | ULT-01, ULT-03 | princípio de deposição/sustentação de camadas |
| L03 | Da ideia ao objeto | ULT-01, ULT-02, BAM-03 | sequência do fluxo digital |
| L04 | Onde usamos impressão 3D? | ULT-01, PRU-01 | aplicações exemplificadas pelas fontes |
| L05 | Impressão ou fabricação tradicional? | ULT-01 | **Requer fonte suplementar** para comparação sistemática com processos subtrativos |
| L06 | Filamento ou resina? | ULT-01 | **Requer fonte suplementar específica** sobre resina e seus riscos; somente introdução no MVP |
| L07 | O que pode dar errado? | PRU-02, PRU-07, PRU-08 | exemplos e diversidade de sintomas |
| L08 | Primeira missão do Caramelo | ULT-02, BAM-03 | fluxo genérico de preparação; cenário e mecânica serão originais |
| L09 | Conheça sua impressora | CRE-03 | nomes e funções dos componentes |
| L10 | A máquina ganha movimento | CRE-03, ORC-01 | eixos e movimentação; não generalizar arquitetura cinemática |
| L11 | O caminho do filamento | CRE-03, ORC-01 | extrusão e componentes; variantes direct-drive/Bowden |
| L12 | Por que o bico esquenta? | CRE-03, SAF-01 | fusão/deposição e risco térmico |
| L13 | O que é PLA? | PRU-06 | propriedades e recomendações contextuais |
| L14 | A mesa de impressão | PRU-02, CRE-03 | função da superfície, manutenção e adesão |
| L15 | Atenção à segurança! | SAF-01, SAF-02 | risco térmico, partes móveis, exposição e supervisão |
| L16 | Prepare a oficina | SAF-01, CRE-03 | checklist seguro, sem manutenção em equipamento energizado |
| L17 | O arquivo do objeto | STD-01, BAM-03, ULT-02 | distinção STL/3MF/G-code; **validar fonte complementar específica para STL e G-code** |
| L18 | Conheça o fatiador | ULT-02, BAM-03, ORC-01 | função do fatiador |
| L19 | Tamanho e posição | ORC-01, PRU-05 | escala, rotação, posicionamento |
| L20 | Escolhendo a máquina | ORC-01, CRE-01 | perfil de impressora, volume e bico |
| L21 | Escolhendo o filamento | PRU-06, ORC-01 | compatibilidade e perfil de filamento |
| L22 | A altura das camadas | ORC-01, PRU-05 | resolução, acabamento e contexto de impressão |
| L23 | Olhe antes de imprimir | BAM-03, ORC-01, ULT-02 | prévia de camadas/instruções |
| L24 | Imprima seu primeiro chaveiro | ULT-02, ORC-01, SAF-01 | preparação e inspeção; resultado do simulador é **fictício e didático** |

**Regra importante:** as missões L05, L06 e parte da L17 têm lacunas explícitas de fontes. Não marcar como "revisadas" apenas porque a tabela possui algum link.

## 4. Padrão para criar missões a partir de fontes

### 4.1 Template de especificação de missão

```yaml
id: "BOBI-M04-L02-A01"
curriculum_version: "1.0.0"
world: "M4"
lesson: "Diagnóstico da primeira camada"
competency: "Identificar um sintoma de primeira camada e propor uma inspeção apropriada"
target_age: "10+"
duration_seconds_target: 120
activity_type: "diagnostico_visual"
context: "A primeira camada apresenta linhas muito separadas"
student_task: "Escolher o primeiro fator a verificar"
source_ids: ["PRU-02", "CRE-03"]
source_urls:
  - "https://help.prusa3d.com/article/first-layer-issues_1804"
  - "https://wiki.creality.com/en/ender-series/ender-3-v3"
source_accessed_at: null # registrar a data da checagem da fonte específica
# Preencher a partir da página efetivamente lida, com paráfrase e contexto.
evidence_summary: null
assumptions:
  - "Impressora FDM e superfície compatível; parâmetros de perfil controlados"
correct_behavior: "Selecionar uma inspeção plausível, não presumir que há causa única"
feedback_correct: "Explicação original do motivo da inspeção"
feedback_incorrect: "Indicação original do que faltou observar, com nova tentativa"
visual_asset: "ilustracao_original_1a_camada.png"
content_license_review: "pendente"
technical_review_status: "draft"
pedagogical_review_status: "draft"
safety_review_status: "draft"
```

### 4.2 Banco de conceitos (modelo mínimo)

Cada conceito técnico da plataforma deve ter:

- `concept_id`, `name_pt`, `aliases_en`, `definition_pt_original`;
- `prerequisite_concept_ids`, `curriculum_world_ids`, `difficulty`;
- `source_ids` e **evidência original parafraseada**, com URL e data;
- `scope_conditions`: material, máquina, fatiador, bico, geometria e ambiente;
- `known_exceptions`, `common_misconceptions`, `diagnostic_clues`;
- `safety_notes`, `verification_status`, `reviewer`, `reviewed_at`.

**Modelo didático:** conceitual → exercício guiado → aplicação em cenário → diagnóstico → revisão espaçada.

### 4.3 Exemplo de transformação: documentação → missão

- **Fonte:** PRU-02, sobre possíveis falhas na primeira camada.
- **Conceito técnico:** distância do bico, preparo da superfície e características do filamento influenciam o resultado; o diagnóstico exige contexto.
- **Objetivo:** o aluno reconhecer um primeiro indício e decidir que informação precisa observar.
- **Missão original:** o Caramelo mostra três primeiras camadas e pergunta qual merece investigação, por quê e qual teste seguro faz sentido.
- **Critério de aprovação:** justificar pelo menos uma hipótese plausível; não penalizar uma resposta tecnicamente válida apenas por diferir da preferência do autor.
- **Arte:** criar desenho/animação próprios com casos visualmente inequívocos; **não reutilizar screenshots oficiais** sem avaliar a licença.

## 5. Regras de qualidade factual para agentes de IA e autores

1. **Nenhuma questão sem fonte verificável.** Se o assunto estiver fora do catálogo, criar tarefa de pesquisa antes de gerar questão definitiva.
2. **Não deduzir valores universais.** Temperatura do PLA, velocidade, retração, altura de camada, ângulo de balanço, resistência e tolerância variam com perfil, máquina, bico, material e geometria.
3. **Evitar monocausalidade.** Stringing, warping, baixa adesão e outros defeitos podem ter múltiplas causas. Escrever questões condicionadas a sintomas, perfis ou evidência fornecida.
4. **Diferenciar simulador e impressora física.** O resultado do simulador pode ilustrar tendências, mas não comprova física real nem previsão exata de tempo, custo ou falha.
5. **Separar tecnologia de interface.** Princípios de FDM são curriculares; nomes de menus e botões pertencem a versões específicas de Orca, Creality Print, Cura, Bambu Studio etc.
6. **Evitar simplificações enganosas.** Mais infill não significa necessariamente peça mais resistente em qualquer carga; maior velocidade não implica sempre mesma qualidade.
7. **Não gerar instrução física perigosa.** Trabalhos com hotend aquecido, elétrica, solventes, manutenção e resina exigem restrições apropriadas e supervisão conforme fabricante; o MVP deve ser totalmente virtual.
8. **Registrar incerteza e revisão.** Usar `verified`, `needs_review`, `conflicting_sources`, `obsolete`, `out_of_scope` quando necessário.
9. **Não usar IA como única autoridade.** O modelo sugere roteiros, mas um revisor técnico valida conceitos e alternativas, especialmente quando há um único gabarito.
10. **O retorno pedagógico explica o porquê.** Cada erro deve ter justificativa conceitual e oportunidade de revisão.

## 6. Direitos autorais, licenças e atribuição

Este arquivo **apenas aponta** para documentos externos. A presença de uma URL ou de um repositório de software aberto **não concede licença para copiar** o texto de uma wiki, suas fotografias, ilustrações, vídeos, exemplos de modelos, logos, perguntas ou interfaces.

- Produzir **textos, perguntas, animações, desenhos e ativos 3D originais** para o bobi.
- Parafrasear fatos técnicos verificados; atribuir fontes internamente e, quando aplicável, apresentar referências na aplicação.
- Verificar **licença e titularidade de cada recurso** antes de incorporá-lo ou redistribuí-lo; não inferir a licença de imagens a partir da licença do código do slicer.
- Verificar se a licença admite uso comercial, adaptação e redistribuição antes de importar material.
- Não clonar exercícios, sequências narrativas, telas ou mascotes de cursos existentes.
- Evitar usar marcas e logotipos de terceiros no produto de forma que sugira parceria ou endosso.
- Para arquivos de exemplos de terceiros, registrar URL, autor, licença, versão e evidência da autorização.

## 7. Política de manutenção da base

| Rotina | Frequência sugerida | Resultado |
|---|---|---|
| Validar URLs, redirecionamentos e versões dos fatiadores | mensal ou antes de release | atualizar `status`, `last_checked` |
| Revisar fontes técnicas de missões novas | antes da escrita e da publicação | anotar trecho/ideia, condição e `source_accessed_at` |
| Verificar conflitos entre fabricantes | por tema e quando necessário | descrever diferença de máquina/material/perfil |
| Revisar segurança | a cada nova prática/tipo de material | revalidação técnica e de segurança |
| Avaliar eficácia pedagógica | após piloto e a cada ciclo de conteúdo | análise de erros e revisões da missão |
| Auditar direitos de uso dos ativos | antes de publicação | licenças e atribuição registradas |

### Lacunas de pesquisa ainda abertas

- [ ] Fonte introdutória específica e atualizada sobre **SLA/MSLA/resinas**, com orientação de segurança adequada a menores.
- [ ] Referência primária detalhada para **STL versus 3MF versus G-code**, com exemplos e limites de cada formato.
- [ ] Documentação de **Creality Print 6.x/7.x** em subpáginas específicas e leitura integral dos tópicos que entrarem na trilha opcional.
- [ ] Leitura humana de páginas técnicas da **Bambu Lab Wiki / Academy** cujo acesso automatizado ficou restrito.
- [ ] Fonte técnica para nomenclatura e variações de **cinemática** (cartesiana, CoreXY, delta) antes de aprofundar o tema.
- [ ] Documentação de compatibilidade de materiais, ventilação, pós-processamento e configurações quando houver expansão além de PLA.
- [ ] Definir se haverá simulador puramente ilustrativo ou motor matemático com curvas validadas por testes.
- [ ] Formalizar critérios de aprovação pedagógica e avaliação com usuários-alvo.
- [ ] Definir rubrica de revisão técnica e responsável por aprovar cada missão.

## 8. Próximos documentos recomendados para o repositório

```text
docs/
  knowledge/
    bobi_base_de_conhecimento_impressao_3d.md    # ESTE arquivo: catálogo-mestre
    conceitos/                                  # conceitos auditados e contextualizados
      primeira-camada.md
      suportes.md
      preenchimento.md
    fontes/                                     # metadados e última revisão por URL
      fontes.yaml
    curriculo/
      mundos.yaml
      licoes-mvp.yaml
    missoes/
      BOBI-M04-L02-A01.yaml
    revisoes/
      verificacao-tecnica.md
      direitos-de-uso.md
```

### Definição de pronto para cada nova missão

- [ ] Competência observável e pré-requisitos identificados.
- [ ] Fonte(s) específica(s) abertas e conferidas; URL e data registradas.
- [ ] Afirmações compatíveis com o escopo e as limitações documentadas.
- [ ] Gabarito tecnicamente defensável; distratores não enganosos.
- [ ] Dica e feedback escritos originalmente, com explicação causal.
- [ ] Ativos visuais próprios ou com licença verificada.
- [ ] Segurança e adequação etária revisadas.
- [ ] Teste de usabilidade e acessibilidade planejado.
- [ ] Revisões técnica e pedagógica aprovadas.

---

**Nota de proveniência:** referências mapeadas por pesquisa documental em 01/11/2026. Este arquivo não indica que os materiais integrais foram importados, que os recursos de terceiros podem ser reutilizados livremente ou que a lista do currículo já foi implementada no aplicativo. O conteúdo original das fontes permanece nos links oficiais e deve ser consultado novamente durante a elaboração de cada missão.