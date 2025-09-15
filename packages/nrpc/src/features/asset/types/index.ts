import type { PreSignedUrlSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "../../../types"

export type GeneratePreSignedController = Context<
  HonoEnv,
  "/pre-signed-url",
  ControllerIO<"json", PreSignedUrlSchema>
>
