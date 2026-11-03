import type { PublicAsset } from "@/content/public-types";

/**
 * Exibe um asset do catálogo. Enquanto a arte não existe (`src === null`),
 * desenha um cartão provisório com emoji + rótulo, para manter o jogo jogável.
 */
export function AssetView({
  asset,
  size = "md",
  className = "",
}: {
  asset: PublicAsset | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  if (!asset) return null;
  const h = size === "sm" ? "h-20" : size === "lg" ? "h-44" : "h-28";
  if (asset.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset.src} alt={asset.label} className={`${h} w-full object-contain ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={asset.label}
      title={`Arte provisória: ${asset.id}`}
      className={`${h} flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-brand-caramel/50 bg-brand-cream-soft px-2 text-center ${className}`}
    >
      <span aria-hidden className={size === "lg" ? "text-5xl" : size === "sm" ? "text-2xl" : "text-4xl"}>
        {asset.emoji}
      </span>
      <span aria-hidden className="line-clamp-2 text-[11px] leading-tight font-bold text-structure-soft-text">
        {asset.label}
      </span>
    </div>
  );
}
