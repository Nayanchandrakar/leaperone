import type {
  CreateBusinessCardSchema,
  DeleteCardSchema,
  ToogleCardStatusSchema,
} from "@app/zod/types"
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

export type DeleteCardContext = Context<
  HonoEnv,
  "/business-card/delete",
  ControllerIO<"json", DeleteCardSchema>
>

export type GetBusinessCardContext = Context<HonoEnv, "/business-card", ControllerIO<"json", void>>

export type ToogleCardStatusContext = Context<
  HonoEnv,
  "/business-card/status",
  ControllerIO<"json", ToogleCardStatusSchema>
>
