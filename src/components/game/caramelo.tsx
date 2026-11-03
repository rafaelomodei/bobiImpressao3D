import Image from "next/image";
import type { CarameloPose } from "@/content/schema";

/** Animação leve por pose, para o sprite estático ganhar vida (respeita reduced motion no CSS). */
const POSE_MOTION: Partial<Record<CarameloPose, string>> = {
  celebrate: "animate-float",
  unlocked: "animate-float",
  concern: "animate-shake",
};

/**
 * Sprites finais do Caramelo (public/sprites/bobi-caramelo-<pose>.png, 512×512).
 * next/image entrega WebP/AVIF no tamanho exibido.
 */
export function Caramelo({
  pose = "idle",
  size = 120,
  className = "",
}: {
  pose?: CarameloPose;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      key={pose}
      src={`/sprites/bobi-caramelo-${pose}.png`}
      alt={`Caramelo (${POSE_LABEL[pose]})`}
      width={size}
      height={size}
      draggable={false}
      className={`object-contain select-none ${POSE_MOTION[pose] ?? ""} ${className}`}
    />
  );
}

const POSE_LABEL: Record<CarameloPose, string> = {
  idle: "tranquilo",
  talk: "falando",
  explain: "explicando",
  hint: "dando uma dica",
  celebrate: "comemorando",
  concern: "pensativo",
  alert: "em alerta de segurança",
  unlocked: "mostrando uma novidade",
};

/** Caramelo + balão de fala. */
export function CarameloSays({
  text,
  pose = "talk",
  size = 88,
}: {
  text: string;
  pose?: CarameloPose;
  size?: number;
}) {
  return (
    <div className="flex items-start gap-3">
      <Caramelo pose={pose} size={size} className="shrink-0" />
      <p className="bubble animate-pop mt-2 flex-1 text-base leading-snug">{text}</p>
    </div>
  );
}
