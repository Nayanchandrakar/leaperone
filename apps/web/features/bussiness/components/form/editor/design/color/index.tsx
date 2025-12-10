import { Field, FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import { useCallback } from "react"
import { ColorsList } from "@/features/bussiness/components/form/editor/design/color/colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"
import {
  useDesignColor,
  useDesignEditorStore,
} from "@/features/bussiness/stores/use-design-editor-store"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export function ColorChangeForm() {
  const color = useDesignColor()
  const setColor = useDesignEditorStore((state) => state.setColor)
  const setColorField = useDesignEditorStore((state) => state.setColorField)

  const handleColorChange = useCallback(
    (newColor: typeof color) => {
      setColor(newColor)
    },
    [setColor],
  )

  const handleHighlightChange = useCallback(
    (value: string) => {
      setColorField("highlight", value)
    },
    [setColorField],
  )

  const handleBackgroundChange = useCallback(
    (value: string) => {
      setColorField("background", value)
    },
    [setColorField],
  )

  const handleMainTextChange = useCallback(
    (value: string) => {
      setColorField("mainText", value)
    },
    [setColorField],
  )

  const handleSupportingTextChange = useCallback(
    (value: string) => {
      setColorField("supportingText", value)
    },
    [setColorField],
  )

  return (
    <EditorBlockItem value="color-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Colors</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet className="gap-7">
            <ColorsList
              colors={CARD_COLORS}
              selectedColor={color}
              onColorChange={handleColorChange}
            />

            <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
              <Field>
                <FieldLabel htmlFor="color-highlight">
                  Highlight Color
                  <ToolTipProvider content="Sets text and border color." />
                </FieldLabel>
                <ColorPicker
                  id="color-highlight"
                  name="color-highlight"
                  color={color.highlight}
                  onColorChange={handleHighlightChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="color-background">
                  Background Color
                  <ToolTipProvider content="Sets background color." />
                </FieldLabel>
                <ColorPicker
                  id="color-background"
                  name="color-background"
                  color={color.background}
                  onColorChange={handleBackgroundChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="color-main-text">
                  Main Text Color
                  <ToolTipProvider content="Sets main text color." />
                </FieldLabel>
                <ColorPicker
                  id="color-main-text"
                  name="color-main-text"
                  color={color.mainText}
                  onColorChange={handleMainTextChange}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="color-supporting-text">
                  Supporting Text Color
                  <ToolTipProvider content="Sets supporting text color." />
                </FieldLabel>
                <ColorPicker
                  id="color-supporting-text"
                  name="color-supporting-text"
                  color={color.supportingText}
                  onColorChange={handleSupportingTextChange}
                />
              </Field>
            </div>
          </FieldSet>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
