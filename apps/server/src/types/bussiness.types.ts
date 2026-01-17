import type { InviteMemberSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type InviteMemberContext = Context<
  HonoEnv,
  "/bussiness",
  ControllerIO<"json", InviteMemberSchema>
>
