import type { WorkspaceCardSettingSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type UpdateCardSettingCtx = Context<
  HonoEnv,
  "/dashboard/card-setting",
  ControllerIO<"json", WorkspaceCardSettingSchema>
>

export type GetWorkspaceStatsCtx = Context<HonoEnv, "/dashboard/stats">

export type GetCardSettingsCtx = Context<HonoEnv, "/dashboard/settings">
