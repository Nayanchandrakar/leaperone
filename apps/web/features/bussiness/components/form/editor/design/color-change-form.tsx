import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import { useId } from "react"
import { ListComponent } from "@/components/shared/list-component"
import { withForm } from "@/components/ui/app-form"
import { CardColorSwatch } from "@/features/bussiness/components/cards/home/card-color-swatch"
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
                children={({ state, handleChange }) => (
                  <ListComponent
                    items={CARD_COLORS}
                    className="flex flex-wrap gap-3"
                    renderItem={(color) => {
                      const id = useId()
                      const isActive =
                        state?.value?.background === color.background &&
                        state?.value?.highlight === color.highlight
                      return (
                        <CardColorSwatch
                          key={id}
                          data-state={isActive}
                          highlightColor={color.highlight}
                          backgroundColor={color.background}
                          onClick={() => handleChange(color)}
                        />
                      )
                    }}
                  />
                )}
              />
            </FieldSet>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
