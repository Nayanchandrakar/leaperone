import { z } from "zod"
import { patterns } from "../constants"

export const username = z
  .string()
  .min(3, { message: "Username must be at least 3 characters" })
  .max(30, { message: "Username must be at most 30 characters" })
  .regex(patterns.userNameStart, {
    message: "Username must start with a letter or number.",
  })
  .regex(patterns.userNameEnd, {
    message: "Username must end with a letter or number.",
  })
  .regex(patterns.userName, {
    message: "Username can only contain letters, numbers, underscores, and periods.",
  })
  .toLowerCase()
  .trim()

export const password = z
  .string()
  .min(1, { message: "Must have at least 1 character" })
  .regex(patterns.password, {
    message: "Password: 8+ chars, 1 upper, 1 lower, 1 number, 1 special",
  })
  .max(12)
  .trim()

export const phoneNumber = z
  .e164({ error: "Invalid phone number" })
  .trim()
  .or(z.literal(""))
  .optional()

export const agreementHeading = z.string().min(5).max(40)
export const email = z.email().toLowerCase().trim()
export const callbackUrl = z.string().trim()
export const seats = z.number().default(1)
export const name = z
  .string()
  .trim()
  .min(3, { message: "Name is required" })
  .max(30, { message: "Name must be less than 30 characters" })

export const termsLinkSchema = z.object({
  type: z.literal("url"),
  content: z.url().max(200),
})

export const termsContentSchema = z.object({
  type: z.literal("content"),
  content: z.string().min(10).max(100),
})
