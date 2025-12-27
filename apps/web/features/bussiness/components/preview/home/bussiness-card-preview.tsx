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

      <div className="h-140 w-full rounded-3xl border-8 border-black relative before:absolute before:content-[''] before:w-15 before:h-5 before:rounded-full before:bg-black before:top-2.5 before:left-1/2 before:-translate-x-1/2 overflow-hidden">
        <iframe
          className="size-full"
          title="bussiness card preview"
          src="http://localhost:3000/preview"
        />
      </div>

      <div className="space-y-3 [&>button]:w-full [&>button]:font-semibold">
        <Button>Save Card</Button>
        <Button variant="gray-outline">Reset to Template</Button>
      </div>
    </div>
  )
})
