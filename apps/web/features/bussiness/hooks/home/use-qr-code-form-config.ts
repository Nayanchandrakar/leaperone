import { qrCodeEditorSchema } from "@app/zod/schema/qr-code-editor"
import { formOptions } from "@tanstack/react-form"
import { useRef } from "react"
import { DEFAULT_QR_CODE_SETTINGS } from "@/features/bussiness/constants/home/qr-code-options"

export const useQrCodeFormConfig = () => {
  const formRef = useRef<React.ComponentRef<"form"> | null>(null)

  const formConfig = formOptions({
    defaultValues: DEFAULT_QR_CODE_SETTINGS,

    validators: {
      onChange: qrCodeEditorSchema,
      onSubmit: qrCodeEditorSchema,
    },
    onSubmit: () => {
      console.log("finished")
    },
  })

  return { formConfig, formRef }
}
