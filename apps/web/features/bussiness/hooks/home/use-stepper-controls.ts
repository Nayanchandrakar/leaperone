import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useEditorStepper } from "@/features/bussiness/stores/use-editor-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

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

  const scrollTargetId = useMemo(() => "hero-section", [])

  const handlePreviousStep = useCallback(() => {
    if (canGoToPreviousStep) {
      goToPreviousStep()
      scrollToElement(scrollTargetId)
    }
  }, [canGoToPreviousStep, goToPreviousStep, scrollTargetId])

  const handleNextStep = useCallback(() => {
    if (canGoToNextStep) {
      goToNextStep()
      scrollToElement(scrollTargetId)
    }
  }, [canGoToNextStep, goToNextStep, scrollTargetId])

  return {
    selectedStep,
    canGoToNextStep,
    canGoToPreviousStep,
    handlePreviousStep,
    handleNextStep,
  }
}
