# Termo de Abertura do Projeto — Documentação de Requisitos

**Projeto:** bobi. — O jeito divertido de aprender impressão 3D.  
**Responsável:** Rafael Geovani Omodei  
**Início do levantamento:** 19/10/2026  
**Consolidação:** 01/11/2026  
**Versão documental:** 0.4 (em evolução)  
**Status:** Homologações parciais; projeto ainda na fase de definição. Nenhuma funcionalidade é declarada implementada.

> Fonte de verdade dos requisitos funcionais e decisões. Diagramas, matrizes finais e protótipos ficam para depois. Os requisitos aprovados não devem ser modificados sem decisão registrada.

## 1. Justificativa e objetivo

O aprendizado inicial de impressão 3D exige compreender equipamentos, materiais, arquivos, fatiamento, segurança e falhas. O **bobi.** é uma aplicação educacional gamificada para estudar progressivamente esses conceitos em lições curtas e interativas, **sem exigir uma impressora física nem a presença de um professor**.

**Objetivo geral:** desenvolver uma experiência de ensino autônomo de impressão 3D, por meio de microlições, desafios visuais, simulações didáticas, revisão e progressão gamificada.

**Público de produto:** iniciantes a partir de 10 anos, com foco inicial em 10–14 anos, também contemplando jovens e adultos. O cadastro e lançamento efetivo para menores dependerão de resolver **PT001**, abaixo.

**Identidade:** bobi. (minúsculas com ponto final). Slogan: *O jeito divertido de aprender impressão 3D.* Mascote principal: **Caramelo**, um cachorro caramelo brasileiro. Acessórios e características visuais definitivas ainda serão definidos.

## 2. Stakeholders

| Stakeholder | Papel |
|---|---|
| Rafael Geovani Omodei | Idealização, priorização e homologação |
| Aprendiz | Usuário final |
| Pais/responsáveis | Salvaguardas e autorizações aplicáveis |
| Administrador/editor | Papel operacional de gestão dos conteúdos, ainda sem pessoa designada |
| Revisor técnico/pedagógico | Papel de validação dos conteúdos, ainda sem pessoa designada |

## 3. Histórico de mudanças e aprovações

| Data | Decisão | Situação |
|---|---|---|
| 19/10/2026 | Início do levantamento, conceito e identidade do bobi. | Definido |
| 01/11/2026 | PD001 (PWA), PD003 (lições), PD005 (simulação), PD006 (gamificação), PD008 (ranking), PD009 (monetização) | **Homologados** |
| 01/11/2026 | PD002 simplificado: cadastro mínimo e proteção de menores registrada como PT001 | **Parcialmente definido** |
| 01/11/2026 | PD004: M1–M3, 24 microlições, 3 avaliações e chaveiro virtual final | **Homologado** |
| 01/11/2026 | Modelo pedagógico híbrido; lições L01–L04 | **Homologados** |
| 01/11/2026 | L05–L08 e avaliação de domínio AV01 do Mundo 1 | **Homologados** |

## 4. Currículo aprovado (PD004)

| Mundo | Conteúdo central | Lições |
|---|---|---|
| M1 — Descoberta | Conceitos, camadas, fluxo, aplicações, tipos de fabricação e desafios introdutórios | L01–L08 |
| M2 — Oficina | Componentes, movimentos, extrusão, PLA, mesa e segurança | L09–L16 |
| M3 — Primeira impressão | Arquivos, fatiador, perfis, materiais, prévia e fabricação virtual de chaveiro | L17–L24 |

O MVP pedagógico contempla **24 lições (oito por mundo)** e uma **avaliação de domínio ao final de cada mundo**, com cinco desafios e aprovação a partir de quatro acertos (80%). A L24 termina com a preparação e impressão **virtual** guiada de um chaveiro. Os mundos M4–M10 fazem parte da proposta de evolução, **não do currículo inicial homologado**.

### 4.1 Conteúdo M1 aprovado

| Lição | Título | Estado da especificação |
|---|---|---|
| L01 | O que é impressão 3D? | Homologada |
| L02 | Criando camada por camada | Homologada |
| L03 | Da ideia ao objeto | Homologada |
| L04 | Onde usamos impressão 3D? | Homologada |
| L05 | Impressão ou fabricação tradicional? | Homologada |
| L06 | Filamento ou resina? | Homologada |
| L07 | O que pode dar errado? | Homologada |
| L08 | Primeira missão do Caramelo | Homologada |

Especificações homologadas: [L01–L04](licoes/mundo-01.md), [L05–L08](licoes/mundo-01-l05-l08.md) e [avaliação de domínio AV01](avaliacoes/mundo-01-av01.md). **Mundo 1: oito lições e uma avaliação especificadas e aprovadas**; implementação e revisão técnica final ainda pendentes.

## 5. Padrão pedagógico homologado

- **Híbrido:** explicações breves intercaladas com prática e feedback; Caramelo orienta, sem bloquear o avanço com diálogos excessivos.
- **Lições comuns:** duração-alvo de 1–5 min, preferencialmente 3–5 interações; sem cronômetro eliminatório.
- **Motor de atividades:** múltipla escolha, ordenação, associação e diagnóstico visual.
- **Correção:** cada erro recebe feedback específico e permite novas tentativas ou dicas; **sem consumo de vidas em lições comuns**.
- **Conclusão:** terminar corretamente todas as interações obrigatórias, mesmo após erros; **80% vale somente para avaliações de domínio**.
- **Persistência:** retomar do próximo exercício confirmado após interrupção; registrar primeira tentativa e dicas separadamente.
- **Conteúdo técnico:** original, contextualizado, com fontes e revisão antes da publicação.

## 6. Requisitos funcionais (RF)

### Conta e aprendizagem

| Código | Descrição | Status geral |
|---|---|---|
| RF001 | Criar conta por e-mail e apelido, condicionado a PT001 para menores | Parcial |
| RF002 | Autenticação com código temporário por e-mail | Parcial |
| RF003 | Avaliação inicial de conhecimentos | Definido em conceito |
| RF004 | Avatar personalizável | Definido em conceito |
| RF005 | Sincronizar progresso entre dispositivos | Homologado |
| RF006 | Impedir atividades concorrentes na mesma conta | Homologado |
| RF007 | Trilha principal de aprendizagem | Homologado em conceito |
| RF008 | Trilhas/atividades secundárias | Definido em conceito |
| RF009 | Avanço por avaliação de domínio | Homologado |
| RF010 | Microlições curtas | Homologado |
| RF011 | Quatro formatos de atividade | Homologado |
| RF012 | Correção contextual | Homologado |
| RF013 | Feedback explicativo | Homologado |
| RF014 | Revisão e repetição | Homologado |
| RF015 | Registrar tentativas, desempenho e conclusão | Homologado |
| RF016 | Recomendar revisão dirigida | Proposto |

### Conteúdo técnico e simulação

| Código | Descrição | Status geral |
|---|---|---|
| RF017 | Fundamentos FDM/FFF e PLA | Definido |
| RF018 | Evolução para conteúdos avançados | Definido |
| RF019 | Orientações de segurança no conteúdo | Proposto |
| RF020 | Simulador educativo contextualizado | Homologado |
| RF021 | Representar escolhas, efeitos e falhas | Homologado |
| RF022 | Identificar a simulação como didática | Homologado |

### Gamificação e oficina

| Código | Descrição | Status geral |
|---|---|---|
| RF023 | Conceder XP elegível | Homologado |
| RF024 | Moeda virtual **Fios** | Homologado |
| RF025 | Três vidas nos desafios especiais | Homologado |
| RF026 | Sequência de estudos | Homologado |
| RF027 | Meta diária | Homologado |
| RF028 | Conquistas e cosméticos | Homologado |
| RF029 | Oficina com fabricação virtual temporizada | Homologado |
| RF030 | Evolução de equipamentos virtuais | Definido em conceito, detalhamento futuro |

### Social, monetização e administração

| Código | Descrição | Status geral |
|---|---|---|
| RF031 | Ranking semanal opt-in | Homologado, sujeito à proteção etária |
| RF032 | Cartões de perfis limitados | Homologado |
| RF033 | Privacidade e controle de exibição | Homologado |
| RF034 | Gratuito com anúncios quando permitidos | Homologado |
| RF035 | Premium sem anúncios | Homologado |
| RF036 | Anúncio recompensado | Fora do MVP |
| RF037 | Versionar conteúdos | Proposto |
| RF038 | Gerenciar publicação e revisão | Proposto |
| RF039 | Métricas mínimas de uso e aprendizagem | Proposto |
| RF040 | Gerenciar conta e solicitar exclusão | Definido em conceito |
| RF041 | Lembretes opcionais | Proposto |
| RF042 | Aprendizado sem professor | Homologado |

### Requisitos derivados de decisões homologadas

| Código | Descrição |
|---|---|
| RF043 | Transferência controlada de atividade entre dispositivos |
| RF044 | Variações de questões nas avaliações refeitas |
| RF045 | Fabricação virtual progride sem conexão ativa |
| RF046 | XP geral e XP competitivo separados |
| RF047 | Opt-in/opt-out de ranking |
| RF048 | Veiculação de anúncios respeita elegibilidade e assinatura |
| RF049 | Controles de privacidade/supervisão apropriados a contas de menores **antes da liberação dessas contas ao público**, dependente de PT001 |

**Total: 49 RF catalogados**, não necessariamente todos exigidos no primeiro incremento de software.

## 7. Requisitos não funcionais (RNF)

| Código | Descrição |
|---|---|
| RNF001 | Layout responsivo |
| RNF002 | Progresso consistente entre dispositivos |
| RNF003 | Controle íntegro de execução simultânea |
| RNF004 | Tempo de resposta apropriado; métrica quantitativa pendente |
| RNF005 | Segurança de credenciais, permissões e comunicação |
| RNF006 | Regras aplicáveis de privacidade e proteção de menores |
| RNF007 | Proteções etárias para anúncios e serviços terceiros |
| RNF008 | Recuperação e proteção contra perda de dados |
| RNF009 | Legibilidade e controles compreensíveis |
| RNF010 | Respeito a licenças e direitos autorais |
| RNF011 | Rastreabilidade de fontes e versões curriculares |
| RNF012 | Evolução editorial sem invalidar registros históricos |
| RNF013 | Idempotência de operações financeiras e recompensas |
| RNF014 | Simulações didáticas contextualizadas, não previsões físicas exatas |
| RNF015 | Minimização de dados coletados |
| RNF016 | Mensagens de erro e conexão compreensíveis |
| RNF017 | Resistência a duplicação de conclusões |
| RNF018 | Publicidade conforme regras de proteção etária |
| RNF019 | Registros auditáveis de XP, Fios e fabricação virtual |

**Total: 19 RNF catalogados.** Metas operacionais numéricas permanecem em PD011.

## 8. Regras de negócio homologadas — síntese

### PD001 — Plataforma
Aplicação web responsiva instalável como **PWA**; uso em dispositivos múltiplos com **uma atividade ativa por conta**. Em caso de conflito, apresentar transferência confirmada, invalidar execução anterior e preservar estados já confirmados. Recompensas e progresso são validados no servidor.

### PD003 — Lições
Quatro formatos aprovados; lições comuns sem percentual mínimo de primeira tentativa; avaliações de domínio com cinco desafios e ≥80% de acerto; novas tentativas podem variar os desafios; revisão livre.

### PD005 — Simulador e oficina
Simulador educativo com efeitos imediatos e cenários tecnicamente revisados; **oficina virtual** separada, com uma fabricação ativa por conta, duração fictícia de 2–15 minutos, avanço pelo relógio do servidor, inclusive com o app fechado. Não bloquear lições; não executar fatiamento real STL/3MF no MVP.

### PD006 — Gamificação
XP é experiência, Fios são moeda, PLA/PETG são materiais de ensino. Vidas só em desafios especiais; não impedir acesso à revisão nem exigir pagamento para aprender. Recompensas elegíveis:

| Ação | XP | Fios |
|---|---:|---:|
| Primeira conclusão de lição | 20 | 10 |
| Primeira revisão válida da lição no dia | 5 | 0 |
| Primeira aprovação em avaliação de domínio | 30 | 15 |
| Meta diária cumprida | 10 | 5 |
| Repetição inelegível | 0 | 0 |

Uma lição ou revisão válida cumpre a meta diária; perda de sequência não apaga progresso. Evitar duplicação de recompensas e XP competitivo ilimitado por repetição.

### PD008 — Ranking e perfis
Ranking semanal, opcional, usando XP competitivo elegível. Cartões com apelido e avatar; não mostrar dados sensíveis; sem chat, comentários livres nem busca aberta. Menores ficam fora de rankings até homologação dos controles aplicáveis.

### PD009 — Monetização
Conteúdo educacional fundamental acessível gratuitamente; assinatura **remove anúncios**, sem vantagem curricular. Não mostrar anúncios durante perguntas ou avaliações. Menores e usuários sem idade confirmada não recebem anúncios até validação dos controles. Anúncios recompensados fora do MVP. Preço e periodicidade pendentes.

### PD002 — Simplificado
Cadastro por e-mail/apelido, autenticação por código temporário, sincronização e exclusão de conta. Não construir agora sistema completo de perfis parentais. **PT001 obrigatória antes de contas reais de menores.**

## 9. Casos de uso identificados — sem diagramas

| CDU | Caso |
|---|---|
| CDU001 | Cadastrar e acessar conta |
| CDU002 | Realizar avaliação inicial |
| CDU003 | Consultar trilha |
| CDU004 | Realizar lição |
| CDU005 | Revisar lição |
| CDU006 | Realizar simulação |
| CDU007 | Consultar progresso/recompensas |
| CDU008 | Personalizar avatar |
| CDU009 | Fabricar item virtual |
| CDU010 | Consultar ranking/perfil |
| CDU011 | Gerenciar assinatura |
| CDU012 | Gerenciar conteúdo |
| CDU013 | Resolver conflito de atividade |
| CDU014 | Gerenciar/excluir conta |

## 10. Pendências e critério de avanço

| ID | Tema | Estado |
|---|---|---|
| PT001 | Aferição de idade, proteção de dados e salvaguardas para **lançar contas reais de menores** | Pendente técnico/jurídico; não bloqueia protótipo interno sem dados pessoais |
| PD007 | Catálogo da oficina, máquinas e upgrades | Pendente |
| PD010 | Gestão editorial, revisão técnica e publicação | Pendente |
| PD011 | Metas mensuráveis de desempenho/recuperação | Pendente |
| PD012 | Avaliação de efetividade pedagógica e aceite do MVP | Pendente |

**Conteúdos ainda a validar antes de publicar:** L05 (comparação de processos), L06 (resinas e segurança) e parte de L17 (STL/3MF/G-code), conforme base técnica de 01/11/2026.

## 11. Documentação futura

- Descrições detalhadas dos CDU, após fechar o comportamento funcional.
- Diagramas gerais e individuais de caso de uso.
- Matrizes Ator × Caso, RF × RNF e Requisitos × Stakeholders.
- Protótipos de interface.

**Nenhum desses artefatos foi elaborado ou aprovado neste estágio.**
