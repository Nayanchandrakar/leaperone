import type { PreSignedUrlSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "../../../types"

export type PreSignedUrlController = Context<
  HonoEnv,
  "/pre-signed-url",
  ControllerIO<"json", PreSignedUrlSchema>
>

export interface CreatePreSignedUrl {
  key: string
  bucket: string
  expiresIn?: number
  contentType: string
  metadata?: Record<string, string>
}
