import { Button } from "@app/ui/components/button"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"

export const BusinessCardPreview = memo(() => {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2">
        <span className="text-medium text-sm text-muted-foreground">Form Pop Up Preview Mode</span>
        <Switch />
      </div>

      <div className="space-y-3 [&>button]:w-full [&>button]:font-semibold">
        <Button>Save Card</Button>
        <Button variant="gray-outline">Reset to Template</Button>
      </div>
    </div>
  )
})
