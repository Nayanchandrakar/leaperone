import { Button } from "@app/ui/components/button"
import { Switch } from "@app/ui/components/switch"
import { Iphone } from "@/features/bussiness/components/ui/iphone"

export const BizCardPreview = () => {
  return (
    <div className="space-y-5 max-w-xs mx-auto">
      <div className="flex items-center justify-center gap-2">
        <span className="text-medium text-sm text-muted-foreground">Form Pop Up Preview Mode</span>
        <Switch />
      </div>

      <Iphone />

      <div className="space-y-3 [&>button]:w-full [&>button]:font-semibold">
        <Button>Save Card</Button>
        <Button variant="gray-outline">Reset to Template</Button>
      </div>
    </div>
  )
}
