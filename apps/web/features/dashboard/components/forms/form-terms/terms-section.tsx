import { Switch } from "@app/ui/components/switch"
import type { ReactNode } from "react"

interface TermsSectionProps {
  useCustom: boolean
  onUseCustomChange: (value: boolean) => void
  urlField: ReactNode
  customTextField: ReactNode
}

export const TermsSection = ({
  useCustom,
  onUseCustomChange,
  urlField,
  customTextField,
}: TermsSectionProps) => {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-300 bg-muted p-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm text-zinc-800">Terms & Conditions</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Add a URL link or custom text for your terms and conditions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Use custom</span>
          <Switch checked={useCustom} onCheckedChange={onUseCustomChange} />
        </div>
      </div>

      <div className="space-y-4 pt-2">{useCustom ? customTextField : urlField}</div>
    </div>
  )
}
