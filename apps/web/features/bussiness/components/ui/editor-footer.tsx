import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { memo } from "react"
import { useEditorStepperControls } from "@/features/bussiness/hooks/home/use-stepper-controls"

export const EditorFooter = memo(() => {
  const { canGoToPreviousStep, handlePreviousStep, canGoToNextStep, handleNextStep } =
    useEditorStepperControls()

  return (
    <div className="mt-7 flex items-center justify-between">
      {canGoToPreviousStep ? (
        <Button variant="green-outline" onClick={handlePreviousStep}>
          <ArrowLeft />
          Previous Step
        </Button>
      ) : (
        <span />
      )}

      {canGoToNextStep && (
        <Button onClick={handleNextStep} className="px-8">
          Next Step
          <ArrowRight />
        </Button>
      )}
    </div>
  )
})
