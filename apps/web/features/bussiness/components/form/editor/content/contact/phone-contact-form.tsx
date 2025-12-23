import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface PhoneContactFormProps {
  contactIdx: number
  index: number
}

export const PhoneContactForm = memo(({ contactIdx, index }: PhoneContactFormProps) => {
  const [label, setLabel] = useSubSectionField<string>(index, contactIdx, ["items"], ["label"])
  const [phone, setPhone] = useSubSectionField<string>(index, contactIdx, ["items"], ["url"])

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLabel(e?.target?.value ?? "")
    },
    [setLabel],
  )

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(e?.target?.value ?? "")
    },
    [setPhone],
  )

  return (
    <EditorSubSortTwoColumnGrid>
      <Field>
        <FieldLabel>Label</FieldLabel>
        <Input value={label} onChange={handleLabelChange} />
      </Field>

      <Field>
        <FieldLabel>Phone Number</FieldLabel>
        <Input value={phone} onChange={handlePhoneChange} />
      </Field>
    </EditorSubSortTwoColumnGrid>
  )
})

PhoneContactForm.displayName = "PhoneContactForm"
