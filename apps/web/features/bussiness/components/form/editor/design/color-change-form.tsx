import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import type React from "react"
import { withForm } from "@/components/ui/app-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"

export const ColorChangeForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="color-section">
        <EditorBlockHeader>
          <EditorBlockTitle>Color</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                name="color"
                children={(colorField) => (
                  <div className="flex flex-wrap gap-3">
                    {CARD_COLORS.map((color) => (
                      <div
                        key={color.background}
                        style={
                          {
                            backgroundColor: color.background,
                            "--highlight-color": color.highlight,
                          } as React.CSSProperties
                        }
                        className="aspect-square size-16 relative after:content-[''] after:absolute after:w-full after:bg-(--highlight-color)  after:rounded-b-lg after:h-6 after:bottom-0 rounded-lg object-cover transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[active=true]:outline-primary"
                      />
                    ))}
                  </div>
                )}
              />
            </FieldSet>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
