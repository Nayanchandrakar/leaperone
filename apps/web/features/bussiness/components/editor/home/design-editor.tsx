import { useCallback, useRef } from "react"
import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background"
import { BackgroundStyleForm } from "@/features/bussiness/components/form/editor/design/background-style"
import { CardLoadingForm } from "@/features/bussiness/components/form/editor/design/card-loading"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { CardSettingsForm } from "@/features/bussiness/components/form/editor/design/settings"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"

export default function DesignEditor() {
  const formRef = useRef<HTMLFormElement>(null)
  const { goToNextStep } = useStepper()

  const onSubmitCallback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      goToNextStep()
      scrollToElement("hero-section")
    },
    [goToNextStep],
  )

  return (
    <form id="design-form" ref={formRef} onSubmit={onSubmitCallback}>
      <EditorBlock defaultValue="background-image-section">
        <BackgroundChangeForm />
        <ColorChangeForm />
        <BackgroundStyleForm />
        <CardLoadingForm />
        <CardSettingsForm />
      </EditorBlock>
    </form>
  )
}
