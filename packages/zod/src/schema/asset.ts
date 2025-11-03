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
  workspaceId: z.cuid2(),
  cursor: z.string().optional(),
  limit: z.number().min(8).max(40).default(40).optional(),
})

export const WorkspaceQuerySchema = z.object({
  workspaceId: z.cuid2(),
  page: z.int().positive(),
  types: z.array(z.string()).min(1),
  query: z.string().trim().min(2).max(40).optional(),
  pageSize: z.int().positive().min(8).max(80).default(40),
  // sortBy: SortOptionsSchema,
})
