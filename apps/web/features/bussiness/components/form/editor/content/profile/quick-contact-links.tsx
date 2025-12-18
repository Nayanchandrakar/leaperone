import type { ProfileCardSection } from "@app/core/types"
import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const QuickContactLinksForm = memo(({ index }: ContentSectionProps) => {
  const { contactLists, updateSubSectionField, removeSubSectionItem, moveSubSection } =
    useContentEditorStore(
      useShallow((state) => ({
        moveSubSection: state.moveSubSection,
        removeSubSectionItem: state.removeSubSectionItem,
        updateSubSectionField: state.updateSubSectionField,
        contactLists: (state.sections[index] as ProfileCardSection)?.contacts?.list,
      })),
    )

  if (!contactLists?.length) return null

  return (
    <SortableList
      items={contactLists}
      onReorder={(fromIndex, toIndex) => {
        moveSubSection(index, ["contacts", "list"], fromIndex, toIndex)
      }}
      renderItem={(contact, contactIdx) => (
        <SortableSubListItem
          key={contact?.id}
          itemId={contact?.id}
          onItemDelete={() => removeSubSectionItem(index, contactIdx, ["contacts", "list"])}
        >
          <EditorSubSortTwoColumnGrid>
            <Field>
              <Select
                value={contact?.type}
                onValueChange={(val) => {
                  updateSubSectionField(index, contactIdx, ["contacts", "list"], ["type"], val)
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Input
              value={contact?.value}
              onChange={(e) => {
                updateSubSectionField(
                  index,
                  contactIdx,
                  ["contacts", "list"],
                  ["value"],
                  e?.target?.value ?? "",
                )
              }}
            />
          </EditorSubSortTwoColumnGrid>
        </SortableSubListItem>
      )}
    />
  )
})
