import { memo, useMemo } from "react"
import { ContentSectionRenderer } from "@/features/bussiness/components/pages/home/content-section-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionSorting } from "@/features/bussiness/hooks/home/use-section-sorting"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

const ContentEditor = () => {
  const sections = useSectionSorting()
  const moveSection = useContentEditorStore((state) => state.moveSection)
  const defaultValue = useMemo(() => sections[0]?.id as string, [sections])

  return (
    <EditorBlock defaultValue={defaultValue}>
      <SortableList
        items={sections}
        onReorder={moveSection}
        renderItem={(section, i) => <ContentSectionRenderer key={section?.id} index={i} />}
      />
    </EditorBlock>
  )
}

export default memo(ContentEditor)
