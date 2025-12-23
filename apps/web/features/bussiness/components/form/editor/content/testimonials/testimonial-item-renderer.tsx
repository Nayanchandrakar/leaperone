import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { ImageToggleField } from "@/features/bussiness/components/fields/image-toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface TestimonialItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: (index: number) => void
}

export const TestimonialItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: TestimonialItemRendererProps) => {
    const [authorName, setAuthorName] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["authorName"],
    )
    const [authorDesignation, setAuthorDesignation] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["authorDesignation"],
    )

    const [profileEnabled, setProfileEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["testimonials"],
      ["authorProfile", "enabled"],
    )
    const [profileImage] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["authorProfile", "imageSrc"],
    )

    const [textEnabled, setTextEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["testimonials"],
      ["testimonialText", "enabled"],
    )
    const [textVal, setTextVal] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["testimonialText", "text"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleAuthorNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorName(e?.target?.value)
      },
      [setAuthorName],
    )

    const handleAuthorDesignationChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthorDesignation(e?.target?.value)
      },
      [setAuthorDesignation],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <FieldSet>
          <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={authorName} onChange={handleAuthorNameChange} />
            </Field>
            <Field>
              <FieldLabel>Designation/Company</FieldLabel>
              <Input value={authorDesignation} onChange={handleAuthorDesignationChange} />
            </Field>
          </div>

          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <ImageToggleField
              label="Profile"
              imageSrc={profileImage}
              enabled={profileEnabled}
              onEnabledChange={setProfileEnabled}
            />

            <ToggleTextareaField
              value={textVal}
              className="h-full"
              label="Testimonial"
              enabled={textEnabled}
              onValueChange={setTextVal}
              onEnabledChange={setTextEnabled}
            />
          </div>
        </FieldSet>
      </SortableSubListItem>
    )
  },
)

TestimonialItemRenderer.displayName = "TestimonialItemRenderer"
