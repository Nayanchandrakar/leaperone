import type { TestimonialsSection } from "@app/core/types"
import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { memo, useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TestimonialsList = memo(({ index }: ContentSectionProps) => {
  const { updateSubSectionField, removeSubSectionItem, moveSubSection, testimonials } =
    useContentEditorStore(
      useShallow((state) => ({
        removeSubSectionItem: state.removeSubSectionItem,
        updateSubSectionField: state.updateSubSectionField,
        moveSubSection: state.moveSubSection,
        testimonials: (state?.sections?.[index] as TestimonialsSection)?.testimonials,
      })),
    )

  const renderItem = useCallback(
    (testimonial: any, testimonialIdx: number) => (
      <SortableSubListItem
        key={testimonial?.id}
        itemId={testimonial?.id}
        onItemDelete={() => removeSubSectionItem(index, testimonialIdx, ["testimonials"])}
      >
        <FieldSet>
          <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                value={testimonial?.authorName}
                onChange={(e) => {
                  updateSubSectionField(
                    index,
                    testimonialIdx,
                    ["testimonials"],
                    ["authorName"],
                    e?.target?.value ?? "",
                  )
                }}
              />
            </Field>
            <Field>
              <FieldLabel>Designation/Company</FieldLabel>
              <Input
                value={testimonial?.authorDesignation}
                onChange={(e) => {
                  updateSubSectionField(
                    index,
                    testimonialIdx,
                    ["testimonials"],
                    ["authorDesignation"],
                    e?.target?.value ?? "",
                  )
                }}
              />
            </Field>
          </div>

          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <Field className="w-fit">
              <Field orientation="horizontal" className="w-fit">
                <FieldLabel>Profile</FieldLabel>
                <Switch
                  checked={testimonial?.authorProfile?.enabled}
                  onCheckedChange={(value) => {
                    updateSubSectionField(
                      index,
                      testimonialIdx,
                      ["testimonials"],
                      ["authorProfile", "enabled"],
                      value,
                    )
                  }}
                />
              </Field>
              <EditorImageUploader src={testimonial?.authorProfile?.imageSrc} />
            </Field>

            <Field>
              <ToogleLabel
                label="Testimonial"
                isActive={testimonial?.testimonialText?.enabled}
                onToggle={() => {
                  updateSubSectionField(
                    index,
                    testimonialIdx,
                    ["testimonials"],
                    ["testimonialText", "enabled"],
                    !testimonial?.testimonialText?.enabled,
                  )
                }}
              />
              <Textarea
                className="h-full"
                value={testimonial?.testimonialText?.text}
                onChange={(e) => {
                  updateSubSectionField(
                    index,
                    testimonialIdx,
                    ["testimonials"],
                    ["testimonialText", "text"],
                    e?.target?.value ?? "",
                  )
                }}
              />
            </Field>
          </div>
        </FieldSet>
      </SortableSubListItem>
    ),
    [index, removeSubSectionItem, updateSubSectionField],
  )

  if (!testimonials?.length) return null

  return (
    <SortableList
      items={testimonials}
      onReorder={(fromIndex, toIndex) =>
        moveSubSection(index, ["testimonials"], fromIndex, toIndex)
      }
      renderItem={renderItem}
    />
  )
})
