import { Button } from "@app/ui/components/button"
import { Spinner } from "@app/ui/components/spinner"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { Iphone } from "@/features/bussiness/components/ui/iphone"
import { useResetBusinessCard } from "@/features/bussiness/hooks/home/use-reset-business-card"
import { useSaveAndShareBusinessCard } from "@/features/bussiness/hooks/home/use-save-and-share-business-card"
import { useEditorState } from "@/features/bussiness/stores/use-editor-state"
import { MobileSandbox } from "@/features/preview/components/ui/mobile-sandbox"

export const BusinessCardPreview = memo(() => {
  const resetBusinessCard = useResetBusinessCard()
  const { content, design, qrCode, template } = useEditorState()
  const { isFetching, isPending, handleSaveAndShare } = useSaveAndShareBusinessCard({
    design,
    qrCode,
    content,
    template,
  })

  const isDisabled = !!(isPending || isFetching)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-2">
        <span className="text-medium text-sm text-muted-foreground">Form Pop Up Preview Mode</span>
        <Switch />
      </div>
      <Iphone>
        <MobileSandbox />
      </Iphone>
      <div className="space-y-3 [&>button]:w-full [&>button]:font-semibold">
        <Button disabled={isDisabled} onClick={() => handleSaveAndShare()}>
          {isFetching ? (
            <>
              <Spinner />
              Loading Card
            </>
          ) : (
            <span>Save Card</span>
          )}
        </Button>
        <Button disabled={isDisabled} variant="gray-outline" onClick={resetBusinessCard}>
          Reset to Template
        </Button>
      </div>
    </div>
  )
})
