import type { LucideIcon } from "lucide-react"

export type RouteParams = Record<string, string | number | boolean>

export type isRouteActiveProps = {
  currentPath: string
  targetPath: string
  depth?: number
}

export type SidebarNavItems = {
  name: string
  url: string
  icon: LucideIcon
  teamOnly?: boolean
}
