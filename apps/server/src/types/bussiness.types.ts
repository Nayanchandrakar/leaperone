import type { CreateBusinessCardSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type CreateBusinessCardContext = Context<
  HonoEnv,
  "/bussiness-card/create",
  ControllerIO<"json", CreateBusinessCardSchema>
>

export type UpdateBusinessCardContext = Context<
  HonoEnv,
  "/bussiness-card/edit",
  ControllerIO<"json", Partial<CreateBusinessCardSchema>>
>
