import type {
  LoginFormSchema,
  RegisterFormSchema,
  UserNameFormSchema,
  VerifyEmailSchema,
} from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO } from "src/types"

export type RegisterController = Context<
  {},
  "/register",
  ControllerIO<"json", RegisterFormSchema>
>

export type LoginController = Context<
  {},
  "/login",
  ControllerIO<"json", LoginFormSchema>
>

export type UserNameController = Context<
  {},
  "/username",
  ControllerIO<"query", UserNameFormSchema>
>

export type VerifyEmailController = Context<
  {},
  "/verify-email",
  ControllerIO<"query", VerifyEmailSchema>
>

export type GetSessionController = Context<{}, "/get-session">
export type LogoutController = Context<{}, "/logout">
