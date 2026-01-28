import type { GetAnalyticsSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type GetAnalyticsContext = Context<HonoEnv, "/", ControllerIO<"query", GetAnalyticsSchema>>
