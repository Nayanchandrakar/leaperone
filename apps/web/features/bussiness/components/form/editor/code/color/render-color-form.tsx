import { memo } from "react"
import { QrGradientColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-gradient-color-form"
import { QrSingleColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-single-color-form"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

const COLOR_FORM_RENDERERS = {
  single: QrSingleColorForm,
  gradient: QrGradientColorForm,
}

export const RenderQrColorForm = memo(() => {
  const selectedFillType = useQrCodeEditorStore((state) => state.settings?.fill?.type)
  const SelectedColorForm = COLOR_FORM_RENDERERS[selectedFillType]

  if (!selectedFillType) return null

  return <SelectedColorForm />
})
