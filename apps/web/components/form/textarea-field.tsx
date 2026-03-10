import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Textarea, type TextareaProps } from "@app/ui/components/textarea"
import { useFieldContext } from "@/components/ui/app-form"

export function TextareaField({
  label,
  variant,
  ...props
}: TextareaProps & {
  label: string
}) {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Textarea
        id={field.name}
        name={field.name}
        variant={variant}
        aria-invalid={isInvalid}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        {...props}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
