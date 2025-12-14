import type { LinkSection } from "@app/core/types/content-editor"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface RenderLinksFormProps {
  index: number
}

export function RenderLinksForm({ index }: RenderLinksFormProps) {
  const section = useContentEditorStore((state) => state.sections[index] as LinkSection)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(index, ["links"], oldIndex, newIndex)
    },
    [index, moveItem],
  )

  const handleLabelChange = useCallback(
    (linkIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "social-links") {
        const currentLink = section.links[linkIdx]
        updateItem(index, ["links"], linkIdx, {
          ...currentLink,
          label: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleUrlChange = useCallback(
    (linkIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "social-links") {
        const currentLink = section.links[linkIdx]
        updateItem(index, ["links"], linkIdx, {
          ...currentLink,
          url: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDelete = useCallback(
    (linkIdx: number) => {
      removeItem(index, ["links"], linkIdx)
    },
    [index, removeItem],
  )

  if (section.type !== "social-links") return null

  return (
    <SortableList
      items={section.links}
      onOrderChange={handleDataChange}
      renderItem={(link, linkIdx) => (
        <SortableSubListItem
          key={link?.id}
          itemId={link?.id}
          onItemDelete={() => handleDelete(linkIdx)}
        >
          <EditorSubSortTwoColumnGrid>
            <Field>
              <FieldLabel>Link Label</FieldLabel>
              {/* @ts-expect-error - TODO: fix this */}
              <Input value={link?.label} onChange={(e) => handleLabelChange(linkIdx, e)} />
            </Field>
            <Field>
              <FieldLabel>Profile Link</FieldLabel>
              <Input value={link?.url} onChange={(e) => handleUrlChange(linkIdx, e)} />
            </Field>
          </EditorSubSortTwoColumnGrid>
        </SortableSubListItem>
      )}
    />
  )
}
