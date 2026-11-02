# PD007 — Oficina virtual, fabricação, máquinas e upgrades

**Versão:** 0.1 · **Data:** 02/11/2026  
**Status:** **PROPOSTA DE DETALHAMENTO PARA HOMOLOGAÇÃO**. A **centralidade da oficina, do inventário, da progressão dos equipamentos, da calibração em formato de minijogo e do ranking global** foi explicitamente definida pelo responsável nesta conversa. **O catálogo, a economia de upgrades e as condições de desbloqueio abaixo são propostas**, não regras homologadas.  
**Referências de produto:** [Termo de Abertura](../termo-de-abertura.md), [base técnica](../arquitetura/base-tecnica.md).

## 1. Visão: aprender, conquistar, fabricar e melhorar

A oficina é o **núcleo jogável do bobi.**, não apenas uma página decorativa. O jogador progride em dois eixos conectados:

- **Aprendizagem:** resolve microlições, revisa conceitos e passa nas avaliações de domínio.
- **Oficina:** desbloqueia projetos, fabrica itens virtualmente, ganha recompensas elegíveis, personaliza o ambiente e melhora os equipamentos.

**Loop principal:** estudar → conquistar XP/Fios e desbloqueios → enfrentar situação prática no simulador → produzir item virtual → guardar/equipar → aprimorar máquina → acessar desafios diferentes → voltar a estudar.

**Restrições já homologadas:** ninguém fica impedido de estudar por falta de Fios, espera de produção, erro de calibração ou perda de vidas; 1 fabricação virtual ativa por conta; ciclo de fabricação fictício de **2–15 minutos**, progredindo no servidor com app fechado; vidas somente em desafios especiais; revisão sempre acessível; simulações indicadas como didáticas e não equivalentes a máquina real.

## 2. Progressão de equipamentos — catálogo candidato

Máquinas **fictícias**, com nomenclatura interna de trabalho. O design e as especificações serão originais, sem logotipo de marcas reais. As capacidades virtuais não representam uma equivalência técnica universal entre máquinas.

| Tier | Identificador/codename candidato | Características de gameplay | Aprendizado associado | Estado |
|---|---|---|---|---|
| 1 · Inicial | **Bobi Mini** | Impressora FDM básica, ajuste manual de nivelamento e poucos projetos acessíveis; falhas **simuladas** quando o jogador erra parâmetros/ações do minijogo | Componentes, altura, primeira camada, diagnóstico | Proposta |
| 2 · Aprendiz | **Bobi Ajustada** | Melhorias de estabilidade e ferramentas de diagnóstico; feedback visual mais claro; menor retrabalho didático | Nivelamento, aderência, perfis | Proposta |
| 3 · Automática | **Bobi Auto** | Recurso de **nivelamento automático simulado**, prepara verificações assistidas; continua exigindo atenção à superfície e ao preparo | Diferença entre automação e verificação humana | Proposta |
| 4 · Avançada | **Bobi Enclausurada** | Impressora fechada fictícia para **projetos e materiais avançados**, controles de temperatura/ambiente e compatibilidade dependentes de configuração | Engenharia, materiais e segurança | **Expansão posterior, não lançamento M1–M3** |

**Observação técnica obrigatória:** impressora fechada não é automaticamente segura ou compatível com qualquer filamento. Compostos **com fibra de carbono** são filamentos/polímeros reforçados, não "carbono puro". Compatibilidade depende de máquina, sistema de extrusão, bico apropriado, material e controles de ambiente. Não prometer aplicações médicas/engenharia crítica sem especificação e validação.

**Política de evolução proposta:** acesso à impressora inicial após o primeiro marco curricular; máquinas/upgrades seguintes após missões/competências, eventualmente exigindo Fios virtuais que possam ser obtidos por atividades educacionais elegíveis. Valores/custos **a definir**. O Tier 4 é objetivo de longo prazo, não uma quarta máquina obrigatória no MVP.

## 3. Minijogo de nivelamento — primeira experiência prática

**Problema narrativo:** Caramelo quer fabricar um item; a impressora inicial apresenta uma primeira camada inconsistente no cenário virtual.

**Interação candidata (totalmente 2D):**
1. A tela mostra uma **mesa esquemática** com quatro pontos de checagem, bico e indicador visual de distância fictícia.
2. O jogador toca em um ponto e ajusta um controle virtual (ex.: girar botão na tela ou usar `-`/`+`), observando uma representação **didática** da distância.
3. Após ajustar os pontos, inicia uma **prévia de primeira camada simulada**: linhas visivelmente muito afastadas, excessivamente pressionadas ou coerentes com o cenário.
4. Caramelo comenta o sintoma e oferece correção guiada. O jogador pode refazer até obter o resultado indicado.

**Regras de conteúdo:** gabaritos são determinados por cenário autoral parametrizado, não por previsão da física real. Não usar valores reais de ajuste nem instruir aluno a alcançar bico aquecido; não apresentar um teste de papel ou contato com partes quentes como obrigação prática. O minijogo usa **botões acessíveis por toque e clique**, sem depender exclusivamente de drag.

**Com upgrade de nivelamento automático:** transformar o minijogo em checagem/inspeção assistida, sem fazê-lo desaparecer como competência pedagógica. O usuário pode revisitar a versão manual para aprender.

**Erros e motivação:** um ajuste incorreto mostra defeito virtual, explicação e oportunidade de tentar novamente. **Não punir o aluno com gasto obrigatório, perda de progressão curricular ou esperas arbitrárias**. Falha de impressão virtual em desafio especial só quando o cenário e as regras de desafio forem explicitamente informados.

**Aceite candidato:** reconhecer resultado de uma primeira camada, ajustar controles didáticos, receber feedback por erro, ver resultado e retomar tentativa no dispositivo.

## 4. Fabricação virtual e inventário

**Fluxo:** escolher item desbloqueado → confirmar máquina/material **virtuais** e requisitos → iniciar fabricação → visualizar contagem regressiva derivada do servidor → concluir → enviar resultado ao inventário.

**Estados sugeridos:** `locked`, `ready`, `printing`, `completed`, `collected`, `cancelled` (cancelamento e devoluções ainda dependem de decisão). A interface não concede item só porque o cronômetro no navegador zerou.

**Catálogo de projetos candidato:**

| Item | Função na experiência | Contexto |
|---|---|---|
| Chaveiro básico | Primeiro objeto virtual, recompensa didática | M1/M3 (a missão guiada L24 não exige temporizador) |
| Cubo de calibração | Comparação e diagnóstico de camadas | Oficina inicial |
| Organizador | Fabricar algo útil para bancada do Caramelo | Missões de aplicação |
| Suporte para ferramentas | Personalização visual da oficina | Progressão intermediária |
| Porta-carretel | Upgrade/cosmético visual de bancada | Progressão |
| Peça técnica reforçada fictícia | Progredir para materiais mais exigentes | Expansão após MVP |

**Inventário separado em:** recursos de jogo (Fios, contabilizados na carteira), **materiais didáticos** (PLA/PETG e outros, não são moedas), **peças fabricadas**, **cosméticos**, **equipamentos** e **upgrades**. Os materiais devem preservar seus conceitos técnicos reais mesmo na ficção.

**Duração de produção:** permanecer no intervalo homologado de 2–15 min. Upgrade pode **alterar duração fictícia dentro desse intervalo**, mas não deve transformar o tempo de um exercício em pré-requisito para aprender. O inventário e a fabricação precisam persistir entre sessões e dispositivos.

## 5. Upgrades — classes sugeridas

- **Nivelamento:** passa de ajuste manual para assistido/automático fictício, liberando cenários e alterando a interação.
- **Monitoramento/diagnóstico:** melhora ferramentas de inspeção e feedback, sem prometer impressão real perfeita.
- **Capacidade virtual:** amplia tamanho ou classes de itens desbloqueáveis dentro da configuração da máquina fictícia.
- **Velocidade de jogo:** reduz tempo virtual de fabricação, respeitando o mínimo/máximo já homologado.
- **Materiais compatíveis:** desbloqueia novas classes de desafios **somente quando houver conteúdo e verificação técnica**.

**Sem números arbitrários homologados:** preços em Fios, ordem dos upgrades, custo de produção, probabilidade de falha, nível inicial e requisitos de conquista serão definidos em uma tabela de balanceamento na próxima homologação.

## 6. Ranking: global, sem ligas ou grupos

**Decisão nova de escopo:** ranking de abrangência **global**, mostrando usuários elegíveis do produto em **uma classificação única**, sem divisões por grupos, turmas ou ligas.

**Preservar regras já homologadas (PD008):**
- **Ranking semanal** com reinício da pontuação competitiva em cada ciclo.
- **Participação opcional (opt-in/opt-out)**; respeitar privacidade do cartão e apelido.
- Contabilizar somente XP competitivo **elegível**, não farming por repetições ilimitadas, upgrades pagos ou tempo de espera.
- **Sem chat, comentários livres ou busca aberta**.
- Usuários menores de idade e perfis sem elegibilidade etária esclarecida **não são exibidos** até homologação dos controles aplicáveis conforme PT001. O ranking global não elimina esses controles.
- Em caso de empate, estabelecer regra determinística e justa antes da implementação (ex.: mesmo lugar, sem desempate por volume de uso); **a decidir**.

**Riscos:** comparar todos os jogadores em uma única lista pode desmotivar iniciantes. A interface pode destacar posição pessoal e progresso semanal, **sem criar ligas ocultas** nem modificar o ranking global.

## 7. Relação entre currículo M1–M3 e oficina

| Marco curricular homologado | Conteúdo da oficina candidato | Vínculo |
|---|---|---|
| Mundo 1 — Descoberta | Visita à bancada e demonstração da máquina inicial | Conhecer processo e aplicações |
| Mundo 2 — Oficina | Miniatividades de partes, segurança, **nivelamento manual virtual** e primeiros upgrades | Aplicar teoria em simulação |
| Mundo 3 — Primeira impressão | Chaveiro virtual guiado, inspeção e projetos adicionais da oficina | Preparar e visualizar fabricação |
| M4–M10 (após MVP) | Autonivelamento mais avançado, impressoras fechadas, materiais reforçados e projetos complexos | Progressão futura |

**Atenção:** o vínculo proposto **não muda as questões ou critérios das 24 lições homologadas**. Missões da oficina podem ser desbloqueadas junto do mundo correspondente, mas não inseridas nas lições homologadas sem nova aprovação.

## 8. Decisões que faltam para homologar PD007

1. Nome e desenho das máquinas iniciais, quantidade presente no MVP e evento exato de desbloqueio.
2. Regras de uso de Fios (aquisição e gastos), custo virtual de cada projeto e upgrade, itens iniciais.
3. Minijogo de nivelamento: números de pontos, feedback, sucesso, falha, repetição e quando é apresentado.
4. Critérios de liberação da automação, limites de capacidade e efeitos precisos dos upgrades.
5. Política de cancelamento, falha, armazenamento/coleção e recompensa ao concluir fabricação.
6. Critérios de elegibilidade, ordenação e apresentação visual do ranking global semanal.

## 9. Critérios de aceite candidatos

- [ ] Jogador consegue iniciar uma impressão virtual, sair da aplicação e voltar com progresso persistido pelo servidor.
- [ ] Não é possível ter duas fabricações virtuais simultâneas por conta.
- [ ] Falha didática de nivelamento mostra sintomas e correção; ação incorreta não bloqueia currículo.
- [ ] Máquina inicial e upgrades mudam as interações e representações visuais efetivamente.
- [ ] XP e Fios são trilhas contábeis separadas; sem duplicação e sem material real tratado como moeda.
- [ ] Ranking global usa XP competitivo, ciclo semanal, opt-in e proteções de perfil já homologadas.
- [ ] Nenhuma tela afirma que a simulação é teste, calibração ou resultado físico real.
- [ ] Equipamentos avançados só entram com conteúdo técnico e salvaguardas adequados.

**Estado de governança:** intenção central da oficina e ranking global confirmados; as propostas de tabela, custos e minijogo aguardam homologação. Não há código ou sprites produzidos por este documento.
