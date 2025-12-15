import { Button } from "@app/ui/components/button"
import { QrCodePreview, QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export default function QrCodeCardPreview() {
  const settings = useQrCodeEditorStore((state) => state.settings)
  return (
    <div className="space-y-4">
      <QrCodeProvider settings={settings}>
        <QrCodePreview />
      </QrCodeProvider>
      <Button className="w-full font-semibold">Save Card & Download QR</Button>
    </div>
  )
}
