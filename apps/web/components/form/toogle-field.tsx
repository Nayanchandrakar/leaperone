import { FieldLabel } from "@app/ui/components/field"
import { EyeIcon, EyeOffIcon } from "lucide-react"

type ToggleFieldProps = {
  label: string
  value: boolean
  onClick: (newValue: boolean) => void
}

export const ToggleField = ({ label, value, onClick }: ToggleFieldProps) => {
  const IconComponent = value ? EyeIcon : EyeOffIcon

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}</FieldLabel>
      <button tabIndex={0} type="button" className="cursor-pointer" onClick={() => onClick(!value)}>
        <IconComponent className="size-4" aria-hidden />
      </button>
    </div>
  )
}
