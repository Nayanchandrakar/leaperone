import { Button } from "@app/ui/components/button"
import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import { Upload, XIcon } from "lucide-react"
import Image from "next/image"
import React from "react"
import { withForm } from "@/components/ui/app-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"

export const BackgroundChangeForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="background-image-section">
        <EditorBlockHeader>
          <EditorBlockTitle>Background Image</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                mode="array"
                name="background"
                children={(backgroundField) => {
                  return (
                    <React.Fragment>
                      <div className="flex flex-wrap gap-3">
                        {backgroundField.state.value.map((background) => (
                          <Image
                            width={1000}
                            height={1000}
                            sizes="100vw"
                            key={background.id}
                            src={background.url!}
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
                    </React.Fragment>
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
