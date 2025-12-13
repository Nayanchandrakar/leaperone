import type { ContactDetailsSection, EmailLink } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface EmailContactFormProps {
  contactIdx: number
  index: number
}

export function EmailContactForm({ contactIdx, index }: EmailContactFormProps) {
  const { section, updateItem } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ContactDetailsSection,
      updateItem: state.updateItem,
    })),
  )

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentItem = section.items[contactIdx]
      updateItem(index, ["items"], contactIdx, {
        ...currentItem,
        label: e.target.value,
      })
    },
    [section, index, contactIdx, updateItem],
  )

  const handleUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentItem = section.items[contactIdx]
      updateItem(index, ["items"], contactIdx, {
        ...currentItem,
        url: e.target.value,
      })
    },
    [section, index, contactIdx, updateItem],
  )

  const item = section?.items[contactIdx] as EmailLink

  return (
    <EditorSubSortTwoColumnGrid>
      <Field>
        <FieldLabel>Label</FieldLabel>
        {/* @ts-expect-error - TODO: fix this */}
        <Input value={item?.label} onChange={handleLabelChange} />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input value={item?.url} onChange={handleUrlChange} />
      </Field>
    </EditorSubSortTwoColumnGrid>
  )
}
