import { Input } from "@app/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileContactsFormProps {
  sectionIdx: number
}

export function ProfileContactsForm({ sectionIdx }: ProfileContactsFormProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["contacts", "list"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleTypeChange = useCallback(
    (contactIdx: number, value: string) => {
      if (section.type === "profile") {
        const currentContact = section.contacts.list[contactIdx]
        updateItem(sectionIdx, ["contacts", "list"], contactIdx, {
          ...currentContact,
          type: value,
          value: "",
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleValueChange = useCallback(
    (contactIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "profile") {
        const currentContact = section.contacts.list[contactIdx]
        updateItem(sectionIdx, ["contacts", "list"], contactIdx, {
          ...currentContact,
          value: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDelete = useCallback(
    (contactIdx: number) => {
      removeItem(sectionIdx, ["contacts", "list"], contactIdx)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "profile") return null

  return (
    <EditorSortProvider data={section.contacts.list} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(contact: any, contactIdx: number) => (
          <EditorSubSortItem
            id={contact.id}
            key={contact.id}
            onDelete={() => handleDelete(contactIdx)}
          >
            <EditorSubSortTwoColumnGrid>
              <Select
                value={contact.type}
                onValueChange={(val) => handleTypeChange(contactIdx, val)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTACT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input value={contact.value} onChange={(e) => handleValueChange(contactIdx, e)} />
            </EditorSubSortTwoColumnGrid>
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
