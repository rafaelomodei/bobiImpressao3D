import Image from "next/image";
import type { getAvatar } from "@/lib/avatars";

type Avatar = ReturnType<typeof getAvatar>;

/** Avatar redondo: sprite quando existe, emoji enquanto a arte não chega. */
export function AvatarBadge({
  avatar,
  size,
  decorative = false,
}: {
  avatar: Avatar;
  /** Diâmetro em px. */
  size: number;
  decorative?: boolean;
}) {
  const a11y = decorative ? { "aria-hidden": true } : { role: "img", "aria-label": avatar.label };
  return (
    <span
      {...a11y}
      className="grid shrink-0 place-items-center overflow-hidden rounded-full"
      style={{ background: avatar.bg, width: size, height: size, fontSize: size * 0.5 }}
    >
      {avatar.sprite ? (
        <Image src={avatar.sprite} alt="" width={size} height={size} className="translate-y-[34%] scale-[1.8] object-contain" draggable={false} />
      ) : (
        avatar.emoji
      )}
    </span>
  );
}
