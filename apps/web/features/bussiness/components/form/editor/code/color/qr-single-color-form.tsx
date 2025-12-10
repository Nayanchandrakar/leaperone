import { Field, FieldLabel } from "@app/ui/components/field"
import { useCallback } from "react"
import { QrColorsList } from "@/features/bussiness/components/form/editor/code/color/qr-colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_COLORS } from "@/features/bussiness/constants/home/qr-code-colors"
import {
  useQrCodeEditorStore,
  useQrCodeFill,
} from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrSingleColorForm() {
  const fill = useQrCodeFill()
  const setFillColor = useQrCodeEditorStore((state) => state.setFillColor)

  const handleColorChange = useCallback(
    (color: string) => {
      setFillColor(color)
    },
    [setFillColor],
  )

  return (
    <>
      <Field className="w-fit">
        <FieldLabel htmlFor="fill-color">Choose QR Code Color</FieldLabel>
        <ColorPicker
          id="fill-color"
          name="fill-color"
          color={fill.color || "#000000"}
          onColorChange={handleColorChange}
        />
      </Field>

      <QrColorsList
        colors={QR_COLORS}
        selectedColor={fill.color || "#000000"}
        onColorChange={handleColorChange}
      />
    </>
  )
}
