# Mundo 1 — Especificações das lições do bobi.

**Projeto:** bobi. — O jeito divertido de aprender impressão 3D.  
**Responsável:** Rafael Geovani Omodei  
**Data da consolidação:** 01/11/2026  
**Padrão pedagógico:** híbrido — homologado  
**Mascote:** **Caramelo, um cachorro caramelo brasileiro** (não tartaruga). Visual e acessórios específicos ainda sujeitos à direção de arte.

> **L01–L04: homologadas pelo responsável.** Descrições abaixo são especificações, não implementação; artes, animações e revisão técnica/pedagógica final permanecem pendentes.

## Regras comuns homologadas

- Duração-alvo de 1 a 5 minutos; nas primeiras quatro lições, cerca de **2–4 minutos**, sem cronômetro eliminatório.
- Quatro atividades por lição, combinando explicações curtas, prática e feedback. Tipos: múltipla escolha, associação, ordenação e diagnóstico visual.
- **Lições comuns não têm requisito de 80% na primeira tentativa**: são concluídas quando todas as atividades obrigatórias são resolvidas, inclusive após erros/dicas.
- Todo erro recebe feedback específico e nova tentativa. Não consome vidas. Após erros recorrentes, oferecer orientação.
- Cada interação confirmada é persistida; após interrupção, retomar da próxima pendente, sem contar respostas não confirmadas.
- Primeira conclusão elegível: **20 XP + 10 Fios**, uma única vez. Primeira revisão válida no dia: **5 XP**, sem Fios. Repetições adicionais inelegíveis: 0.
- Desbloquear a próxima lição após conclusão. Atualizar meta diária conforme regra de elegibilidade. Funciona sem impressora física.
- O **teste de domínio ao fim do mundo** é separado das oito lições: cinco desafios, aprovação a partir de quatro acertos (80%).
- Registrar para cada atividade: `activity_id`, `lesson_id`, `content_version`, `activity_type`, `competency`, `statement`, opções/ordem/pares, resposta esperada, feedback por erro, dica, `visual_asset_ids` e `source_ids`. Em execução, registrar tentativas, primeira resposta, dicas, confirmação e conclusão.

---

# L01 — O que é impressão 3D?

**ID:** `BOBI-M01-L01` · **Aprovada** · Pré-requisito: nenhum · Próxima: L02  
**Objetivo:** reconhecer impressão 3D como fabricação de objeto físico a partir de um modelo digital, por acréscimo de material. Não ensinar parâmetros ou detalhes das camadas nesta etapa.

### Abertura — S00
**Caramelo:** “Já imaginou transformar um desenho digital em um objeto de verdade?”  
**Explicação:** “Na impressão 3D, uma máquina usa um modelo digital para fabricar uma peça física.”  
**Visual:** mesmo chaveiro como modelo digital → impressora FDM em operação → chaveiro pronto.  
**CTA:** “Vamos descobrir!”

### A01 — Reconhecer o processo (múltipla escolha)
**Pergunta:** “Qual dessas situações mostra uma impressão 3D?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Uma máquina deposita material e constrói um objeto físico. | “Isso! Na impressão 3D, material é acrescentado para formar o objeto.” |
| B | Uma máquina corta material de um bloco para formar uma peça. | “Essa máquina retira material de um bloco. A impressão 3D constrói a peça acrescentando material.” |
| C | Uma impressora coloca uma fotografia em uma folha de papel. | “Essa máquina imprime uma imagem no papel. A impressão 3D fabrica um objeto com volume.” |

### A02 — Modelo digital ou objeto físico? (associação)
**Caramelo:** “Antes de uma peça existir de verdade, ela pode existir apenas no computador.”  
**Enunciado:** “Ligue cada elemento à sua função.”

- Modelo 3D ↔ Representação digital do objeto.
- Impressora 3D ↔ Máquina responsável pela fabricação.
- Peça impressa ↔ Objeto físico produzido.

**Erro:** “Esses elementos têm funções diferentes. Pense no que existe no computador e no que pode ser segurado.”  
**Conclusão:** “Perfeito! O modelo contém a informação, a impressora fabrica e a peça é o resultado físico.”

### A03 — Como uma ideia vira objeto? (ordenação)
**Enunciado:** “Organize as etapas para transformar um modelo digital em uma peça.”

1. Escolher ou criar um modelo 3D.
2. Preparar o arquivo para a impressora.
3. Imprimir a peça.

**Acerto:** “Exatamente! Primeiro vem o modelo, depois a preparação e, por fim, a fabricação.”  
**Erro:** “A impressora precisa receber instruções antes de fabricar. Que etapa prepara o modelo para a máquina?”

### A04 — O desafio do Caramelo (diagnóstico visual)
**Enunciado:** “Qual imagem mostra o chaveiro sendo impresso neste momento?”

| Imagem | Representação | Feedback |
|---|---|---|
| A | Chaveiro como modelo digital no computador | “Esse é o modelo digital. Ele mostra como será o chaveiro, mas a fabricação ainda não começou.” |
| **B ✓** | Chaveiro parcialmente construído na impressora, com bico depositando material | “Isso mesmo! A impressora está acrescentando material para construir o chaveiro.” |
| C | Chaveiro físico pronto | “O chaveiro já está pronto nessa imagem. Procure a cena em que a máquina ainda está fabricando.” |

### Conclusão — S05
**Caramelo:** “Você descobriu como um modelo digital pode virar um objeto de verdade!”  
**Resumo:** impressão 3D; diferença entre modelo e objeto; sequência básica.  
**Primeira conclusão:** +20 XP e +10 Fios; destravar L02.

**Assets:** chaveiro digital, em fabricação e pronto; exemplos ilustrados A01; cartões A02/A03; poses do cachorro Caramelo.  
**Critérios específicos:** quatro atividades completas com feedback por alternativa; recuperação de progresso; recompensa única; desbloqueio L02.

---

# L02 — Criando camada por camada

**ID:** `BOBI-M01-L02` · **Aprovada** · Pré-requisito: L01 ou avaliação de domínio · Próxima: L03  
**Objetivo:** compreender a deposição sucessiva de camadas em FDM, distinguir trilha/camada/objeto e identificar uma lacuna esquemática. Não diagnosticar causas ou ensinar parâmetros.

### Abertura — S00
**Caramelo:** “Na última missão, você descobriu o que é impressão 3D. Mas como a máquina constrói um objeto inteiro?”  
**Visual:** torre geométrica simples em cinco estágios, crescendo pela deposição de camadas.  
**Caramelo:** “Ela vai colocando material camada por camada, até formar a peça!”  
**CTA:** “Entendi, vamos testar!”

### A01 — Como a peça cresce? (múltipla escolha)
**Pergunta:** “Como uma impressora 3D de filamento constrói uma peça?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Acrescentando material em camadas sucessivas. | “Isso! Cada nova camada ajuda a construir o objeto, até ele ficar completo.” |
| B | Esculpindo uma peça pronta até chegar ao formato desejado. | “Esculpir normalmente envolve retirar material. Nesta impressão 3D, a máquina acrescenta material para construir a peça.” |
| C | Criando a peça inteira instantaneamente, sem etapas. | “A peça não aparece inteira de uma vez. Ela ganha forma aos poucos, enquanto novas camadas são depositadas.” |

### A02 — Construa de baixo para cima (ordenação visual)
**Enunciado:** “Organize as imagens do começo ao fim da impressão.”  
**Correta:** base → torre pela metade → torre completa. Usar o mesmo objeto, perspectiva e proporções, com cartões embaralhados.  
**Acerto:** “Boa! A impressão começa pela base e ganha altura conforme as novas camadas são formadas.”  
**Erro:** “Observe qual peça tem menos camadas. A impressão começa pequena e cresce até terminar.”  
**Dica após dois erros:** “Primeiro aparece a base. Depois, a peça fica mais alta. No final, ela está completa.”

### A03 — O que estamos vendo? (associação)
**Enunciado:** “Ligue cada nome à sua explicação.”

- Trilha de material ↔ Caminho de material depositado pelo bico.
- Camada ↔ Material depositado em um nível da peça.
- Objeto completo ↔ Conjunto das camadas que formam a peça final.

**Erro:** “Quase! Observe se estamos falando de um caminho de material, de um nível da peça ou do objeto inteiro.”  
**Conclusão:** “Perfeito! As trilhas formam camadas, e as camadas se juntam para construir o objeto.”

### A04 — Uma camada ficou faltando! (diagnóstico visual)
**Pergunta:** “Qual imagem mostra uma falha evidente na formação das camadas?”

| Imagem | Representação | Feedback |
|---|---|---|
| A | Torre parcialmente construída normalmente, sem terminar a parte superior | “Essa peça ainda está sendo construída. É normal que a parte de cima ainda não exista.” |
| **B ✓** | Torre esquemática com faixa horizontal de material ausente no meio da região prevista | “Isso! Há uma região sem material onde deveria existir uma camada da peça.” |
| C | Torre completa sem lacunas aparentes | “Essa peça parece completa na ilustração. Procure aquela em que existe uma interrupção no meio.” |

**Caramelo:** “As camadas precisam ser formadas conforme o projeto para que a peça tenha o resultado esperado. Depois vamos aprender mais sobre os problemas que podem acontecer.”  
**Nota:** sintoma visual, **não** causa ou diagnóstico físico definitivo.

### Conclusão — S05
**Caramelo:** “Mandou bem! Agora você sabe como uma peça ganha forma camada por camada!”  
**Resumo:** camadas, progressão desde a base, trilha/camada/objeto, interrupção visual.  
**Primeira conclusão:** +20 XP e +10 Fios; destravar L03.

**Assets:** torre em estágios base/metade/completa; trilha e camada destacadas; falha esquemática; poses do cachorro Caramelo.  
**Critérios específicos:** ordem correta; três pares corretos; identificação de lacuna; feedback sem punição; recompensa e desbloqueio.

---

# L03 — Da ideia ao objeto

**ID:** `BOBI-M01-L03` · **Aprovada** · Pré-requisito: L02 ou avanço por domínio · Próxima: L04  
**Objetivo:** reconhecer ideia → modelo 3D → preparação no fatiador → fabricação. Não ensinar CAD, formatos de arquivos ou fatiamento operacional nesta etapa.

### Abertura — S00
**Caramelo:** “Eu tive uma ideia! Quero fazer um chaveiro para minha mochila!”  
**Caramelo:** “Mas como faço para transformar essa ideia em uma peça de verdade?”  
**Visual:** ideia → modelo digital de chaveiro com identidade de cachorro Caramelo → preparação → impressão.  
**CTA:** “Vamos criar!”

### A01 — Da ideia ao modelo (múltipla escolha)
**Pergunta:** “Qual destes elementos representa um modelo 3D que podemos preparar para a impressão?”

| Opção | Resposta | Feedback |
|---|---|---|
| A | Fotografia ou desenho plano do chaveiro | “A imagem ajuda a mostrar a ideia, mas neste processo ainda precisamos de um modelo com a forma tridimensional do chaveiro.” |
| **B ✓** | Representação tridimensional digital, com geometria | “Isso! O modelo 3D representa a forma do chaveiro que queremos fabricar.” |
| C | Texto: “Quero um chaveiro de cachorro caramelo” | “O texto descreve nossa ideia, mas ainda precisamos transformá-la em um modelo digital adequado para imprimir.” |

**Nota:** imagens e textos também podem ser insumos para modelagem; não são, isoladamente, o modelo 3D pronto para o fluxo deste exercício.

### A02 — Quem faz o quê? (associação)
**Enunciado:** “Ligue cada elemento à sua função.”

- Modelo 3D ↔ Representa digitalmente a forma do objeto.
- Fatiador ↔ Prepara o modelo e gera instruções para impressão.
- Impressora 3D ↔ Usa as instruções e fabrica o objeto físico.

**Feedback correto por par:** “O modelo guarda a forma digital do objeto”; “O fatiador prepara o modelo e gera as instruções”; “A impressora utiliza as instruções para construir a peça física.”  
**Erro:** “Essas funções são diferentes. Pense em quem representa a forma, quem prepara as instruções e quem fabrica o objeto.”

### A03 — A jornada do chaveiro (ordenação)
**Pergunta:** “Coloque as etapas na ordem correta, da ideia ao objeto.”

1. Imaginar o chaveiro.
2. Obter o modelo 3D.
3. Preparar o modelo em fatiador e gerar instruções compatíveis.
4. Fabricar o chaveiro.

**Acerto:** “Perfeito! Uma ideia vira modelo, o modelo é preparado e a impressora fabrica o chaveiro.”  
**Erro:** “A impressora precisa receber as instruções antes de começar. Observe onde a preparação deve acontecer.”  
**Dica após dois erros:** “Primeiro temos a ideia e o modelo. Depois preparamos a impressão. Só então a máquina começa a fabricar.”

### A04 — O que está faltando? (diagnóstico de etapa)
**Contexto:** Caramelo já tem o modelo e a impressora, mas ainda não preparou as instruções.  
**Pergunta:** “Qual é o próximo passo para preparar o chaveiro para impressão?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Abrir modelo no fatiador, preparar e gerar instruções | “Isso! O fatiador prepara o modelo e gera as instruções necessárias para a impressora.” |
| B | Enviar somente captura de tela do modelo | “Uma captura de tela mostra a aparência do modelo, mas não fornece as instruções de fabricação necessárias neste processo.” |
| C | Começar sem preparar as instruções | “Antes de começar, a impressora precisa receber instruções adequadas ao modelo e ao equipamento.” |

**Caramelo:** “Conseguimos! Agora o chaveiro está preparado para iniciar a impressão.”

### Conclusão — S05
**Caramelo:** “Mandou bem! Você descobriu o caminho que transforma uma ideia em um objeto de verdade!”  
**Resumo:** ideia/modelo, papel do fatiador, preparação e fabricação.  
**Primeira conclusão:** +20 XP e +10 Fios; destravar L04.

**Assets:** cachorro Caramelo pensando no chaveiro; modelo 3D, fatiador **genérico**, impressora FDM e etapas; poses de comemoração.  
**Critérios específicos:** diferenciação da referência plana; correspondência modelo/fatiador/impressora; quatro etapas corretas; reconhecer o passo pendente.

---

# L04 — Onde usamos impressão 3D?

**ID:** `BOBI-M01-L04` · **Aprovada** · Pré-requisito: L03 ou avanço por domínio · Próxima: L05  
**Objetivo:** reconhecer aplicações em educação, cotidiano e prototipagem; relacionar objeto e finalidade; selecionar solução apropriada. Não afirmar que impressão 3D é sempre melhor, mais barata ou adequada a qualquer uso.

### Abertura — S00
**Caramelo:** “A gente já descobriu como imprimir um chaveiro. Mas será que a impressão 3D serve só para isso?”  
**Visual:** sólidos geométricos didáticos, organizador de mesa e protótipo de caixa.  
**Caramelo:** “Olha quanta coisa diferente! Vamos descobrir onde a impressão 3D pode ajudar?”  
**CTA:** “Vamos explorar!”

### A01 — Impressão 3D na escola (múltipla escolha visual)
**Situação:** professora quer objetos geométricos que os alunos possam segurar e observar de vários lados.  
**Pergunta:** “Qual destes recursos poderia ser fabricado em uma impressora 3D para ajudar nessa aula?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Sólidos geométricos físicos (cubos, cilindros e pirâmides) | “Isso! A impressão 3D pode criar sólidos que os alunos conseguem segurar e observar de vários lados.” |
| B | Vídeo digital de figuras geométricas | “O vídeo também pode ajudar na aula, mas é um recurso digital. Aqui queremos fabricar objetos físicos.” |
| C | Fotografia das figuras no papel | “Uma fotografia pode mostrar as figuras, mas continua sendo plana. A impressora 3D pode criar modelos com volume.” |

### A02 — Cada peça tem uma utilidade (associação)
**Pergunta:** “Ligue cada objeto ao lugar ou à situação em que ele será utilizado.”

- Sólido geométrico ↔ Educação: estudar formas e volumes.
- Organizador personalizado ↔ Cotidiano: organizar objetos de uma mesa.
- Protótipo de uma caixa ↔ Desenvolvimento de produto: testar tamanho e encaixe.

**Feedback correto:** “Um modelo físico pode ajudar a observar formas”; “Um organizador impresso pode atender a um espaço específico”; “Um protótipo ajuda a testar a ideia antes de produzir a versão definitiva.”  
**Erro:** “Observe a função de cada peça. Ela ajuda a estudar, organizar alguma coisa ou testar uma ideia?”

### A03 — Testando uma ideia (múltipla escolha)
**Contexto:** empresa imprime uma primeira versão de caixa antes da fabricação em quantidade.  
**Pergunta:** “Qual é uma vantagem de imprimir um protótipo antes da fabricação definitiva?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Testar tamanho/encaixe e fazer ajustes | “Exatamente! Com um protótipo, podemos testar uma ideia e descobrir o que precisa melhorar.” |
| B | Garantir ausência de qualquer problema futuro | “Um protótipo ajuda a encontrar problemas, mas não garante que o produto final será perfeito.” |
| C | Eliminar conferência de medidas | “As medidas ainda precisam ser verificadas. O protótipo ajuda justamente a conferir se tudo ficou como esperado.” |

### A04 — Uma solução para a oficina (seleção visual)
**Contexto:** Caramelo precisa organizar três lápis e dois cabos da bancada.  
**Pergunta:** “Qual destes projetos atende melhor à necessidade do Caramelo?”

| Opção | Resposta | Feedback |
|---|---|---|
| **A ✓** | Organizador com espaço para lápis e cabos | “Boa escolha! Esse projeto tem espaços para os lápis e cabos. A impressão 3D permite criar objetos personalizados para necessidades específicas.” |
| B | Escultura decorativa de um cachorro caramelo, sem compartimentos | “Essa escultura pode ser impressa, mas não resolve o problema de organização da bancada.” |
| C | Chaveiro com nome Caramelo | “O chaveiro também pode ser impresso em 3D, mas não vai ajudar a guardar os lápis e cabos.” |

**Nota:** todas são peças potencialmente imprimíveis; somente A atende ao problema proposto.

### Conclusão — S05
**Caramelo:** “Agora você sabe que a impressão 3D pode ajudar na escola, em casa e até na criação de novos produtos!”  
**Resumo:** educação, objetos personalizados, prototipagem e resolução de problemas.  
**Primeira conclusão:** +20 XP e +10 Fios; destravar L05.

**Assets:** sólidos geométricos, foto/desenho em papel, tela de vídeo, organizador, caixa protótipo, **escultura de cachorro caramelo**, chaveiro e poses do mascote.  
**Critérios específicos:** aplicação educacional correta; três associações; motivo da prototipagem; escolha baseada na utilidade; feedback por opção.

---

## Critérios de aceite reutilizáveis L01–L04

1. Intro + quatro atividades + conclusão com objetivos pedagógicos definidos.
2. Respostas, ordem e associações verificadas por regras determinísticas; feedback próprio para cada erro.
3. Sem vidas, sem prazo eliminatório e com novas tentativas ilimitadas nas lições comuns.
4. Retomada após interrupção preservando passos confirmados.
5. Primeira conclusão concede 20 XP e 10 Fios apenas uma vez; revisões seguem limite diário homologado.
6. Conclusão desbloqueia a próxima lição e registra progresso elegível na meta diária.
7. Operação possível sem impressora física e sem fatiamento real.
8. **Revisão técnica, pedagógica e das artes antes de publicar**.

## Referências e fontes de conteúdo

Consultar e registrar evidências **antes de publicar**. A existência de um link não autoriza a cópia de sua arte, texto ou interface.

- **ULT-01**, UltiMaker Academy — https://academy.ultimaker.com/
- **ULT-02**, interface e fluxo Cura — https://support.ultimaker.com/articles/Knowledge/1667411132925
- **PRU-01**, Prusa Academy — https://help.prusa3d.com/article/prusa-academy_326256
- **BAM-03**, Bambu Studio oficial — https://github.com/bambulab/BambuStudio/blob/master/README.md
- Guia UltiMaker de FFF — https://ultimaker.com/nl/learn/what-is-fff-3d-printing/
- Prusa, impressão 3D introdutória — https://www.prusa3d.com/p/3d-printing/3d-printing-101/
- Base de fontes existente no projeto: `bobi_base_de_conhecimento_impressao_3d.md` (material de referência; ainda não incorporado a este repositório).

**Pendências editoriais:** produzir ilustrações/sprites e conteúdo de L05–L08; depois revisar tecnicamente cada questão, licenças e usabilidade. A L04 foi aprovada no chat, mas ainda não foi implementada.
