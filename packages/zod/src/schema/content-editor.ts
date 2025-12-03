import { z } from "zod"
import { descriptionText, headingText, name } from "../utils"
import {
  appleMusicLinkSchema,
  behanceLinkSchema,
  cashappLinkSchema,
  contactAddressSchema,
  emailLinkSchema,
  emailSchema,
  etsyLinkSchema,
  facebookLinkSchema,
  googleBusinessLinkSchema,
  imageLinkSchema,
  instagramLinkSchema,
  linkedinLinkSchema,
  locationLinkSchema,
  locationSchema,
  paypalLinkSchema,
  phoneLinkSchema,
  phoneSchema,
  pinterestLinkSchema,
  smsLinkSchema,
  smsSchema,
  snapchatLinkSchema,
  soundCloudLinkSchema,
  spotifyLinkSchema,
  stripeLinkSchema,
  telegramLinkSchema,
  telegramSchema,
  tiktokLinkSchema,
  twitchLinkSchema,
  twitterLinkSchema,
  venmoLinkSchema,
  vimeoVideoSchema,
  websiteLinkSchema,
  websiteSchema,
  wechatLinkSchema,
  wechatSchema,
  whatsappLinkSchema,
  whatsappSchema,
  yelpLinkSchema,
  youtubeLinkSchema,
  youtubeVideoSchema,
  zelleLinkSchema,
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

export const socialLinksSchema = z.discriminatedUnion("type", [
  facebookLinkSchema,
  instagramLinkSchema,
  twitterLinkSchema,
  linkedinLinkSchema,
  youtubeLinkSchema,
  twitchLinkSchema,
  tiktokLinkSchema,
  snapchatLinkSchema,
  behanceLinkSchema,
  pinterestLinkSchema,
  phoneLinkSchema,
  emailLinkSchema,
  websiteLinkSchema,
  smsLinkSchema,
  locationLinkSchema,
  whatsappLinkSchema,
  wechatLinkSchema,
  telegramLinkSchema,
  googleBusinessLinkSchema,
  yelpLinkSchema,
  etsyLinkSchema,
  paypalLinkSchema,
  stripeLinkSchema,
  cashappLinkSchema,
  zelleLinkSchema,
  venmoLinkSchema,
  appleMusicLinkSchema,
  soundCloudLinkSchema,
  spotifyLinkSchema,
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

export const videoSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("video"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  description: z.object({
    text: descriptionText,
    enabled: z.boolean(),
  }),
  video: z.discriminatedUnion("type", [youtubeVideoSchema, vimeoVideoSchema]),
  background: z.boolean(),
})

export const ctaButtonSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("cta-button"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  description: z.object({
    text: descriptionText,
    enabled: z.boolean(),
  }),
  link: z.url(),
  label: z.string().min(4).max(20).trim(),
  background: z.boolean(),
})

export const linkSectionSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("social-links"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  description: z.object({
    text: descriptionText,
    enabled: z.boolean(),
  }),
  links: z.array(socialLinksSchema),
  background: z.boolean(),
})

export const contactItemSchema = z.discriminatedUnion("type", [
  phoneLinkSchema,
  emailLinkSchema,
  contactAddressSchema,
])

export const contactDetailsSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("contact-details"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  items: z.array(contactItemSchema),
  background: z.boolean(),
})

export const imagesTextLinksSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("image-text-links"),
  enabled: z.boolean(),
  heading: z.object({
    text: headingText,
    enabled: z.boolean(),
  }),
  description: z.object({
    text: descriptionText,
    enabled: z.boolean(),
  }),
  imageView: z.string(),
  images: z.array(imageLinkSchema),
  background: z.boolean(),
})

export const contentEditorSchema = z.object({
  templateId: z.string(),
  sections: z.array(
    z.discriminatedUnion("type", [
      videoSchema,
      ctaButtonSchema,
      profileCardSchema,
      headingTextSchema,
      linkSectionSchema,
      floatingButtonSchema,
      contactDetailsSchema,
      imagesTextLinksSchema,
    ]),
  ),
})
