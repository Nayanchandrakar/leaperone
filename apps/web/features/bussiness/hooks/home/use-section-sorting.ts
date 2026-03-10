import { useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

export function useSectionSorting() {
  // Only subscribe to the list of IDs, not the full sections
  // This prevents re-renders when content within a section changes
  // useShallow ensures we get a stable array reference if IDs haven't changed
  const sectionIds = useContentEditorStore(useShallow((state) => state.sections.map((s) => s.id)))

  // Memoize the sections array based on stable sectionIds
  const sections = useMemo(() => {
    return sectionIds.map((id) => ({ id }))
  }, [sectionIds])

  return sections
}
