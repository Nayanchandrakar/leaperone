"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "@/constants/nav-links"
import type { FullSession } from "@/types"

interface MainNavProps {
  session: FullSession | null
}

export const MainNav = ({ session }: MainNavProps) => {
  const pathname = usePathname()
  console.dir(session)

  return (
    <nav className="hidden items-center gap-x-2.5 lg:flex">
      {NAV_LINKS.map(({ name, href }) => (
        <Link
          key={name}
          href={href as any}
          data-state={pathname === href}
          className="data-[state=true]:font-semibold text-sm font-medium text-white transition-colors hover:text-white/80"
        >
          {name}
        </Link>
      ))}
    </nav>
  )
}
