import { Field, FieldError, FieldLabel } from "@app/ui/components/field"
import { Slider } from "@app/ui/components/slider"
import type { QrCodeEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import { QR_GRADIENT_TYPES } from "@/features/bussiness/constants/home/qr-code-colors"

export const QrGradientColorForm = withForm({
  props: {},
  defaultValues: {} as QrCodeEditorSchema,
  render: function Render({ form }) {
    return (
      <>
        <form.AppField
          name="fill.fillGradient.type"
          children={(field) => (
            <field.RadioField label="Gradient Style" options={QR_GRADIENT_TYPES} />
          )}
        />

        <form.AppField
          mode="array"
          name="fill.fillGradient.colorStops"
          children={(colorStopsField) => (
            <Field>
              <FieldLabel htmlFor={colorStopsField.name}>Gradient Colors</FieldLabel>
              <div className="grid grid-cols-2 gap-3">
                {colorStopsField.state.value.map((_, stopIdx) => (
                  <form.AppField
                    key={stopIdx}
                    name={`fill.fillGradient.colorStops[${stopIdx}]`}
                    children={(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                      return (
                        <Field data-invalid={isInvalid}>
                          <ColorPicker
                            id={field.name}
                            name={field.name}
                            aria-invalid={isInvalid}
                            onBlur={field.handleBlur}
                            color={field.state.value}
                            onColorChange={field.handleChange}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </Field>
                      )
                    }}
                  />
                ))}
              </div>
            </Field>
          )}
        />

        <form.AppField
          name="fill.fillGradient.rotation"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Gradient Angle</FieldLabel>
                <Slider
                  min={1}
                  step={1}
                  max={360}
                  id={field.name}
                  name={field.name}
                  aria-invalid={isInvalid}
                  onBlur={field.handleBlur}
                  value={[field?.state?.value]}
                  onValueChange={([val]) => field.handleChange(val ?? 0)}
                  className="**:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:h-13! **:data-[slot=slider-thumb]:w-3 **:data-[slot=slider-track]:h-9 **:data-[slot=slider-track]:rounded-lg [&>:last-child>span]:h-9 [&>:last-child>span]:w-3 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
      </>
    )
  },
})
