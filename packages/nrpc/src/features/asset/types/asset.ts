import type { PreSignedUrlSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "../../../types"

export type PreSignedUrlController = Context<
  HonoEnv,
  "/pre-signed-url",
  ControllerIO<"json", PreSignedUrlSchema>
>

export type GeneratePreSignedUrl = {
  storageKey: string
  contentType: string
  metadata?: Record<string, string>
}
