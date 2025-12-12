import type { ContentSectionType } from "@app/core/types"
import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading/index"
import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"

type ContentFormComponent = (props: { index: number }) => React.ReactNode
type ContentFormMap = Record<ContentSectionType, ContentFormComponent>

export const CONTENT_FORMS: Partial<ContentFormMap> = {
  "video-section": (props) => <VideoForm {...props} />,
  "heading-text": (props) => <HeadingTextForm {...props} />,
  "floating-button": (props) => <FloatingCardButtonForm {...props} />,
  "cta-button": (props) => <CtaButtonForm {...props} />,
}
