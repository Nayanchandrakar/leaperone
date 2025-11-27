import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { ColorsList } from "@/features/bussiness/components/form/editor/design/color/colors-list"
import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export const ColorChangeForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="color-section">
        <EditorBlockHeader>
          <EditorBlockTitle>Colors</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet className="gap-7">
              <form.AppField
                name="color"
                children={(field) => (
                  <ColorsList
                    colors={CARD_COLORS}
                    selectedColor={field.state.value}
                    onColorChange={field.handleChange}
                  />
                )}
              />

              <div className="grid @lg/editor-block-content:grid-cols-2 gap-5">
                <form.AppField
                  name="color.highlight"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Highlight Color
                          <ToolTipProvider content="Sets text and border color." />
                        </FieldLabel>
                        <ColorPicker
                          id={field.name}
                          name={field.name}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.AppField
                  name="color.background"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Background Color
                          <ToolTipProvider content="Sets background color." />
                        </FieldLabel>
                        <ColorPicker
                          id={field.name}
                          name={field.name}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.AppField
                  name="color.mainText"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Main Text Color
                          <ToolTipProvider content="Sets main text color." />
                        </FieldLabel>
                        <ColorPicker
                          id={field.name}
                          name={field.name}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />

                <form.AppField
                  name="color.supportingText"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Supporting Text Color
                          <ToolTipProvider content="Sets supporting text color." />
                        </FieldLabel>
                        <ColorPicker
                          id={field.name}
                          name={field.name}
                          aria-invalid={isInvalid}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                      </Field>
                    )
                  }}
                />
              </div>
            </FieldSet>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
