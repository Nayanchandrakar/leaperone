import type React from "react"
import { useCallback } from "react"
import { useAppForm } from "@/components/ui/app-form"
import { useQrCodeFormConfig } from "@/features/bussiness/hooks/home/use-qr-code-form-config"

export const useQrCodeEditor = () => {
  const { formConfig, formRef } = useQrCodeFormConfig()
  const form = useAppForm(formConfig)

  const onSubmitCallback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      void form.handleSubmit()
    },
    [form],
  )

  return {
    form,
    formRef,
    onSubmitCallback,
  }
}
