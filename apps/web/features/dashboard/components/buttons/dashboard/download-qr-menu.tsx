import type { QrCodeEditor } from "@app/types"

import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import QRCodeStyling from "qr-code-styling"
import { useCallback, useMemo } from "react"
import { useQrCodeOptions } from "@/features/bussiness/hooks/home/use-qr-code-options"

type DownloadQRMenuProps = {
  identifier: string
  qrCodeOptions: Partial<QrCodeEditor>
}

export const DownloadQRMenu = ({ identifier, qrCodeOptions }: DownloadQRMenuProps) => {
  const options = useQrCodeOptions(qrCodeOptions)
  const qrCodeInstance = useMemo(() => new QRCodeStyling(options), [options])

  const handleDownloadQR = useCallback(() => {
    qrCodeInstance.download({
      name: identifier,
      extension: "png",
    })
  }, [qrCodeInstance, identifier])

  return <DropdownMenuItem onClick={handleDownloadQR}>Download QR</DropdownMenuItem>
}
