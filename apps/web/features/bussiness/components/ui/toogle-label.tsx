import { FieldLabel } from "@app/ui/components/field"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { memo, useMemo } from "react"

export interface ToogleLabelProps {
  label: string
  isActive: boolean
  onToggle: (active: boolean) => void
}

export const ToogleLabel = memo(({ label, isActive, onToggle }: ToogleLabelProps) => {
  const RenderIcon = useMemo(() => (isActive ? EyeIcon : EyeOffIcon), [isActive])

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}</FieldLabel>
      <button
        type="button"
        tabIndex={0}
        className="cursor-pointer"
        onClick={() => onToggle(!isActive)}
      >
        <RenderIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
})
