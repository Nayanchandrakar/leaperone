import type { ContentSectionType } from "@app/core/types"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading/index"

type ContentFormComponent = (props: { index: number }) => React.ReactNode
type ContentFormMap = Record<ContentSectionType, ContentFormComponent>

export const CONTENT_FORMS: Partial<ContentFormMap> = {
  "heading-text": (props) => <HeadingTextForm {...props} />,
}
