import { FILE_TYPES, MAX_FILE_SIZE, MIN_FILE_SIZE } from "@app/core/constants"
import { z } from "zod"

export const preSignedUrlSchema = z.array(
  z.object({
    type: z.enum(FILE_TYPES),
    id: z.string().min(3).max(100),
    name: z.string().min(4).max(80),
    size: z.number().min(MIN_FILE_SIZE).max(MAX_FILE_SIZE),
  }),
)

export const filesQuerySchema = z.object({
  // cursor: z.string().optional(),
  // limit: z.string().transform((val) => parseInt(val, 10)).optional(),
  workspaceId: z.cuid2(),
})
