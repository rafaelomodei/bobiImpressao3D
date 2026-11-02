/**
 * Placeholder vetorial do Caramelo até os sprites da ficha-mãe serem produzidos.
 * Não é arte homologada; substituir por bobi-caramelo-<estado>.png.
 */
export function CarameloPlaceholder({ size = 160, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Caramelo, o cachorro caramelo do bobi."
    >
      <ellipse cx="34" cy="78" rx="20" ry="34" fill="#C97A06" transform="rotate(18 34 78)" />
      <ellipse cx="126" cy="78" rx="20" ry="34" fill="#C97A06" transform="rotate(-18 126 78)" />
      <circle cx="80" cy="84" r="52" fill="#F29507" stroke="#241241" strokeWidth="4" />
      <ellipse cx="80" cy="108" rx="30" ry="22" fill="#FDD182" />
      <rect x="40" y="46" width="80" height="12" rx="6" fill="#523568" />
      <circle cx="60" cy="52" r="14" fill="#FD7301" stroke="#241241" strokeWidth="3" />
      <circle cx="100" cy="52" r="14" fill="#FD7301" stroke="#241241" strokeWidth="3" />
      <circle cx="60" cy="52" r="8" fill="#7CC6F2" />
      <circle cx="100" cy="52" r="8" fill="#7CC6F2" />
      <circle cx="64" cy="82" r="6" fill="#241241" />
      <circle cx="96" cy="82" r="6" fill="#241241" />
      <ellipse cx="80" cy="98" rx="8" ry="6" fill="#241241" />
      <path d="M70 110 q10 10 20 0" stroke="#241241" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M76 114 q4 10 8 0" fill="#E85D75" />
    </svg>
  );
}
