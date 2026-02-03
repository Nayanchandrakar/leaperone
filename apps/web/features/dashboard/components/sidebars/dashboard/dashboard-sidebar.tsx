"use client"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@app/ui/components/sidebar"
import { HeaderLogo } from "@/components/ui/header"
import { PrimaryNav } from "@/features/dashboard/components/sidebars/dashboard/primary-nav"
import { SecondaryNav } from "@/features/dashboard/components/sidebars/dashboard/secondary-nav"
import { TertiaryNav } from "@/features/dashboard/components/sidebars/dashboard/tertiary-nav"
import { SidebarSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import { useIsManager } from "@/features/dashboard/hooks/dashboard/use-is-manager"

export const DashboardSidebar = () => {
  const { data, isPending, isError } = useIsManager()

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
            <PrimaryNav isManager={!!data?.isManager} />
            <SecondaryNav isManager={!!data?.isManager} />
            <TertiaryNav />
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
