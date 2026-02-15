import { z } from "zod"
import { id } from "../utils"

export const getAnalyticsSchema = z.object({
  memberId: id,
  toDate: z.coerce.date(),
  fromDate: z.coerce.date(),
})
