export type Template = "classic" | "premium"

export type ImageViewType = "list" | "grid" | "featured" | "carousel" | "slideshow"

export type ContentSectionType =
  | "cta-button"
  | "card-profile"
  | "heading-text"
  | "social-links"
  | "video-section"
  | "teams-section"
  | "bussiness-hour"
  | "contact-details"
  | "floating-button"
  | "image-text-links"
  | "pdf-file-section"
  | "testimonials-section"

export type ContactType =
  | "sms"
  | "phone"
  | "email"
  | "wechat"
  | "website"
  | "location"
  | "whatsapp"
  | "telegram"

type SocialLinkBase =
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

export type SocialLinkType = SocialLinkBase | ContactType

export type FontFamily =
  | "Inter"
  | "Lato"
  | "Montserrat"
  | "Space Grotesk"
  | "Poppins"
  | "Raleway"
  | "Syne"
  | "Saira"
  | "IBM Plex Mono"
  | "Roboto"
  | "Nunito"
  | "Roboto Slab"
  | "Lora"
  | "Merriweather"
  | "GFS Didot"
  | "IBM Plex Serif"
  | "Fraunces"
  | "Inria Serif"
  | "Noto Serif"
  | "Times New Roman"
  | "Sour Gummy"
  | "Delius"
  | "Indie Flower"
  | "Satisfy"
  | "Handlee"

export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

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
