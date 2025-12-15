import { memo } from "react"
import { QrGradientColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-gradient-color-form"
import { QrSingleColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-single-color-form"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

const COLOR_FORM_RENDERERS = {
  single: QrSingleColorForm,
  gradient: QrGradientColorForm,
}

export const RenderQrColorForm = memo(() => {
  const fillSettings = useQrCodeEditorStore((state) => state.settings.fill)
  const ColorFormComponent = COLOR_FORM_RENDERERS[fillSettings?.type]

  if (!ColorFormComponent) return null

  return <ColorFormComponent />
})
