import Link from "next/link";
import Image from "next/image";

export const TABS = [
  { href: "/trilha", label: "Trilha", icon: "trilha", adultsOnly: false },
  { href: "/oficina", label: "Oficina", icon: "oficina", adultsOnly: false },
  { href: "/ranking", label: "Ranking", icon: "ranking", adultsOnly: true },
  { href: "/perfil", label: "Perfil", icon: "perfil", adultsOnly: false },
] as const;

/**
 * Lista de abas sem hooks; recebe a aba ativa (ou null no shell estático).
 * Abas só para adultos (DD025) não aparecem para menores nem no carregamento.
 */
export function NavList({ activeHref, adult = false }: { activeHref: string | null; adult?: boolean }) {
  return (
    <ul className="mx-auto flex max-w-md justify-around px-2 md:max-w-none md:flex-col md:gap-1 md:p-4">
      {TABS.filter((t) => adult || !t.adultsOnly).map((t) => {
        const active = activeHref === t.href;
        return (
          <li key={t.href} className="flex-1 md:flex-none">
            <Link
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`group flex min-h-16 flex-col items-center justify-center gap-1 px-1 py-1.5 text-[11px] font-extrabold tracking-wide uppercase transition-colors md:min-h-12 md:flex-row md:justify-start md:gap-3 md:rounded-2xl md:border-2 md:px-3 md:text-sm md:normal-case ${
                active
                  ? "text-brand-primary-pressed md:border-brand-primary/50 md:bg-brand-cream-soft"
                  : "text-structure-soft-text md:border-transparent md:hover:bg-background"
              }`}
            >
              {/* Celular: o ícone ganha uma "pastilha" suave quando ativo; o rótulo muda de cor. */}
              <span
                className={`grid h-9 w-14 place-items-center rounded-2xl border-2 transition md:h-auto md:w-auto md:border-0 md:bg-transparent ${
                  active ? "border-brand-primary/50 bg-brand-cream-soft" : "border-transparent group-hover:bg-background"
                }`}
              >
                <Image
                  src={`/sprites/bobi-ui-${t.icon}.png`}
                  alt=""
                  aria-hidden
                  width={28}
                  height={28}
                  className={`size-7 transition ${active ? "scale-110" : "opacity-80 group-hover:opacity-100"}`}
                />
              </span>
              {t.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
