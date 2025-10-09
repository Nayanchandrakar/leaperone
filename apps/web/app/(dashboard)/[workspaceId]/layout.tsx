import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"
import { DashboardNavbar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-navbar"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"
import { DashboardFooter } from "@/features/dashboard/components/ui/dashboard-footer"

type DashboardLayoutProps = {
  children: React.ReactNode
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const pipeline = await DashboardPipeline.init(params)
  await pipeline.checkMembership()
  await pipeline.checkPermissions(["manage:members"])

  const { session, hasPermission, param } = pipeline.context

  return (
    <SidebarProvider>
      <DashboardSidebar
        teamOnly={!!hasPermission}
        workspaceId={param.workspaceId!}
      />
      <SidebarInset>
        <DashboardNavbar user={session.user} />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
