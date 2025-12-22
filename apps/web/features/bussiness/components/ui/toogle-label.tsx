import { FieldLabel } from "@app/ui/components/field"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { memo, useMemo } from "react"

export interface ToogleLabelProps {
  label: string
  isActive: boolean
  onToggle: (active: boolean) => void
  disabled?: boolean | undefined
}

export const ToogleLabel = memo(({ label, isActive, onToggle, disabled }: ToogleLabelProps) => {
  const RenderIcon = useMemo(() => (isActive ? EyeIcon : EyeOffIcon), [isActive])

  return (
    <div className="flex items-center gap-2">
      <FieldLabel>{label}</FieldLabel>
      <button
        type="button"
        tabIndex={0}
        disabled={disabled}
        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => !disabled && onToggle(!isActive)}
      >
        <RenderIcon className="size-4" aria-hidden />
      </button>
    </div>
  )
})
