"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@app/ui/components/sidebar"
import { HeaderLogo } from "@/components/ui/header"
import { PrimaryNav } from "@/features/dashboard/components/sidebars/dashboard/primary-nav"
import { SecondaryNav } from "@/features/dashboard/components/sidebars/dashboard/secondary-nav"
import { TertiaryNav } from "@/features/dashboard/components/sidebars/dashboard/tertiary-nav"
import { SidebarSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import { usePermission } from "@/features/dashboard/hooks/dashboard/use-permission"

export const DashboardSidebar = () => {
  const { data, isPending, isError } = usePermission("invite:members")

  return (
    <Sidebar>
      <SidebarHeader className="items-center py-0.5">
        <HeaderLogo className="fill-primary" />
      </SidebarHeader>
      <SidebarContent>
        {isPending || isError ? (
          <SidebarSkeleton />
        ) : (
          <>
            <PrimaryNav isManager={!!data?.permission} />
            <SecondaryNav isManager={!!data?.permission} />
            <TertiaryNav />
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
