"use client"

import { usePathname } from "next/navigation"
import { ListComponent } from "@/components/shared/list-component"
import { HeaderNavLink } from "@/components/ui/header"
import { NAV_LINKS } from "@/constants/nav-links"

export const Navigation = () => {
  const pathname = usePathname()

  return (
    <ListComponent
      items={NAV_LINKS}
      className="flex items-center gap-x-4"
      renderItem={({ name, href }) => (
        <HeaderNavLink key={name} href={href} data-state={pathname === href}>
          {name}
        </HeaderNavLink>
      )}
    />
  )
}
