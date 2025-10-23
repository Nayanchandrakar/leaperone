"use client"

import { useSidebar } from "@app/ui/components/sidebar"
import { PanelLeftIcon } from "lucide-react"

export const DashboardSidebarToogle = () => {
  const { toggleSidebar } = useSidebar()
  return (
    <PanelLeftIcon onClick={toggleSidebar} className="size-5 text-white cursor-pointer md:hidden" />
  )
}
