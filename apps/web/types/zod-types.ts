import type {
  loginFormSchema,
  signupSchema,
} from "@myleaper/zod/client/auth-schema"
import type z from "zod"

export type ILoginFormSchema = z.infer<typeof loginFormSchema>
export type ISignupFormSchema = z.infer<typeof signupSchema>
