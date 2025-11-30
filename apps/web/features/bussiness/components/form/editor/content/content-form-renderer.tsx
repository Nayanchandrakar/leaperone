import type { ContentEditorSchema } from "@app/zod/types"
import { useMemo } from "react"
import { withForm } from "@/components/ui/app-form"
import { CtaButtonForm } from "@/features/bussiness/components/form/editor/content/cta-button"
import { FloatingCardButtonForm } from "@/features/bussiness/components/form/editor/content/floating-button"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading-text-form"
import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile-form"
import { VideoForm } from "@/features/bussiness/components/form/editor/content/video"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

interface FormProps {
  index: number
  sectionId: string
  sectionType: ContentEditorSortItem["type"]
}

export const ContentFormRenderer = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, sectionType, index }) => {
    const memoizedContent = useMemo(() => {
      switch (sectionType) {
        case "profile": {
          return <ProfileForm form={form} sectionId={sectionId} index={index} />
        }

        case "heading-text": {
          return <HeadingTextForm form={form} index={index} sectionId={sectionId} />
        }

        case "floating-button": {
          return <FloatingCardButtonForm form={form} index={index} sectionId={sectionId} />
        }

        case "video": {
          return <VideoForm form={form} index={index} sectionId={sectionId} />
        }

        case "cta-button": {
          return <CtaButtonForm form={form} index={index} sectionId={sectionId} />
        }
      }
    }, [form, sectionId, sectionType, index])

    return memoizedContent
  },
})
