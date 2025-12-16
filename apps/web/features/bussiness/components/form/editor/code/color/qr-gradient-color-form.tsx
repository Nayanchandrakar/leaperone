import type { GradientFill, GradientType } from "@app/core/types"
import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
import { Slider } from "@app/ui/components/slider"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_GRADIENT_TYPES } from "@/features/bussiness/constants/home/qr-code-colors"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export const QrGradientColorForm = memo(() => {
  const { gradientFill, setFillGradient, setGradientColorStop } = useQrCodeEditorStore(
    useShallow((state) => ({
      setFillGradient: state.setFillGradient,
      setGradientColorStop: state.setGradientColorStop,
      gradientFill: state.settings.fill as GradientFill,
    })),
  )

  return (
    <>
      <FieldSet>
        <FieldLabel>Gradient Style</FieldLabel>
        <RadioGroup
          className="flex gap-4 flex-wrap"
          value={gradientFill?.fillGradient?.type}
          onValueChange={(value: GradientType) => setFillGradient("type", value)}
        >
          {QR_GRADIENT_TYPES.map(({ value, label }, index) => (
            <Field className="w-fit" orientation="horizontal" key={`radio-item-${index}`}>
              <RadioGroupItem value={value} id={value} />
              <FieldLabel htmlFor={value}>{label}</FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      </FieldSet>

      <Field>
        <FieldLabel>Gradient Colors</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          <ColorPicker
            color={gradientFill?.fillGradient?.colorStops[0]!}
            onColorChange={(color) => setGradientColorStop(0, color)}
          />
          <ColorPicker
            color={gradientFill?.fillGradient?.colorStops[1]!}
            onColorChange={(color) => setGradientColorStop(1, color)}
          />
        </div>
      </Field>

      <Field>
        <FieldLabel>Gradient Angle</FieldLabel>
        <Slider
          min={1}
          step={1}
          max={360}
          value={[gradientFill?.fillGradient?.rotation ?? 0]}
          onValueChange={([value]) => setFillGradient("rotation", value ?? 0)}
          className="**:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:h-13! **:data-[slot=slider-thumb]:w-3 **:data-[slot=slider-track]:h-9 **:data-[slot=slider-track]:rounded-lg [&>:last-child>span]:h-9 [&>:last-child>span]:w-3 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
        />
      </Field>
    </>
  )
})
