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

interface ProfileContactsFormProps {
  index: number
}

export const ProfileContactsForm = memo(({ index }: ProfileContactsFormProps) => {
  const { list, updateSubSectionField, removeSubSectionItem } = useContentEditorStore(
    useShallow((state) => ({
      updateSubSectionField: state.updateSubSectionField,
      removeSubSectionItem: state.removeSubSectionItem,
      list: (state.sections[index] as ProfileCardSection).contacts.list,
    })),
  )

  return (
    <SortableList
      items={list}
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
                onValueChange={(val) =>
                  updateSubSectionField(index, contactIndex, ["contacts", "list"], ["type"], val)
                }
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
              onChange={(e) =>
                updateSubSectionField(
                  index,
                  contactIndex,
                  ["contacts", "list"],
                  ["value"],
                  e?.target?.value ?? "",
                )
              }
            />
          </EditorSubSortTwoColumnGrid>
        </SortableSubListItem>
      )}
    />
  )
})
