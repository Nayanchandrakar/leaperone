import { memo } from "react"
import { CONTENT_SECTIONS } from "@/features/bussiness/constants/home/content-sections"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ContentSectionRenderer = memo(({ index }: ContentSectionProps) => {
  const type = useContentEditorStore((state) => state?.sections[index]?.type)
  const FormComponent = type ? CONTENT_SECTIONS[type] : null

  if (!FormComponent) return null
  return <FormComponent index={index} />
})
