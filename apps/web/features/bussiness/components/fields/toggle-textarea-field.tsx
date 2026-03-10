import { Field } from "@app/ui/components/field"
import { Textarea, type TextareaProps } from "@app/ui/components/textarea"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"

interface ToggleTextareaFieldProps extends TextareaProps {
  label: string
  enabled: boolean
  placeholder?: string
  fieldClassName?: string
  onValueChange: (value: string) => void
  onEnabledChange: (checked: boolean) => void
}

export function ToggleTextareaField({
  label,
  enabled,
  placeholder,
  onValueChange,
  fieldClassName,
  onEnabledChange,
  ...props
}: ToggleTextareaFieldProps) {
  return (
    <Field className={fieldClassName}>
      <ToogleLabel label={label} isActive={enabled} onToggle={onEnabledChange} />
      <Textarea onChange={(e) => onValueChange(e?.target?.value)} {...props} />
    </Field>
  )
}
