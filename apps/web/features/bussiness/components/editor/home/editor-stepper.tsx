import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import {
  Stepper,
  StepperStep,
  StepperStepIndex,
  StepperStepLabel,
} from "@/features/bussiness/components/ui/stepper"
import { CARD_STEPS } from "@/features/bussiness/constants/home/card-steps"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const EditorStepper = () => {
  const { selectedStep, setSelectedStep } = useStepper(
    useShallow((state) => ({
      selectedStep: state.selectedStep,
      setSelectedStep: state.setSelectedStep,
    })),
  )

  const handleStepClick = useCallback(
    (index: number) => {
      setSelectedStep(index)
    },
    [setSelectedStep],
  )

  return (
    <Stepper>
      {CARD_STEPS.map((step, index) => (
        <StepperStep
          key={step.id}
          data-state={index === selectedStep}
          onClick={() => handleStepClick(index)}
        >
          <StepperStepIndex>{index + 1}</StepperStepIndex>
          <StepperStepLabel>{step.title}</StepperStepLabel>
        </StepperStep>
      ))}
    </Stepper>
  )
}
