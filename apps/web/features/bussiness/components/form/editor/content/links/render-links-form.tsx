import type { LinkSection } from "@app/core/types/content-editor"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const RenderLinksForm = memo(({ index }: ContentSectionProps) => {
  const { section, updateSubSectionField, removeSubSectionItem, moveSubSection } =
    useContentEditorStore(
      useShallow((state) => ({
        section: state?.sections?.[index] as LinkSection,
        removeSubSectionItem: state.removeSubSectionItem,
        updateSubSectionField: state.updateSubSectionField,
        moveSubSection: state.moveSubSection,
      })),
    )

  if (!section?.links?.length) return null

  return (
    <SortableList
      items={section?.links}
      onReorder={(fromIndex, toIndex) => {
        moveSubSection(index, ["links"], fromIndex, toIndex)
      }}
      renderItem={(link, linkIdx) => (
        <SortableSubListItem
          key={link?.id}
          itemId={link?.id}
          onItemDelete={() => removeSubSectionItem(index, linkIdx, ["links"])}
        >
          <EditorSubSortTwoColumnGrid>
            <Field>
              <FieldLabel>Link Label</FieldLabel>

              <Input
                // @ts-expect-error - TODO: fix this
                value={link?.label}
                onChange={(e) =>
                  updateSubSectionField(
                    index,
                    linkIdx,
                    ["links"],
                    ["label"],
                    e?.target?.value ?? "",
                  )
                }
              />
            </Field>
            <Field>
              <FieldLabel>Profile Link</FieldLabel>
              <Input
                value={link?.url}
                onChange={(e) => {
                  updateSubSectionField(index, linkIdx, ["links"], ["url"], e?.target?.value ?? "")
                }}
              />
            </Field>
          </EditorSubSortTwoColumnGrid>
        </SortableSubListItem>
      )}
    />
  )
})
