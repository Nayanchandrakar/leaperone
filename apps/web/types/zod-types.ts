import type {
  forgotPasswordFormSchema,
  loginFormSchema,
  registerFormSchema,
} from "@app/zod/client/auth"
import type z from "zod"

export type ILoginFormSchema = z.infer<typeof loginFormSchema>
export type IRegisterFormSchema = z.infer<typeof registerFormSchema>
export type IForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
