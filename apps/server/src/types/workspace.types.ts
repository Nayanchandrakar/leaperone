import type { WorkspaceSettingsSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type UpdateWorkspaceSettingsCtx = Context<
  HonoEnv,
  "/dashboard/settings",
  ControllerIO<"json", WorkspaceSettingsSchema>
>

export type GetWorkspaceStatsCtx = Context<HonoEnv, "/dashboard/stats">

export type GetWorkspaceSettingsCtx = Context<HonoEnv, "/dashboard/settings">
