import { z } from "zod"
import { color, email, telegram } from "../utils"

export const termsLinkSchema = z.object({
  type: z.literal("url"),
  content: z.url().max(200),
})

export const termsContentSchema = z.object({
  type: z.literal("content"),
  content: z.string().min(10).max(100),
})

export const phoneSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("phone"),
  value: z.e164({ error: "Invalid phone number" }).trim(),
})

export const emailSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("email"),
  value: email,
})

export const websiteSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("website"),
  value: z.url(),
})

export const locationSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("location"),
  value: z.url(),
})

export const smsSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("sms"),
  value: z.e164({ error: "Invalid phone number" }).trim(),
})

export const whatsappSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("whatsapp"),
  value: z.e164({ error: "Invalid whatsapp number" }).trim(),
})

export const wechatSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("wechat"),
  value: z.e164({ error: "Invalid wechat number" }).trim(),
})

export const telegramSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("telegram"),
  value: telegram,
})

export const backgroundSchema = z.object({
  id: z.uuidv4(),
  url: z.url().optional(),
  type: z.literal("image"),
})

export const colorSchema = z.object({
  background: color,
  highlight: color,
  mainText: color,
  supportingText: color,
})

export const sectionBackgroundSchema = z.object({
  enabled: z.boolean(),
  color,
  borderRadius: z.int().positive().min(1).max(100),
})

export const cardImageSchema = z.object({
  url: z.url(),
})

export const scanReportEmailSchema = z.object({
  enabled: z.boolean(),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  emails: z.array(email),
})

export const cardSettingsSchema = z.object({
  // scanReportEmail: scanReportEmailSchema,
  branding: z.boolean(),
})

export const singleColorFillSchema = z.object({
  type: z.literal("single"),
  color,
})

export const gradientSchema = z.object({
  type: z.enum(["linear", "radial"]),
  colorStops: z.array(color).min(2).max(2),
  rotation: z.int().positive().min(0).max(360),
})

export const gradientFillSchema = z.object({
  type: z.literal("gradient"),
  fillGradient: gradientSchema,
})
