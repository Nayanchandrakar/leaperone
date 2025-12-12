import type { ContentSectionType } from "@app/core/types"
import { memo, useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { CONTENT_FORMS } from "@/features/bussiness/constants/home/content-forms"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

const ContentEditor = () => {
  const { sections, moveSection } = useContentEditorStore(
    useShallow((state) => ({
      sections: state.sections,
      moveSection: state.moveSection,
    })),
  )

  const renderItem = useCallback((type: ContentSectionType, index: number) => {
    const FormComponent = CONTENT_FORMS[type]
    if (!FormComponent) return null
    return <FormComponent key={index} index={index} />
  }, [])

  return (
    <EditorBlock>
      <SortableList
        items={sections}
        onOrderChange={moveSection}
        renderItem={(item, index) => renderItem(item.type, index)}
      />
    </EditorBlock>
  )
}

export default memo(ContentEditor)
