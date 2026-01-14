import type { SingleColorFill } from "@app/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { memo, useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { QrColorsList } from "@/features/bussiness/components/form/editor/code/color/qr-colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_COLORS } from "@/features/bussiness/constants/home/qr-code-colors"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export const QrSingleColorForm = memo(() => {
  const { singleFillColor, setFillColor } = useQrCodeEditorStore(
    useShallow((state) => ({
      setFillColor: state.setFillColor,
      singleFillColor: (state.settings.fill as SingleColorFill)?.color ?? "#000000",
    })),
  )

  const handleColorChange = useCallback((color: string) => setFillColor(color), [setFillColor])

  return (
    <>
      <Field className="w-fit">
        <FieldLabel>Choose QR Code Color</FieldLabel>
        <ColorPicker color={singleFillColor} onColorChange={handleColorChange} />
      </Field>

      <QrColorsList
        colors={QR_COLORS}
        selectedColor={singleFillColor}
        onColorChange={handleColorChange}
      />
    </>
  )
})
