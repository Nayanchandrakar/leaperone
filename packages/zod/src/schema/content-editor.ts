import { z } from "zod"

export const profileCardSchema = z.object({
  id: z.string(),
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
  nameSection: z.object({
    enabled: z.boolean(),
    name: z.string().min(3).max(40),
  }),
  infoSection: z.object({
    primaryInfo: z.object({
      enabled: z.boolean(),
      text: z.string().min(2).max(30),
    }),
    secondaryInfo: z.object({
      enabled: z.boolean(),
      text: z.string().min(2).max(30),
    }),
  }),
})

export const headingTextSchema = z.object({
  id: z.string(),
  enabled: z.boolean(),
  heading: z.object({
    enabled: z.boolean(),
    text: z.string().min(2).max(40),
  }),
  description: z.object({
    enabled: z.boolean(),
    text: z.string().min(2).max(100),
  }),
  background: z.boolean(),
  type: z.literal("heading-text"),
})

export const contentEditorSchema = z.object({
  templateId: z.string(),
  sections: z.array(z.discriminatedUnion("type", [profileCardSchema, headingTextSchema])),
})
