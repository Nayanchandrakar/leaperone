import type { CancelTokenSource } from "axios"
import type { LucideIcon } from "lucide-react"

// Routing
export type RouteParams = Record<string, string | number | boolean>

// Filters
export type SortBy = "newest" | "oldest" | "a-to-z" | "z-to-a"
export type FileStatus = "uploaded" | "uploading" | "error"
export type FileType = "all" | "image" | "pdf"

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

export type FileTypeOption = {
  title: string
  types: string[]
  value: FileType
}

export type FileSortingOption = {
  title: string
  value: SortBy
}
