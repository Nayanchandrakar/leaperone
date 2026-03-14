import { IMAGE_TYPES, SORT_OPTIONS } from "@app/core/constants"

export const FILE_SORTS = [
  { title: "A to Z", value: SORT_OPTIONS[0]! },
  { title: "Z to A", value: SORT_OPTIONS[1]! },
  { title: "Newest First", value: SORT_OPTIONS[2]! },
  { title: "Oldest First", value: SORT_OPTIONS[3]! },
] as const

export const FILE_TYPES = [
  { title: "All", types: [], value: "all" },
  { title: "Images", types: IMAGE_TYPES, value: "image" },
] as const
