import type {
  BaseContentSection,
  ContactType,
  EnabledField,
  ImageViewType,
  SocialLinkType,
  TemplateKey,
} from "./common"

export type Contact = {
  id: string
  value: string
  type: ContactType
}

export type SocialLink = {
  id: string
  href: string
  label: string
  type: SocialLinkType
}

export interface ContactAddressItem {
  id: string
  label: string
  type: "address"
  streetAddress1: string
  streetAddress2: string
  zipCode: number
  cityName: string
  stateName: string
  countryName: string
  location: {
    url: string
    enabled: boolean
    label: string
  }
}

export interface PhoneLink {
  id: string
  type: "phone"
  label: string
  phoneNumber: string
}

export interface EmailLink {
  id: string
  type: "email"
  email: string
  label: string
}

export type ContactItem = PhoneLink | EmailLink | ContactAddressItem

export interface YoutubeVideo {
  type: "youtube"
  youtubeUrl: string
}

export interface VimeoVideo {
  type: "vimeo"
  vimeoUrl: string
}

export type Video = YoutubeVideo | VimeoVideo

export interface ImageLink {
  id: string
  imageSrc: string
  link?: string
  title?: string
}

export interface TeamMember {
  id: string
  name: string
  designation: string
  profile: {
    enabled: boolean
    imageSrc: string
  }
  description: EnabledField<string>
}

export interface Testimonial {
  id: string
  name: string
  designation: EnabledField<string>
  profile: {
    enabled: boolean
    imageSrc: string
  }
  testimonialText: string
}

export interface ProfileCardSection extends BaseContentSection<"card-profile"> {
  details: {
    profile: {
      imageSrc: string
      enabled: boolean
    }
    branding: {
      imageSrc: string
      enabled: boolean
    }
  }
  name: {
    name: string
    enabled: boolean
  }
  info: {
    primary: EnabledField<string>
    secondary: EnabledField<string>
  }
  contacts: {
    enabled: boolean
    list: Contact[]
  }
}

export interface HeadingTextSection extends BaseContentSection<"heading-text"> {
  heading: EnabledField<string>
  description: EnabledField<string>
  background: boolean
}

export interface FloatingButtonSection extends BaseContentSection<"floating-button"> {
  label: EnabledField<string>
  showQrButton: boolean
  showShareButton: boolean
}

export interface VideoSection extends BaseContentSection<"video-section"> {
  video: Video
  background: boolean
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface CtaButtonSection extends BaseContentSection<"cta-button"> {
  link: string
  label: string
  background: boolean
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface LinkSection extends BaseContentSection<"social-links"> {
  links: SocialLink[]
  background: boolean
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface ContactDetailsSection extends BaseContentSection<"contact-details"> {
  background: boolean
  items: ContactItem[]
  heading: EnabledField<string>
}

export interface ImagesTextLinksSection extends BaseContentSection<"image-text-links"> {
  background: boolean
  images: ImageLink[]
  imageView: ImageViewType
  description: EnabledField<string>
  heading: EnabledField<string>
}

export interface TeamSection extends BaseContentSection<"teams-section"> {
  background: boolean
  members: TeamMember[]
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface TestimonialsSection extends BaseContentSection<"testimonials-section"> {
  background: boolean
  heading: EnabledField<string>
  description: EnabledField<string>
  testimonials: Testimonial[]
}

export type ContentSection =
  | VideoSection
  | CtaButtonSection
  | ProfileCardSection
  | HeadingTextSection
  | LinkSection
  | FloatingButtonSection
  | ContactDetailsSection
  | ImagesTextLinksSection
  | TestimonialsSection
  | TeamSection

/**
 * Main Content Editor interface
 * Contains template ID and array of content sections
 */
export interface ContentEditor {
  template: TemplateKey
  sections: ContentSection[]
}
