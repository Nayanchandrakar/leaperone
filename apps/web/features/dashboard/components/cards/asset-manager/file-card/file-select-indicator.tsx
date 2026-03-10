import { Check } from "lucide-react"

interface FileSelectIndicatorProps {
  isSelected: boolean
}

export function FileSelectIndicator({ isSelected }: FileSelectIndicatorProps) {
  if (!isSelected) return null

  return (
    <span className="absolute -top-3 -left-3 bg-primary rounded-full text-white size-4 flex items-center justify-center">
      <Check className="size-3 stroke-3" />
    </span>
  )
}
