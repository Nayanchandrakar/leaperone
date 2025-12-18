import { useMemo } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

export const useSectionSorting = () => {
  const idsKey = useContentEditorStore((state) =>
    JSON.stringify(state?.sections?.map((s) => s?.id)),
  )
  const sectionIds = useMemo(() => JSON.parse(idsKey) as string[], [idsKey])
  const sections = useMemo(() => sectionIds.map((id) => ({ id })), [sectionIds])
  return sections
}
