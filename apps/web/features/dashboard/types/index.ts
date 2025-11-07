import type { SORT_OPTIONS } from "@app/core/constants"
import type { File } from "@app/database/types"
import type { CancelTokenSource } from "axios"
import type { LucideIcon } from "lucide-react"

// Routing
export type RouteParams = Record<string, string | number | boolean>

// Filters
export type FileCategory = "all" | "image"
export type FileStatus = "uploaded" | "uploading" | "error"
export type SortOptions = (typeof SORT_OPTIONS)[number]

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

export type uploadProgressList = {
  fileId: string
  progress: number
  status: FileStatus
  cancelToken: CancelTokenSource
}

export type FileCategories = {
  title: string
  types: string[]
  value: FileCategory
}

export type FileSortOptions = {
  title: string
  value: SortOptions
}

export type AssetFile = Omit<File, "storageId">
