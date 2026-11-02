/**
 * Avatares iniciais gratuitos (DD014). Placeholders até a arte da ficha-mãe
 * do Caramelo ser homologada; o id é o que fica salvo em profiles.avatar_id.
 */
export const AVATARS = [
  { id: "caramelo-oculos", label: "Caramelo de óculos", emoji: "🐶", bg: "#F29507" },
  { id: "carretel", label: "Carretel de filamento", emoji: "🧵", bg: "#523568" },
  { id: "bico-quente", label: "Bico da impressora", emoji: "🔥", bg: "#C2410C" },
  { id: "engrenagem", label: "Engrenagem", emoji: "⚙️", bg: "#8D71A7" },
  { id: "chaveiro", label: "Chaveiro", emoji: "🔑", bg: "#FD7301" },
  { id: "cubo", label: "Cubo de calibração", emoji: "🧊", bg: "#241241" },
] as const;

export type AvatarId = (typeof AVATARS)[number]["id"];

export function getAvatar(id: string) {
  return AVATARS.find((a) => a.id === id) ?? AVATARS[0];
}
