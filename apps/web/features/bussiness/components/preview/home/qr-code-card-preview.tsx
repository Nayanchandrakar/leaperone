import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { QrCodePreview, QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export default function QrCodeCardPreview() {
  const content = useContentEditorStore(
    useShallow((state) => ({
      template: state.template,
      sections: state.sections,
    })),
  )

  const design = useDesignEditorStore((state) => state.config)
  const options = useQrCodeEditorStore((state) => state.settings)

  console.log(content, design)

  return (
    <div className="space-y-4">
      <QrCodeProvider options={options}>
        <QrCodePreview />
      </QrCodeProvider>
      <Button className="w-full font-semibold">Save Card & Download QR</Button>
    </div>
  )
}
