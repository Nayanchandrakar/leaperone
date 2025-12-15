import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@app/ui/components/field"
import { Slider } from "@app/ui/components/slider"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"

export function BackgroundStyleForm() {
  const { sectionBackground, setSectionBackground } = useDesignEditorStore(
    useShallow((state) => ({
      setSectionBackground: state.setSectionBackground,
      sectionBackground: state.config.sectionBackground,
    })),
  )

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      setSectionBackground("enabled", checked)
    },
    [setSectionBackground],
  )

  const handleColorChange = useCallback(
    (color: string) => {
      setSectionBackground("color", color)
    },
    [setSectionBackground],
  )

  const handleBorderRadiusChange = useCallback(
    ([value]: number[]) => {
      setSectionBackground("borderRadius", value ?? 0)
    },
    [setSectionBackground],
  )

  return (
    <EditorBlockItem value="background-style-section">
      <EditorBlockHeader>
        <EditorBlockTitle>Section Background Style</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <FieldLabel className="flex-row gap-2">
              <span>All Section's Background</span>
              <Switch checked={sectionBackground?.enabled} onCheckedChange={handleEnabledChange} />
            </FieldLabel>
          </FieldSet>
          <FieldSeparator />
          <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
            <Field>
              <FieldLabel>Section Background Color</FieldLabel>
              <ColorPicker color={sectionBackground?.color} onColorChange={handleColorChange} />
            </Field>
            <Field>
              <FieldLabel>Section Corners Roundness</FieldLabel>
              <Slider
                min={1}
                step={1}
                max={100}
                value={[sectionBackground?.borderRadius]}
                onValueChange={handleBorderRadiusChange}
                className="**:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:h-13! **:data-[slot=slider-thumb]:w-3 **:data-[slot=slider-track]:h-9 **:data-[slot=slider-track]:rounded-lg [&>:last-child>span]:h-9 [&>:last-child>span]:w-3 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
              />
            </Field>
          </div>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
