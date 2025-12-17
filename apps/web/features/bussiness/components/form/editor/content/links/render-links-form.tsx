import type { LinkSection } from "@app/core/types/content-editor"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface RenderLinksFormProps {
  index: number
}

export function RenderLinksForm({ index }: RenderLinksFormProps) {
  const { section, updateSubSectionField, removeSubSectionItem } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as LinkSection,
      removeSubSectionItem: state.removeSubSectionItem,
      updateSubSectionField: state.updateSubSectionField,
    })),
  )

  return (
    <SortableList
      items={section?.links}
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
}
