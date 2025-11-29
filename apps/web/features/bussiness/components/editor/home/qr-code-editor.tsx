import { QrCodePreview, QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"

export default function QrCodeEditor() {
  return (
    <div>
      <QrCodeProvider settings={{}}>
        <QrCodePreview />
      </QrCodeProvider>
    </div>
  )
}
