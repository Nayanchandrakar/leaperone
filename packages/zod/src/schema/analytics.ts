import { z } from "zod"

export const getAnalyticsSchema = z.object({
  fromDate: z.coerce.date(),
  toDate: z.coerce.date(),
  ids: z
    .array(z.cuid2())
    .min(1)
    .max(11)
    .transform((arr) => [...new Set(arr)]),
})
