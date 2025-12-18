import { ContactDetailsForm } from "@/features/bussiness/components/form/editor/content/contact"
import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading/index"
import { ImageTextLinksForm } from "@/features/bussiness/components/form/editor/content/images"
import { SocialLinksForm } from "@/features/bussiness/components/form/editor/content/links"
import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile"
import { TeamSectionForm } from "@/features/bussiness/components/form/editor/content/team"
import { TestimonialsSectionForm } from "@/features/bussiness/components/form/editor/content/testimonials"
import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"
import type { ContentSectionMap } from "@/features/bussiness/types"

export const CONTENT_SECTIONS: ContentSectionMap = {
  "video-section": VideoForm,
  "card-profile": ProfileForm,
  "cta-button": CtaButtonForm,
  "heading-text": HeadingTextForm,
  "social-links": SocialLinksForm,
  "teams-section": TeamSectionForm,
  "contact-details": ContactDetailsForm,
  "image-text-links": ImageTextLinksForm,
  "floating-button": FloatingCardButtonForm,
  "testimonials-section": TestimonialsSectionForm,
}
