import type { QrCodeEditor } from "@app/types"
import { Button } from "@app/ui/components/button"
import { useEffect, useEffectEvent } from "react"
import { useQRCode } from "@/features/bussiness/hooks/home/use-qr-code"

type DownloadQRCodeProps = {
  name: string
  options: QrCodeEditor
  autoDownload?: boolean
}

export function DownloadQRCode({ name, options, autoDownload }: DownloadQRCodeProps) {
  const { qrCodeRef, qrCodeInstance } = useQRCode(options)

  const handleDownload = useEffectEvent(() => {
    qrCodeInstance?.download({ name })
  })

  useEffect(() => {
    if (autoDownload) handleDownload()
  }, [autoDownload])

  return (
    <>
      <div ref={qrCodeRef} className="flex-center" />
      <Button variant="green-outline" className="w-full font-bold" onClick={handleDownload}>
        Download QR
      </Button>
    </>
  )
}
