# AV03 — Avaliação de domínio do Mundo 3 (Primeira impressão)

**Código:** BOBI-M03-AV03 · **Data da proposta:** 02/11/2026  
**Situação:** **HOMOLOGADA EM 02/11/2026** — questões e gabaritos aprovados pelo responsável, mantendo a regra de domínio PD003. Implementação e revisão final ainda pendentes.  
**Pré-requisito:** L17–L24 concluídas ou avanço via diagnóstico homologado.  
**Objetivo:** demonstrar capacidade de reconhecer informações de arquivos, preparar e inspecionar uma impressão virtual simples de chaveiro.

## Regras já homologadas

- Exatamente **5 questões**, aprovação com **≥4 corretas (80%)**.
- Para ordenação/associação, somente a sequência/pares totalmente corretos contabilizam um acerto.
- Mostrar pontuação e explicações **ao final**, para preservar a avaliação da primeira tentativa.
- Se reprovar, recomendar revisão das lições correspondentes e permitir nova tentativa com variações equivalentes previamente validadas.
- Não utilizar vidas, nem retirar XP/Fios existentes.
- Primeira aprovação elegível: **30 XP + 15 Fios**, somente uma vez, com registro idempotente.
- Registrar tentativas, erros e `content_version`, sem exigir fatiamento real ou operação de hardware.
- Aprovação de AV03 conclui a verificação de domínio dos três mundos iniciais; não inventar certificado, atividade social ou prêmio adicional.

## Cinco desafios homologados

| Questão/tipo | Enunciado e opções | Gabarito | Feedback para revisão |
|---|---|---|---|
| Q01 · Associação | “Ligue STL, 3MF e G-code às suas funções.” | STL ↔ geometria; 3MF ↔ formato que pode conter geometria e dados adicionais; G-code ↔ instruções da máquina do cenário. | “Um arquivo de geometria não necessariamente contém instruções de impressão. Um 3MF não garante ter todas as configurações.” |
| Q02 · Ordenação | “Organize o fluxo de preparo do chaveiro.” Cartões: inspecionar prévia, importar modelo, configurar impressora e material, fatiar. | Importar → configurar → fatiar → inspecionar prévia. | “Primeiro precisamos do modelo e do perfil; só depois podemos verificar as trajetórias previstas.” |
| Q03 · Diagnóstico visual | Chaveiro de 80 mm na direção apresentada, com limites virtuais de 100 mm e 60 mm. “Qual perfil tem espaço suficiente na direção informada, considerando demais dimensões compatíveis?” | Perfil com limite de 100 mm. | “O perfil precisa acomodar a peça em todas as dimensões; neste cenário as outras já estão validadas.” |
| Q04 · Associação contextual | “A máquina fictícia selecionada é FDM/PLA. Relacione carretel PLA, perfil PLA e máquina FDM a suas funções.” | Filamento ↔ material; perfil PLA ↔ parâmetros do material; impressora FDM ↔ equipamento. | “Material, configuração e equipamento precisam ser coerentes.” |
| Q05 · Inspeção visual | Três prévias do chaveiro: furo livre e dentro da mesa; furo fechado; fora da área útil. “Qual está adequada para iniciar a impressão **virtual**?” | Prévia com furo livre, dentro da área útil e perfil já confirmado como compatível. | “O furo funcional e o cabimento precisam ser preservados; a prévia não garante sucesso físico.” |

## Execução, resultado e revisão

- Contabilizar **1 ponto** somente para cada questão totalmente certa.
- **5/5 ou 4/5:** aprovar, registrar domínio de M3, conceder recompensa da primeira aprovação elegível e concluir trilha introdutória do MVP.
- **0–3/5:** não aprovar; mostrar temas e caminhos de revisão (L17, L18, L19–L20, L21 ou L23–L24 conforme a questão).
- Permitir repetir com mudança de imagens, ordem das alternativas e projeto visual, **preservando as mesmas competências e a dificuldade**.
- Não repetir indefinidamente itens idênticos com a mesma posição de resposta correta.
- Apresentar apenas informações verificadas no cenário: não inventar dimensões físicas, valores de aquecimento, resistência ou tempo.

## Critérios de aceite

**CA-AV03-01:** oferecer cinco desafios que cubram formatos de arquivos, fluxo de fatiamento, área/perfil de impressora, material e inspeção do resultado virtual.

**CA-AV03-02:** aprovação somente com no mínimo 4/5; questões de associação/ordenação não possuem pontuação parcial.

**CA-AV03-03:** apresentar relatório final de acertos e orientar revisão de conceitos não dominados.

**CA-AV03-04:** permitir repetição com variações revisadas dos desafios.

**CA-AV03-05:** conceder 30 XP e 15 Fios uma única vez na primeira aprovação, sem criar moedas ou recompensas adicionais.

**CA-AV03-06:** permitir concluir todo o MVP curricular sem impressora física, fatiamento STL/3MF real ou geração de G-code.

## Referências e pendências

**Fontes:** [Base técnica](../knowledge/bobi_base_de_conhecimento_impressao_3d.md) (`STD-01`, `ULT-02`, `BAM-03`, `ORC-01`, `PRU-06`). **L17** ainda exige fonte complementar específica para diferença entre STL e G-code, como já registrado no catálogo.

**Pendente:** revisão técnica das questões, validação de segurança, produção de artes e teste pedagógico. A aprovação pedagógica do roteiro foi registrada em 02/11/2026.

**Não cria novos requisitos RF/RNF; não altera a homologação do currículo PD004.**
