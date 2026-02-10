"use client"

import { usePathname } from "next/navigation"
import { ListComponent } from "@/components/shared/list-component"
import { HeaderNavLink } from "@/components/ui/header"
import { NAV_LINKS } from "@/constants/nav-links"

type Props = {
  className?: string
}

export const Navigation = ({ className }: Props) => {
  const pathname = usePathname()

  return (
    <ListComponent
      items={NAV_LINKS}
      className={`flex items-center gap-x-4 ${className}`}
      renderItem={({ title, href }) => (
        <HeaderNavLink key={title} href={href} data-state={pathname === href}>
          {title}
        </HeaderNavLink>
      )}
    />
  )
}
