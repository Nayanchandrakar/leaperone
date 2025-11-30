import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input, type InputProps } from "@app/ui/components/input"
import { useFieldContext } from "@/components/ui/app-form"

type TextFieldProps = Pick<InputProps, "variant"> & {
  label?: string
  placeholder?: string
}

export const TextField = ({ label, variant, placeholder }: TextFieldProps) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        id={field.name}
        name={field.name}
        variant={variant}
        aria-invalid={isInvalid}
        placeholder={placeholder}
        onBlur={field.handleBlur}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
