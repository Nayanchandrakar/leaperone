import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useStepperControls } from "@/features/bussiness/hooks/home/use-stepper-controls"

export const EditorFooter = () => {
  const { canGoToPreviousStep, handlePreviousStep, canGoToNextStep, handleNextStep } =
    useStepperControls()

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
}
