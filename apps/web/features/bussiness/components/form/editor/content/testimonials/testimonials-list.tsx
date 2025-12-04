import { Field, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface TestimonialsListProps {
  sectionIdx: number
}

export const TestimonialsList = withForm({
  props: {} as TestimonialsListProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => (
    <form.AppField
      mode="array"
      name={`sections[${sectionIdx}].testimonials`}
      children={(testimonials) => {
        const hasTestimonials = testimonials?.state?.value?.length > 0
        if (!hasTestimonials) return null

        return (
          <EditorSortProvider
            data={testimonials?.state?.value}
            onDataChange={testimonials.moveValue}
          >
            <EditorSortGroup>
              {(testimonial, testimonialIdx) => (
                <EditorSubSortItem
                  id={testimonial.id}
                  key={testimonialIdx}
                  onDelete={() => {
                    testimonials.removeValue(testimonialIdx, {
                      dontValidate: true,
                    })
                  }}
                >
                  <FieldSet>
                    <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
                      <form.AppField
                        name={`sections[${sectionIdx}].testimonials[${testimonialIdx}].authorName`}
                        children={(authorNameField) => <authorNameField.TextField label="Name" />}
                      />
                      <form.AppField
                        name={`sections[${sectionIdx}].testimonials[${testimonialIdx}].authorDesignation`}
                        children={(field) => <field.TextField label="Designation/Company" />}
                      />
                    </div>

                    <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
                      <Field className="w-fit">
                        <form.AppField
                          name={`sections[${sectionIdx}].testimonials[${testimonialIdx}].authorProfile.enabled`}
                          children={(field) => <field.SwitchField label="Profile" />}
                        />
                        <form.AppField
                          name={`sections[${sectionIdx}].testimonials[${testimonialIdx}].authorProfile.imageSrc`}
                          children={(field) => <EditorImageUploader src={field?.state?.value} />}
                        />
                      </Field>

                      <ToggleTextareaField
                        form={form}
                        variant="default"
                        label="Testimonial"
                        className="h-full"
                        fields={{
                          name: `sections[${sectionIdx}].testimonials[${testimonialIdx}].testimonialText.text`,
                          enabled: `sections[${sectionIdx}].testimonials[${testimonialIdx}].testimonialText.enabled`,
                        }}
                      />
                    </div>
                  </FieldSet>
                </EditorSubSortItem>
              )}
            </EditorSortGroup>
          </EditorSortProvider>
        )
      }}
    />
  ),
})
