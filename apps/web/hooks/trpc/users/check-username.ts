import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import type {
  FieldError,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form"
import { useTRPC } from "@/lib/trpc/client"

interface UsernameCheckParams {
  username: string
  enabled: boolean
}

interface UsernameErrorParams {
  exists: boolean | undefined
  error: FieldError | undefined
  isPending: boolean
  setError: UseFormSetError<{ username: string }>
  clearErrors: UseFormClearErrors<{ username: string }>
}

export const useUsernameCheck = ({
  username,
  enabled,
}: UsernameCheckParams) => {
  const trpc = useTRPC()
  return useQuery({
    ...trpc.users.username.queryOptions({ username }),
    enabled,
  })
}

export const useUsernameError = ({
  exists,
  isPending,
  error,
  setError,
  clearErrors,
}: UsernameErrorParams) => {
  useEffect(() => {
    if (isPending || exists === undefined) return

    if (exists) {
      setError("username", {
        type: "available",
        message: "Username is already taken",
      })
    } else if (error?.type === "available") {
      clearErrors("username")
    }
  }, [exists, isPending, error?.type, setError, clearErrors])
}
