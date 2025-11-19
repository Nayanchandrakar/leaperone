"use client"

import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorFooter } from "@/features/bussiness/components/editor/home/editor-footer"
import { EditorStepForm } from "@/features/bussiness/components/editor/home/editor-step-form"
import { EditorStepper } from "@/features/bussiness/components/editor/home/editor-stepper"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const Editor = () => {
  const { selectedStep, nextStep, previousStep, setSelectedStep } = useStepper(
    useShallow((state) => ({
      nextStep: state.nextStep,
      selectedStep: state.selectedStep,
      previousStep: state.previousStep,
      setSelectedStep: state.setSelectedStep,
    })),
  )

  const handleStepClick = useCallback(
    (index: number) => {
      if (selectedStep === index) return
      setSelectedStep(index)
    },
    [selectedStep, setSelectedStep],
  )

  const handleNextStep = useCallback(() => {
    if (selectedStep < CARD_STEPS.length - 1) {
      nextStep()
    }
  }, [selectedStep, nextStep])

  const handlePreviousStep = useCallback(() => {
    if (selectedStep > 0) {
      previousStep()
    }
  }, [selectedStep, previousStep])

  return (
    <section className="space-y-5">
      <EditorStepper selectedStep={selectedStep} onStepClick={handleStepClick} />
      <EditorWrapper className="space-y-4">
        <EditorStepForm />
      </EditorWrapper>
      <EditorFooter onNextAction={handleNextStep} onPreviousAction={handlePreviousStep} />
    </section>
  )
}
