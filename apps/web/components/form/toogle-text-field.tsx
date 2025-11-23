import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Input, type InputProps } from "@app/ui/components/input"
import { useFieldContext } from "@/components/ui/app-form"

type TextFieldProps = Pick<InputProps, "variant"> & {
  label: string
}

export const TextField = ({ label, variant }: TextFieldProps) => {
  const field = useFieldContext<string>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        variant={variant}
        aria-invalid={isInvalid}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
