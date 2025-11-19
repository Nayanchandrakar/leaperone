import { EditorFooter } from "@/features/bussiness/components/editor/home/editor-footer"
import { EditorStepForm } from "@/features/bussiness/components/editor/home/editor-step-form"
import { EditorStepper } from "@/features/bussiness/components/editor/home/editor-stepper"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"

export const Editor = () => {
  const { selectedStep, hasNextStep, handleStepClick, handleNextStep, handlePreviousStep } =
    useStepper()

  return (
    <section className="space-y-5">
      <EditorStepper selectedStep={selectedStep} onStepClick={handleStepClick} />
      <EditorWrapper className="space-y-4">
        <EditorStepForm selectedStep={selectedStep} />
      </EditorWrapper>
      <EditorFooter
        hasNextStep={hasNextStep}
        selectedStep={selectedStep}
        onNextAction={handleNextStep}
        onPreviousAction={handlePreviousStep}
      />
    </section>
  )
}
