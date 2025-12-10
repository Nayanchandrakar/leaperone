import { useCallback, useMemo } from "react"
import {
  useContentEditorStore,
  useContentSections,
} from "@/features/bussiness/stores/use-content-editor-store"

/**
 * Custom hook to manage content editor form logic
 * Encapsulates form submission and section reordering with performance optimizations
 */
export function useContentEditorForm() {
  const sections = useContentSections()
  const moveSection = useContentEditorStore((state) => state.moveSection)

  // Memoize sections to avoid unnecessary re-renders
  const memoizedSections = useMemo(() => sections, [sections])

  // Memoize initial section ID to avoid recalculating on every render
  const initialSectionId = useMemo(() => sections[0]?.id, [sections])

  const handleSectionMove = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveSection(oldIndex, newIndex)
    },
    [moveSection],
  )

  return {
    initialSectionId,
    handleSectionMove,
    sections: memoizedSections,
  }
}
