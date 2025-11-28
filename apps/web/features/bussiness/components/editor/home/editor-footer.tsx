import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useStepperControls } from "@/features/bussiness/hooks/home/use-stepper-controls"

export const EditorFooter = () => {
  const { formId, canGoToNextStep, canGoToPreviousStep, handlePreviousStep } = useStepperControls()

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
        <Button type="submit" form={formId} className="px-8">
          Next Step
          <ArrowRight />
        </Button>
      )}
    </div>
  )
}
