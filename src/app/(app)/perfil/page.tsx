import type { Metadata } from "next";
import { signOut } from "@/app/auth/actions";
import { PageShell } from "@/components/page-shell";
import { getAvatar } from "@/lib/avatars";
import { requireProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Perfil" };

export default function PerfilPage() {
  return (
    <PageShell title="Perfil">
      <Perfil />
    </PageShell>
  );
}

async function Perfil() {
  const profile = await requireProfile();
  const avatar = getAvatar(profile.avatar_id);

  return (
    <div className="flex flex-col gap-4">
      <div className="card flex items-center gap-4">
        <span
          className="grid size-20 place-items-center rounded-full text-4xl"
          style={{ background: avatar.bg }}
          aria-label={avatar.label}
          role="img"
        >
          {avatar.emoji}
        </span>
        <div>
          <p className="text-xl font-black">{profile.nickname}</p>
          <p className="text-sm text-structure-soft-text">0 XP · 0 Fios</p>
        </div>
      </div>
      <form action={signOut}>
        <button type="submit" className="btn-google">
          Sair
        </button>
      </form>
    </div>
  );
}
