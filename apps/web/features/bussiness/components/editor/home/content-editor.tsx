import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { SortableList, SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

function ContentEditorBase() {
  const { sections, moveSection } = useContentEditorStore(
    useShallow((state) => ({
      sections: state.sections,
      moveSection: state.moveSection,
    })),
  )

  return (
    <EditorBlock defaultValue={"nayan"}>
      <SortableList data={sections} onDataChange={moveSection}>
        {(item) => (
          <SortableListItem
            id={item.id}
            key={item.id}
            name={item.id}
            enabled={true}
            onEnabledChange={() => {}}
          >
            {item.id}
          </SortableListItem>
        )}
      </SortableList>
    </EditorBlock>
  )
}

export default memo(ContentEditorBase)
