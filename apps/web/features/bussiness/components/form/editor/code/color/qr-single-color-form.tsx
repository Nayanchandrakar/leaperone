import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import type { QrCodeEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { QrColorsList } from "@/features/bussiness/components/form/editor/code/color/qr-colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_COLORS } from "@/features/bussiness/constants/home/qr-code-colors"

export const QrSingleColorForm = withForm({
  props: {},
  defaultValues: {} as QrCodeEditorSchema,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="fill.color"
          children={(colorField) => {
            const isInvalid = colorField.state.meta.isTouched && !colorField.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} className="w-fit">
                <FieldLabel htmlFor={colorField.name}>Choose QR Code Color</FieldLabel>
                <ColorPicker
                  id={colorField.name}
                  name={colorField.name}
                  aria-invalid={isInvalid}
                  onBlur={colorField.handleBlur}
                  color={colorField.state.value}
                  onColorChange={colorField.handleChange}
                />
                {isInvalid && <FieldError errors={colorField.state.meta.errors} />}
              </Field>
            )
          }}
        />

        <form.AppField
          name="fill.color"
          children={(field) => (
            <QrColorsList
              colors={QR_COLORS}
              selectedColor={field.state.value}
              onColorChange={field.handleChange}
            />
          )}
        />
      </>
    )
  },
})
