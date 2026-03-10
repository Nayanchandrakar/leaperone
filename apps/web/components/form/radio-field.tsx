import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
import { useFieldContext } from "@/components/ui/app-form"
import type { RadioOption } from "@/features/bussiness/types"

type RadioFieldProps = {
  label?: string
  options: RadioOption[]
}

export function RadioField({ options, label }: RadioFieldProps) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldSet>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <RadioGroup
        name={field.name}
        value={field.state.value ?? ""}
        className="flex gap-4 flex-wrap"
        onValueChange={field.handleChange}
        defaultValue={field.state.value ?? ""}
      >
        {options.map((option, index) => (
          <Field
            className="w-fit"
            orientation="horizontal"
            data-invalid={isInvalid}
            key={`radio-item-${index}`}
          >
            <RadioGroupItem value={option.value} id={option.value} aria-invalid={isInvalid} />
            <FieldLabel htmlFor={option.value}>{option.label}</FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}
