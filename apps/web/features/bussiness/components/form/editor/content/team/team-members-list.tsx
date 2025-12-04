import { Field, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface TeamMembersListProps {
  sectionIdx: number
}

export const TeamMembersList = withForm({
  props: {} as TeamMembersListProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    return (
      <form.AppField
        mode="array"
        name={`sections[${sectionIdx}].members`}
        children={(field) => {
          const hasAnyMembers = field?.state?.value?.length > 0
          if (!hasAnyMembers) return null

          return (
            <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
              <EditorSortGroup>
                {(img, imageIdx) => (
                  <EditorSubSortItem
                    id={img.id}
                    key={imageIdx}
                    onDelete={() => {
                      field.removeValue(imageIdx, {
                        dontValidate: true,
                      })
                    }}
                  >
                    <FieldSet>
                      <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
                        <form.AppField
                          name={`sections[${sectionIdx}].members[${imageIdx}].memberName`}
                          children={(field) => <field.TextField label="Name" />}
                        />
                        <form.AppField
                          name={`sections[${sectionIdx}].members[${imageIdx}].memberDesignation`}
                          children={(field) => <field.TextField label="Designation" />}
                        />
                      </div>
                      <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
                        <Field className="w-fit">
                          <form.AppField
                            name={`sections[${sectionIdx}].members[${imageIdx}].memberProfile.enabled`}
                            children={(field) => <field.SwitchField label="Profile" />}
                          />
                          <form.AppField
                            name={`sections[${sectionIdx}].members[${imageIdx}].memberProfile.imageSrc`}
                            children={(field) => <EditorImageUploader src={field?.state?.value} />}
                          />
                        </Field>
                        <ToggleTextareaField
                          form={form}
                          variant="default"
                          label="Description"
                          className="h-full"
                          fields={{
                            name: `sections[${sectionIdx}].members[${imageIdx}].memberDescription.text`,
                            enabled: `sections[${sectionIdx}].description.enabled`,
                          }}
                        />
                      </div>
                    </FieldSet>
                  </EditorSubSortItem>
                )}
              </EditorSortGroup>
            </EditorSortProvider>
          )
        }}
      />
    )
  },
})
