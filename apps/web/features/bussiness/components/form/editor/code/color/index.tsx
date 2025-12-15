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
import { useShallow } from "zustand/react/shallow"
import { RenderQrColorForm } from "@/features/bussiness/components/form/editor/code/color/render-color-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { QR_COLOR_OPTIONS } from "@/features/bussiness/constants/home/qr-code-colors"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrColorForm() {
  const { fill, setFillType } = useQrCodeEditorStore(
    useShallow((state) => ({
      fill: state.settings.fill,
      setFillType: state.setFillType,
    })),
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
              value={fill?.type}
              onValueChange={setFillType}
              className="flex gap-2 @xl/editor-block-content:flex-row flex-col"
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
          <RenderQrColorForm />
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
