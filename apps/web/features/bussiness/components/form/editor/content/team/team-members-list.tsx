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
  render: ({ form, sectionIdx }) => (
    <form.AppField
      mode="array"
      name={`sections[${sectionIdx}].members`}
      children={(memebersField) => {
        const hasMembers = memebersField?.state?.value?.length > 0
        if (!hasMembers) return null

        return (
          <EditorSortProvider
            data={memebersField.state.value}
            onDataChange={memebersField.moveValue}
          >
            <EditorSortGroup>
              {(member, memberIdx) => (
                <EditorSubSortItem
                  id={member.id}
                  key={memberIdx}
                  onDelete={() => {
                    memebersField.removeValue(memberIdx, {
                      dontValidate: true,
                    })
                  }}
                >
                  <FieldSet>
                    <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
                      <form.AppField
                        name={`sections[${sectionIdx}].members[${memberIdx}].memberName`}
                        children={(memberNameField) => <memberNameField.TextField label="Name" />}
                      />
                      <form.AppField
                        name={`sections[${sectionIdx}].members[${memberIdx}].memberDesignation`}
                        children={(designationField) => (
                          <designationField.TextField label="Designation" />
                        )}
                      />
                    </div>

                    <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
                      <Field className="w-fit">
                        <form.AppField
                          name={`sections[${sectionIdx}].members[${memberIdx}].memberProfile.enabled`}
                          children={(profileEnabledField) => (
                            <profileEnabledField.SwitchField label="Profile" />
                          )}
                        />
                        <form.AppField
                          name={`sections[${sectionIdx}].members[${memberIdx}].memberProfile.imageSrc`}
                          children={(profileImageField) => (
                            <EditorImageUploader src={profileImageField?.state?.value} />
                          )}
                        />
                      </Field>

                      <ToggleTextareaField
                        form={form}
                        variant="default"
                        label="Description"
                        className="h-full"
                        fields={{
                          name: `sections[${sectionIdx}].members[${memberIdx}].memberDescription.text`,
                          enabled: `sections[${sectionIdx}].members[${memberIdx}].memberDescription.enabled`,
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
  ),
})
