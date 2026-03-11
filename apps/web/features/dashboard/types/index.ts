import type { SORT_OPTIONS } from "@app/core/constants"
import type { File } from "@app/database/types"
import type { CancelTokenSource } from "axios"
import type { LucideIcon } from "lucide-react"

// Filters
export type FileCategory = "all" | "image"
export type PickerMode = "none" | "single" | "multiple"
export type SortOptions = (typeof SORT_OPTIONS)[number]
export type FileStatus = "uploaded" | "uploading" | "error"
export type TimeRangeValue = "today" | "last-3-days" | "last-7-days" | "last-30-days" | "all-time"

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

export type GeoDataItem = {
  label: string
  count: number
  percentage: number
}

export type TimeRangeData = {
  label: string
  value: TimeRangeValue
}[]
