import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export const CardLoadingForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="card-loading-section">
        <EditorBlockHeader>
          <EditorBlockTitle>Card Loading Image</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                name="cardImage.url"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel>
                        <span>Upload Card Loading Image</span>
                        <ToolTipProvider content="image that appears when the card is loading" />
                      </FieldLabel>
                      <EditorImageUploader className="max-w-30" src={field.state.value} />
                      <FieldDescription className="text-xs font-medium">
                        Square Image Recommended
                      </FieldDescription>
                    </Field>
                  )
                }}
              />
            </FieldSet>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
