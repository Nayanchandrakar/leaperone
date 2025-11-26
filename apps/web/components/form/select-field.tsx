import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useFieldContext } from "@/components/ui/app-form"
import type { SelectOption } from "@/features/bussiness/types"

type SelectFieldProps = {
  label?: string
  options: SelectOption[]
}

export const SelectField = ({ label, options }: SelectFieldProps) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Select
        name={field.name}
        value={field.state.value ?? ""}
        onValueChange={field.handleChange}
        defaultValue={field.state.value ?? ""}
      >
        <SelectTrigger
          id={field.name}
          className="bg-white"
          aria-invalid={isInvalid}
          onBlur={field.handleBlur}
        >
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={`select-item-${index}`} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
