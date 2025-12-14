import { Button } from "@app/ui/components/button"
import { QrCodePreview, QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"

export default function QrCodeCardPreview() {
  return (
    <div className="space-y-4">
      <QrCodeProvider
        settings={{
          data: "https://www.leaperone.com",
          patternStyle: "square",
        }}
      >
        <QrCodePreview />
      </QrCodeProvider>
      <Button className="w-full font-semibold">Save Card & Download QR</Button>
    </div>
  )
}
