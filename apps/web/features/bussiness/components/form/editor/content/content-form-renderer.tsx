import type { ContentEditorSchema } from "@app/zod/types"
import { memo } from "react"
import { withForm } from "@/components/ui/app-form"
import { ContactDetailsForm } from "@/features/bussiness/components/form/editor/content/contact"
import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading-text-form"
import { ImageTextLinksForm } from "@/features/bussiness/components/form/editor/content/images"
import { SocialLinksForm } from "@/features/bussiness/components/form/editor/content/links"
import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile"
import { TeamSectionForm } from "@/features/bussiness/components/form/editor/content/team"
import { TestimonialsSectionForm } from "@/features/bussiness/components/form/editor/content/testimonials"
import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

interface FormProps {
  id: string
  sectionIdx: number
  type: ContentEditorSortItem["type"]
}

export const ContentFormRendererBase = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, id, type, sectionIdx }) => {
    switch (type) {
      case "profile": {
        return <ProfileForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "heading-text": {
        return <HeadingTextForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "floating-button": {
        return <FloatingCardButtonForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "video": {
        return <VideoForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "cta-button": {
        return <CtaButtonForm form={form} id={id} sectionIdx={sectionIdx} />
      }

      case "social-links": {
        return <SocialLinksForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "contact-details": {
        return <ContactDetailsForm form={form} id={id} sectionIdx={sectionIdx} />
      }

      case "image-text-links": {
        return <ImageTextLinksForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "team": {
        return <TeamSectionForm form={form} sectionIdx={sectionIdx} id={id} />
      }

      case "testimonials": {
        return <TestimonialsSectionForm form={form} sectionIdx={sectionIdx} id={id} />
      }
      default: {
        return null
      }
    }
  },
})

export const ContentFormRenderer = memo(ContentFormRendererBase, (prevProps, nextProps) =>
  Boolean(
    prevProps.id === nextProps.id &&
      prevProps.type === nextProps.type &&
      prevProps.sectionIdx === nextProps.sectionIdx,
  ),
)
