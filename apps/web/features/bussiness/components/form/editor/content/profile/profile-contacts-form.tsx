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
import { memo, useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileContactsFormProps {
  index: number
}

export const ProfileContactsForm = memo(({ index }: ProfileContactsFormProps) => {
  const { section, moveItem, updateItem, removeItem } = useContentEditorStore(
    useShallow((state) => ({
      moveItem: state.moveItem,
      updateItem: state.updateItem,
      removeItem: state.removeItem,
      section: state.sections[index] as ProfileCardSection,
    })),
  )

  const handleTypeChange = useCallback(
    (contactIdx: number, value: string) => {
      const currentContact = section.contacts.list[contactIdx]
      updateItem(index, ["contacts", "list"], contactIdx, {
        ...currentContact,
        type: value,
        value: "",
      })
    },
    [section, index, updateItem],
  )

  const handleValueChange = useCallback(
    (contactIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const currentContact = section.contacts.list[contactIdx]
      updateItem(index, ["contacts", "list"], contactIdx, {
        ...currentContact,
        value: e.target.value,
      })
    },
    [section, index, updateItem],
  )

  const handleDelete = useCallback(
    (contactIdx: number) => {
      removeItem(index, ["contacts", "list"], contactIdx)
    },
    [index, removeItem],
  )

  return (
    <SortableList
      items={section.contacts.list}
      onOrderChange={(fromIndex, toIndex) => {
        moveItem(index, ["contacts", "list"], fromIndex, toIndex)
      }}
      renderItem={(contact, contactIndex) => (
        <SortableSubListItem
          key={contact?.id}
          itemId={contact?.id}
          onItemDelete={() => handleDelete(index)}
        >
          <EditorSubSortTwoColumnGrid>
            <Field>
              <Select
                value={contact.type}
                onValueChange={(val) => handleTypeChange(contactIndex, val)}
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
            <Input value={contact.value} onChange={(e) => handleValueChange(contactIndex, e)} />
          </EditorSubSortTwoColumnGrid>
        </SortableSubListItem>
      )}
    />
  )
})
