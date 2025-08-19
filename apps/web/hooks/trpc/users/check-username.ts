import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"

import { authClient } from "@/lib/auth"
import { useTRPC } from "@/lib/trpc/client"
import type {
  FormSchema,
  UsernameCheckParams,
  UsernameErrorParams,
} from "@/types/create-account"

export const useUsernameCheck = ({
  username,
  enabled,
}: UsernameCheckParams) => {
  const trpc = useTRPC()
  return useQuery(trpc.users.username.queryOptions({ username }, { enabled }))
}

export const useUsernameError = ({
  exists,
  isPending,
  error,
  setError,
  clearErrors,
  userNameErrorType,
}: UsernameErrorParams) => {
  useEffect(() => {
    if (isPending || exists === undefined) return

    if (error) {
      setError("username", {
        type: "query",
        message: error.message,
      })
      return
    }

    if (exists) {
      setError("username", {
        type: "available",
        message: "Username is already taken",
      })
      return
    }

    if (
      userNameErrorType &&
      ["available", "query"].includes(userNameErrorType)
    ) {
      clearErrors("username")
    }
  }, [exists, isPending, error, userNameErrorType, setError, clearErrors])
}

export const useCreateAccount = () => {
  const onSubmit = useCallback(async (values: FormSchema) => {
    await authClient.signUp.email(values, {
      onSuccess: () => {
        toast.success("Account created successfully")
      },
      onError: ({ error }) => {
        toast.error(error.message)
      },
    })
  }, [])

  return { onSubmit }
}
