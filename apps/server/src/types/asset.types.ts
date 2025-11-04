import type { DeleteFilesSchema, GetFileSchema, PreSignedUrlSchema } from "@app/zod/types"
import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type PreSignedUrlContext = Context<
  HonoEnv,
  "/pre-signed-url",
  ControllerIO<"json", PreSignedUrlSchema>
>

export type GenerateBulkPreSignedUrl = {
  fileId: string
  storageKey: string
  contentType: string
  metadata?: Record<string, string>
}

export type GeneratePreSignedUrl = {
  storageKey: string
  contentType: string
  metadata?: Record<string, string>
}

export type GetFileContext = Context<HonoEnv, "/files", ControllerIO<"json", GetFileSchema>>
export type DeleteFilesContext = Context<HonoEnv, "/files", ControllerIO<"json", DeleteFilesSchema>>
