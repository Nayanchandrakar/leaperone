import { LazyContentEditor, LazyDesignEditor, LazyQrCodeEditor } from "@/components/shared/dynamic"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorStepForm = () => {
  const { selectedStep } = useStepper()

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
