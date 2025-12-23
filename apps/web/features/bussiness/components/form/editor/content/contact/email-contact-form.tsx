import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface EmailContactFormProps {
  contactIdx: number
  index: number
}

export const EmailContactForm = memo(({ contactIdx, index }: EmailContactFormProps) => {
  const [label, setLabel] = useSubSectionField<string>(index, contactIdx, ["items"], ["label"])
  const [email, setEmail] = useSubSectionField<string>(index, contactIdx, ["items"], ["url"])

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e?.target?.value ?? "")
    },
    [setLabel],
  )

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e?.target?.value ?? "")
    },
    [setEmail],
  )

  return (
    <EditorSubSortTwoColumnGrid>
      <Field>
        <FieldLabel>Label</FieldLabel>
        <Input value={label} onChange={handleLabelChange} />
      </Field>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input value={email} onChange={handleEmailChange} />
      </Field>
    </EditorSubSortTwoColumnGrid>
  )
})

EmailContactForm.displayName = "EmailContactForm"
