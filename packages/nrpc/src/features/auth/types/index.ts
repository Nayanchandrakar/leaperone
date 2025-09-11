import type {
  EmailSchema,
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
  UserNameFormSchema,
  VerifyEmailSchema,
} from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, FullSession } from "../../../types"

export type RegisterController = Context<
  AuthEnv,
  "/register",
  ControllerIO<"json", RegisterFormSchema>
>

export type LoginController = Context<
  AuthEnv,
  "/login",
  ControllerIO<"json", LoginFormSchema>
>

export type UserNameController = Context<
  AuthEnv,
  "/username",
  ControllerIO<"query", UserNameFormSchema>
>

export type PasswordResetController = Context<
  AuthEnv,
  "/request-password-reset",
  ControllerIO<"json", EmailSchema>
>
export type ResetPasswordController = Context<
  AuthEnv,
  "/reset-password",
  ControllerIO<"json", ResetPasswordSchema>
>

export type VerifyEmailController = Context<
  AuthEnv,
  "/verify-email",
  ControllerIO<"query", VerifyEmailSchema>
>

export type GetSessionController = Context<AuthEnv, "/get-session">
export type LogoutController = Context<AuthEnv, "/logout">

export type AuthEnv = {
  Variables: {
    session: FullSession
  }
}
