"use client"

import { Button } from "@app/ui/components/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_LINKS } from "@/constants/nav-links"
import { useLogout } from "@/features/auth/hooks/logout/use-logout"
import type { FullSession } from "@/types"

interface MainNavProps {
  session: FullSession | null
}

export const MainNav = ({ session }: MainNavProps) => {
  const pathname = usePathname()
  const { mutate, isPending } = useLogout()

  return (
    <nav className="hidden items-center gap-x-6 lg:flex">
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

      <div className="flex items-center gap-4">
        <Button size="sm" variant="secondary">
          Start Free Trial
        </Button>

        {session ? (
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
            className="font-semibold"
            onClick={() => mutate()}
          >
            Logout
          </Button>
        ) : (
          <Button asChild size="sm" variant="outline" className="font-semibold">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  )
}
