import type { ImpersonateSchema, InviteMemberSchema, PasswordSetupSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type InviteMemberContext = Context<
  HonoEnv,
  "/invite",
  ControllerIO<"json", InviteMemberSchema>
>

export type PasswordSetupContext = Context<
  HonoEnv,
  "/password-setup",
  ControllerIO<"json", PasswordSetupSchema>
>

export type GetInvitedMembersContext = Context<HonoEnv, "/invited-members">

export type ImpersonateContext = Context<
  HonoEnv,
  "/impersonate",
  ControllerIO<"json", ImpersonateSchema>
>

export type ExitImpersonationContext = Context<HonoEnv, "/exit-impersonation">
