import type z from "zod"
import type {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  setNewPasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"
import type { checkoutSessionSchema } from "../schema/subscription"

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type UserNameFormSchema = z.infer<typeof userNameSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type SetNewPasswordSchema = z.infer<typeof setNewPasswordSchema>
export type CheckoutSessionSchema = z.infer<typeof checkoutSessionSchema>
