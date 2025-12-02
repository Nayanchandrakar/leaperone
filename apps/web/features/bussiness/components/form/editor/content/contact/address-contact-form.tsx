import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"

interface AddressContactFormProps {
  contactIdx: number
  sectionIdx: number
}

export const AddressContactForm = withForm({
  props: {} as AddressContactFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, contactIdx, sectionIdx }) => (
    <div className="grid grid-cols-1 @[45rem]/editor-sub-sort:grid-cols-2 gap-3">
      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].label`}
        children={(field) => (
          <field.TextField label="Label" className="@[45rem]/editor-sub-sort:col-span-2" />
        )}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].streetAddress1`}
        children={(field) => <field.TextField label="Address Line 1" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].streetAddress2`}
        children={(field) => <field.TextField label="Address Line 2" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].cityName`}
        children={(field) => <field.TextField label="City" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].stateName`}
        children={(field) => <field.TextField label="State" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].zipCode`}
        children={(field) => <field.TextField label="Zip Code" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].countryName`}
        children={(field) => <field.TextField label="Country" />}
      />

      <ToggleTextField
        form={form}
        label="Location Link Button Label"
        fields={{
          name: `sections[${sectionIdx}].items[${contactIdx}].location.label`,
          enabled: `sections[${sectionIdx}].items[${contactIdx}].location.enabled`,
        }}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].location.url`}
        children={(field) => <field.TextField label="Google Map Location URL" />}
      />
    </div>
  ),
})
