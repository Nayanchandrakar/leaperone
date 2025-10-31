import { IMAGE_TYPES, PDF_TYPES } from "@app/core/constants"
import type { FileSortingOption, FileTypeOption } from "@/features/dashboard/types"

export const FILE_SORTING_OPTIONS: FileSortingOption[] = [
  { title: "A to Z", value: "a-to-z" },
  { title: "Z to A", value: "z-to-a" },
  { title: "Newest First", value: "newest" },
  { title: "Oldest First", value: "oldest" },
]

export const FILE_TYPE_OPTIONS: FileTypeOption[] = [
  { title: "All", types: [], value: "all" },
  {
    title: "Images",
    types: IMAGE_TYPES,
    value: "image",
  },
  { title: "PDFs", types: PDF_TYPES, value: "pdf" },
]
