import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import { DashboardNavbar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-navbar"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"
import { DashboardFooter } from "@/features/dashboard/components/ui/dashboard-footer"

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <DashboardSidebar teamOnly={false} workspaceId={"workspaceId"} />
      <SidebarInset>
        <DashboardNavbar />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
