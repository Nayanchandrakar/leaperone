import { SidebarInset, SidebarProvider } from "@app/ui/components/sidebar"
import type { Metadata } from "next"
import { DashboardSidebar } from "@/features/dashboard/components/sidebars/dashboard/dashboard-sidebar"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="h-14 bg-primary w-full" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
