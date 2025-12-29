export type TemplateKey = "classic" | "premium"

export type ImageViewType = "list" | "grid-1" | "grid-2" | "carousel" | "slideshow"

export type ContentSectionType =
  | "card-profile"
  | "heading-text"
  | "floating-button"
  | "video-section"
  | "cta-button"
  | "social-links"
  | "contact-details"
  | "image-text-links"
  | "teams-section"
  | "testimonials-section"

export type ContactType =
  | "phone"
  | "email"
  | "website"
  | "location"
  | "sms"
  | "whatsapp"
  | "wechat"
  | "telegram"

export type SocialLinkType =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "youtube"
  | "twitch"
  | "tiktok"
  | "snapchat"
  | "behance"
  | "pinterest"
  | "phone"
  | "email"
  | "website"
  | "location"
  | "sms"
  | "whatsapp"
  | "wechat"
  | "telegram"
  | "google-business"
  | "yelp"
  | "etsy"
  | "paypal"
  | "stripe"
  | "cashapp"
  | "zelle"
  | "venmo"
  | "apple-music"
  | "sound-cloud"
  | "spotify"

export interface EnabledField<T = string> {
  text: T
  enabled: boolean
}

export interface HeadingDescription {
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface BaseContentSection<T extends ContentSectionType> {
  type: T
  id: string
  enabled: boolean
}
