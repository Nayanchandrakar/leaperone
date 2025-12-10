import { useCallback } from "react"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

/**
 * Custom hook to manage design editor form logic
 * Encapsulates form submission with performance optimizations
 */
export function useDesignEditorForm() {
  const { goToNextStep } = useStepper()

  // Optimized form submission handler
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      goToNextStep()
      scrollToElement("hero-section")
    },
    [goToNextStep],
  )

  return {
    handleSubmit,
  }
}
