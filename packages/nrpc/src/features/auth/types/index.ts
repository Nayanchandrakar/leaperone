import type {
  LoginFormSchema,
  RegisterFormSchema,
  UserNameFormSchema,
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
  ControllerIO<"param", UserNameFormSchema>
>

export type GetSessionController = Context<{}, "/get-session">
export type LogoutController = Context<{}, "/logout">
