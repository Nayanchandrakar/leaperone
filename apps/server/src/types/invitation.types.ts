import type { AcceptInvitationSchema, InviteMemberSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type InviteMemberContext = Context<
  HonoEnv,
  "/invite",
  ControllerIO<"json", InviteMemberSchema>
>

export type AcceptInvitationContext = Context<
  HonoEnv,
  "/accept",
  ControllerIO<"json", AcceptInvitationSchema>
>
