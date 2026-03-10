import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import { ExitImpersonation } from "@/features/dashboard/components/pages/teams/exit-impersonation"
import { DashboardNavbar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-navbar"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"
import { DashboardFooter } from "@/features/dashboard/components/ui/dashboard-footer"

export const dynamic = "force-static"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardNavbar />
        <ExitImpersonation />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
