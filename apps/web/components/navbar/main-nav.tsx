"use client"

import { Button } from "@app/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "@/constants/nav-links"

export const MainNav = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-x-6 lg:flex">
      {NAV_LINKS.map(({ name, href }) => (
        <Link
          key={name}
          href={href}
          data-state={pathname === href}
          className="data-[state=true]:font-semibold text-sm font-medium text-white transition-colors hover:text-white/80"
        >
          {name}
        </Link>
      ))}

      <div className="flex items-center gap-4">
        <Button size="sm" variant="secondary">
          Start Free Trial
        </Button>

        <Button asChild size="sm" variant="outline">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </nav>
  )
}
