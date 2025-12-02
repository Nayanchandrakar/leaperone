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

export const phoneNumber = z.e164({ error: "Invalid phone number" }).trim()

export const telegram = z
  .url()
  .regex(patterns.telegram, {
    message: "Invalid telegram link",
  })
  .trim()

export const headingText = z.string().min(2).max(30).trim()
export const descriptionText = z.string().min(2).max(200).trim()

export const linkLabel = z.string().min(4).max(20).trim()
export const color = z.string().min(3).max(15).trim()
export const agreementHeading = z.string().min(5).max(40)
export const email = z.email().toLowerCase().trim()
export const callbackUrl = z.string().trim()
export const seats = z.number().default(1)
export const address = z.string().min(4).max(30).trim()

export const name = z
  .string()
  .trim()
  .min(3, { message: "Name is required" })
  .max(30, { message: "Name must be less than 30 characters" })

// Social Media URL Validators
export const facebookUrl = z.url().regex(patterns.facebook, {
  message: "Invalid Facebook URL. Example: https://facebook.com/username",
})

export const instagramUrl = z.url().regex(patterns.instagram, {
  message: "Invalid Instagram URL. Example: https://instagram.com/username",
})

export const twitterUrl = z.url().regex(patterns.twitter, {
  message: "Invalid Twitter/X URL. Example: https://twitter.com/username",
})

export const linkedinUrl = z.url().regex(patterns.linkedin, {
  message: "Invalid LinkedIn URL. Example: https://linkedin.com/in/username",
})

export const snapchatUrl = z.url().regex(patterns.snapchat, {
  message: "Invalid Snapchat URL. Example: https://snapchat.com/add/username",
})

export const pinterestUrl = z.url().regex(patterns.pinterest, {
  message: "Invalid Pinterest URL. Example: https://pinterest.com/username",
})

export const behanceUrl = z.url().regex(patterns.behance, {
  message: "Invalid Behance URL. Example: https://behance.net/username",
})

export const youtubeUrl = z.url().regex(patterns.youtubeUrl, {
  message: "Invalid YouTube URL",
})

export const vimeoUrl = z.url().regex(patterns.vimeoUrl, {
  message: "Invalid Vimeo URL",
})

// Communication URL Validators
export const twitchUrl = z.url().regex(patterns.twitch, {
  message: "Invalid Twitch URL. Example: https://twitch.tv/username",
})

export const tiktokUrl = z.url().regex(patterns.tiktok, {
  message: "Invalid TikTok URL. Example: https://tiktok.com/@username",
})

export const whatsappUrl = z.url().regex(patterns.whatsapp, {
  message: "Invalid WhatsApp URL. Example: https://wa.me/+1234567890",
})

export const wechatUrl = z.string().regex(patterns.wechat, {
  message: "Invalid WeChat URL. Example: weixin://username",
})

// Business URL Validators
export const googleBusinessUrl = z.url().regex(patterns.googleBusiness, {
  message: "Invalid Google Business URL. Use a Google Maps place URL",
})

export const yelpUrl = z.url().regex(patterns.yelp, {
  message: "Invalid Yelp URL. Example: https://yelp.com/biz/business-name",
})

export const etsyUrl = z.url().regex(patterns.etsy, {
  message: "Invalid Etsy URL. Example: https://etsy.com/shop/shopname",
})

// Payment URL Validators
export const paypalUrl = z.url().regex(patterns.paypal, {
  message: "Invalid PayPal URL. Example: https://paypal.me/username",
})

export const stripeUrl = z.url().regex(patterns.stripe, {
  message: "Invalid Stripe URL. Example: https://pay.stripe.com/link",
})

export const cashappUrl = z.url().regex(patterns.cashapp, {
  message: "Invalid Cash App URL. Example: https://cash.app/$username",
})

export const zelleUrl = z.string().regex(patterns.zelle, {
  message: "Invalid Zelle email address",
})

export const venmoUrl = z.url().regex(patterns.venmo, {
  message: "Invalid Venmo URL. Example: https://venmo.com/username",
})

// Music URL Validators
export const appleMusicUrl = z.url().regex(patterns.appleMusic, {
  message: "Invalid Apple Music URL",
})

export const soundCloudUrl = z.url().regex(patterns.soundCloud, {
  message: "Invalid SoundCloud URL. Example: https://soundcloud.com/username",
})

export const spotifyUrl = z.url().regex(patterns.spotify, {
  message: "Invalid Spotify URL. Example: https://open.spotify.com/artist/...",
})

// Location URL Validator
export const locationUrl = z.url().regex(patterns.location, {
  message: "Invalid location URL. Use a Google Maps URL",
})

// Generic website URL (for website link schema)
export const websiteUrl = z.url().trim()
