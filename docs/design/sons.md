# Efeitos sonoros — bobi.

Sons curtos que confirmam o que aconteceu: acertou, errou, concluiu, ganhou, desbloqueou. Seguem o padrão do Duolingo (o som reforça o feedback visual, nunca o substitui) com um toque de oficina: bipes e motor de passo de impressora.

## Origem e licença

Os 16 sons são **sintetizados pelo próprio projeto** em `scripts/gen-sounds.mts` (osciladores, envelopes e ruído filtrado). Não usam amostras de terceiros, então não há licença externa a cumprir. Os pacotes CC0 considerados (Kenney) bloqueiam download automatizado; se quiser trocar por arquivos prontos, substitua o `.mp3` com o mesmo nome em `public/sounds/`.

Regenerar depois de ajustar o timbre: `pnpm sounds:gen` (precisa de `ffmpeg`).

## Catálogo

| Arquivo | Quando toca | Caráter |
|---|---|---|
| `tap.mp3` | Escolher opção, formar par, mover cartão, escolher canto da mesa | Clique curto e macio |
| `correct.mp3` | Resposta certa na lição; | Duas notas subindo |
| `wrong.mp3` | Resposta errada; falha de nivelamento; ação da oficina recusada | "Bonk" grave e curto, sem ser punitivo |
| `hint.mp3` | Abrir a dica | Brilho rápido |
| `recorded.mp3` | Resposta registrada na avaliação (não revela acerto) | Neutro |
| `complete.mp3` | Lição concluída; mesa nivelada | Arpejo + acorde |
| `reward.mp3` | XP e Fios entrando na tela de conclusão | Moeda |
| `goal.mp3` | Meta do dia cumprida | Sopro subindo + sino |
| `unlock.mp3` | Oficina aberta, mundo liberado, melhoria instalada | Cascata brilhante |
| `pass.mp3` | Aprovação na avaliação | Fanfarra |
| `fail.mp3` | Avaliação sem aprovação | Descida suave, acolhedora |
| `print-start.mp3` | Começar fabricação; imprimir camada de teste | Bipe + motor de passo acelerando |
| `print-done.mp3` | Fabricação termina com a oficina aberta | Três bipes de máquina + sino |
| `collect.mp3` | Coletar peça | "Pop" subindo |
| `purchase.mp3` | Comprar melhoria | Moedas em sequência |
| `click.mp3` | Girar o parafuso de nivelamento (aproximar/afastar) | Catraca |

Na conclusão da lição os sons tocam em sequência: `complete` → `reward` (0,9 s) → `goal` (1,4 s) → `unlock` (2 s), cada um só se o evento aconteceu.

## Regras

- **Ligado por padrão**, com interruptor no Perfil (Preferências) e botão 🔊/🔇 na barra das lições e avaliações. A escolha fica no aparelho (`localStorage`, chave `bobi:som`).
- Volume geral em 55% (`MASTER` em `src/lib/sound.ts`): o som apoia, não domina.
- Toca por Web Audio, com pré-carregamento por tela. Sem suporte, sem arquivo ou com autoplay bloqueado, o jogo segue em silêncio, sem erro.
- Todo som tem equivalente visual (faixa verde/vermelha, texto, animação): quem joga sem som não perde informação.
