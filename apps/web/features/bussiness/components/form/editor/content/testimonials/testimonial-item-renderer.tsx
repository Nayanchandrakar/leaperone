import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { ImageToggleField } from "@/features/bussiness/components/fields/image-toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/use-subsection-field"

interface TestimonialItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: () => void
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
    const [profileImage] = useSubSectionField<string | undefined>(
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

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={onDelete}>
        <FieldSet>
          <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel>Designation/Company</FieldLabel>
              <Input
                value={authorDesignation}
                onChange={(e) => setAuthorDesignation(e.target.value)}
              />
            </Field>
          </div>

          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <ImageToggleField
              label="Profile"
              enabled={profileEnabled}
              imageSrc={profileImage ?? ""}
              onEnabledChange={setProfileEnabled}
            />

            <ToggleTextareaField
              label="Testimonial"
              enabled={textEnabled}
              value={textVal}
              onEnabledChange={setTextEnabled}
              onValueChange={setTextVal}
              className="h-full"
            />
          </div>
        </FieldSet>
      </SortableSubListItem>
    )
  },
)
