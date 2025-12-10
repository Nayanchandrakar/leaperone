import { Button } from "@app/ui/components/button"
import { FieldGroup, FieldSet } from "@app/ui/components/field"
import { Upload, XIcon } from "lucide-react"
import Image from "next/image"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { useDesignBackground } from "@/features/bussiness/stores/use-design-editor-store"

export function BackgroundChangeForm() {
  const background = useDesignBackground()

  return (
    <EditorBlockItem value="background-image-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Background Image</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <div className="flex flex-wrap gap-3">
              {background.map((bg) => (
                <Image
                  width={1000}
                  height={1000}
                  sizes="100vw"
                  key={bg.id}
                  src={bg.url!}
                  alt="card-background-image"
                  className="aspect-square size-16 rounded-lg object-cover transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[active=true]:outline-primary"
                />
              ))}
            </div>

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
