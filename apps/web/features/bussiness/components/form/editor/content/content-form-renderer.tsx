import type { ContentSectionType } from "@app/core/types"
import { memo } from "react"
// import { ContactDetailsForm } from "@/features/bussiness/components/form/editor/content/contact"
// import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
// import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading-text-form"

// import { ImageTextLinksForm } from "@/features/bussiness/components/form/editor/content/images"
// import { SocialLinksForm } from "@/features/bussiness/components/form/editor/content/links"
// import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile"

// import { TeamSectionForm } from "@/features/bussiness/components/form/editor/content/team"
// import { TestimonialsSectionForm } from "@/features/bussiness/components/form/editor/content/testimonials"
// import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"

interface FormProps {
  id: string
  sectionIdx: number
  type: ContentSectionType
}

function ContentFormRendererBase({ id, type, sectionIdx }: FormProps) {
  switch (type) {
    // case "profile": {
    //   return <ProfileForm sectionIdx={sectionIdx} id={id} />
    // }

    case "heading-text": {
      return <HeadingTextForm sectionIdx={sectionIdx} id={id} />
    }

    // case "floating-button": {
    //   return <FloatingCardButtonForm sectionIdx={sectionIdx} id={id} />
    // }

    // case "video": {
    //   return <VideoForm sectionIdx={sectionIdx} id={id} />
    // }

    // case "cta-button": {
    //   return <CtaButtonForm id={id} sectionIdx={sectionIdx} />
    // }

    // case "social-links": {
    //   return <SocialLinksForm sectionIdx={sectionIdx} id={id} />
    // }

    // case "contact-details": {
    //   return <ContactDetailsForm id={id} sectionIdx={sectionIdx} />
    // }

    // case "image-text-links": {
    //   return <ImageTextLinksForm sectionIdx={sectionIdx} id={id} />
    // }

    // case "team": {
    //   return <TeamSectionForm sectionIdx={sectionIdx} id={id} />
    // }

    // case "testimonials": {
    //   return <TestimonialsSectionForm sectionIdx={sectionIdx} id={id} />
    // }
    default: {
      return null
    }
  }
}

export const ContentFormRenderer = memo(ContentFormRendererBase, (prevProps, nextProps) =>
  Boolean(
    prevProps.id === nextProps.id &&
      prevProps.type === nextProps.type &&
      prevProps.sectionIdx === nextProps.sectionIdx,
  ),
)
