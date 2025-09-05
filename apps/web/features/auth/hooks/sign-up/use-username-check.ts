import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { type ErrorOption, type UseFormReturn, useWatch } from "react-hook-form"
import { useDebounceValue } from "usehooks-ts"
import type {
  IUserNameError,
  IUsernameCheckParams,
} from "@/features/auth/types"
import { setUserNameError } from "@/features/auth/utils"
import { client } from "@/lib/hono/client"
import { ResponseHandler } from "@/utils/response-handler"

const useUsernameCheck = ({ username, enabled }: IUsernameCheckParams) => {
  return useQuery({
    enabled,
    queryKey: ["username", username],
    queryFn: async () => {
      const res = await client.api.auth.username.$get({ query: { username } })
      const data = await res.json()

      if (!res.ok) {
        throw ResponseHandler.error(data)
      }

      return data
    },
  })
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
