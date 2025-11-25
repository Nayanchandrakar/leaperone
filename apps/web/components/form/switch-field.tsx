import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { useFieldContext } from "@/components/ui/app-form"

type SwitchFieldProps = {
  label: string
}

export const SwitchField = ({ label }: SwitchFieldProps) => {
  const field = useFieldContext<boolean>()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <Field orientation="horizontal" className="w-fit" data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Switch
        id={field.name}
        name={field.name}
        checked={field.state.value}
        onCheckedChange={field.handleChange}
        aria-invalid={isInvalid}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}
