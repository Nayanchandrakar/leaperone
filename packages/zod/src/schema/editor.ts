import { z } from "zod"

export const cardProfileSchema = z.object({
  type: z.literal("profile"),
  enabled: z.boolean(),
  name: z.string().min(3),
})

export const headingSchema = z.object({
  type: z.literal("heading"),
  enabled: z.boolean(),
  text: z.string().min(3),
})

export const contentEditorSchema = z.object({
  contents: z.array(z.discriminatedUnion("type", [cardProfileSchema, headingSchema])),
})
