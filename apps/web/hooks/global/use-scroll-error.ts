import type { StandardSchemaV1Issue } from "@tanstack/react-form"
import { useCallback } from "react"

export function useScrollToFirstError() {
  return useCallback(
    (
      formRef: React.RefObject<React.ComponentRef<"form"> | null>,
      errorMap: Record<string, StandardSchemaV1Issue[]>,
    ) => {
      if (formRef?.current) {
        const fieldSelectors = "input, textarea, select"
        const fields = Array.from(formRef.current.querySelectorAll(fieldSelectors)) as Array<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >

        const firstInvalidField = fields.find((field) => errorMap[field.name])

        if (firstInvalidField) {
          const onScrollEnd = () => {
            firstInvalidField.focus()
            window.removeEventListener("scrollend", onScrollEnd)
          }

          window.addEventListener("scrollend", onScrollEnd)
          firstInvalidField.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
    },
    [],
  )
}
