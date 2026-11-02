# Mapa de tipos de atividade — bobi.

**Data:** 02/11/2026  
**Decisão de origem:** [DD002](decisoes-de-desenvolvimento.md#dd002--mapeamento-para-os-quatro-tipos-de-atividade) (decidido pelo responsável).  
**Escopo:** atividades das fichas homologadas cujo rótulo **não** é um dos quatro tipos do motor. Atividades já rotuladas como múltipla escolha, associação, ordenação ou diagnóstico visual seguem o próprio rótulo e não aparecem aqui.

O mapeamento define **qual componente renderiza** a atividade. Enunciados, alternativas, gabaritos e feedbacks homologados **não mudam**. O rótulo original é guardado em `pedagogical_label`.

## Regra

| Componente | Usar quando |
|---|---|
| **Diagnóstico visual** | A resposta depende de observar um detalhe em imagem ou cena: defeito, dimensão, posição, estado, prévia. |
| **Múltipla escolha** | Escolher por conhecimento ou julgamento; as alternativas podem ter figuras (`option.media`). |
| **Associação / ordenação** | Mantidas, com cartões de texto ou imagem. |
| **Bloco de animação** | Apresentação não pontuada antes de uma pergunta. |

## Mundo 1

| Atividade | Rótulo original | Componente | Observação |
|---|---|---|---|
| L02 A02 | Ordenação visual | Ordenação | Cartões com imagem |
| L03 A04 | Diagnóstico de etapa | Múltipla escolha | Alternativas em texto |
| L04 A01 | Múltipla escolha visual | Múltipla escolha | Alternativas com figura |
| L04 A04 | Seleção visual | Múltipla escolha | Alternativas com figura |
| L05 A01 | Múltipla escolha visual | Múltipla escolha | Alternativas com figura |
| L05 A04 | Aplicação | Múltipla escolha | — |
| L06 A01 | Identificação visual | Múltipla escolha | Alternativas com figura |
| L06 A04 | Segurança contextual | Múltipla escolha | — |
| L07 A04 | Aplicação | Múltipla escolha | — |
| L08 A01 | Escolha visual | Múltipla escolha | Alternativas com figura |
| L08 A02 | Seleção tecnológica | Múltipla escolha | — |

## Mundo 2

| Atividade | Rótulo original | Componente | Observação |
|---|---|---|---|
| L09 A01 | Identificação visual | Diagnóstico visual | Apontar a parte na ilustração |
| L10 A02 | Identificação visual | Diagnóstico visual | Observar setas dos eixos |
| L10 A04 | Diagnóstico contextual | Múltipla escolha | Ilustração como contexto |
| L13 A02 | Identificação visual | Múltipla escolha | Alternativas com figura |
| L13 A04 | Aplicação | Múltipla escolha | — |
| L14 A01 | Identificação visual | Múltipla escolha | Alternativas com figura |
| L14 A04 | Aplicação segura | Múltipla escolha | — |
| L15 A04 | Aplicação | Múltipla escolha | — |
| L16 A04 | Aplicação | Múltipla escolha | — |

## Mundo 3

| Atividade | Rótulo original | Componente | Observação |
|---|---|---|---|
| L17 A03 | Visual | Múltipla escolha | Cartões STL/3MF/G-code com figura |
| L17 A04 | Aplicação | Múltipla escolha | — |
| L19 A03 | Visual | Diagnóstico visual | Comparar dimensão com o limite |
| L19 A04 | Aplicação | Múltipla escolha | — |
| L20 A03 | Visual | Diagnóstico visual | Comparar dimensão com a área útil |
| L20 A04 | Diagnóstico | Múltipla escolha | Alternativas em texto |
| L21 A04 | Aplicação | Múltipla escolha | — |
| L22 A01 | Comparação visual | Diagnóstico visual | Observar espessura das camadas |
| L22 A04 | Aplicação | Múltipla escolha | — |
| L23 A04 | Aplicação | Múltipla escolha | — |
| L24 A01 | Seleção visual | Diagnóstico visual | Observar se há furo funcional |
| L24 A02 | Configuração | Múltipla escolha | — |
| L24 A03 | Inspeção visual | Diagnóstico visual | Observar prévias |
| L24 A04 | Execução virtual | Bloco de animação + múltipla escolha | Animação não pontuada, depois a pergunta |

## Avaliações

| Questão | Rótulo original | Componente | Observação |
|---|---|---|---|
| AV02 Q01 | Associação visual | Associação | Cartões com figura |
| AV02 Q05 | Segurança situacional | Múltipla escolha | — |
| AV03 Q04 | Associação contextual | Associação | — |
| AV03 Q05 | Inspeção visual | Diagnóstico visual | Observar prévias |

## Modelo mínimo da atividade (referência para o seed)

```yaml
activity_id: BOBI-M03-L24-A04
lesson_id: BOBI-M03-L24
type: multiple_choice          # multiple_choice | matching | ordering | visual_diagnosis
pedagogical_label: execução virtual
pre_blocks:                    # opcional, não pontuado
  - kind: animation
    asset_id: bobi-anim-l24-print
statement: "Qual processo vimos?"
stimulus_asset_id: null        # imagem de contexto, opcional
options:                       # público; sem indicação de correta
  - id: a
    text: "Deposição de material por camadas, ilustrando FDM."
    asset_id: null
# esquema privado (não enviado ao navegador):
answer_key: { correct_option_id: a }
feedback_by_option: { b: "...", c: "..." }
hint: "..."
source_ids: [ULT-02, ORC-01, SAF-01]
```

Nomes e estrutura finais serão fixados nas migrações do incremento B.
