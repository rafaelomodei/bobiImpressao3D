"use client";

import { usePathname } from "next/navigation";
import { NavList, TABS } from "./nav-list";

export function ActiveNavList({ adult }: { adult: boolean }) {
  const pathname = usePathname();
  const active = TABS.find((t) => pathname === t.href || pathname.startsWith(`${t.href}/`));
  return <NavList activeHref={active?.href ?? null} adult={adult} />;
}
