import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldSet } from "@app/ui/components/field"
import { Slider } from "@app/ui/components/slider"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import {
  useDesignEditorStore,
  useDesignSectionBackground,
} from "@/features/bussiness/stores/use-design-editor-store"

export function BackgroundStyleForm() {
  const sectionBackground = useDesignSectionBackground()
  const setSectionBackground = useDesignEditorStore((state) => state.setSectionBackground)

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
            <FieldLabel htmlFor="section-background-enabled" className="flex-row gap-2">
              <span>All Section's Background</span>
              <Switch
                id="section-background-enabled"
                checked={sectionBackground.enabled}
                onCheckedChange={handleEnabledChange}
              />
            </FieldLabel>
          </FieldSet>
          <FieldSeparator />
          <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
            <Field>
              <FieldLabel htmlFor="section-background-color">Section Background Color</FieldLabel>
              <ColorPicker
                id="section-background-color"
                name="section-background-color"
                color={sectionBackground.color}
                onColorChange={handleColorChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="section-border-radius">Section Corners Roundness</FieldLabel>
              <Slider
                min={1}
                step={1}
                max={100}
                id="section-border-radius"
                name="section-border-radius"
                value={[sectionBackground.borderRadius]}
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
