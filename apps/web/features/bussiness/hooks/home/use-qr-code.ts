import type { QrCodeEditor } from "@app/types"
import QRCodeStyling from "qr-code-styling"
import { useEffect, useRef, useState } from "react"
import { useQrCodeOptions } from "@/features/bussiness/hooks/home/use-qr-code-options"

export const useQRCode = (options: Partial<QrCodeEditor>) => {
  const qrCodeOptions = useQrCodeOptions(options)
  const qrCodeRef = useRef<HTMLDivElement | null>(null)
  const [qrCodeInstance, setQrCodeInstance] = useState<QRCodeStyling | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: only on mount/unmount
  useEffect(() => {
    const instance = new QRCodeStyling(qrCodeOptions)
    setQrCodeInstance(instance)
    return () => setQrCodeInstance(null)
  }, [])

  useEffect(() => {
    if (qrCodeRef.current && qrCodeInstance) {
      qrCodeRef.current.innerHTML = ""
      qrCodeInstance.append(qrCodeRef.current)
    }

    return () => {
      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = ""
      }
    }
  }, [qrCodeInstance])

  useEffect(() => {
    if (qrCodeInstance) {
      qrCodeInstance.update(qrCodeOptions)
    }
  }, [qrCodeInstance, qrCodeOptions])

  return { qrCodeInstance, qrCodeRef }
}
