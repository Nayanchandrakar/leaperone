import type { AccessAsMemberSchema, InviteMemberSchema, PasswordSetupSchema } from "@app/zod/types"
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

export type AccessAsMemberContext = Context<
  HonoEnv,
  "/access-as-member",
  ControllerIO<"json", AccessAsMemberSchema>
>

export type ExitImpersonationContext = Context<HonoEnv, "/exit-impersonation">
