import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

const ContentEditorBase = () => {
  const { sections, moveSection } = useContentEditorStore(
    useShallow((state) => ({
      sections: state.sections,
      moveSection: state.moveSection,
    })),
  )

  return (
    <EditorBlock>
      <SortableList
        items={sections}
        onOrderChange={moveSection}
        renderItem={(item) => <div key={item.id}>{item.type}</div>}
      />
    </EditorBlock>
  )
}

export default memo(ContentEditorBase)
