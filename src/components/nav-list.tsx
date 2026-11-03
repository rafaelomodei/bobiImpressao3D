import Link from "next/link";

export const TABS = [
  { href: "/trilha", label: "Trilha", icon: "🗺️" },
  { href: "/oficina", label: "Oficina", icon: "🛠️" },
  { href: "/ranking", label: "Ranking", icon: "🏆" },
  { href: "/perfil", label: "Perfil", icon: "🐶" },
] as const;

/** Lista de abas sem hooks; recebe a aba ativa (ou null no shell estático). */
export function NavList({ activeHref }: { activeHref: string | null }) {
  return (
    <ul className="mx-auto flex max-w-md justify-around md:max-w-none md:flex-col md:gap-1 md:p-4">
      {TABS.map((t) => {
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
