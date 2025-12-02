import { z } from "zod"
import {
  address,
  appleMusicUrl,
  behanceUrl,
  cashappUrl,
  color,
  email,
  etsyUrl,
  facebookUrl,
  googleBusinessUrl,
  instagramUrl,
  linkedinUrl,
  linkLabel,
  locationUrl,
  paypalUrl,
  phoneNumber,
  pinterestUrl,
  snapchatUrl,
  soundCloudUrl,
  spotifyUrl,
  stripeUrl,
  telegram,
  tiktokUrl,
  twitchUrl,
  twitterUrl,
  venmoUrl,
  vimeoUrl,
  websiteUrl,
  wechatUrl,
  whatsappUrl,
  yelpUrl,
  youtubeUrl,
  zelleUrl,
} from "../utils"

export const baseLinkSchema = z.object({
  id: z.uuidv4(),
  label: linkLabel,
})

export const termsLinkSchema = z.object({
  type: z.literal("url"),
  content: websiteUrl,
})

export const termsContentSchema = z.object({
  type: z.literal("content"),
  content: z.string().min(10).max(100),
})

export const phoneSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("phone"),
  value: phoneNumber,
})

export const emailSchema = z.object({
  id: z.uuidv4(),
  value: email,
  type: z.literal("email"),
})

export const websiteSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("website"),
  value: websiteUrl,
})

export const locationSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("location"),
  value: locationUrl,
})

export const smsSchema = z.object({
  id: z.uuidv4(),
  type: z.literal("sms"),
  value: z.e164({ error: "Invalid SMS number" }).trim(),
})

export const whatsappSchema = z.object({
  id: z.uuidv4(),
  value: whatsappUrl,
  type: z.literal("whatsapp"),
})

export const wechatSchema = z.object({
  id: z.uuidv4(),
  value: wechatUrl,
  type: z.literal("wechat"),
})

export const telegramSchema = z.object({
  id: z.uuidv4(),
  value: telegram,
  type: z.literal("telegram"),
})

export const facebookLinkSchema = baseLinkSchema.extend({
  url: facebookUrl,
  type: z.literal("facebook"),
})

export const instagramLinkSchema = baseLinkSchema.extend({
  url: instagramUrl,
  type: z.literal("instagram"),
})

export const twitterLinkSchema = baseLinkSchema.extend({
  url: twitterUrl,
  type: z.literal("twitter"),
})

export const linkedinLinkSchema = baseLinkSchema.extend({
  url: linkedinUrl,
  type: z.literal("linkedin"),
})

export const youtubeLinkSchema = baseLinkSchema.extend({
  url: youtubeUrl,
  type: z.literal("youtube"),
})

export const twitchLinkSchema = baseLinkSchema.extend({
  url: twitchUrl,
  type: z.literal("twitch"),
})

export const tiktokLinkSchema = baseLinkSchema.extend({
  url: tiktokUrl,
  type: z.literal("tiktok"),
})

export const snapchatLinkSchema = baseLinkSchema.extend({
  url: snapchatUrl,
  type: z.literal("snapchat"),
})

export const behanceLinkSchema = baseLinkSchema.extend({
  url: behanceUrl,
  type: z.literal("behance"),
})

export const pinterestLinkSchema = baseLinkSchema.extend({
  url: pinterestUrl,
  type: z.literal("pinterest"),
})

export const phoneLinkSchema = baseLinkSchema.extend({
  url: phoneNumber,
  type: z.literal("phone"),
})

export const emailLinkSchema = baseLinkSchema.extend({
  url: email,
  type: z.literal("email"),
})

export const websiteLinkSchema = baseLinkSchema.extend({
  url: websiteUrl,
  type: z.literal("website"),
})

export const smsLinkSchema = baseLinkSchema.extend({
  url: phoneNumber,
  type: z.literal("sms"),
})

export const locationLinkSchema = baseLinkSchema.extend({
  url: locationUrl,
  type: z.literal("location"),
})

export const whatsappLinkSchema = baseLinkSchema.extend({
  url: whatsappUrl,
  type: z.literal("whatsapp"),
})

export const wechatLinkSchema = baseLinkSchema.extend({
  url: wechatUrl,
  type: z.literal("wechat"),
})

export const telegramLinkSchema = baseLinkSchema.extend({
  url: telegram,
  type: z.literal("telegram"),
})

export const googleBusinessLinkSchema = baseLinkSchema.extend({
  url: googleBusinessUrl,
  type: z.literal("google-business"),
})

export const yelpLinkSchema = baseLinkSchema.extend({
  url: yelpUrl,
  type: z.literal("yelp"),
})

export const etsyLinkSchema = baseLinkSchema.extend({
  url: etsyUrl,
  type: z.literal("etsy"),
})

export const paypalLinkSchema = baseLinkSchema.extend({
  url: paypalUrl,
  type: z.literal("paypal"),
})

export const stripeLinkSchema = baseLinkSchema.extend({
  url: stripeUrl,
  type: z.literal("stripe"),
})

export const cashappLinkSchema = baseLinkSchema.extend({
  url: cashappUrl,
  type: z.literal("cashapp"),
})

export const zelleLinkSchema = baseLinkSchema.extend({
  url: zelleUrl,
  type: z.literal("zelle"),
})

export const venmoLinkSchema = baseLinkSchema.extend({
  url: venmoUrl,
  type: z.literal("venmo"),
})

export const appleMusicLinkSchema = baseLinkSchema.extend({
  url: appleMusicUrl,
  type: z.literal("apple-music"),
})

export const soundCloudLinkSchema = baseLinkSchema.extend({
  url: soundCloudUrl,
  type: z.literal("sound-cloud"),
})

export const spotifyLinkSchema = baseLinkSchema.extend({
  url: spotifyUrl,
  type: z.literal("spotify"),
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

export const youtubeVideoSchema = z.object({
  type: z.literal("youtube"),
  youtubeUrl: youtubeUrl,
})

export const vimeoVideoSchema = z.object({
  type: z.literal("vimeo"),
  vimeoUrl: vimeoUrl,
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

export const contactAddressSchema = z.object({
  id: z.uuidv4(),
  streetAddress1: address,
  streetAddress2: address,
  type: z.literal("address"),
  zipCode: z.int().positive().min(4),
  label: z.string().min(4).max(10).trim(),
  cityName: z.string().min(2).max(50).trim(),
  stateName: z.string().min(2).max(30).trim(),
  countryName: z.string().min(2).max(50).trim(),
  location: z.object({
    url: locationUrl,
    enabled: z.boolean(),
    label: z.string().min(4).max(20).trim(),
  }),
})
