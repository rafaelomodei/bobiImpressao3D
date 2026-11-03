/**
 * Avatares iniciais gratuitos (DD014); o id é o que fica salvo em profiles.avatar_id.
 * O Caramelo usa o sprite final; os demais seguem com emoji até ganharem arte.
 */
export const AVATARS: readonly { id: string; label: string; emoji: string; bg: string; sprite?: string }[] = [
  { id: "caramelo-oculos", label: "Caramelo de óculos", emoji: "🐶", bg: "#FDD182", sprite: "/sprites/bobi-caramelo-idle.png" },
  { id: "carretel", label: "Carretel de filamento", emoji: "🧵", bg: "#523568" },
  { id: "bico-quente", label: "Bico da impressora", emoji: "🔥", bg: "#C2410C" },
  { id: "engrenagem", label: "Engrenagem", emoji: "⚙️", bg: "#8D71A7" },
  { id: "chaveiro", label: "Chaveiro", emoji: "🔑", bg: "#FD7301" },
  { id: "cubo", label: "Cubo de calibração", emoji: "🧊", bg: "#241241" },
];

export function getAvatar(id: string) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
