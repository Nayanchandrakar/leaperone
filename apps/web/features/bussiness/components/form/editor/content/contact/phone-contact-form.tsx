import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface PhoneContactFormProps {
  contactIdx: number
  sectionIdx: number
}

export function PhoneContactForm({ contactIdx, sectionIdx }: PhoneContactFormProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        updateItem(sectionIdx, ["items"], contactIdx, {
          ...currentItem,
          label: e.target.value,
        })
      }
    },
    [section, sectionIdx, contactIdx, updateItem],
  )

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "contact-details") {
        const currentItem = section.items[contactIdx]
        updateItem(sectionIdx, ["items"], contactIdx, {
          ...currentItem,
          url: e.target.value,
        })
      }
    },
    [section, sectionIdx, contactIdx, updateItem],
  )

  if (section.type !== "contact-details") return null
  const item = section.items[contactIdx]
  if (item.type !== "phone") return null

  return (
    <EditorSubSortTwoColumnGrid>
      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-label`}>Label</FieldLabel>
        <Input id={`contact-${contactIdx}-label`} value={item.label} onChange={handleLabelChange} />
      </Field>

      <Field>
        <FieldLabel htmlFor={`contact-${contactIdx}-url`}>Phone Number</FieldLabel>
        <Input id={`contact-${contactIdx}-url`} value={item.url} onChange={handleUrlChange} />
      </Field>
    </EditorSubSortTwoColumnGrid>
  )
}
