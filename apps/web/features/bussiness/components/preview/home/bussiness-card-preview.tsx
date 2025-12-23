import { Button } from "@app/ui/components/button"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { Iphone } from "@/features/bussiness/components/ui/iphone"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

export const BusinessCardPreview = memo(() => {
  const sections = useContentEditorStore(useShallow((state) => state.sections))
  return (
    <div className="space-y-5 max-w-xs mx-auto">
      <div className="flex items-center justify-center gap-2">
        <span className="text-medium text-sm text-muted-foreground">Form Pop Up Preview Mode</span>
        <Switch />
      </div>

      <Iphone className="overflow-y-scroll p-4">{JSON.stringify(sections)}</Iphone>

      <div className="space-y-3 [&>button]:w-full [&>button]:font-semibold">
        <Button>Save Card</Button>
        <Button variant="gray-outline">Reset to Template</Button>
      </div>
    </div>
  )
})
