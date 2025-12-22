import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"

interface ToggleFieldProps {
  label: string
  value: string
  enabled: boolean
  placeholder?: string
  onValueChange: (value: string) => void
  onEnabledChange: (checked: boolean) => void
}

export const ToggleField = ({
  label,
  enabled,
  value = "",
  placeholder,
  onValueChange,
  onEnabledChange,
}: ToggleFieldProps) => {
  return (
    <Field>
      <ToogleLabel label={label} isActive={enabled} onToggle={onEnabledChange} />
      <Input
        variant="gray"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onValueChange(e.target.value)}
      />
    </Field>
  )
}
