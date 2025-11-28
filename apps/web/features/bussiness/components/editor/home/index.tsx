import { EditorFooter } from "@/features/bussiness/components/editor/home/editor-footer"
import { EditorStepForm } from "@/features/bussiness/components/editor/home/editor-step-form"
import { EditorStepper } from "@/features/bussiness/components/editor/home/editor-stepper"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"

export const CardEditor = () => {
  return (
    <section className="space-y-5">
      <EditorStepper />
      <EditorWrapper>
        <EditorStepForm />
      </EditorWrapper>
      <EditorFooter />
    </section>
  )
}
