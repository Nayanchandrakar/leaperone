import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@app/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
import { useCallback } from "react"
import { QrGradientColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-gradient-color-form"
import { QrSingleColorForm } from "@/features/bussiness/components/form/editor/code/color/qr-single-color-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_COLOR_OPTIONS } from "@/features/bussiness/constants/home/qr-code-colors"
import {
  useQrCodeEditorStore,
  useQrCodeFill,
} from "@/features/bussiness/stores/use-qr-code-editor-store"
import type { QrCodeColorType } from "@/features/bussiness/types"

export function QrColorForm() {
  const fill = useQrCodeFill()
  const setFillType = useQrCodeEditorStore((state) => state.setFillType)

  const handleChange = useCallback(
    (value: string) => {
      setFillType(value as QrCodeColorType)
    },
    [setFillType],
  )

  return (
    <EditorBlockItem value="qr-color-form">
      <EditorBlockHeader>
        <EditorBlockTitle>QR Color</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Color Style</FieldLegend>
            <FieldDescription>Choose a color style for your QR code.</FieldDescription>
            <RadioGroup
              name="fill-type"
              className="flex gap-2 @xl/editor-block-content:flex-row flex-col"
              value={fill.type}
              onValueChange={handleChange}
            >
              {QR_COLOR_OPTIONS.map(({ description, title, value }) => (
                <FieldLabel key={value} htmlFor={value} className="cursor-pointer">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{title}</FieldTitle>
                      <FieldDescription>{description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem id={value} value={value} />
                  </Field>
                </FieldLabel>
              ))}
            </RadioGroup>
          </FieldSet>
          <FieldSeparator />
          {fill.type === "single" && <QrSingleColorForm />}
          {fill.type === "gradient" && <QrGradientColorForm />}
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
