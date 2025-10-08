import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import type { Metadata } from "next"
import { handleAuth } from "@/actions/utils"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"
import { TopNavigation } from "@/features/dashboard/components/sidebars/dashboard/top-navigation"
import { DashboardFooter } from "@/features/dashboard/components/ui/dashboard-footer"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await handleAuth({ mode: "require" })

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <TopNavigation user={session.user} />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}
