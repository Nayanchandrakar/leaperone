import type { ContactDetailsSection, EmailLink } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface EmailContactFormProps {
  contactIdx: number
  index: number
}

export const EmailContactForm = memo(({ contactIdx, index }: EmailContactFormProps) => {
  const { item, updateSubSectionField } = useContentEditorStore(
    useShallow((state) => ({
      updateSubSectionField: state.updateSubSectionField,
      item: (state.sections[index] as ContactDetailsSection).items[contactIdx] as EmailLink,
    })),
  )

  return (
    <EditorSubSortTwoColumnGrid>
      <Field>
        <FieldLabel>Label</FieldLabel>
        <Input
          // @ts-expect-error - TODO: fix this
          value={item?.label}
          onChange={(e) =>
            updateSubSectionField(index, contactIdx, ["items"], ["label"], e?.target?.value ?? "")
          }
        />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          value={item?.url}
          onChange={(e) =>
            updateSubSectionField(index, contactIdx, ["items"], ["url"], e?.target?.value ?? "")
          }
        />
      </Field>
    </EditorSubSortTwoColumnGrid>
  )
})
