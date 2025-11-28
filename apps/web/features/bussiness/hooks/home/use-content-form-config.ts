import { contentEditorSchema } from "@app/zod/schema/content-editor"
import { formOptions } from "@tanstack/react-form"
import { useRef } from "react"
import { PROFESSIONAL_TEMPLATE } from "@/features/bussiness/constants/contents/professional-content"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { scrollToElement } from "@/features/bussiness/utils/scroll-to-element"
import { useScrollToFirstError } from "@/hooks/global/use-scroll-error"

export const useContentFormConfig = () => {
  const scrollToFirstError = useScrollToFirstError()
  const formRef = useRef<React.ComponentRef<"form"> | null>(null)
  const { goToNextStep } = useStepper()

  const formConfig = formOptions({
    defaultValues: {
      templateId: "hello-world",
      sections: PROFESSIONAL_TEMPLATE,
    },
    validators: {
      onChange: contentEditorSchema,
      onSubmit: contentEditorSchema,
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
