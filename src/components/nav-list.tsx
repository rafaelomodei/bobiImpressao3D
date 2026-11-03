import Link from "next/link";

export const TABS = [
  { href: "/trilha", label: "Trilha", icon: "🗺️", adultsOnly: false },
  { href: "/oficina", label: "Oficina", icon: "🛠️", adultsOnly: false },
  { href: "/ranking", label: "Ranking", icon: "🏆", adultsOnly: true },
  { href: "/perfil", label: "Perfil", icon: "🐶", adultsOnly: false },
] as const;

/**
 * Lista de abas sem hooks; recebe a aba ativa (ou null no shell estático).
 * Abas só para adultos (DD025) não aparecem para menores nem no carregamento.
 */
export function NavList({ activeHref, adult = false }: { activeHref: string | null; adult?: boolean }) {
  return (
    <ul className="mx-auto flex max-w-md justify-around md:max-w-none md:flex-col md:gap-1 md:p-4">
      {TABS.filter((t) => adult || !t.adultsOnly).map((t) => {
        const active = activeHref === t.href;
        return (
          <li key={t.href} className="flex-1 md:flex-none">
            <Link
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1 text-xs font-extrabold md:flex-row md:justify-start md:gap-3 md:px-4 md:text-base ${
                active ? "bg-brand-cream text-structure-deep" : "text-structure-soft-text hover:bg-background"
              }`}
            >
              <span aria-hidden className="text-xl">
                {t.icon}
              </span>
              {t.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
