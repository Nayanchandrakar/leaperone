import { contentEditorSchema } from "@app/zod/schema/content-editor"
import { formOptions } from "@tanstack/react-form"
import { useRef } from "react"
import { PROFESSIONAL_TEMPLATE } from "@/features/bussiness/constants/contents/professional-content"
import { useStepper } from "@/features/bussiness/hooks/home/use-stepper"
import { useScrollToFirstError } from "@/hooks/global/use-scroll-error"

export const useContentFormConfig = () => {
  const scrollToFirstError = useScrollToFirstError()
  const formRef = useRef<React.ComponentRef<"form"> | null>(null)
  const goToNextStep = useStepper((state) => state.goToNextStep)

  const formConfig = formOptions({
    defaultValues: {
      templateId: "hello-world",
      sections: PROFESSIONAL_TEMPLATE,
    },
    validators: {
      onChange: contentEditorSchema,
      onSubmit: contentEditorSchema,
    },
    onSubmit: ({ value }) => {
      console.log("going to next step design editor", value)
      goToNextStep()
    },
    onSubmitInvalid: ({ formApi }) => {
      scrollToFirstError(formRef, formApi.state.errorMap.onChange!)
    },
  })

  return { formConfig, formRef }
}
