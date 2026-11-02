# BOBI-M01-AV01 — Avaliação de domínio do Mundo 1

**Projeto:** bobi. — O jeito divertido de aprender impressão 3D.  
**Versão:** 0.1 · **Homologada em 01/11/2026**  
**Mundo:** M1 — Descoberta  
**Status:** especificação aprovada; **não implementada**.  
**Referências:** [L01–L04](../licoes/mundo-01.md) · [L05–L08](../licoes/mundo-01-l05-l08.md) · [Termo de Abertura](../termo-de-abertura.md).

## Objetivo

Verificar se o aprendiz consegue **aplicar os fundamentos de impressão 3D** ao reconhecer o processo aditivo, sequenciar a preparação, selecionar uma aplicação apropriada, distinguir tecnologias e identificar um defeito visual.

A avaliação de domínio **não é uma microlição comum**: pontua acertos nas cinco questões e exige aprovação de **80% (quatro de cinco)**.

## Configuração homologada

| Campo | Regra |
|---|---|
| Identificador | `BOBI-M01-AV01` |
| Acesso | Conclusão das lições de M1 ou mecanismo de diagnóstico/avanço por domínio já homologado |
| Questões por tentativa | **5** |
| Acertos mínimos | **4/5 (80%)** |
| Modalidades | Múltipla escolha visual, ordenação e associação |
| Reprovação | Mostrar resultado, indicar conceitos para revisão e permitir nova tentativa |
| Repetição | Permitir tentativas com variações equivalentes de cenário, imagem e alternativas |
| Vidas | Não utilizar |
| Primeira aprovação elegível | **+30 XP + 15 Fios**, uma única vez |
| Aprovações repetidas | Sem duplicar XP/Fios |
| Desbloqueio | Libera o **Mundo 2** após aprovação válida |

## Banco-base homologado (cinco questões)

### Q01 — Processo aditivo
**Competência:** reconhecer como uma impressora 3D FDM constrói uma peça.  
**Enunciado:** “Qual processo constrói uma peça por acréscimo sucessivo de material?”  
**Resposta correta:** **fabricação aditiva**.  
**Regra de correção:** a alternativa escolhida deve identificar o processo aditivo; distratores devem representar métodos efetivamente diferentes, como remoção de material ou moldagem.  
**Feedback ao final:** esclarecer por que depositar material representa fabricação aditiva.

### Q02 — Sequência de fabricação
**Competência:** organizar o fluxo digital básico.  
**Tarefa:** “Organize a sequência necessária para fabricar um objeto a partir de um modelo digital.”  
**Ordem correta:** **modelo digital → preparação das instruções no fatiador → impressora/fabricação da peça**.  
**Regra de correção:** a questão é considerada certa **somente quando a sequência inteira estiver correta**.  
**Feedback ao final:** esclarecer que a impressora necessita de instruções adequadas antes de fabricar.

### Q03 — Aplicação prática
**Competência:** escolher uma solução que atenda a uma necessidade.  
**Contexto:** Caramelo precisa organizar lápis e cabos.  
**Tarefa:** selecionar entre projetos aquele mais adequado à situação.  
**Resposta correta:** **organizador com compartimentos apropriados para lápis e cabos**.  
**Feedback ao final:** explicar que objetos imprimíveis podem ter finalidades diferentes; a solução correta deve atender ao problema.

### Q04 — Tecnologias de impressão
**Competência:** distinguir FDM e fotopolimerização de resina.  
**Tarefa:** associar cada tecnologia ao respectivo princípio.  
**Associações corretas:** **FDM/FFF ↔ deposição de filamento termoplástico**; **SLA/MSLA ↔ resina fotossensível solidificada por luz**.  
**Regra de correção:** somente contabilizar o acerto se **todas as associações estiverem corretas**.  
**Feedback ao final:** comparar os princípios sem sugerir equivalência de segurança ou qualidade universal.

### Q05 — Reconhecimento de falha
**Competência:** identificar um sintoma visual introdutório.  
**Tarefa:** observar imagem original de peça com fios de plástico estendidos entre regiões separadas.  
**Resposta correta:** **stringing (formação de fios)**.  
**Regra de correção:** identificar o sintoma mostrado, sem exigir diagnóstico de causa.  
**Feedback ao final:** diferenciar sintoma visual e hipótese sobre sua origem.

## Resultado e feedback

Ao finalizar as cinco questões:

- Contabilizar **uma unidade por questão totalmente correta**; em associação/ordenação, não conceder frações de acerto.
- Com **4 ou 5 acertos**, registrar **aprovado** e liberar o Mundo 2.
- Com **0 a 3 acertos**, registrar **não aprovado**, apresentar temas de revisão relacionados às questões erradas e permitir nova tentativa.
- Apresentar resultado e explicações **ao final** da avaliação, sem transformar a tentativa em uma lição com correção imediata.
- Erros **não retiram** XP/Fios já obtidos e não consomem vidas.
- Preservar registros de tentativas de modo a evitar recompensas duplicadas e apoiar revisão pedagógica.

## Variações em novas tentativas

A nova tentativa pode alterar **cenário, ordem de alternativas e imagens ilustrativas**, preservando as cinco competências e dificuldade aproximada.

Exemplos de variação dentro do mesmo objetivo:

- Q01: comparar diferentes ilustrações de deposição, fresagem e moldagem.
- Q02: substituir o objeto ilustrado, mantendo a ordem modelo → preparação → fabricação.
- Q03: propor organizar outros itens, desde que uma alternativa resolva claramente a necessidade.
- Q04: variar os recursos visuais de carretel/FDM e resina/fotopolimerização.
- Q05: usar outra imagem de stringing com característica inequívoca, sem introduzir causa técnica específica.

As variações **precisam ser revisadas antes de publicação**. Não alterar as competências nem permitir memorização simples da posição fixa da resposta.

## Critérios de aceitação

| ID | Condição |
|---|---|
| CA-AV01-01 | Exibir cinco questões independentes que cubram os fundamentos de M1 |
| CA-AV01-02 | Aprovar com quatro ou cinco acertos; reprovar com três ou menos |
| CA-AV01-03 | Oferecer resultado e revisão direcionada aos conceitos não dominados |
| CA-AV01-04 | Permitir novas tentativas com variações válidas das cinco competências |
| CA-AV01-05 | Registrar primeira aprovação e conceder **30 XP e 15 Fios uma única vez** |
| CA-AV01-06 | Desbloquear o Mundo 2 após aprovação válida |

## Recursos e referências

**Recursos a produzir:** ilustrações esquemáticas dos processos; cartões de sequência; situações do cachorro Caramelo e suas soluções; representações de FDM e resina; imagem original de stringing.

**Rastreabilidade técnica:** L01–L08; `ULT-01`, `ULT-02`, `BAM-03`, `PRU-07`; para L05 e L06, as fontes complementares mencionadas na homologação precisam ser individualmente conferidas antes da publicação. Ver [base técnica](../knowledge/bobi_base_de_conhecimento_impressao_3d.md).

**Pendências antes de publicação:** revisão dos gabaritos e alternativas, produção dos recursos gráficos, revisão de segurança para o tema de resinas, testes pedagógicos e implementação do motor de avaliação.

**Governança:** o currículo M1 e a avaliação AV01 foram homologados; **nenhum RF/RNF adicional** é criado por este documento.
