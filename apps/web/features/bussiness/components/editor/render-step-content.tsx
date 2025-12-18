import { LazyContentEditor, LazyDesignEditor, LazyQrCodeEditor } from "@/components/shared/dynamic"
import { useEditorStepper } from "@/features/bussiness/stores/use-editor-stepper"

export const RenderStepContent = () => {
  const { selectedStep } = useEditorStepper()

  switch (selectedStep) {
    case 0:
      return <LazyContentEditor />
    case 1:
      return <LazyDesignEditor />
    case 2:
      return <LazyQrCodeEditor />
    default:
      return null
  }
}
