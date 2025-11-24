import { contentEditorSchema } from "@app/zod/schema/content-editor"
import { formOptions } from "@tanstack/react-form"
import { PROFESSIONAL_TEMPLATE } from "@/features/bussiness/constants/contents/professional-content"

export const useContentFormOptions = () => {
  return formOptions({
    defaultValues: {
      templateId: "",
      sections: PROFESSIONAL_TEMPLATE,
    },
    validators: {
      onChange: contentEditorSchema,
      onSubmit: contentEditorSchema,
    },
  })
}
