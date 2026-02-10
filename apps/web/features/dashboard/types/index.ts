import type { SORT_OPTIONS } from "@app/core/constants"
import type { File } from "@app/database/types"
import type { CancelTokenSource } from "axios"
import type { LucideIcon } from "lucide-react"

// Filters
export type FileCategory = "all" | "image"
export type FileStatus = "uploaded" | "uploading" | "error"
export type SortOptions = (typeof SORT_OPTIONS)[number]

export type DashboardNavItem = {
  href: string
  title: string
  icon: LucideIcon
  managerOnly?: boolean
}

export type DashboardNavSettingItem = DashboardNavItem & {
  items: {
    href: string
    title: string
    managerOnly?: boolean
  }[]
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
