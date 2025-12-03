import { Field, FieldLabel } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface ImageListsFormProps {
  sectionIdx: number
}

export const ImageListsForm = withForm({
  props: {} as ImageListsFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    return (
      <form.AppField
        mode="array"
        name={`sections[${sectionIdx}].images`}
        children={(field) => (
          <Field>
            <FieldLabel>Images & Links</FieldLabel>
            <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
              <EditorSortGroup>
                {(item, itemIdx) => (
                  <EditorSubSortItem id={item.id} key={itemIdx}>
                    <div key={itemIdx} className="flex gap-6 items-center">
                      <EditorImageUploader src={item.imageSrc} />
                      <div className="space-y-4 w-full">
                        <form.AppField
                          name={`sections[${sectionIdx}].images[${itemIdx}].title`}
                          children={(titleFIeld) => (
                            <titleFIeld.TextField placeholder="Image Title (Optional)" />
                          )}
                        />
                        <form.AppField
                          name={`sections[${sectionIdx}].images[${itemIdx}].link`}
                          children={(linkField) => (
                            <linkField.TextField placeholder="Link URL for clickable image (Optional)" />
                          )}
                        />
                      </div>
                    </div>
                  </EditorSubSortItem>
                )}
              </EditorSortGroup>
            </EditorSortProvider>
          </Field>
        )}
      />
    )
  },
})
