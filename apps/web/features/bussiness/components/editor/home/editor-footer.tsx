import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorFooter = () => {
  const { selectedStep, goToPreviousStep } = useStepper()
  const formId = useMemo(() => CARD_STEPS[selectedStep]?.formId, [selectedStep])

  // Memoize computed step state to prevent unnecessary recalculations/rerenders
  const { canGoToNextStep, canGoToPreviousStep } = useMemo(() => {
    return {
      canGoToNextStep: selectedStep < 2,
      canGoToPreviousStep: selectedStep > 0,
    }
  }, [selectedStep])

  return (
    <div className="mt-7 flex items-center justify-between">
      {canGoToPreviousStep ? (
        <Button variant="green-outline" onClick={goToPreviousStep}>
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
