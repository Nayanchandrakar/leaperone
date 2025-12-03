import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { AddImageLinksForm } from "@/features/bussiness/components/form/editor/content/images/add-image-links"
import { ImageOrientationList } from "@/features/bussiness/components/form/editor/content/images/image-orientation-list"
import { ListImagesForm } from "@/features/bussiness/components/form/editor/content/images/list-images"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import { IMAGE_VIEWS } from "@/features/bussiness/constants/home/image-views"

interface ImageTextLinksFormProps {
  sectionIdx: number
  id: string
}

export const ImageTextLinksForm = withForm({
  props: {} as ImageTextLinksFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx, id }) => {
    return (
      <form.AppField
        name={`sections[${sectionIdx}].enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={id}
            contentClassName="p-0"
            name="Images + Texts + Links"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <ToggleTextField
                form={form}
                variant="gray"
                label="Heading"
                fields={{
                  name: `sections[${sectionIdx}].heading.text`,
                  enabled: `sections[${sectionIdx}].heading.enabled`,
                }}
              />

              <ToggleTextareaField
                form={form}
                variant="gray"
                label="Description"
                fields={{
                  name: `sections[${sectionIdx}].description.text`,
                  enabled: `sections[${sectionIdx}].description.enabled`,
                }}
              />

              <form.AppField
                name={`sections[${sectionIdx}].imageView`}
                children={(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Image View Type</FieldLabel>
                    <ImageOrientationList
                      orientations={IMAGE_VIEWS}
                      selectedOrientation={field.state.value}
                      onOrientationChange={field.handleChange}
                    />
                  </Field>
                )}
              />

              <FieldLabel htmlFor={`sections[${sectionIdx}].images`}>Images & Links</FieldLabel>
              <ListImagesForm form={form} sectionIdx={sectionIdx} />
              <AddImageLinksForm form={form} sectionIdx={sectionIdx} />
            </FieldGroup>
            <EditorBlockFooter>
              <form.AppField
                name={`sections[${sectionIdx}].background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
