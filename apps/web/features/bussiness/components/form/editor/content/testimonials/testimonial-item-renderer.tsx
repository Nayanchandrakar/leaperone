import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Textarea } from "@app/ui/components/textarea"
import { memo, useCallback } from "react"
import { ImageToggleField } from "@/features/bussiness/components/fields/image-toggle-field"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
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
    const [name, setName] = useSubSectionField<string>(index, subIndex, ["testimonials"], ["name"])
    const [designationEnabled, setDesignationEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["testimonials"],
      ["designation", "enabled"],
    )
    const [designation, setDesignation] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["designation", "text"],
    )

    const [profileEnabled, setProfileEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["testimonials"],
      ["profile", "enabled"],
    )
    const [profileImage] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["profile", "imageSrc"],
    )

    const [testimonialText, setTestimonialText] = useSubSectionField<string>(
      index,
      subIndex,
      ["testimonials"],
      ["testimonialText"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e?.target?.value)
      },
      [setName],
    )

    const handleDesignationChange = useCallback(
      (value: string) => {
        setDesignation(value)
      },
      [setDesignation],
    )

    const handleTextimonialTextChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTestimonialText(e?.target?.value)
      },
      [setTestimonialText],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <FieldSet>
          <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={name} onChange={handleNameChange} />
            </Field>
            <ToggleField
              variant="default"
              value={designation}
              enabled={designationEnabled}
              label="Designation & Company"
              onValueChange={handleDesignationChange}
              onEnabledChange={setDesignationEnabled}
            />
          </div>

          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <ImageToggleField
              label="Profile"
              imageSrc={profileImage}
              enabled={profileEnabled}
              onEnabledChange={setProfileEnabled}
            />

            <Field>
              <FieldLabel>Testimonial Text</FieldLabel>
              <Textarea
                className="h-full"
                value={testimonialText}
                onChange={handleTextimonialTextChange}
              />
            </Field>
          </div>
        </FieldSet>
      </SortableSubListItem>
    )
  },
)
