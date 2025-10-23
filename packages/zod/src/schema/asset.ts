import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE, MIN_FILE_SIZE } from "@app/core/constants"
import { z } from "zod"

export const preSignedUrlSchema = z.object({
  name: z.string().min(10).max(80),
  type: z.enum(ALLOWED_MIME_TYPES),
  size: z.number().min(MIN_FILE_SIZE).max(MAX_FILE_SIZE),
})
