import { Field, FieldError } from "@app/ui/components/field"
import type { TextareaProps } from "@app/ui/components/textarea"
import { Textarea } from "@app/ui/components/textarea"
import { ToggleField } from "@/components/form/toogle-field"
import { withFieldGroup } from "@/components/ui/app-form"

interface ToogleTextareaFieldProps {
  toogleLabel: string
  variant?: TextareaProps["variant"]
}
interface DefaultValues {
  name: string
  enabled: boolean
}

export const ToggleTextareaField = withFieldGroup({
  props: {} as ToogleTextareaFieldProps,
  defaultValues: {} as DefaultValues,
  render: ({ group, toogleLabel, variant }) => {
    return (
      <group.AppField
        name="name"
        children={(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <group.AppField
                name="enabled"
                children={(field2) => (
                  <ToggleField
                    label={toogleLabel}
                    value={field2.state.value}
                    onClick={field2.handleChange}
                  />
                )}
              />
              <Textarea
                id={field.name}
                name={field.name}
                variant={variant}
                aria-invalid={isInvalid}
                onBlur={field.handleBlur}
                value={field.state.value ?? ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      />
    )
  },
})
