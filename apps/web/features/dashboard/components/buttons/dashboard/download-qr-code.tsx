import { Button } from "@app/ui/components/button"
import { QrCodePreview, useQrCodeContext } from "@/features/bussiness/components/ui/qr-code"

type DownloadQRCodeProps = {
  name: string
}

export const DownloadQRCode = ({ name }: DownloadQRCodeProps) => {
  const { qrCodeInstance } = useQrCodeContext()
  return (
    <>
      <QrCodePreview />
      <Button
        variant="green-outline"
        className="w-full font-bold"
        onClick={() => {
          qrCodeInstance?.download({
            name,
            extension: "png",
          })
        }}
      >
        Download QR
      </Button>
    </>
  )
}
