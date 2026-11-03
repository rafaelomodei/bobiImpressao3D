import type { CarameloPose } from "@/content/schema";

/**
 * Caramelo provisório em SVG, com variação por pose. Não é arte homologada:
 * substituir por public/sprites/bobi-caramelo-<pose>.png (catálogo em
 * src/content/assets/core.ts; guia em docs/design/sprites-pendentes.md).
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
  const happy = pose === "celebrate" || pose === "unlocked";
  const worried = pose === "concern";
  const alert = pose === "alert";
  const earTilt = worried ? 32 : happy ? 8 : 18;

  return (
    <svg
      viewBox="0 0 160 170"
      width={size}
      height={size * (170 / 160)}
      className={`${pose === "celebrate" ? "animate-float" : ""} ${className}`}
      role="img"
      aria-label={`Caramelo (${POSE_LABEL[pose]})`}
    >
      <g transform={pose === "hint" ? "rotate(-8 80 90)" : undefined}>
        <ellipse cx="34" cy="80" rx="20" ry="34" fill="#C97A06" transform={`rotate(${earTilt} 34 80)`} />
        <ellipse cx="126" cy="80" rx="20" ry="34" fill="#C97A06" transform={`rotate(${-earTilt} 126 80)`} />
        <circle cx="80" cy="88" r="52" fill="#F29507" stroke="#241241" strokeWidth="4" />
        <ellipse cx="80" cy="112" rx="30" ry="22" fill="#FDD182" />
        {/* óculos de oficina: na testa, ou nos olhos no alerta de segurança */}
        <g transform={alert ? "translate(0 30)" : undefined}>
          <rect x="40" y="48" width="80" height="12" rx="6" fill="#523568" />
          <circle cx="60" cy="54" r="14" fill="#FD7301" stroke="#241241" strokeWidth="3" />
          <circle cx="100" cy="54" r="14" fill="#FD7301" stroke="#241241" strokeWidth="3" />
          <circle cx="60" cy="54" r="8" fill="#7CC6F2" opacity={alert ? 0.7 : 1} />
          <circle cx="100" cy="54" r="8" fill="#7CC6F2" opacity={alert ? 0.7 : 1} />
        </g>
        {!alert &&
          (happy ? (
            <>
              <path d="M57 86 q7 -8 14 0" stroke="#241241" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M89 86 q7 -8 14 0" stroke="#241241" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="64" cy="86" r="6" fill="#241241" />
              <circle cx="96" cy="86" r="6" fill="#241241" />
              <circle cx="66" cy="84" r="2" fill="#fff" />
              <circle cx="98" cy="84" r="2" fill="#fff" />
            </>
          ))}
        {worried && (
          <>
            <path d="M54 74 l14 4" stroke="#241241" strokeWidth="3" strokeLinecap="round" />
            <path d="M106 74 l-14 4" stroke="#241241" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="80" cy="102" rx="8" ry="6" fill="#241241" />
        {worried ? (
          <path d="M70 120 q10 -7 20 0" stroke="#241241" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : pose === "talk" || pose === "explain" || happy ? (
          <>
            <path d="M68 112 q12 16 24 0 z" fill="#241241" />
            <path d="M74 118 q6 8 12 0" fill="#E85D75" />
          </>
        ) : (
          <>
            <path d="M70 114 q10 10 20 0" stroke="#241241" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M76 118 q4 10 8 0" fill="#E85D75" />
          </>
        )}
      </g>
      {pose === "hint" && <text x="128" y="34" fontSize="28">💡</text>}
      {pose === "explain" && <path d="M140 120 l14 -6 -6 14" fill="#F29507" stroke="#241241" strokeWidth="3" />}
      {alert && <text x="124" y="36" fontSize="26">✋</text>}
      {pose === "unlocked" && <text x="122" y="36" fontSize="26">✨</text>}
      {pose === "celebrate" && (
        <>
          <text x="8" y="30" fontSize="20">🎉</text>
          <text x="128" y="30" fontSize="20">⭐</text>
        </>
      )}
    </svg>
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
