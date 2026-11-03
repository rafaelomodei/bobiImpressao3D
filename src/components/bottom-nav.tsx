import { Suspense } from "react";
import { getOwnProfile, isAdult } from "@/lib/dal";
import { ActiveNavList } from "./active-nav-list";
import { NavList } from "./nav-list";

/** DD016: abas inferiores no celular; barra lateral a partir de md. */
export function BottomNav() {
  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-20 border-t-2 border-structure-soft/30 bg-surface pb-[env(safe-area-inset-bottom)] md:static md:w-56 md:border-t-0 md:border-r-2 md:pb-0"
    >
      <Suspense fallback={<NavList activeHref={null} />}>
        <UserNav />
      </Suspense>
    </nav>
  );
}

/** A aba de ranking depende da idade, lida no servidor (DD025). */
async function UserNav() {
  const profile = await getOwnProfile();
  return <ActiveNavList adult={profile ? isAdult(profile) : false} />;
}
