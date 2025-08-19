import type { createAccountSchema } from "@myleaper/zod/client/auth-schema"
import type { UseFormClearErrors, UseFormSetError } from "react-hook-form"
import type z from "zod"

export type FormSchema = z.infer<typeof createAccountSchema>
export type StatusState = "error" | "empty" | "pending" | "available"

export interface StatusConfig {
  className: string
  Icon?: React.ReactNode
  text: (error?: string) => string
}

export interface UsernameCheckParams {
  username: string
  enabled: boolean
}

export interface UsernameErrorParams {
  error: any
  isPending: boolean
  exists: boolean | undefined
  userNameErrorType: string | undefined
  setError: UseFormSetError<{ username: string }>
  clearErrors: UseFormClearErrors<{ username: string }>
}
