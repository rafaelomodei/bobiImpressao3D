> **ARQUIVO HISTÓRICO, NÃO NORMATIVO.** Documento original de descoberta de **19/10/2026**. Inclui nome provisório **Tuca**, personagem definido posteriormente como **Caramelo, cachorro caramelo brasileiro**, e possibilidades como perfil de professor, que **não fazem parte do produto aprovado**. Tags internas [D]/[H]/[A] são avaliações do documento na data de origem, **não homologações atuais**. Para decisões atuais e pendências, consultar [Termo de Abertura](../termo-de-abertura.md) e [Mapa de consolidação](consolidacao-2026-11-01.md). Trechos originais preservados exclusivamente para rastreabilidade.

# Tuca e a Oficina 3D — Questionário mestre de descoberta e requisitos

**Versão:** 0.1 • **Data:** 19/10/2026 • **Estado:** documento de trabalho (não é escopo fechado)

> **Objetivo:** reunir as decisões necessárias para desenvolver um jogo educativo de impressão 3D, inicialmente como aplicação 2D centrada em interface, com inspiração estrutural no Duolingo, mantendo identidade e conteúdo originais.

## Como usar este documento

- **[D] Definido:** decisão já tomada nas conversas; só reabrir se houver motivo.
- **[H] Hipótese:** boa proposta, mas ainda depende de validação.
- **[A] Aberto:** exige decisão; preencher no registro.
- **P0:** precisa ser resolvido ou assumido de forma explícita antes/durante o MVP. **P1:** próxima fase. **P2:** futuro.
- Responder por **ID** (ex.: `ECO-03: XP separado da moeda`); registrar **decisão, justificativa, responsável, data, evidência e impactos**. Questões não resolvidas devem ficar como [A], nunca implicitamente como definidas.

## A. Definições já estabelecidas [D]

| ID | Decisão confirmada | Observações |
|---|---|---|
| D-01 | Tema principal: ensino de impressão 3D | Começar pela prática do cotidiano da impressão. |
| D-02 | Público 10+, com foco prioritário em 10–14 anos | Usuários mais velhos poderão jogar; <10 não é foco. |
| D-03 | Três personagens de apoio: **Tuca**, **Pipo**, **Lia** | Tuca acompanha; Pipo provoca problemas; Lia estimula criação. Aparência definitiva pendente. |
| D-04 | O aluno terá um **avatar próprio personalizável** | Diferente dos personagens pedagógicos. |
| D-05 | Referência de experiência: Duolingo | Trilha, lições breves, recorrência e gamificação; não copiar identidade visual. |
| D-06 | Interface 2D; sem lobby 3D ou mundo navegável no MVP | Perfis e avatares podem ser visualizados em cartões. |
| D-07 | Interesse em moeda, vidas, ligas, rotinas e progresso | Regras e nomes ainda pendentes. |
| D-08 | Interesse em fabricação virtual com passagem de tempo | Duração, custo e utilidade ainda pendentes. |
| D-09 | Evolução de máquinas, avatar e itens desbloqueáveis | Balanceamento e ordem ainda pendentes. |
| D-10 | Intenção de usar fontes técnicas de fabricantes e comunidades | Criar conteúdo original e revisado, respeitando licenças. |
| D-11 | Projeto precisa de documentação evolutiva | Planejamento, requisitos, backlog, GDD e catálogo de lições. |

## B. Hipóteses de design sugeridas (não aprovadas) [H]

| ID | Hipótese inicial | Motivo |
|---|---|---|
| H-01 | 'Tuca e a Oficina 3D' como título provisório; 'Oficina Viva' como ambiente | Facilita a compreensão do público. |
| H-02 | Navegação principal: Trilha · Oficina · Criar · Comunidade · Perfil | Prioriza interface, não mapa 3D. |
| H-03 | **XP/Camadas** ≠ **Fios (moeda)** ≠ **Filamento (material)** ≠ **Progresso de impressão** | Semântica clara e economia auditável. |
| H-04 | PLA, PETG e ABS como classes de materiais, não moedas paralelas | Evita confundir conceitos reais e introduzir complexidade de câmbio. |
| H-05 | 4 formatos de exercício no MVP | Facilita produção, avaliação e QA. |
| H-06 | Impressões virtuais apenas cosméticas ou de projeto, sem travar lições | Evita pay-to-learn/tempo de espera compulsório. |
| H-07 | Perfis públicos desativados para menores por padrão; lista social opt-in e moderada | Segurança infantil. |
| H-08 | Ranking semanal opcional, com teto anti-farm e agrupamento justo | Competição sem premiar só tempo conectado. |
| H-09 | Vidas em desafios, mas prática e revisão sempre acessíveis | Aprendizagem não pode depender de pagar ou esperar. |
| H-10 | Foco curricular inicial em FDM/FFF e PLA | Menor dispersão e segurança pedagógica. |
| H-11 | Máquinas fictícias com especificações coerentes, não marcas reais sem necessidade | Velocidade em mm/s; tempo real depende também de aceleração, vazão, modelo e perfil. |
| H-12 | MVP sem chat livre, upload livre ou trocas entre usuários | Reduz riscos de moderação no piloto com menores. |

## C. Perguntas de descoberta por domínio

**Instrução:** Cada pergunta começa em estado `[A]`, mesmo quando existe uma hipótese. Resolver em rodadas. Manter número do ID imutável; usar subdecisões quando surgir detalhe novo.

### 01. Visão, posicionamento e escopo — prioridade P0

- [ ] **VIS-01** `[A]` Qual problema educacional concreto o aplicativo deve resolver para um iniciante?
- [ ] **VIS-02** `[A]` Qual resultado observável caracteriza um usuário que terminou o curso básico?
- [ ] **VIS-03** `[A]` O produto será, prioritariamente, jogo educativo, curso gamificado ou simulador com lições?
- [ ] **VIS-04** `[A]` Que sensação queremos gerar ao concluir uma sessão: domínio, curiosidade, criação ou competição?
- [ ] **VIS-05** `[A]` Quais três diferenciais o tornam distinto de um quiz sobre impressão 3D?
- [ ] **VIS-06** `[A]` Quais resultados são indispensáveis no MVP e quais recursos devem ser explicitamente excluídos?
- [ ] **VIS-07** `[A]` O aplicativo será gratuito, institucional, comercial ou uma experiência acadêmica experimental inicialmente?
- [ ] **VIS-08** `[A]` O nome 'Tuca e a Oficina 3D' é definitivo, provisório ou será testado com usuários?
- [ ] **VIS-09** `[A]` A marca enfatizará impressão 3D, cultura maker ou aprendizagem de fabricação digital?
- [ ] **VIS-10** `[A]` Quais indicadores mostrarão valor educacional e quais mostrarão apenas engajamento?

### 02. Público, níveis e personas — prioridade P0

- [ ] **PUB-01** `[A]` Qual será a persona prioritária dentro dos 10–14 anos (idade, série, familiaridade digital, acesso)?
- [ ] **PUB-02** `[A]` O aplicativo deve funcionar para quem nunca viu uma impressora física?
- [ ] **PUB-03** `[A]` O aluno precisa saber ler instruções longas ou tudo deverá caber em linguagem de leitura fácil?
- [ ] **PUB-04** `[A]` Qual é o conhecimento prévio presumido: nenhum, informática básica ou modelagem?
- [ ] **PUB-05** `[A]` Como uma pessoa 15+ acessará conteúdos avançados sem tratar a idade como restrição de competência?
- [ ] **PUB-06** `[A]` O cadastro pedirá data de nascimento, faixa etária ou usará outro método proporcional de adequação etária?
- [ ] **PUB-07** `[A]` Teremos um perfil de professor com turma, acompanhamento e objetivos próprios?
- [ ] **PUB-08** `[A]` Haverá uso em sala de aula com dispositivos compartilhados e pouca conectividade?
- [ ] **PUB-09** `[A]` Como atender leitores com dificuldades, necessidades de acessibilidade e diferentes ritmos?
- [ ] **PUB-10** `[A]` Como vamos testar os fluxos com estudantes representativos e responsáveis pela autorização?

### 03. Objetivos de aprendizagem e avaliação — prioridade P0

- [ ] **PED-01** `[A]` Quais competências de impressão 3D devem ser aprendidas até o final de cada capítulo?
- [ ] **PED-02** `[A]` Como transformar cada competência em comportamentos observáveis e mensuráveis?
- [ ] **PED-03** `[A]` Que conhecimentos são pré-requisitos e quais podem ser ensinados em paralelo?
- [ ] **PED-04** `[A]` Qual será a duração-alvo de uma lição, de uma unidade e de uma sessão diária?
- [ ] **PED-05** `[A]` Qual proporção de explicação, experimentação e feedback terá uma lição?
- [ ] **PED-06** `[A]` Quais tipos de erros devem provocar dicas, revisão dirigida ou nova tentativa?
- [ ] **PED-07** `[A]` Como avaliar raciocínio e transferência de aprendizagem, em vez de memorização de alternativas?
- [ ] **PED-08** `[A]` Quando permitir pular conteúdos por diagnóstico e como validar essa proficiência?
- [ ] **PED-09** `[A]` Como lidar com respostas tecnicamente contextualizadas, com mais de uma solução aceitável?
- [ ] **PED-10** `[A]` Qual será o pré-teste, pós-teste e instrumento de avaliação da experiência educacional?
- [ ] **PED-11** `[A]` Como o aplicativo explicitará por que um ajuste melhora ou piora um resultado?
- [ ] **PED-12** `[A]` Quem validará a adequação didática e a correção técnica de cada lição?

### 04. Currículo e trilha de conteúdos — prioridade P0

- [ ] **CUR-01** `[A]` Qual recorte inicial será ensinado: somente FDM/FFF com foco em PLA?
- [ ] **CUR-02** `[A]` Qual será a sequência das primeiras 10–15 lições?
- [ ] **CUR-03** `[A]` O usuário conhecerá peças da impressora antes de aprender materiais e fatiamento?
- [ ] **CUR-04** `[A]` Quando apresentar STL, 3MF, G-code e diferenças entre arquivo de modelo e instruções de máquina?
- [ ] **CUR-05** `[A]` Quais conceitos de geometria, medidas e pensamento computacional serão introduzidos?
- [ ] **CUR-06** `[A]` Quando ensinar altura de camada, perímetros, paredes, infill, suportes e orientação?
- [ ] **CUR-07** `[A]` Que falhas entram no primeiro mundo: aderência, warping, stringing, subextrusão ou camada deslocada?
- [ ] **CUR-08** `[A]` Como ensinar diagnóstico distinguindo sintoma, hipótese, teste, ação e resultado?
- [ ] **CUR-09** `[A]` Quais temas de segurança devem aparecer antes de quaisquer práticas com impressoras reais?
- [ ] **CUR-10** `[A]` Materiais como PETG, TPU, ABS/ASA e resinas serão básicos, avançados ou conteúdo posterior?
- [ ] **CUR-11** `[A]` Como apresentar limites de velocidade, aceleração, vazão, geometria e qualidade sem simplificações incorretas?
- [ ] **CUR-12** `[A]` Qual projeto final permite integrar materiais, fatiamento e solução de problemas?

### 05. Narrativa, personagens e linguagem — prioridade P0

- [ ] **NAR-01** `[A]` Qual é o conflito narrativo inicial que motiva aprender impressão 3D?
- [ ] **NAR-02** `[A]` A Oficina Viva é cenário fixo em evolução ou tema visual da trilha?
- [ ] **NAR-03** `[A]` O jogador é aprendiz, dono da oficina, ajudante de Tuca ou colega dos três personagens?
- [ ] **NAR-04** `[A]` Qual é a função exclusiva de Tuca em cada etapa (acolher, explicar, incentivar, comentar)?
- [ ] **NAR-05** `[A]` Qual é a função exclusiva de Pipo em cada etapa (erros, reparos, experimentos)?
- [ ] **NAR-06** `[A]` Qual é a função exclusiva de Lia em cada etapa (projetos, criatividade, aplicações)?
- [ ] **NAR-07** `[A]` Qual é a personalidade, tom de voz e limite de humor de cada personagem?
- [ ] **NAR-08** `[A]` Os personagens terão voz, balões de texto, animações ou combinação progressiva?
- [ ] **NAR-09** `[A]` Quanto diálogo pode ocorrer sem atrapalhar uma lição de dois minutos?
- [ ] **NAR-10** `[A]` Como evitar infantilização e manter a mesma identidade com jovens mais velhos?
- [ ] **NAR-11** `[A]` Qual será a bíblia narrativa: cenários, regras do mundo, objetos e termos consistentes?

### 06. Trilha, capítulos e desbloqueios — prioridade P0

- [ ] **MAP-01** `[A]` A trilha será linear, parcialmente ramificada ou livre com pré-requisitos?
- [ ] **MAP-02** `[A]` Qual unidade de progressão aparece na interface: capítulo, etapa, lição ou nó?
- [ ] **MAP-03** `[A]` Quantas lições compõem um capítulo e quantas avaliações de revisão existem?
- [ ] **MAP-04** `[A]` Como representar visualmente o caminho como filamento sem prejudicar a legibilidade?
- [ ] **MAP-05** `[A]` Quais nós são obrigatórios, opcionais, de revisão ou de desafio?
- [ ] **MAP-06** `[A]` O que desbloqueia a próxima etapa: concluir, acertar X%, demonstrar domínio ou fabricar algo?
- [ ] **MAP-07** `[A]` Haverá missões narrativas especiais após cada grupo de lições?
- [ ] **MAP-08** `[A]` O usuário pode voltar, refazer e consultar um glossário a qualquer momento?
- [ ] **MAP-09** `[A]` Como apresentar a próxima ação sem confundir a trilha com a oficina, loja e inventário?
- [ ] **MAP-10** `[A]` Onde aparece a progressão para quem já domina parte do currículo?

### 07. Tipos de atividades e motor de questões — prioridade P0

- [ ] **ATV-01** `[A]` Quais 4 tipos de atividade devem entrar na primeira entrega (múltipla escolha, ordenar, relacionar, identificar imagem, ajustar parâmetro etc.)?
- [ ] **ATV-02** `[A]` Como representar o efeito visual de suporte, parede e preenchimento sem simulação 3D integral?
- [ ] **ATV-03** `[A]` O que caracteriza uma boa resposta e qual feedback contextual será exibido?
- [ ] **ATV-04** `[A]` O jogador terá tentativas ilimitadas no modo prática? E no modo desafio?
- [ ] **ATV-05** `[A]` Como impedir acerto por memorização da posição das alternativas?
- [ ] **ATV-06** `[A]` Quais itens são parametrizáveis para gerar variações de um mesmo problema?
- [ ] **ATV-07** `[A]` Que esquema cada questão precisa guardar: objetivo, cenário, estímulo, resposta, erro, dica e fonte?
- [ ] **ATV-08** `[A]` Quais formatos de mídia serão permitidos: SVG, WebP, Lottie, vídeos curtos ou animação CSS?
- [ ] **ATV-09** `[A]` Como registrar erros conceituais diferentes para recomendar revisões específicas?
- [ ] **ATV-10** `[A]` Quais atividades exigem correção humana, regra determinística ou avaliação qualitativa?
- [ ] **ATV-11** `[A]` Haverá desafios práticos com uma impressora real? Como torná-los opcionais e supervisionados?

### 08. Economia, XP, vidas e recompensas — prioridade P0

- [ ] **ECO-01** `[A]` Qual é a moeda principal: 'Fios', 'Metros de Filamento' ou outro nome que não confunda moeda com material real?
- [ ] **ECO-02** `[A]` PLA, PETG e ABS serão itens de fabricação ou moedas? Por qual motivo?
- [ ] **ECO-03** `[A]` XP/Conhecimento será separado de dinheiro virtual e do nível de oficina?
- [ ] **ECO-04** `[A]` Quais ações concedem XP, fios, cosméticos e desbloqueios de projeto?
- [ ] **ECO-05** `[A]` Como impedir fazendas de XP baseadas em repetir atividades fáceis?
- [ ] **ECO-06** `[A]` Quais são as fontes de emissão e os gastos possíveis de moeda?
- [ ] **ECO-07** `[A]` O usuário poderá ficar sem recursos para prosseguir com o conteúdo pedagógico?
- [ ] **ECO-08** `[A]` Qual é a função das vidas: penalidade de desafio, energia de sessão ou outra coisa?
- [ ] **ECO-09** `[A]` Como recuperar vidas gratuitamente sem bloquear revisões e aprendizagens essenciais?
- [ ] **ECO-10** `[A]` Qual será a regra de sequência diária: uma lição, um objetivo concluído ou outro critério?
- [ ] **ECO-11** `[A]` Teremos proteção de sequência, pausas, revisão gratuita e opção de desativar notificações?
- [ ] **ECO-12** `[A]` Como balancear recompensas para não incentivar consumo excessivo ou ansiedade?
- [ ] **ECO-13** `[A]` O que nunca poderá ser comprado com dinheiro, XP ou moeda virtual?
- [ ] **ECO-14** `[A]` Teremos multiplicadores de pontos, missões semanais e eventos? Quando entram?

### 09. Impressões virtuais e máquinas — prioridade P0

- [ ] **IMP-01** `[A]` O que é uma impressão virtual: produção cosmética, missão de aprendizagem ou ambos?
- [ ] **IMP-02** `[A]` O tempo da impressão será real, acelerado, por passos de lições ou híbrido?
- [ ] **IMP-03** `[A]` O processo continuará progredindo com o aplicativo fechado?
- [ ] **IMP-04** `[A]` Quais dados definem o tempo: classe de máquina, volume, camadas, material, perfil e qualidade?
- [ ] **IMP-05** `[A]` O MVP usa tempo ficcional de jogo ou alguma aproximação documentada do fatiamento real?
- [ ] **IMP-06** `[A]` Quais impressoras fictícias estarão disponíveis e quais capacidades cada uma representa?
- [ ] **IMP-07** `[A]` Como funcionará upgrade: velocidade, área útil, capacidade, precisão, confiabilidade ou simultaneidade?
- [ ] **IMP-08** `[A]` Qual é o limite de impressões simultâneas e de filas por usuário?
- [ ] **IMP-09** `[A]` Como evitar que upgrades eliminem a necessidade de aprender conteúdo técnico?
- [ ] **IMP-10** `[A]` Quais máquinas são desbloqueáveis sem pagamento, e qual o papel da progressão por competência?
- [ ] **IMP-11** `[A]` Uma impressão pode falhar virtualmente? Em que circunstâncias e com qual retorno educativo?
- [ ] **IMP-12** `[A]` É possível cancelar, pausar, retomar, guardar o resultado ou trocar um projeto em andamento?
- [ ] **IMP-13** `[A]` Como calcular tempo e progresso com consistência no servidor após reconexão, troca de fuso e relógio?
- [ ] **IMP-14** `[A]` Existirá ponte futura para STL/3MF e impressão real? Qual será o processo de revisão de segurança?

### 10. Avatar, cosméticos e inventário — prioridade P1

- [ ] **AVA-01** `[A]` O avatar será humano estilizado, robô, criatura ou escolha de arquétipos?
- [ ] **AVA-02** `[A]` Quais parâmetros de identidade visual o usuário ajusta no cadastro (roupa, cor, cabelo etc.)?
- [ ] **AVA-03** `[A]` Usaremos peças 2D sobrepostas, sprites ou imagens prerenderizadas para os cartões?
- [ ] **AVA-04** `[A]` Quais classes de item existirão: corpo, cabeça, mãos, costas, acessórios, efeitos?
- [ ] **AVA-05** `[A]` Haverá combinações inválidas e como evitar sobreposição visual de peças?
- [ ] **AVA-06** `[A]` Quais itens são dados no começo e quais vêm de missões ou impressões virtuais?
- [ ] **AVA-07** `[A]` Raridade afetará somente aparência ou também características técnicas de máquina?
- [ ] **AVA-08** `[A]` O avatar do perfil será visível para outros por padrão ou mediante escolha segura?
- [ ] **AVA-09** `[A]` Haverá criação/extração livre de imagens pessoais? Como moderar esse conteúdo?
- [ ] **AVA-10** `[A]` Como o inventário lida com itens repetidos, trocas, presentes e remoção de itens?

### 11. Perfis, interação e comunidade — prioridade P1

- [ ] **SOC-01** `[A]` A comunidade inicial será uma lista de perfis com cartões de avatar, sem sala 3D?
- [ ] **SOC-02** `[A]` Quais dados públicos aparecem em um cartão (apelido, avatar, nível, conquistas)?
- [ ] **SOC-03** `[A]` Perfis de menores serão privados por padrão e haverá opção de não participar?
- [ ] **SOC-04** `[A]` Como os jogadores se encontram: código de turma, convite, lista curada ou busca?
- [ ] **SOC-05** `[A]` Haverá curtidas, reações padronizadas, comentários livres ou nenhuma mensagem entre usuários?
- [ ] **SOC-06** `[A]` Qual é a menor interação social que gera valor sem aumentar muito a moderação?
- [ ] **SOC-07** `[A]` As ligas serão individuais, por turma, por nível de conhecimento ou faixa etária?
- [ ] **SOC-08** `[A]` O ranking será semanal, mensal ou por temporada? Haverá mecanismo de opt-out?
- [ ] **SOC-09** `[A]` Como reduzir vantagens de usuários mais velhos, profissionais ou que estudam por muitas horas?
- [ ] **SOC-10** `[A]` Como impedir nomes ofensivos, assédio, exposição pessoal, fraude e manipulação do ranking?
- [ ] **SOC-11** `[A]` Como bloquear/reportar pessoas e tratar denúncias com prioridade e registro?
- [ ] **SOC-12** `[A]` Projetos compartilhados precisam passar por moderação antes de publicação?
- [ ] **SOC-13** `[A]` Haverá equipes privadas com convites e trabalhos colaborativos sem chat livre?

### 12. Rotina, missões e notificações — prioridade P1

- [ ] **RET-01** `[A]` Qual é a meta diária mínima realmente compatível com uma sessão de um minuto?
- [ ] **RET-02** `[A]` O que muda na experiência para um aluno que joga 1, 5 ou 20 minutos?
- [ ] **RET-03** `[A]` Quantas missões diárias há e quais recompensam a aprendizagem em vez de tempo de tela?
- [ ] **RET-04** `[A]` Haverá missões semanais ou eventos sazonais?
- [ ] **RET-05** `[A]` O que acontece quando a sequência diária é perdida ou pausada?
- [ ] **RET-06** `[A]` Quais lembretes são úteis e qual frequência máxima é aceitável para menores?
- [ ] **RET-07** `[A]` Como oferecer um ponto de parada natural após cumprir a meta diária?
- [ ] **RET-08** `[A]` Como proteger quem usa o aplicativo no ambiente escolar apenas alguns dias da semana?
- [ ] **RET-09** `[A]` Como evitar que a espera da impressão virtual se transforme em pressão para voltar continuamente?

### 13. Navegação, linguagem visual e acessibilidade — prioridade P0

- [ ] **UX-01** `[A]` A primeira plataforma será web responsiva/PWA, Android, iOS ou múltiplas?
- [ ] **UX-02** `[A]` Quais 4–5 abas aparecem no menu principal (Trilha, Oficina, Criar, Comunidade, Perfil)?
- [ ] **UX-03** `[A]` Qual é a tela inicial após o login: trilha ou oficina?
- [ ] **UX-04** `[A]` Que informações do HUD são permanentes e quais aparecem só no contexto certo?
- [ ] **UX-05** `[A]` Qual identidade visual comunica tecnologia e criatividade sem parecer infantil demais?
- [ ] **UX-06** `[A]` Quais tamanhos mínimos de texto, área de toque, contraste e leitor de tela serão adotados?
- [ ] **UX-07** `[A]` Como lidar com daltonismo, movimento reduzido, áudio desligado e conexão instável?
- [ ] **UX-08** `[A]` Quando uma animação traz compreensão e quando só distrai o aluno?
- [ ] **UX-09** `[A]` Qual será o padrão de tela de lição, acerto, erro, revisão e conclusão?
- [ ] **UX-10** `[A]` Teremos onboarding curto, prática sem conta e criação de conta somente ao salvar progresso?
- [ ] **UX-11** `[A]` Quais termos 'carretel', 'filamento', 'camada', 'parede', 'fatiar' exigem glossário contextual?

### 14. Arquitetura de software e operação — prioridade P0

- [ ] **TEC-01** `[A]` Quais são o stack e a plataforma mínimos para validar o MVP?
- [ ] **TEC-02** `[A]` Qual domínio de dados sustenta aluno, avatar, lição, tentativa, progresso, carteira, impressão e inventário?
- [ ] **TEC-03** `[A]` Qual será a fonte da verdade para saldos de fios, XP e tempos de impressão?
- [ ] **TEC-04** `[A]` Como garantir idempotência de recompensas e evitar gasto duplo ou exploração de APIs?
- [ ] **TEC-05** `[A]` O conteúdo será servido por CMS, banco de dados, JSON versionado ou uma combinação?
- [ ] **TEC-06** `[A]` Como administrar conteúdo e referências sem publicar novo código a cada lição?
- [ ] **TEC-07** `[A]` Como armazenar e entregar SVGs, sprites, áudio e imagens de forma performática?
- [ ] **TEC-08** `[A]` Quais recursos funcionarão offline e como sincronizar progresso com segurança?
- [ ] **TEC-09** `[A]` Como registrar telemetria de aprendizagem sem coleta de dados desnecessários de menores?
- [ ] **TEC-10** `[A]` Quais serviços, custos e mecanismos de observabilidade são necessários para a operação inicial?
- [ ] **TEC-11** `[A]` Como versionar conteúdo sem invalidar resultados ou conclusões de lições antigas?
- [ ] **TEC-12** `[A]` Quais testes automatizados verificam regra de progressão, moedas, conteúdo, segurança e responsividade?

### 15. Produção editorial e fontes externas — prioridade P0

- [ ] **CON-01** `[A]` Quais serão as fontes técnicas primárias autorizadas (fabricantes, software e documentação aberta)?
- [ ] **CON-02** `[A]` Cada conteúdo terá autoria, data, link de origem, nível, licença e revisão técnica?
- [ ] **CON-03** `[A]` Qual processo distingue fato técnico documentado de hipótese ou prática de comunidade?
- [ ] **CON-04** `[A]` Como evitar copiar imagens, texto, design ou tutoriais proprietários sem permissão?
- [ ] **CON-05** `[A]` Quem transforma um tutorial em objetivo, desafio, feedback e avaliação originais?
- [ ] **CON-06** `[A]` Como priorizar a produção de um banco inicial de falhas reais de impressão?
- [ ] **CON-07** `[A]` Cada defeito terá imagens próprias, sinais, causas prováveis, testes e contraindicações?
- [ ] **CON-08** `[A]` Qual será a política de atualização quando um firmware ou slicer mudar o comportamento?
- [ ] **CON-09** `[A]` Quais peças STL/3MF poderão ser oferecidas com licença compatível, atribuição e testes?
- [ ] **CON-10** `[A]` Haverá revisão editorial por professor, especialista de impressão 3D e responsável por acessibilidade?
- [ ] **CON-11** `[A]` Como diferenciar tutoriais de marcas da experiência universal de FDM?

### 16. Privacidade, segurança infantil e governança — prioridade P0

- [ ] **SEG-01** `[A]` Qual avaliação jurídica documentada será feita para o ECA Digital e a LGPD antes de contas de menores?
- [ ] **SEG-02** `[A]` Qual é a base legal aplicável a cada dado e como o melhor interesse do menor será demonstrado?
- [ ] **SEG-03** `[A]` Como adequar aferição de idade, autorização/supervisão responsável e fluxos por faixa etária?
- [ ] **SEG-04** `[A]` Quais dados pessoais são realmente necessários e quais não serão coletados?
- [ ] **SEG-05** `[A]` Quais configurações de privacidade e publicação serão protetivas por padrão?
- [ ] **SEG-06** `[A]` Quem pode ver perfil, histórico de jogo, turma, progresso e conquistas de menores?
- [ ] **SEG-07** `[A]` Haverá publicidade, rastreadores de terceiros, perfilamento ou monetização? Quais serão proibidos?
- [ ] **SEG-08** `[A]` Como atender solicitações de acesso, exclusão, correção e controle de conta?
- [ ] **SEG-09** `[A]` Como serão tratados denúncias, abuso, bullying, conteúdo impróprio e incidentes de segurança?
- [ ] **SEG-10** `[A]` Como oferecer limites de tempo, lembretes discretos e paradas naturais?
- [ ] **SEG-11** `[A]` O produto terá recompensas aleatórias pagas, mercado entre usuários ou itens transferíveis? Se não, registrar proibições explícitas.
- [ ] **SEG-12** `[A]` Que procedimentos orientarão uso seguro de impressoras físicas: supervisão, calor, movimento, ventilação e materiais?

### 17. Medição, validação e experimentação — prioridade P0

- [ ] **MED-01** `[A]` Qual hipótese principal será validada primeiro: aprendizagem, recorrência, motivação ou usabilidade?
- [ ] **MED-02** `[A]` Quais tarefas o aluno deverá realizar sem ajuda ao concluir a primeira trilha?
- [ ] **MED-03** `[A]` Qual é a métrica principal de aprendizagem (por exemplo, acerto em aplicação inédita)?
- [ ] **MED-04** `[A]` Como medir retenção de conhecimento após alguns dias, além do acerto imediato?
- [ ] **MED-05** `[A]` Quais dados agregados acompanharão conclusão de lição, erros, revisões e abandono?
- [ ] **MED-06** `[A]` Que indicadores demonstram engajamento saudável e não excesso de tempo de tela?
- [ ] **MED-07** `[A]` Qual será o plano de testes com professores, alunos e responsáveis, com autorização apropriada?
- [ ] **MED-08** `[A]` Quais hipóteses serão testadas antes de implementar loja, ranking e comunidade?
- [ ] **MED-09** `[A]` Como medir dificuldade e possíveis vieses de cada questão?
- [ ] **MED-10** `[A]` Quais critérios objetivos determinam prontidão do MVP para o primeiro piloto?

### 18. Lançamento, operação e prioridades — prioridade P1

- [ ] **LAN-01** `[A]` Qual é o escopo do piloto: protótipo acadêmico, turma escolar ou beta aberto?
- [ ] **LAN-02** `[A]` Qual é a capacidade de produção de conteúdo por semana e quem será responsável?
- [ ] **LAN-03** `[A]` Qual será o orçamento estimado para arte, tecnologia, infraestrutura e operação?
- [ ] **LAN-04** `[A]` Qual documentação de produto, conteúdo, design, tecnologia e segurança é obrigatória?
- [ ] **LAN-05** `[A]` Como gerenciar mudanças de regra sem perder rastreabilidade das decisões?
- [ ] **LAN-06** `[A]` Quais critérios definem P0, P1 e P2 e qual é a linha de corte do MVP?
- [ ] **LAN-07** `[A]` O que terá prioridade se o projeto atrasar: lições, avatar, fabricação, ranking ou comunidade?
- [ ] **LAN-08** `[A]` Quem realizará revisão técnica das atividades e testes com público-alvo?
- [ ] **LAN-09** `[A]` Quais canais de suporte e feedback estarão disponíveis a estudantes e responsáveis?
- [ ] **LAN-10** `[A]` Qual é o plano de evolução para adultos, níveis avançados e conteúdos de novas tecnologias?


## D. Decisões que desbloqueiam o MVP — responder primeiro

Os IDs abaixo são uma **ordem de trabalho**, não nova lista de funcionalidades. Uma rodada de decisão deve preservar contexto, alternativas e consequências.

| Ordem | IDs | Questão central | Recomendação inicial |
|---|---|---|---|
| 1 | VIS-01, VIS-02, MED-01 | O que o aluno efetivamente aprende? | Diagnóstico + transferência de aprendizagem, não apenas XP. |
| 2 | PUB-01, PUB-02, PUB-07 | Quem é o jogador do MVP? | 10–14 anos, sem impressora própria; professor como público secundário. |
| 3 | CUR-01, CUR-02, CUR-09 | O que será ensinado e em que ordem? | FDM/PLA; segurança, componentes e primeira impressão. |
| 4 | UX-01, UX-02, UX-03 | Em que plataforma e com quais telas? | Web responsiva/PWA, trilha como home. |
| 5 | MAP-01, MAP-03, ATV-01 | Qual é o fluxo de uma lição? | Trilha guiada com 4 tipos de exercício. |
| 6 | ECO-01, ECO-02, ECO-03, ECO-08 | O que significa cada recurso? | XP, moeda e materiais separados; vidas não bloqueiam revisão. |
| 7 | IMP-01, IMP-02, IMP-05 | Para que serve imprimir virtualmente? | Itens cosméticos e marcos de projeto; tempos de jogo definidos. |
| 8 | NAR-03, NAR-04, NAR-05, NAR-06 | Como cada personagem intervém? | Tuca orienta, Pipo desafia, Lia propõe projetos. |
| 9 | SOC-01, SOC-02, SEG-05 | O que é comunidade no MVP? | Cartões privados e compartilhamento controlado; sem lobby. |
| 10 | SEG-01, SEG-03, SEG-04, SEG-09 | Como proteger menores e operar? | Revisão jurídica e privacidade por padrão antes de beta público. |
| 11 | TEC-02, TEC-03, TEC-05 | Quais estruturas persistem as regras? | Modelos de domínio, carteira auditável e conteúdo versionado. |
| 12 | MED-02, MED-10, LAN-01 | Quando está pronto para testar? | Piloto delimitado e critérios de aceite definidos. |

## E. Fluxo base proposto (hipótese funcional)

1. **Onboarding**: apresentar Tuca, entrar em jornada introdutória, personalizar avatar básico; iniciar sem captura desnecessária de dados.
2. **Trilha**: selecionar próximo nó; ver objetivo e iniciar desafio de 2–5 min.
3. **Lição**: observar problema → levantar hipótese → decidir/experimentar → feedback → consolidar.
4. **Recompensa**: registrar domínio da competência e XP; eventualmente dar fios e itens; evitar duplicações.
5. **Oficina**: escolher objeto elegível → conferir material virtual e tempo → iniciar fabricação persistente → receber item ao concluir.
6. **Perfil**: equipar avatar com itens ganhos, visualizar conquistas e projetos.
7. **Social opcional**: cartões de avatares e conquistas em ambiente moderado, sem mapa 3D ou chat livre.
8. **Rotina**: missão diária pequena; conclusão clara e incentivo ao descanso, sem punições coercitivas.

## F. Inventário mínimo de telas para prototipar

| Tela | P0/P1 | Objetivo | Critério resumido de aceite |
|---|---|---|---|
| Apresentação / entrada | P0 | Explicar proposta | Primeira missão acessível sem fricção excessiva. |
| Onboarding + avatar básico | P0 | Personalização inicial | Persistir escolhas de avatar após autenticação adequada. |
| Trilha / capítulo | P0 | Próxima atividade | Próximo nó, progresso e revisão claramente identificados. |
| Player de lição | P0 | Resolver uma atividade | Pelo menos 4 tipos, feedback e retomada. |
| Resultado de lição | P0 | Registrar domínio e recompensa | Mesma tentativa não gera XP duas vezes. |
| Oficina resumida | P0 | Visualizar impressão virtual | Estado, duração e conclusão persistem em recarga. |
| Carteira/inventário | P0 | Gerenciar fios e peças | Saldos e itens consistentes. |
| Perfil + cartão do avatar | P0 | Mostrar evolução | Equipamentos se refletem no cartão renderizado. |
| Missão diária / sequência | P1 | Estimular hábito | Não impede revisão nem promove sessões compulsórias. |
| Catálogo de equipamentos | P1 | Desbloqueios | Regra de elegibilidade clara e auditável. |
| Lista social de perfis | P1 | Ver conquistas autorizadas | Respeitar privacidade e moderação por padrão. |
| Ligas | P1 | Competição opcional | Pontuação justa e opt-out disponíveis. |
| Professor/turma | P2 | Acompanhamento pedagógico | Privacidade e escopo separados por papel. |
| Editor/gestor de conteúdo | P1 | Produção de lições | Versionar, revisar e publicar conteúdo. |

## G. Banco de conteúdo: modelo de ficha por lição

```yaml
id: FDM-001
version: 1
chapter: conhecendo-a-impressora
age_focus: 10-14
objective: "Identificar a função do bico extrusor"
prerequisites: []
scenario: "Pipo não sabe por onde o filamento sai"
activity_type: identify-image
stimulus_asset: "asset-original.svg"
correct_rule: "hotend_nozzle"
misconceptions:
  - "confunde bico com extrusor"
feedback_correct: "..."
feedback_incorrect: "..."
hint: "..."
expected_minutes: 2
xp_rule_id: basic-completion-v1
technical_sources:
  - url: "fonte-a-verificar"
    accessed_at: "2026-10-19"
license_review: pending
pedagogical_review: pending
technical_review: pending
safety_review: pending
analytics_tags: [hardware, nozzle]
```

## H. Modelo de decisão preenchível

```text
ID da decisão: DEC-000
Questões relacionadas: ECO-01, ECO-02
Decisão proposta:
Alternativas consideradas:
Justificativa:
Impacto na pedagogia:
Impacto em UX/arte:
Impacto em engenharia:
Riscos e proteções:
Status: ABERTO | PROPOSTO | APROVADO | INVALIDADO
Responsável:
Data:
Evidência/teste:
Revisitar quando:
```

## I. Riscos e armadilhas a evitar

1. **Desvirtuar a impressão 3D**: moeda PLA/ABS pode ensinar que materiais são dinheiro ou induzir equivalências técnicas sem sentido. Preferir moeda abstrata ('fios') e inventário de materiais separado.
2. **Velocidade enganosa**: em impressoras reais a unidade de velocidade é geralmente mm/s (não 'milissegundos'); velocidade anunciada sozinha não determina tempo real nem qualidade.
3. **Fabricar sem aprender**: impressão temporizada precisa trazer valor educativo, não só recompensar espera.
4. **Gamificação contra a educação**: vidas, ligas e sequências jamais devem impedir revisão ou induzir culpa, excesso de uso ou pagamento para prosseguir.
5. **Comunidade de menores**: cartão de perfil, apelido e rankings também exigem controles de visibilidade, identificação etária, moderação e supervisão apropriados.
6. **Imitar interfaces proprietárias**: usar padrões de UX de referência sem copiar elementos distintivos, arte, texto ou mascotes do Duolingo.
7. **Reproduzir tutoriais de marcas**: fatos técnicos podem orientar conteúdo próprio; licenças e atribuições de textos, imagens e modelos devem ser verificadas por item.
8. **Confundir simulação com física real**: tempos/custos fictícios devem ser claramente rotulados, assim como parâmetros que foram simplificados para fins pedagógicos.
9. **Mais mecânicas do que aprendizagem**: validar trilha e aprendizagem com estudantes antes de investir em extensas lojas, rankings e social.
10. **Expansão prematura**: não colocar modelo 3D navegável, chat livre, integração física e marketplace no MVP.

## J. Material externo de referência (consultado em 19/10/2026)

*Referências para pesquisa e inspiração; não autorizam cópia literal de conteúdo ou imagens.*

- Duolingo — trilha de aprendizagem, unidades e prática: https://blog.duolingo.com/pt/nova-pagina-inicial-duolingo/
- Duolingo — lições, XP, ligas e sequência: https://blog.duolingo.com/pt/primeiros-passos-como-aprender-idiomas-no-duolingo/
- Duolingo — métricas de aprendizagem efetiva: https://blog.duolingo.com/time-spent-learning-well/
- Duolingo — evolução de recursos sociais (2025): https://blog.duolingo.com/pt/destaques-duolingo/
- Creality — suporte e tutoriais: https://www.creality.com/br/support
- Creality — falhas comuns em impressão FDM: https://devstore.creality.com/eu/blogs/basics/common-3d-printing-problems
- Bambu Lab — referência de problemas de qualidade: https://wiki.bambulab.com/en/knowledge-sharing/common-print-quality-problem
- Prusa — infill, densidade e paredes: https://help.prusa3d.com/article/infill_42
- Prusa — modelagem para impressão e dimensões de paredes: https://help.prusa3d.com/article/modeling-with-3d-printing-in-mind_164135
- Lei 15.211/2025 — ECA Digital: https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/l15211.htm
- Governo Federal — panorama ECA Digital: https://www.gov.br/mj/pt-br/assuntos/sua-protecao/sedigi/eca-digital/eca-digital-1/

## K. Próximos artefatos (derivados deste levantamento)

1. **PRD**: visão, personas, jornadas, requisitos funcionais/não funcionais, critérios de aceite.
2. **GDD**: loops, regras de XP/fios/vidas, progressão, itens, fabricação, rankings.
3. **Currículo e matriz de competências**: trilha pedagógica, pré-requisitos, avaliação e instrumentos de validação.
4. **Bíblia narrativa e guia de personagens**: Tuca, Pipo, Lia, tom de voz e micro-histórias.
5. **Wireframes e design system**: navegação, telas, componentes, estados e cartões de avatar.
6. **Modelo de dados + contratos**: usuários, tentativas, carteira, impressões, recompensas e progresso.
7. **Backlog e roadmap**: épicos, histórias, critérios de aceite, riscos e dependências.
8. **Plano de conformidade e moderação**: privacidade infantil, age assurance apropriada, consentimentos quando aplicáveis, denúncias, conteúdo e limites de uso.
9. **Plano de testes pedagógicos**: pré/pós-teste, retenção de conhecimento, eficácia das atividades, observações com alunos e professores.

**Regra de manutenção:** criar um ADR/registro de decisão quando algo passar de aberto para aprovado; a especificação de cada mecânica deve apontar para a decisão e para o respectivo teste de aceitação.