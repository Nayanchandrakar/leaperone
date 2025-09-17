import z from "zod"
import { seats } from "../utils"

export const checkoutSessionSchema = z.object({
  priceId: z.string().min(1),
  seats,
})
