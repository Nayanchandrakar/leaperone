import { useCallback, useMemo } from "react"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

export const useStepperControls = () => {
  const { selectedStep, goToPreviousStep } = useStepper()

  const formId = useMemo(() => {
    return CARD_STEPS[selectedStep]?.formId
  }, [selectedStep])

  const { canGoToNextStep, canGoToPreviousStep } = useMemo(() => {
    return {
      canGoToNextStep: selectedStep < 2,
      canGoToPreviousStep: selectedStep > 0,
    }
  }, [selectedStep])

  const handlePreviousStep = useCallback(() => {
    goToPreviousStep()
    scrollToElement("hero-section")
  }, [goToPreviousStep])

  return { formId, canGoToNextStep, canGoToPreviousStep, handlePreviousStep }
}
