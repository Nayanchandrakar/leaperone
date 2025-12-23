import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useEditorStepper } from "@/features/bussiness/stores/use-editor-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

const SCROLL_TARGET_ID = "hero-section"

export const useEditorStepperControls = () => {
  const { selectedStep, goToPreviousStep, goToNextStep } = useEditorStepper(
    useShallow((state) => ({
      selectedStep: state.selectedStep,
      goToNextStep: state.goToNextStep,
      goToPreviousStep: state.goToPreviousStep,
    })),
  )

  const { canGoToNextStep, canGoToPreviousStep } = useMemo(
    () => ({
      canGoToNextStep: selectedStep < 2,
      canGoToPreviousStep: selectedStep > 0,
    }),
    [selectedStep],
  )

  const handlePreviousStep = useCallback(() => {
    if (canGoToPreviousStep) {
      goToPreviousStep()
      scrollToElement(SCROLL_TARGET_ID)
    }
  }, [canGoToPreviousStep, goToPreviousStep])

  const handleNextStep = useCallback(() => {
    if (canGoToNextStep) {
      goToNextStep()
      scrollToElement(SCROLL_TARGET_ID)
    }
  }, [canGoToNextStep, goToNextStep])

  return {
    selectedStep,
    canGoToNextStep,
    canGoToPreviousStep,
    handlePreviousStep,
    handleNextStep,
  }
}
