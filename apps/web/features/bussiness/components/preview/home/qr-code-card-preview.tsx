import { Button } from "@app/ui/components/button"
import { Spinner } from "@app/ui/components/spinner"
import { memo } from "react"
import { useQRCode } from "@/features/bussiness/hooks/home/use-qr-code"
import { useSaveAndShareBusinessCard } from "@/features/bussiness/hooks/home/use-save-and-share-business-card"
import { useEditorState } from "@/features/bussiness/stores/use-editor-state"

const QrCodeCardPreview = () => {
  const { content, design, template, qrCode } = useEditorState()
  const { qrCodeRef } = useQRCode(qrCode)
  const { isFetching, isPending, handleSaveAndShare } = useSaveAndShareBusinessCard({
    design,
    qrCode,
    content,
    template,
  })

  const isDisabled = !!(isPending || isFetching)

  return (
    <div className="space-y-4">
      <div ref={qrCodeRef} className="flex-center" />
      <Button
        type="button"
        disabled={isDisabled}
        onClick={handleSaveAndShare}
        className="w-full font-semibold"
      >
        {isFetching ? (
          <>
            <Spinner /> Loading QR
          </>
        ) : (
          <span>Save Card & Download QR</span>
        )}
      </Button>
    </div>
  )
}

export default memo(QrCodeCardPreview)
