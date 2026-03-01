import type { QrCodeEditor } from "@app/types"
import { Button } from "@app/ui/components/button"
import { useQRCode } from "@/features/bussiness/hooks/home/use-qr-code"

type DownloadQRCodeProps = {
  name: string
  options: QrCodeEditor
}

export const DownloadQRCode = ({ name, options }: DownloadQRCodeProps) => {
  const { qrCodeRef, qrCodeInstance } = useQRCode(options)

  return (
    <>
      <div ref={qrCodeRef} className="flex-center" />
      <Button
        variant="green-outline"
        className="w-full font-bold"
        onClick={() => qrCodeInstance?.download({ name })}
      >
        Download QR
      </Button>
    </>
  )
}
