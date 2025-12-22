import type { TestimonialsSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddTestimonialForm } from "@/features/bussiness/components/form/editor/content/testimonials/add-testimonial"
import { TestimonialsList } from "@/features/bussiness/components/form/editor/content/testimonials/testimonials-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TestimonialsSectionForm = memo(({ index }: ContentSectionProps) => {
  const { id, enabled, heading, description, background, updateSectionField } =
    useContentEditorStore(
      useShallow((state) => {
        const section = state.sections[index] as TestimonialsSection
        return {
          id: section?.id ?? "",
          enabled: section?.enabled ?? false,
          heading: section?.heading,
          description: section?.description,
          background: section?.background,
          updateSectionField: state.updateSectionField,
        }
      }),
    )

  return (
    <SortableListItem
      itemTitle="Testimonials"
      itemId={id}
      isEnabled={enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Description"
            isActive={description?.enabled}
            onToggle={(value) => updateSectionField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={description?.text}
            onChange={(e) => {
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>

        <TestimonialsList index={index} />
        <AddTestimonialForm index={index} />
      </FieldGroup>

      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
