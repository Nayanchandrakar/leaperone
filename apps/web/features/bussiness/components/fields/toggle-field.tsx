import { Field } from "@app/ui/components/field"
import { Input, type InputProps } from "@app/ui/components/input"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"

interface ToggleFieldProps extends InputProps {
  label: string
  enabled: boolean
  placeholder?: string
  fieldClassName?: string
  onValueChange: (value: string) => void
  onEnabledChange: (checked: boolean) => void
}

export const ToggleField = ({
  label,
  enabled,
  placeholder,
  onValueChange,
  fieldClassName,
  onEnabledChange,
  ...props
}: ToggleFieldProps) => {
  return (
    <Field className={fieldClassName}>
      <ToogleLabel label={label} isActive={enabled} onToggle={onEnabledChange} />
      <Input onChange={(e) => onValueChange(e?.target?.value)} variant="gray" {...props} />
    </Field>
  )
}
