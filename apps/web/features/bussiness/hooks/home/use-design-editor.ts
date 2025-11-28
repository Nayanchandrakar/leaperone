import type React from "react"
import { useCallback } from "react"
import { useAppForm } from "@/components/ui/app-form"
import { useDesignFormConfig } from "@/features/bussiness/hooks/home/use-design-form-config"

export const useDesignEditor = () => {
  const { formConfig, formRef } = useDesignFormConfig()
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
