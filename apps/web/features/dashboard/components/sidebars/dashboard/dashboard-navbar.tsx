"use client"

import { Skeleton } from "@app/ui/components/skeleton"
import { NavSettings } from "@/components/navbar/nav-settings"
import { Navigation } from "@/components/navbar/navigation"
import { Header, HeaderContainer, HeaderNavigation } from "@/components/ui/header"
import { useSession } from "@/features/auth/hooks/session/use-session"
import { DashboardSidebarToogle } from "@/features/dashboard/components/buttons/dashboard/dashboard-sidebar-toogle"

export function DashboardNavbar() {
  const { data, isPending, isError } = useSession()

  return (
    <Header className="static">
      <HeaderContainer className="md:justify-end">
        <DashboardSidebarToogle />
        <HeaderNavigation className="flex gap-x-4">
          <Navigation className="hidden lg:flex" />
          {isPending || isError ? (
            <Skeleton className="size-8 rounded-full" />
          ) : (
            <NavSettings user={data?.user!} />
          )}
        </HeaderNavigation>
      </HeaderContainer>
    </Header>
  )
}
