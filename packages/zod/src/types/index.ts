import type z from "zod"
import type {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type UserNameFormSchema = z.infer<typeof userNameSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type EmailSchema = z.infer<typeof emailSchema>
