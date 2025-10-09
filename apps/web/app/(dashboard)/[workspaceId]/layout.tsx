import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"
import { TopNavigation } from "@/features/dashboard/components/sidebars/dashboard/top-navigation"
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
        teamOnly={Boolean(hasPermission)}
        workspaceId={param.workspaceId!}
      />
      <SidebarInset>
        <TopNavigation user={session.user} />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
