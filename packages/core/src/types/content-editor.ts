import type {
  BaseContentSection,
  ContactType,
  EnabledField,
  ImageViewType,
  SocialLinkType,
} from "./common"

export type Contact = {
  id: string
  value: string
  type: ContactType
}

export type SocialLink = {
  id: string
  url: string
  type: SocialLinkType
}

export interface ContactAddressItem {
  id: string
  type: "address"
  streetAddress1: string
  streetAddress2: string
  zipCode: number
  label: string
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
  url: string
  type: "phone"
}

export interface EmailLink {
  id: string
  url: string
  type: "email"
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
  memberName: string
  memberDesignation: string
  memberProfile: {
    enabled: boolean
    imageSrc: string
  }
  memberDescription: {
    text: string
    enabled: boolean
  }
}

export interface TestimonialMember {
  id: string
  authorName: string
  authorDesignation: string
  authorProfile: {
    enabled: boolean
    imageSrc: string
  }
  testimonialText: {
    text: string
    enabled: boolean
  }
}

export interface ProfileCardSection extends BaseContentSection<"profile"> {
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

export interface TeamSection extends BaseContentSection<"team"> {
  background: boolean
  members: TeamMember[]
  heading: EnabledField<string>
  description: EnabledField<string>
}

export interface TestimonialsSection extends BaseContentSection<"testimonials"> {
  background: boolean
  heading: EnabledField<string>
  description: EnabledField<string>
  testimonials: TestimonialMember[]
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
  templateId: string
  sections: ContentSection[]
}
