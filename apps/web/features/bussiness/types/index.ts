import type { ContactSchema, ContentEditorSchema } from "@app/zod/types"

export type ContactOption = {
  label: string
  value: ContactSchema["type"]
}

export type ContentEditorSortItem = ContentEditorSchema["sections"][number]

export type SelectOption<T extends string = string> = {
  label: string
  value: T
}
