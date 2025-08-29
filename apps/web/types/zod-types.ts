import type {
  forgotPasswordFormSchema,
  loginFormSchema,
  registerSchema,
} from "@myleaper/zod/client/auth-schema"
import type z from "zod"

export type ILoginFormSchema = z.infer<typeof loginFormSchema>
export type IRegisterFormSchema = z.infer<typeof registerSchema>
export type IForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
