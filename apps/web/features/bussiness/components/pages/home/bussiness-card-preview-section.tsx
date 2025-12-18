import { LazyQrCodeCardPreview } from "@/components/shared/dynamic"
import { BusinessCardPreview } from "@/features/bussiness/components/preview/home/bussiness-card-preview"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"
import { useEditorStepper } from "@/features/bussiness/stores/use-editor-stepper"

export const CardPreviewSection = () => {
  const { selectedStep } = useEditorStepper()
  return (
    <EditorWrapper>
      {selectedStep === 2 ? <LazyQrCodeCardPreview /> : <BusinessCardPreview />}
    </EditorWrapper>
  )
}
