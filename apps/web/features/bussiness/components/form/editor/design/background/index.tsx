import { Button } from "@app/ui/components/button"
import { FieldGroup, FieldSet } from "@app/ui/components/field"
import { Upload, XIcon } from "lucide-react"
import Image from "next/image"
import { ListComponent } from "@/components/shared/list-component"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"

export function BackgroundChangeForm() {
  const background = useDesignEditorStore((state) => state.config.background)

  return (
    <EditorBlockItem value="background-image-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Background Image</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <ListComponent
              className="flex flex-wrap gap-3"
              items={background}
              renderItem={(bg) => (
                <Image
                  width={1000}
                  height={1000}
                  sizes="100vw"
                  key={bg?.id}
                  src={bg?.url}
                  alt="card-background-image"
                  className="aspect-square size-16 rounded-lg object-cover transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[active=true]:outline-primary"
                />
              )}
            />

            {/* Upload and Remove Background Image Buttons */}
            <div className="flex flex-col @lg/editor-block-content:flex-row gap-3 [&>button]:px-5">
              <Button size="lg" variant="green-outline">
                <Upload />
                <span>Upload Background Image</span>
              </Button>
              <Button size="lg" variant="destructive">
                <XIcon />
                <span>Remove Background Image</span>
              </Button>
            </div>
          </FieldSet>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
