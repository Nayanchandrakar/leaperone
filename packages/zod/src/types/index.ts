import type z from "zod"
import type {
  forgotPasswordFormSchema,
  loginFormSchema,
  registerFormSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type UserNameFormSchema = z.infer<typeof userNameSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
