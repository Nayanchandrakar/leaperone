import { memo } from "react"
import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useContentEditorForm } from "@/features/bussiness/hooks/home/use-content-editor-form"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

function ContentEditorBase() {
  const { sections, initialSectionId, handleSectionMove } = useContentEditorForm()

  return (
    <EditorBlock defaultValue={initialSectionId!}>
      <EditorSortProvider data={sections} onDataChange={handleSectionMove}>
        <EditorSortGroup>
          {(item: ContentEditorSortItem, sectionIdx: number) => (
            <ContentFormRenderer
              id={item.id}
              key={item.id}
              type={item.type}
              sectionIdx={sectionIdx}
            />
          )}
        </EditorSortGroup>
      </EditorSortProvider>
    </EditorBlock>
  )
}

export default memo(ContentEditorBase)
