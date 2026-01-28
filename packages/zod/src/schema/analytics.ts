import { z } from "zod"

export const getAnalyticsSchema = z.object({
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
  scope: z.union([z.literal("myself"), z.literal("everyone"), z.cuid2()]),
})
