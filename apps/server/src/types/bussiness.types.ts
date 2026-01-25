import type { CreateBusinessCardSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type CreateBusinessCardContext = Context<
  HonoEnv,
  "/business-card/create",
  ControllerIO<"json", CreateBusinessCardSchema>
>

export type UpdateBusinessCardContext = Context<
  HonoEnv,
  "/business-card/edit",
  ControllerIO<"json", Partial<CreateBusinessCardSchema>>
>
