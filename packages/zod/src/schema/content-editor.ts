import { z } from "zod"
import { descriptionText, headingText, name } from "../utils"
import {
  emailSchema,
  locationSchema,
  phoneSchema,
  smsSchema,
  telegramSchema,
  websiteSchema,
  wechatSchema,
  whatsappSchema,
} from "./common"

export const contactSchema = z.discriminatedUnion("type", [
  phoneSchema,
  emailSchema,
  websiteSchema,
  locationSchema,
  smsSchema,
  whatsappSchema,
  wechatSchema,
  telegramSchema,
])

export const profileCardSchema = z.object({
  id: z.uuidv4(),
  enabled: z.boolean(),
  type: z.literal("profile"),
  details: z.object({
    profile: z.object({
      imageSrc: z.url(),
      enabled: z.boolean(),
    }),
    branding: z.object({
      imageSrc: z.url(),
      enabled: z.boolean(),
    }),
  }),
  name: z.object({
    name,
    enabled: z.boolean(),
  }),
  info: z.object({
    primary: z.object({
      enabled: z.boolean(),
      text: z.string().min(3).max(30).trim(),
    }),
    secondary: z.object({
      enabled: z.boolean(),
      text: z.string().min(3).max(30).trim(),
    }),
  }),
  contacts: z.object({
    enabled: z.boolean(),
    list: z.array(contactSchema),
  }),
})

export const headingTextSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("heading-text"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  description: z.object({
    text: descriptionText,
    enabled: z.boolean(),
  }),
  background: z.boolean(),
})

export const floatingButtonSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("floating-button"),
  enabled: z.boolean(),
  label: z.object({
    text: z.string().min(4).max(20).trim(),
    enabled: z.boolean(),
  }),
  showQrButton: z.boolean(),
  showShareButton: z.boolean(),
})

export const contentEditorSchema = z.object({
  templateId: z.string(),
  sections: z.array(
    z.discriminatedUnion("type", [profileCardSchema, headingTextSchema, floatingButtonSchema]),
  ),
})
