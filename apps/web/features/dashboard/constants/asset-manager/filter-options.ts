import { IMAGE_TYPES, PDF_TYPES } from "@app/core/constants"

export const FILE_SORTS = [
  { title: "A to Z", value: "a-to-z" },
  { title: "Z to A", value: "z-to-a" },
  { title: "Newest First", value: "newest" },
  { title: "Oldest First", value: "oldest" },
] as const

export const FILE_CATEGORIES = [
  { title: "All", types: [], value: "all" },
  { title: "PDFs", types: PDF_TYPES, value: "pdf" },
  { title: "Images", types: IMAGE_TYPES, value: "image" },
] as const
