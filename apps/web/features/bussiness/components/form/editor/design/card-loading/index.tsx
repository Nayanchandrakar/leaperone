import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { useDesignCardImage } from "@/features/bussiness/stores/use-design-editor-store"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export function CardLoadingForm() {
  const cardImage = useDesignCardImage()

  return (
    <EditorBlockItem value="card-loading-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Card Loading Image</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <Field>
              <FieldLabel>
                <span>Upload Card Loading Image</span>
                <ToolTipProvider content="image that appears when the card is loading" />
              </FieldLabel>
              <EditorImageUploader className="max-w-30" src={cardImage.url} />
              <FieldDescription className="text-xs font-medium">
                Square Image Recommended
              </FieldDescription>
            </Field>
          </FieldSet>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
