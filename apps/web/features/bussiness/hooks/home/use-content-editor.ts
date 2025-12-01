import type React from "react"
import { useCallback, useMemo } from "react"
import { useAppForm } from "@/components/ui/app-form"
import { useContentFormConfig } from "@/features/bussiness/hooks/home/use-content-form-config"

export const useContentEditor = () => {
  const { formConfig, formRef } = useContentFormConfig()
  const form = useAppForm(formConfig)

  const onSubmitCallback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      void form.handleSubmit()
    },
    [form],
  )

  const initialSectionId = useMemo(
    () => formConfig?.defaultValues?.sections[6]?.id!,
    [formConfig?.defaultValues],
  )

  return {
    form,
    formRef,
    onSubmitCallback,
    initialSectionId,
  }
}
