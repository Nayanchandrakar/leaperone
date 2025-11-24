import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { HeadingTextForm } from "@/features/bussiness/components/form/editor/content/heading-text-form"
import { ProfileForm } from "@/features/bussiness/components/form/editor/content/profile-form"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

type FormProps = {
  item: ContentEditorSortItem
  index: number
}

export const ContentFormRenderer = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    switch (item.type) {
      case "profile": {
        return <ProfileForm form={form} item={item} index={index} />
      }
      case "heading-text": {
        return <HeadingTextForm form={form} item={item} index={index} />
      }
    }
  },
})
