import { designEditorSchema } from "@app/zod/schema/design-editor"
import { formOptions } from "@tanstack/react-form"
import { useRef } from "react"
import { DEFAULT_DESIGN_SETTINGS } from "@/features/bussiness/constants/home/default-design-settings"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"
import { useScrollToFirstError } from "@/hooks/global/use-scroll-error"

export const useDesignFormConfig = () => {
  const scrollToFirstError = useScrollToFirstError()
  const formRef = useRef<React.ComponentRef<"form"> | null>(null)
  const { goToNextStep } = useStepper()

  const formConfig = formOptions({
    defaultValues: DEFAULT_DESIGN_SETTINGS,

    validators: {
      onChange: designEditorSchema,
      onSubmit: designEditorSchema,
    },
    onSubmit: () => {
      goToNextStep()
      scrollToElement("hero-section")
    },
    onSubmitInvalid: ({ formApi }) => {
      scrollToFirstError(formRef, formApi.state.errorMap.onChange!)
    },
  })

  return { formConfig, formRef }
}
