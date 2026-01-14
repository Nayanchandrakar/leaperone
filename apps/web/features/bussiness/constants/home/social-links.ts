import type { SocialLink } from "@app/types"
import { generateUUID } from "@/utils"

// -- Social Networks
export const SOCIAL_NETWORK_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Facebook",
    type: "facebook",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Instagram",
    type: "instagram",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "X (Twitter)",
    type: "twitter",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "LinkedIn",
    type: "linkedin",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Snapchat",
    type: "snapchat",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Pinterest",
    type: "pinterest",
  },
]

// -- Video & Streaming Platforms
export const VIDEO_STREAMING_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "YouTube",
    type: "youtube",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Twitch",
    type: "twitch",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "TikTok",
    type: "tiktok",
  },
]

// -- Creative Platforms
export const CREATIVE_PLATFORM_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Behance",
    type: "behance",
  },
]

// -- Communication & Messaging
export const COMMUNICATION_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "012345679",
    label: "Phone",
    type: "phone",
  },
  {
    id: generateUUID(),
    href: "youremail@domain.com",
    label: "Email",
    type: "email",
  },
  {
    id: generateUUID(),
    href: "012345679",
    label: "SMS",
    type: "sms",
  },
  {
    id: generateUUID(),
    href: "012345679",
    label: "WhatsApp",
    type: "whatsapp",
  },
  {
    id: generateUUID(),
    href: "012345679",
    label: "WeChat",
    type: "wechat",
  },
  {
    id: generateUUID(),
    href: "www.yourtelegramlink.com",
    label: "Telegram",
    type: "telegram",
  },
]

// -- Business & Listings
export const BUSINESS_LISTING_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Google Business",
    type: "google-business",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Yelp",
    type: "yelp",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Etsy",
    type: "etsy",
  },
  {
    id: generateUUID(),
    href: "www.yourwebsite.com",
    label: "Website",
    type: "website",
  },
  {
    id: generateUUID(),
    href: "https://maps.google.com/",
    label: "Location",
    type: "location",
  },
]

// -- Payment Services
export const PAYMENT_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "PayPal",
    type: "paypal",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Stripe",
    type: "stripe",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "CashApp",
    type: "cashapp",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Zelle",
    type: "zelle",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Venmo",
    type: "venmo",
  },
]

// -- Music Platforms
export const MUSIC_LINKS: SocialLink[] = [
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Apple Music",
    type: "apple-music",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "SoundCloud",
    type: "sound-cloud",
  },
  {
    id: generateUUID(),
    href: "www.profilelink.com",
    label: "Spotify",
    type: "spotify",
  },
]
