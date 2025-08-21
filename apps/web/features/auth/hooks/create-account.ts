import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useMemo } from "react"
import type { ErrorOption, UseFormReturn } from "react-hook-form"
import { useWatch } from "react-hook-form"
import { toast } from "sonner"
import { useDebounceValue } from "usehooks-ts"
import type {
  IUserNameError,
  IUsernameCheckParams,
} from "@/features/auth/types"
import { setUserNameError } from "@/features/auth/utils"
import { authClient } from "@/lib/auth"
import { useTRPC } from "@/lib/trpc/client"
import type { ISignupFormSchema } from "@/types/zod-types"

export const useUsernameCheck = ({
  username,
  enabled,
}: IUsernameCheckParams) => {
  const trpc = useTRPC()
  return useQuery(trpc.users.username.queryOptions({ username }, { enabled }))
}

export const useUsernameError = ({
  error,
  setError,
  clearErrors,
  isPending,
  isUserNameTaken,
  usernameErrorType,
}: IUserNameError) => {
  useEffect(() => {
    if (isPending || isUserNameTaken === undefined) return

    const result = setUserNameError({
      error,
      isUserNameTaken,
      usernameErrorType,
    })

    switch (result.action) {
      case "set":
        setError("username", result?.error as ErrorOption)
        break
      case "clear":
        clearErrors("username")
        break
      case "none":
        break
    }
  }, [
    isUserNameTaken,
    isPending,
    error,
    usernameErrorType,
    setError,
    clearErrors,
  ])
}

export const useAccountFormContext = ({
  control,
  formState,
  clearErrors,
  setError,
}: UseFormReturn<any>) => {
  const { isValid, errors, isSubmitting } = formState

  const username = useWatch({ control, name: "username" })
  const [value] = useDebounceValue(username, 400)
  const usernameError = useMemo(() => errors.username, [errors.username])
  const enabled = Boolean(value.length && !usernameError)

  const { data, isError, isPending, error } = useUsernameCheck({
    username: value,
    enabled,
  })

  const isUserNameTaken = useMemo(() => Boolean(data?.exists), [data])

  return {
    error,
    isValid,
    isError,
    setError,
    isPending,
    clearErrors,
    isSubmitting,
    usernameError,
    isUserNameTaken,
  }
}

export const useCreateAccount = () => {
  const onSubmit = useCallback(async (values: ISignupFormSchema) => {
    await authClient.signUp.email(values, {
      onSuccess: () => {
        toast.success(`We’ve sent a verification link to ${values.email}`, {
          duration: 5000,
          icon: "✉️",
          action: {
            label: "Open Gmail",
            onClick: () => {
              window.open("https://mail.google.com/mail/#inbox", "_blank")
            },
          },
        })
      },
      onError: ({ error }) => {
        toast.error(error.message)
      },
    })
  }, [])

  return {
    onSubmit,
  }
}
