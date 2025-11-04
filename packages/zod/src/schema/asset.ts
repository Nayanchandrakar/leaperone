import { FILE_TYPES, MAX_FILE_SIZE, MIN_FILE_SIZE, SORT_OPTIONS } from "@app/core/constants"
import { z } from "zod"

export const preSignedUrlSchema = z.array(
  z.object({
    type: z.enum(FILE_TYPES),
    id: z.string().min(3).max(100),
    name: z.string().min(4).max(80),
    size: z.number().min(MIN_FILE_SIZE).max(MAX_FILE_SIZE),
  }),
)

export const getFileSchema = z.object({
  page: z.int().positive().default(1),
  types: z.array(z.enum(FILE_TYPES)).default([]),
  sortBy: z.enum(SORT_OPTIONS).default(SORT_OPTIONS[2]!),
  pageSize: z.int().positive().min(8).max(80).default(40),
  query: z.string().trim().toLowerCase().max(40).optional(),
})

export const deleteFilesSchema = z.array(z.cuid2()).min(1)
