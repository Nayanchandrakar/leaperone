import { useCallback, useMemo, useState } from "react"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"

export const useStepper = () => {
  const [selectedStep, setSelectedStep] = useState(0)

  const hasNextStep = useMemo(() => {
    return selectedStep < CARD_STEPS.length - 1
  }, [selectedStep])

  const handleStepClick = useCallback(
    (index: number) => {
      if (selectedStep === index) return
      setSelectedStep(index)
    },
    [selectedStep],
  )

  const handleNextStep = useCallback(() => {
    if (hasNextStep) {
      setSelectedStep((prev) => prev + 1)
    }
  }, [hasNextStep])

  const handlePreviousStep = useCallback(() => {
    if (selectedStep > 0) {
      setSelectedStep((prev) => prev - 1)
    }
  }, [selectedStep])

  return {
    hasNextStep,
    selectedStep,
    handleNextStep,
    handleStepClick,
    handlePreviousStep,
  }
}
