import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input, type InputProps } from "@app/ui/components/input"
import { useFieldContext } from "@/components/ui/app-form"

type TextFieldProps = InputProps & {
  label?: string
}

export const TextField = ({ label, className, ...props }: TextFieldProps) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid} className={className}>
      {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}
      <Input
        id={field.name}
        name={field.name}
        aria-invalid={isInvalid}
        onBlur={field.handleBlur}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
