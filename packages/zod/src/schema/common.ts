import { z } from "zod"
import { email, websiteUrl } from "../utils"

export const termsLinkSchema = z.object({
  type: z.literal("url"),
  content: websiteUrl,
})

export const termsContentSchema = z.object({
  type: z.literal("content"),
  content: z.string().min(10).max(100),
})

export const emailSchema = z.object({
  id: z.uuidv4(),
  value: email,
  type: z.literal("email"),
})
