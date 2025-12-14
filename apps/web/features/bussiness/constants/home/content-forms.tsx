import type { ContentSectionType } from "@app/core/types"
import { ContactDetailsForm } from "@/features/bussiness/components/form/editor/content/contact"
import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading/index"
import { ImageTextLinksForm } from "@/features/bussiness/components/form/editor/content/images"
import { SocialLinksForm } from "@/features/bussiness/components/form/editor/content/links"
import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile"
import { TeamSectionForm } from "@/features/bussiness/components/form/editor/content/team"
import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"

type ContentFormComponent = (props: { index: number }) => React.ReactNode
type ContentFormMap = Record<ContentSectionType, ContentFormComponent>

export const CONTENT_FORMS: Partial<ContentFormMap> = {
  "video-section": (props) => <VideoForm {...props} />,
  "heading-text": (props) => <HeadingTextForm {...props} />,
  "floating-button": (props) => <FloatingCardButtonForm {...props} />,
  "cta-button": (props) => <CtaButtonForm {...props} />,
  profile: (props) => <ProfileForm {...props} />,
  "contact-details": (props) => <ContactDetailsForm {...props} />,
  "social-links": (props) => <SocialLinksForm {...props} />,
  "image-text-links": (props) => <ImageTextLinksForm {...props} />,
  team: (props) => <TeamSectionForm {...props} />,
}
