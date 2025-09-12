import z from "zod"

export const checkoutSessionSchema = z.object({
  priceId: z.string().min(1),
  seats: z.number().default(1),
})
