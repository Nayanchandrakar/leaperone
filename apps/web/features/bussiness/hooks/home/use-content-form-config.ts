import { contentEditorSchema } from "@app/zod/schema/content-editor"
import { formOptions } from "@tanstack/react-form"
import { useRef } from "react"
import { PROFESSIONAL_TEMPLATE } from "@/features/bussiness/constants/contents/professional-content"
import { useScrollToFirstError } from "@/hooks/global/use-scroll-error"

export const useContentFormConfig = () => {
  const scrollToFirstError = useScrollToFirstError()
  const formRef = useRef<React.ComponentRef<"form"> | null>(null)

  const formConfig = formOptions({
    defaultValues: {
      templateId: "hello-world",
      sections: PROFESSIONAL_TEMPLATE,
    },
    validators: {
      onChange: contentEditorSchema,
      onSubmit: contentEditorSchema,
    },
    onSubmit: (data) => {
      console.log("onSubmit", data)
    },
    onSubmitInvalid: ({ formApi }) => {
      scrollToFirstError(formRef, formApi.state.errorMap.onChange!)
    },
  })

  return { formConfig, formRef }
}
