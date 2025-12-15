import { Field, FieldLabel } from "@app/ui/components/field"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { QrColorsList } from "@/features/bussiness/components/form/editor/code/color/qr-colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_COLORS } from "@/features/bussiness/constants/home/qr-code-colors"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrSingleColorForm() {
  const { fillColor, setFillColor } = useQrCodeEditorStore(
    useShallow((state) => ({
      setFillColor: state.setFillColor,
      fillColor: state.settings.fill?.type === "single" ? state.settings.fill?.color : "#000000",
    })),
  )

  const handleColorChange = useCallback(
    (color: string) => setFillColor(color),
    [setFillColor, fillColor],
  )

  return (
    <>
      <Field className="w-fit">
        <FieldLabel>Choose QR Code Color</FieldLabel>
        <ColorPicker color={fillColor} onColorChange={handleColorChange} />
      </Field>

      <QrColorsList
        colors={QR_COLORS}
        selectedColor={fillColor}
        onColorChange={handleColorChange}
      />
    </>
  )
}
