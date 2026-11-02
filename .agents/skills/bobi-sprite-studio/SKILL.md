---
name: bobi-sprite-studio
description: Direção de arte e produção de sprites 2D para o jogo educacional bobi. Use quando pedirem para definir o visual do bobi., criar, alterar, animar, revisar, separar ou exportar sprites, personagens, cenários, ícones, medalhas, itens ou sprite sheets para o jogo.
---

# bobi-sprite-studio

Missão: manter uma linguagem visual consistente para **bobi. — O jeito divertido de aprender impressão 3D.** O protagonista é **Caramelo, um cachorro caramelo brasileiro**. Acessórios, proporções e expressão visual definitivos ainda precisam de aprovação. O jogo ensina impressão 3D por microlições, missões e progressão gamificada. Inspiração funcional de apps educacionais; não copiar personagens, telas ou artes de terceiros.

## Fontes de verdade e modo de atuação

1. Primeiro consulte a [ficha visual de referência do Caramelo v0.1](../../../docs/design/referencias/caramelo/README.md), depois procure no projeto um guia de arte já aprovado (`design/art-direction.md`, `assets/art-direction.md` ou equivalente) e referências fornecidas pelo usuário. A versão aprovada prevalece sobre o **guia provisório** em [docs/design/direcao-de-arte.md](../../../docs/design/direcao-de-arte.md).
2. Escolha o modo correto:
   - **`direcao`**: explorar 2–3 variantes visuais coerentes; comparar características, silhuetas, complexidade, vantagens e limitações. Não declarar nenhuma aprovada sem confirmação. Sugerir uma candidata principal.
   - **`referencia`**: criar uma ficha-mãe de personagem/objeto, com vistas e expressões. Preservar detalhes e proporções aprovados.
   - **`sprite`**: produzir sprites individuais seguindo fielmente a ficha-mãe.
   - **`sheet`**: produzir ou fatiar uma grade de sprites, a partir de células regulares e transparentes.
   - **`animacao`**: planejar quadros e exportar imagens por quadro + metadados de sequência. Não assumir que uma imagem estática é animação funcional.
   - **`auditoria`**: verificar sprites e apontar divergências, sem modificar arquivos até que isso seja solicitado.
3. Caso o usuário só descreva uma ideia, use o direcionamento provisório como ponto de partida, sinalizando que ainda não é o design aprovado. Evite fazer um interrogatório; peça aprovação apenas quando a escolha alterar elementos fundamentais da marca.
4. Gere imagens apenas se houver uma ferramenta de geração/edição realmente disponível. Se não houver, produza prompts prontos, especificações e manifestos; **nunca alegue ter criado PNG/SVG/sprite sheets que não existem**.
5. Não sobrescreva recursos existentes sem instrução; preserve nomes e formatos do repositório se existirem.

## Pipeline operacional

### A. Definir direção
- Ler [Direção de arte e catálogo de recursos](../../../docs/design/direcao-de-arte.md).
- Estabelecer primeiro: personagem-mestre Caramelo, silhueta, paleta, traço, proporções, expressões, perspectiva, dimensões e restrições.
- Quando a direção visual for aprovada, criar/atualizar um arquivo de **fonte de verdade** versionado no projeto e registrar versão/data e decisões. Não alterar identidade em cada geração.

### B. Planejar lote de sprites
- Para cada pedido, listar IDs, nome, tipo, uso, resolução, estado, variações, camada, quadro de animação e referência a preservar. Seguir os campos de manifesto exemplificados no [guia de arte](../../../docs/design/direcao-de-arte.md).
- Para personagens, gerar primeiro um **master turnaround** (frente, perfil, costas, 3/4), expressões e pose neutra. Não gerar 40 poses antes de aprovar personagem-mãe.
- Categorias sugeridas: personagens, interfaces, progresso, impressão 3D, cenários, recompensas. Detalhes em `catalog.md`.

### C. Gerar
- Criar prompts por ativo descrevendo objetivo, personagem/objeto, geometria, câmera, paleta provisória, expressão, resolução, fundo transparente, estado e restrições. Priorizar imagens **individuais RGBA transparentes** quando a ferramenta permite. Evitar fundo branco se transparência real for necessária.
- Visual provisório: cartoon flat 2D, formas arredondadas, cores sólidas, sem gradientes, sombras, brilhos, relevo 3D ou textura, contornos consistentes, contraste legível, máximo recomendado de 4–6 cores principais por sprite, com antialias limitado ao contorno.
- Não criar espaços brancos indesejados entre preenchimentos, buracos acidentais, duplicações ou elementos cortados. Se a cena de referência tiver elementos brancos, use um tom de creme distinto do plano de trabalho, mas a saída final precisa ser transparente.
- Compor `sprite sheets` com grade regular, respiro e personagens inteiros por célula. Não agrupar objetos encostados nem criar sombras que conectem elementos.
- Para animações, manter escala, origem, ângulo, iluminação, cores e proporções **idênticos entre frames**. Registrar `frame_duration_ms` e alinhamento/âncora.

### D. Exportar para o jogo
- Entregar (quando ferramentas realmente permitirem) um PNG RGBA transparente por sprite, com dimensões consistentes e nomes `bobi-<categoria>-<asset>-<estado>-<frame>.png`.
- Tamanhos de referência (ajustáveis ao design system do projeto): personagens 512×512, props 256×256, ícones 128×128; exportar alternativas 2x ou 4x quando necessário. Não tratar estas dimensões como especificação já aprovada.
- SVG só se vetorizado de fato, não renomear PNG para `.svg` e não afirmar vetorização sem arquivo vetorial verdadeiro.
- Se o projeto usar atlas ou engine específica, adaptar spritesheet/JSON para a engine; caso contrário, fornecer PNGs e `manifest.json` independente de engine.
- Para grades uniformes com fundo transparente, fatiar por células preservando âncoras e dimensões. **Nenhum script de fatiamento está incluído nesta skill; não apresentar comandos inexistentes como funcionais.**
- Validar transparência, dimensões, alinhamento e recortes com ferramentas disponíveis; conferir visualmente também. **Nenhum validador automatizado está incluído nesta versão.**

### E. QA e entrega
- Personagem reconhecível em 64 px? Silhueta coerente com master aprovado? Contorno, espessura e paleta uniformes? Transparência real? Elementos sem cortes? Fundo removido? Grade regular? Mesmas proporções/ancoragem entre frames?
- Relatar **o que foi gerado**, **o que é apenas prompt**, **o que foi validado automaticamente** e **o que exige validação visual**.
- Não confundir sprites 2D de jogo com modelos STL/3MF de impressão 3D: são entregáveis diferentes.

## Referências
- [Direção de arte, catálogo e manifesto ilustrativo](../../../docs/design/direcao-de-arte.md)
- [Especificações homologadas de L01–L04](../../../docs/licoes/mundo-01.md)
- [Termo de Abertura e decisões vigentes](../../../docs/termo-de-abertura.md)