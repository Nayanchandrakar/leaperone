import { LazyQrCodeCardPreview } from "@/components/shared/dynamic"
import { BusinessCardPreview } from "@/features/bussiness/components/preview/home/bussiness-card-preview"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorPreviewPanel = () => {
  const { selectedStep } = useStepper()
  return (
    <EditorWrapper>
      {selectedStep === 2 ? <LazyQrCodeCardPreview /> : <BusinessCardPreview />}
    </EditorWrapper>
  )
}
