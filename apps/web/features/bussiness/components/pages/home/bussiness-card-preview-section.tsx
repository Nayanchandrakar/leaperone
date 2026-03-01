import { memo } from "react"
import { LazyQrCodeCardPreview, LazyShareBusinessCardDialog } from "@/components/shared/dynamic"
import { BusinessCardPreview } from "@/features/bussiness/components/preview/home/bussiness-card-preview"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"
import { useEditorStepper } from "@/features/bussiness/stores/use-editor-stepper"

export const CardPreviewSection = memo(() => {
  const { selectedStep } = useEditorStepper()
  return (
    <EditorWrapper className="md:sticky md:top-20">
      {selectedStep === 2 ? <LazyQrCodeCardPreview /> : <BusinessCardPreview />}
      <LazyShareBusinessCardDialog title="Card Saved Successfully!" showCheck />
    </EditorWrapper>
  )
})
