import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { useShallow } from "zustand/react/shallow"
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
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export function ColorChangeForm() {
  const { color, setColor, setColorField } = useDesignEditorStore(
    useShallow((state) => ({
      setColor: state.setColor,
      color: state.config.color,
      setColorField: state.setColorField,
    })),
  )

  return (
    <EditorBlockItem value="color-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Colors</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup className="gap-7">
          <ColorsList colors={CARD_COLORS} selectedColor={color} onColorChange={setColor} />
          <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
            <Field>
              <FieldLabel>
                Highlight Color
                <ToolTipProvider content="Sets text and border color." />
              </FieldLabel>
              <ColorPicker
                color={color.highlight}
                onColorChange={(color) => setColorField("highlight", color)}
              />
            </Field>

            <Field>
              <FieldLabel>
                Background Color
                <ToolTipProvider content="Sets background color." />
              </FieldLabel>
              <ColorPicker
                color={color.background}
                onColorChange={(color) => setColorField("background", color)}
              />
            </Field>

            <Field>
              <FieldLabel>
                Main Text Color
                <ToolTipProvider content="Sets main text color." />
              </FieldLabel>
              <ColorPicker
                color={color.mainText}
                onColorChange={(color) => setColorField("mainText", color)}
              />
            </Field>

            <Field>
              <FieldLabel>
                Supporting Text Color
                <ToolTipProvider content="Sets supporting text color." />
              </FieldLabel>
              <ColorPicker
                color={color.supportingText}
                onColorChange={(color) => setColorField("supportingText", color)}
              />
            </Field>
          </div>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
