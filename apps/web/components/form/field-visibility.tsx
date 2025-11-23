import { FieldLabel } from "@app/ui/components/field"
import { EyeIcon, EyeOffIcon } from "lucide-react"

type FieldVisibilityProps = {
  label: string
  visible: boolean
  onVisibleChange?: (visible: boolean) => void
}

export const FieldVisibility = ({ label, visible, onVisibleChange }: FieldVisibilityProps) => {
  const Icon = visible ? EyeIcon : EyeOffIcon

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}</FieldLabel>
      <button type="button" onClick={() => onVisibleChange?.(!visible)} className="cursor-pointer">
        <Icon className="size-4" />
      </button>
    </div>
  )
}
