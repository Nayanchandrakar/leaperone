"use client"

import { Switch } from "@app/ui/components/switch"
import type { ReactNode } from "react"

interface PrivacySectionProps {
  useCustom: boolean
  onUseCustomChange: (value: boolean) => void
  urlField: ReactNode
  customTextField: ReactNode
}

export const PrivacySection = ({
  useCustom,
  onUseCustomChange,
  urlField,
  customTextField,
}: PrivacySectionProps) => {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-300 bg-muted p-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm text-zinc-800">Privacy Policy</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Add a URL link or custom text for your privacy policy
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
