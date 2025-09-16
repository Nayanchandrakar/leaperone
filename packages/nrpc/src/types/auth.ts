import type {
  EmailSchema,
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
  UserNameFormSchema,
  VerifyEmailSchema,
} from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "./index"

export type RegisterController = Context<
  HonoEnv,
  "/register",
  ControllerIO<"json", RegisterFormSchema>
>

export type LoginController = Context<
  HonoEnv,
  "/login",
  ControllerIO<"json", LoginFormSchema>
>

export type UserNameController = Context<
  HonoEnv,
  "/username",
  ControllerIO<"query", UserNameFormSchema>
>

export type PasswordResetController = Context<
  HonoEnv,
  "/request-password-reset",
  ControllerIO<"json", EmailSchema>
>
export type ResetPasswordController = Context<
  HonoEnv,
  "/reset-password",
  ControllerIO<"json", ResetPasswordSchema>
>

export type VerifyEmailController = Context<
  HonoEnv,
  "/verify-email",
  ControllerIO<"query", VerifyEmailSchema>
>

export type GetSessionController = Context<HonoEnv, "/get-session">
export type LogoutController = Context<HonoEnv, "/logout">
