import type { QrCodeEditor } from "@app/core/types"
import QRCodeStyling from "qr-code-styling"
import type React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useQrCodeOptions } from "@/features/bussiness/hooks/home/use-qr-code-options"

type QrCodeContextValue = {
  containerRef: React.RefObject<HTMLDivElement | null>
}

type QrCodeProviderProps = {
  children: React.ReactNode
  settings: Partial<QrCodeEditor>
}

const QrCodeContext = createContext<QrCodeContextValue | null>(null)

export const useQrCodeContext = () => {
  const context = useContext(QrCodeContext)
  if (!context) {
    throw new Error("useQrCodeContext must be used within QrCodeContext")
  }
  return context
}

export const QrCodeProvider = ({ children, settings }: QrCodeProviderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [qrCodeInstance, setQrCodeInstance] = useState<QRCodeStyling | undefined>(undefined)

  // Compute QR code options from settings
  const qrCodeOptions = useQrCodeOptions(settings)

  // Initialize QRCodeStyling instance if it doesn't exist
  useEffect(() => {
    if (!qrCodeInstance) {
      setQrCodeInstance(new QRCodeStyling(qrCodeOptions))
    }
  }, [qrCodeInstance, qrCodeOptions])

  // Append QR code to DOM when the instance is ready
  useEffect(() => {
    if (containerRef.current && qrCodeInstance) {
      containerRef.current.innerHTML = ""
      qrCodeInstance.append(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [qrCodeInstance])

  // Update QR code when options change, if instance exists
  useEffect(() => {
    if (qrCodeInstance) {
      qrCodeInstance.update(qrCodeOptions)
    }
  }, [qrCodeInstance, qrCodeOptions])

  const downloadQrCode = () => {
    if (qrCodeInstance) {
      qrCodeInstance.download({ name: "qr-code.png", extension: "svg" })
    }
  }

  return (
    <QrCodeContext.Provider value={{ containerRef, downloadQrCode }}>
      {children}
    </QrCodeContext.Provider>
  )
}

export const QrCodePreview = () => {
  const { containerRef } = useQrCodeContext()
  return <div ref={containerRef} />
}
