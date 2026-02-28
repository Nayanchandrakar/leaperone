import type {
  DeleteCardSchema,
  GetBusinessCardQuerySchema,
  SaveBusinessCardSchema,
  ToogleCardStatusSchema,
} from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type SaveBusinessCardContext = Context<
  HonoEnv,
  "/",
  ControllerIO<"json", SaveBusinessCardSchema>
>

export type DeleteCardContext = Context<
  HonoEnv,
  "/business-card/delete",
  ControllerIO<"json", DeleteCardSchema>
>

export type GetBusinessCardContext = Context<
  HonoEnv,
  "/business-card",
  ControllerIO<"query", GetBusinessCardQuerySchema>
>

export type ToogleCardStatusContext = Context<
  HonoEnv,
  "/business-card/status",
  ControllerIO<"json", ToogleCardStatusSchema>
>
