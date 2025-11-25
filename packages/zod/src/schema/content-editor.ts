import { z } from "zod"
import { descriptionText, email, headingText, name, telegram } from "../utils"

export const contactSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.uuidv4(),
    type: z.literal("phone"),
    value: z.e164({ error: "Invalid phone number" }).trim(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("email"),
    value: email,
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("website"),
    value: z.url(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("location"),
    value: z.url(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("sms"),
    value: z.e164({ error: "Invalid phone number" }).trim(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("whatsapp"),
    value: z.e164({ error: "Invalid whatsapp number" }).trim(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("wechat"),
    value: z.e164({ error: "Invalid wechat number" }).trim(),
  }),
  z.object({
    id: z.uuidv4(),
    type: z.literal("telegram"),
    value: telegram,
  }),
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

export const contentEditorSchema = z.object({
  templateId: z.string(),
  sections: z.array(z.discriminatedUnion("type", [profileCardSchema, headingTextSchema])),
})
