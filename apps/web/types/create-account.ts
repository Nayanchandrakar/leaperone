import type { createAccountSchema } from "@myleaper/zod/client/auth-schema"
import type { UseFormClearErrors, UseFormSetError } from "react-hook-form"
import type z from "zod"

export type FormSchema = z.infer<typeof createAccountSchema>
export type UserStatusState = "error" | "empty" | "pending" | "available"

export interface IUsernameCheckParams {
  username: string
  enabled: boolean
}

export interface IGetUserNameStatus {
  queryError: unknown
  errorMessage: string | undefined
  isPending: boolean
  exists: boolean
  username: string
}

export interface ISetUserNameError {
  error: any
  usernameErrorType: any
  isUserNameTaken: boolean
}

export interface IUserNameError extends ISetUserNameError {
  isPending: boolean
  setError: UseFormSetError<{ username: string }>
  clearErrors: UseFormClearErrors<{ username: string }>
}
