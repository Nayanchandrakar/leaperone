import { Button } from "@app/ui/components/button"
import { QrCodePreview, QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export default function QrCodeCardPreview() {
  const options = useQrCodeEditorStore((state) => state.settings)

  console.log(options)

  return (
    <div className="space-y-4">
      <QrCodeProvider options={options}>
        <QrCodePreview />
      </QrCodeProvider>
      <Button className="w-full font-semibold">Save Card & Download QR</Button>
    </div>
  )
}
