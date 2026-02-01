import type { UpdateUserSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type UpdateUserContext = Context<
  HonoEnv,
  "/update-profile",
  ControllerIO<"json", UpdateUserSchema>
>
