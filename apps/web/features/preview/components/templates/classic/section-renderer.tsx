import type { ContentSection } from "@app/core/types"
import { ImageTextLinkSection } from "@/features/preview/components/templates/classic/images"
import { ContactDetailSection } from "./contacts"
import { CtaButtonSection } from "./cta-button-section"
import { HeadingSection } from "./heading-section"
import { VideoSection } from "./video-section"

// import { FloatingButtonSection } from "./floating"

type ClassicSectionRendererProps = {
  content: ContentSection
}

export const ClassicSectionRenderer = ({ content }: ClassicSectionRendererProps) => {
  switch (content.type) {
    case "heading-text":
      return <HeadingSection content={content} />

    case "image-text-links":
      return <ImageTextLinkSection content={content} />

    case "contact-details":
      return <ContactDetailSection content={content} />

    case "cta-button":
      return <CtaButtonSection content={content} />

    // case "floating-button":
    //   return <FloatingButtonSection content={content} />

    case "video-section":
      return <VideoSection content={content} />

    // case "card-profile":
    //   return <ProfileSection content={content} />

    // case "social-links":
    //   return <SocialLinksSection content={content} />

    // case "teams-section":
    //   return <TeamsSection content={content} />

    // case "testimonials-section":
    //   return <TestimonialSection content={content} />

    default: {
      return null
    }
  }
}
