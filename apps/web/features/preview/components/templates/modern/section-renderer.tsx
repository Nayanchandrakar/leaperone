import type { ContentSection, FloatingButtonSection } from "@app/types"
import { BussinessHourSection } from "@/features/preview/components/templates/classic/bussiness-hours"
import { ContactDetailSection } from "@/features/preview/components/templates/classic/contact"
import { CtaButtonSection } from "@/features/preview/components/templates/classic/cta-button"
import { HeadingSection } from "@/features/preview/components/templates/classic/heading"
import { ImageTextLinkSection } from "@/features/preview/components/templates/classic/images"
import { SocialLinksSection } from "@/features/preview/components/templates/classic/links"
import { PdfFileSection } from "@/features/preview/components/templates/classic/pdf"
import { TeamSection } from "@/features/preview/components/templates/classic/team"
import { TestimonialSection } from "@/features/preview/components/templates/classic/testimonials"
import { VideoSection } from "@/features/preview/components/templates/classic/video"
import { ProfileSection } from "@/features/preview/components/templates/modern/profile"

type ModernSectionRendererProps = {
  content: Exclude<ContentSection, FloatingButtonSection>
}

export const ModernSectionRenderer = ({ content }: ModernSectionRendererProps) => {
  switch (content.type) {
    case "card-profile":
      return <ProfileSection content={content} />

    case "heading-text":
      return <HeadingSection content={content} />

    case "image-text-links":
      return <ImageTextLinkSection content={content} />

    case "contact-details":
      return <ContactDetailSection content={content} />

    case "cta-button":
      return <CtaButtonSection content={content} />

    case "video-section":
      return <VideoSection content={content} />

    case "social-links":
      return <SocialLinksSection content={content} />

    case "teams-section":
      return <TeamSection content={content} />

    case "testimonials-section":
      return <TestimonialSection content={content} />

    case "pdf-file-section":
      return <PdfFileSection content={content} />

    case "bussiness-hour":
      return <BussinessHourSection content={content} />

    default: {
      return null
    }
  }
}
