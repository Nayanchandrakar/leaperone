import { z } from "zod"
import { id } from "../utils"

export const getAnalyticsSchema = z.object({
  to: z.coerce.date(),
  from: z.coerce.date(),
  memberId: id.optional(),
})
