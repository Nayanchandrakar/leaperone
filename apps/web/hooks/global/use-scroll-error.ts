import type { StandardSchemaV1Issue } from "@tanstack/react-form"
import { useCallback } from "react"

export const useScrollToFirstError = () => {
  return useCallback(
    (
      formRef: React.RefObject<React.ComponentRef<"form"> | null>,
      errorMap: Record<string, StandardSchemaV1Issue[]>,
    ) => {
      if (formRef?.current) {
        const inputs = Array.from(formRef.current.querySelectorAll("input"))
        const firstInvalidInput = inputs.find((input) => errorMap![input.name])

        if (firstInvalidInput) {
          const onScrollEnd = () => {
            firstInvalidInput.focus()
            window.removeEventListener("scrollend", onScrollEnd)
          }

          window.addEventListener("scrollend", onScrollEnd)
          firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" })
        }
      }
    },
    [],
  )
}
