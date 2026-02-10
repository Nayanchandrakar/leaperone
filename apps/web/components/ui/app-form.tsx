import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { RadioField } from "@/components/form/radio-field"
import { SelectField } from "@/components/form/select-field"
import { TextField } from "@/components/form/text-field"

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    SelectField,
    RadioField,
  },
  formComponents: {},
})
