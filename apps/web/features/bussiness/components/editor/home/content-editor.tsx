import type { ContentSectionType } from "@app/core/types"
import { memo, useCallback, useMemo } from "react"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { CONTENT_FORMS } from "@/features/bussiness/constants/home/content-forms"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

// Module-level cache for section order to maintain stable references
let cachedSectionOrder: string[] = []
let cachedOrderString = ""

// Selector that returns a stable array reference when order hasn't changed
const selectSectionOrder = (state: ReturnType<typeof useContentEditorStore.getState>) => {
  const currentOrder = state.sections.map((section) => section.id)
  const currentOrderString = currentOrder.join(",")

  // Return cached array if order hasn't changed
  if (cachedOrderString === currentOrderString) {
    return cachedSectionOrder
  }

  // Update cache and return new array
  cachedOrderString = currentOrderString
  cachedSectionOrder = currentOrder
  return currentOrder
}

const ContentEditor = () => {
  // Use the cached selector - this will only trigger re-renders when order actually changes
  const sectionOrder = useContentEditorStore(selectSectionOrder)

  // Get sections from store without subscribing (to avoid re-renders on content changes)
  const orderedSections = useMemo(() => {
    const sections = useContentEditorStore.getState().sections
    // Create a map for O(1) lookup
    const sectionMap = new Map(sections.map((section) => [section.id, section]))
    // Return sections in the order specified by sectionOrder
    return sectionOrder.map((id) => sectionMap.get(id)!).filter(Boolean)
  }, [sectionOrder])

  const renderItem = useCallback((type: ContentSectionType, index: number) => {
    const FormComponent = CONTENT_FORMS[type]
    if (!FormComponent) return null
    return <FormComponent key={index} index={index} />
  }, [])

  return (
    <EditorBlock defaultValue={"e60e25f8-749e-4124-aab9-73a48ac07631"}>
      <SortableList
        items={orderedSections}
        renderItem={(item, index) => renderItem(item.type, index)}
      />
    </EditorBlock>
  )
}

export default memo(ContentEditor)
