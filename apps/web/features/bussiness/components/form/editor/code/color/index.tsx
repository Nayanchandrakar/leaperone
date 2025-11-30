import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@app/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
import type { QrCodeEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
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

export const QrColorForm = withForm({
  props: {},
  defaultValues: {} as QrCodeEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="qr-color-form">
        <EditorBlockHeader>
          <EditorBlockTitle>QR Color</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <form.Field
              name="fill.type"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend>Color Style</FieldLegend>
                    <FieldDescription>Choose a color style for your QR code.</FieldDescription>
                    <RadioGroup
                      name={field.name}
                      className="flex gap-2 @xl/editor-block-content:flex-row flex-col"
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value as any)}
                    >
                      {QR_COLOR_OPTIONS.map(({ description, title, value }) => (
                        <FieldLabel key={value} htmlFor={value} className="cursor-pointer">
                          <Field orientation="horizontal" data-invalid={isInvalid}>
                            <FieldContent>
                              <FieldTitle>{title}</FieldTitle>
                              <FieldDescription>{description}</FieldDescription>
                            </FieldContent>
                            <RadioGroupItem id={value} value={value} aria-invalid={isInvalid} />
                          </Field>
                        </FieldLabel>
                      ))}
                    </RadioGroup>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <form.Subscribe
              selector={(state) => state.values.fill.type}
              children={(type) => {
                switch (type) {
                  case "single":
                    return <QrSingleColorForm form={form} />
                  case "gradient":
                    return <QrGradientColorForm form={form} />
                }
              }}
            />
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
