import type {
  LoginFormSchema,
  PasswordResetSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
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

export type PasswordResetController = Context<
  {},
  "/request-password-reset",
  ControllerIO<"json", PasswordResetSchema>
>
export type ResetPasswordController = Context<
  {},
  "/reset-password/:token",
  ControllerIO<"param", ResetPasswordSchema>
>

export type VerifyEmailController = Context<
  {},
  "/verify-email",
  ControllerIO<"query", VerifyEmailSchema>
>

export type GetSessionController = Context<{}, "/get-session">
export type LogoutController = Context<{}, "/logout">
