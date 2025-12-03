import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface ListImagesFormProps {
  sectionIdx: number
}

export const ListImagesForm = withForm({
  props: {} as ListImagesFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    return (
      <form.AppField
        mode="array"
        name={`sections[${sectionIdx}].images`}
        children={(field) => {
          const hasAnyImages = field?.state?.value?.length > 0
          if (!hasAnyImages) return null

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
                    <div className="flex flex-col gap-4 @lg/editor-sub-sort:flex-row">
                      <form.AppField
                        name={`sections[${sectionIdx}].images[${imageIdx}].imageSrc`}
                        children={(imgSrcField) => (
                          <EditorImageUploader src={imgSrcField.state.value} />
                        )}
                      />
                      <div className="flex flex-col gap-4 justify-center w-full">
                        <form.AppField
                          name={`sections[${sectionIdx}].images[${imageIdx}].title`}
                          children={(titleField) => (
                            <titleField.TextField placeholder="Image Title (Optional)" />
                          )}
                        />
                        <form.AppField
                          name={`sections[${sectionIdx}].images[${imageIdx}].link`}
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
          )
        }}
      />
    )
  },
})
