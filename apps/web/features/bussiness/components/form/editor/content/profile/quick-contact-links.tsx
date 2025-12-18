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

interface QuickContactLinksForm {
  index: number
}

export const QuickContactLinksForm = memo(({ index }: QuickContactLinksForm) => {
  const { contactLists, updateSubSectionField, removeSubSectionItem, moveSubSection } =
    useContentEditorStore(
      useShallow((state) => ({
        moveSubSection: state.moveSubSection,
        updateSubSectionField: state.updateSubSectionField,
        removeSubSectionItem: state.removeSubSectionItem,
        contactLists: (state.sections[index] as ProfileCardSection)?.contacts?.list,
      })),
    )

  return (
    <SortableList
      items={contactLists}
      onReorder={(fromIndex, toIndex) => {
        moveSubSection(index, ["contacts", "list"], fromIndex, toIndex)
      }}
      renderItem={(contact, contactIndex) => (
        <SortableSubListItem
          key={contact?.id}
          itemId={contact?.id}
          onItemDelete={() => removeSubSectionItem(index, contactIndex, ["contacts", "list"])}
        >
          <EditorSubSortTwoColumnGrid>
            <Field>
              <Select
                value={contact?.type}
                onValueChange={(val) => {
                  updateSubSectionField(index, contactIndex, ["contacts", "list"], ["type"], val)
                }}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
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
                  contactIndex,
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
