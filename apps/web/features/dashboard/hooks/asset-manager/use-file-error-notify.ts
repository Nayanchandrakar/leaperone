import { useEffect } from "react"
import { toast } from "sonner"

export function useFileErrorNotify(errors: string[]) {
  useEffect(() => {
    if (errors?.length) {
      const errorSet = new Set(errors)
      const messages = [...errorSet]
      for (const msg of messages) toast.error(msg)
    }
  }, [errors])
}
