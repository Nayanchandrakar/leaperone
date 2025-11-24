import type { ContentEditorSchema, HeadingTextSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

type FormProps = {
  item: HeadingTextSchema
  index: number
}

export const HeadingTextForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    return (
      <EditorSortItem
        id={item.id}
        name="Heading + Text"
        checked={item.enabled}
        onCheckedChange={() => {}}
      >
        <form.AppField
          name={`sections[${index}].heading.text`}
          children={(field) => {
            return <field.TextField label="Description" />
          }}
        />
      </EditorSortItem>
    )
  },
})
