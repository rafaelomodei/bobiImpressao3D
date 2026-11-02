# Consolidação de fontes do projeto — 01/11/2026

**Finalidade:** indicar a origem, o valor e o estado dos materiais resgatados de conversas anteriores. Este documento **não aprova funcionalidades novas** e não substitui o [Termo de Abertura](../termo-de-abertura.md).

## Precedência entre documentos

1. **Decisões explícitas mais recentes homologadas** pelo responsável, refletidas no [Termo de Abertura](../termo-de-abertura.md) e nas [Lições M1](../licoes/mundo-01.md).
2. **Especificações de lições e avaliações aprovadas**: L01–L24 e AV01–AV03 (atualizado em 02/11/2026).
   - **Decisões de desenvolvimento** ([DD001–DD010](../arquitetura/decisoes-de-desenvolvimento.md)) definem como implementar, sem alterar o conteúdo homologado.
3. **Base técnica**: [catálogo de fontes de impressão 3D](../knowledge/bobi_base_de_conhecimento_impressao_3d.md), suporte para pesquisa e redação; não significa revisão técnica automática de cada atividade.
4. **Documentos de exploração histórica**: [questionário de 19/10/2026](questionario-mestre-2026-10-19.md), contendo decisões de contexto da época, hipóteses e perguntas abertas.
5. **Guia operacional de arte**: [direção visual provisória](../design/direcao-de-arte.md) e [skill de sprites](../../.agents/skills/bobi-sprite-studio/SKILL.md); não equivalem a aprovação da arte final.

Se uma ideia antiga contrariar uma homologação posterior, **a homologação posterior prevalece**. Não transformar hipóteses em requisitos sem nova decisão do responsável.

## O que foi aproveitado

| Tema encontrado | Origem | Situação vigente | Consequência para o repositório |
|---|---|---|---|
| Jogo educativo de impressão 3D, sem máquina obrigatória | Questionário histórico; currículo | Homologado no conceito | Preservado no Termo |
| Inspiração na experiência Duolingo | Questionário | Referência funcional, sem copiar interfaces ou mascotes | Preservado como referência |
| Nome provisório 'Tuca e a Oficina 3D' | Questionário | **Substituído por bobi.** | Apenas histórico |
| Mascote provisório Tuca/tartaruga | Questionário, skill original | **Substituído por Caramelo, cachorro caramelo brasileiro** | Skill e guia atualizados |
| Pipo e Lia como personagens | Questionário | Exploração histórica; elenco adicional não homologado | Sem novos personagens no escopo aprovado |
| Professor/turmas | Questionário | **Fora da concepção atual**: aprendizagem autônoma sem professor | Não abrir RF para papel de professor |
| PWA, uma atividade por conta, progresso multidispositivo | Conversas PD001 | Homologado | Termo permanece fonte de verdade |
| 4 tipos de atividade, lições de 1–5 min, modelo híbrido | Conversas PD003 e L01–L04 | Homologado | Lições continuam no mesmo motor |
| XP, Fios, vidas em desafios, oficina e ranking opt-in | Conversas PD005/PD006/PD008 | Homologado nas condições do Termo | Não mudar economia por sugestões antigas |
| Gratuito com publicidade condicionada e assinatura sem anúncios | Conversas PD009 | Homologado no conceito | Aplicar restrições de privacidade |
| Questões detalhadas sobre cadastro infantil | Questionário e PD002 | **PT001**: pendência técnica/jurídica para liberar contas reais de menores | Não criar painel parental complexo por padrão |
| 10 mundos / 92 microlições | Base técnica | **Roadmap editorial proposto**, não homologado todo | Manter como referência de expansão |
| M1–M3 / 24 lições / 3 avaliações / chaveiro virtual final | PD004 | Homologado | Preservar escopo do MVP pedagógico |
| L01–L04 | Conversas de especificação | Homologadas | Preservar em `docs/licoes/mundo-01.md` |
| L05 e seguintes | Currículo geral | Títulos e objetivos do recorte aprovado; exercícios ainda pendentes | Não marcar especificações como homologadas |
| Cartoon flat, transparência, sprite sheet, quatro a seis cores | Skill original | **Hipóteses técnicas de produção visual**, não direção de arte aprovada | Guia e skill adaptados |
| Links de fabricantes e tutoriais | Base técnica | Catálogo de pesquisa; status V/I/P à data de levantamento | Consultar e revisar antes de publicar |

## Lacunas que exigem ação antes de implementação/publicação

**Decisões de produto ainda pendentes:** PD007 (oficina, upgrades), PD010 (gestão editorial), PD011 (metas operacionais), PD012 (aceite e avaliação pedagógica).

**Pendência condicionante de público:** PT001 (idade, privacidade e proteção de menores) precisa ser resolvida **antes de liberar contas reais para menores**. Não bloqueia protótipos internos sem dados pessoais.

**Conteúdo técnico:** fontes complementares para L05 (comparação de processos), L06 (resina e riscos), L17 (STL/3MF/G-code); revisão técnica e pedagógica de todas as lições publicadas.

**Arte:** aprovar personagem-mestre do cachorro Caramelo (proporções, estilo, paleta e acessórios), antes de produzir sprites definitivos. A skill contém procedimentos, **não** imagens geradas nem scripts já implementados.

**Operação de documentação:** usar o repositório como fonte de verdade após merge; registrar no PR quando uma decisão for homologada ou substituída.

## Materiais deliberadamente não convertidos em requisitos

- Cada pergunta aberta do questionário de outubro.
- Propostas de 'Oficina Viva', professor/turma, comunidade aberta, social livre, personagens adicionais e economia alternativa.
- Estrutura completa de 10 mundos como compromisso de lançamento.
- Exemplos de arquivos, templates, scripts e ferramentas citados em documentos que ainda não existem no repositório.

O histórico foi preservado justamente para facilitar a pesquisa sem inflar o MVP.
