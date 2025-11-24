import type { ContentEditorSchema, ProfileCardSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

type FormProps = {
  item: ProfileCardSchema
  index: number
}

export const ProfileForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    return (
      <EditorSortItem
        id={item.id}
        name="Card Profile"
        checked={item.enabled}
        onCheckedChange={() => {}}
      >
        <form.AppField
          name={`sections[${index}].nameSection.name`}
          children={(field) => {
            return <field.TextField label="Name" />
          }}
        />
      </EditorSortItem>
    )
  },
})
