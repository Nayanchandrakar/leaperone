import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@app/ui/components/field"
import { Slider } from "@app/ui/components/slider"
import type { DesignEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"

export const BackgroundStyleForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="background-style-section">
        <EditorBlockHeader>
          <EditorBlockTitle>Section Background Style</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                name="sectionBackground.enabled"
                children={(field) => <field.SwitchField label="All Section’s Background" />}
              />
            </FieldSet>
            <FieldSeparator />
            <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
              <form.AppField
                name="sectionBackground.color"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Section Background Color</FieldLabel>
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
              <form.AppField
                name="sectionBackground.borderRadius"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Section Corners Roundness</FieldLabel>
                      <Slider
                        min={1}
                        step={1}
                        max={100}
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
            </div>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
