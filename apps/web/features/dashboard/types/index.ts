import type { CancelTokenSource } from "axios"
import type { LucideIcon } from "lucide-react"

export type RouteParams = Record<string, string | number | boolean>
export type FileStatus = "uploaded" | "uploading" | "error"

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

export type FileUploadProgress = {
  fileId: string
  progress: number
  status: FileStatus
  cancelToken: CancelTokenSource
}
