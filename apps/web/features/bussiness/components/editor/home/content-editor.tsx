import { useCallback, useRef } from "react"
import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import {
  useContentEditorStore,
  useContentSections,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentEditorSortItem } from "@/features/bussiness/types"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

export default function ContentEditor() {
  const formRef = useRef<HTMLFormElement>(null)
  const sections = useContentSections()
  const { goToNextStep } = useStepper()
  const moveSection = useContentEditorStore((state) => state.moveSection)

  const onSubmitCallback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      goToNextStep()
      scrollToElement("hero-section")
    },
    [goToNextStep],
  )

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveSection(oldIndex, newIndex)
    },
    [moveSection],
  )

  const initialSectionId = sections[8]?.id

  return (
    <form id="content-form" ref={formRef} onSubmit={onSubmitCallback}>
      <EditorBlock defaultValue={initialSectionId}>
        <EditorSortProvider data={sections} onDataChange={handleDataChange}>
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
    </form>
  )
}
