import Image from "next/image";

export type UiIconName = "cadeado" | "exercicio-concluido" | "fios" | "inicio-exercicio" | "oficina" | "perfil" | "ranking" | "streak" | "trilha" | "trofeu-avaliacao" | "xp";

/** Ícone de interface (public/sprites/bobi-ui-<nome>.png, 256×256). Decorativo: o texto ao lado dá o sentido. */
export function UiIcon({ name, size = 24, className = "" }: { name: UiIconName; size?: number; className?: string }) {
  return (
    <Image
      src={`/sprites/bobi-ui-${name}.png`}
      alt=""
      aria-hidden
      width={size}
      height={size}
      draggable={false}
      // Ícones pequenos e reaproveitados: carregar já, sem lazy (evita nó vazio na trilha).
      loading="eager"
      className={`inline-block shrink-0 object-contain select-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
