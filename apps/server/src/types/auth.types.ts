import type {
  EmailSchema,
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
  RestrictUserSchema,
  UpdatePasswordSchema,
  UserNameFormSchema,
  VerifyEmailSchema,
} from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type RegisterContext = Context<
  HonoEnv,
  "/register",
  ControllerIO<"json", RegisterFormSchema>
>

export type LoginContext = Context<HonoEnv, "/login", ControllerIO<"json", LoginFormSchema>>

export type UserNameContext = Context<
  HonoEnv,
  "/username",
  ControllerIO<"query", UserNameFormSchema>
>

export type PasswordResetContext = Context<
  HonoEnv,
  "/request-password-reset",
  ControllerIO<"json", EmailSchema>
>
export type ResetPasswordContext = Context<
  HonoEnv,
  "/reset-password",
  ControllerIO<"json", ResetPasswordSchema>
>

export type RestrictUserContext = Context<
  HonoEnv,
  "/reset-password",
  ControllerIO<"json", RestrictUserSchema>
>

export type VerifyEmailContext = Context<
  HonoEnv,
  "/verify-email",
  ControllerIO<"query", VerifyEmailSchema>
>

export type ChangePasswordContext = Context<
  HonoEnv,
  "/change-password",
  ControllerIO<"json", UpdatePasswordSchema>
>

export type GetSessionContext = Context<HonoEnv, "/get-session">
export type LogoutContext = Context<HonoEnv, "/logout">
