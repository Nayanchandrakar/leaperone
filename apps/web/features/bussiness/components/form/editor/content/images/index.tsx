import type { ImageViewType } from "@app/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"

import { memo, useMemo } from "react"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { AddImageLinksForm } from "@/features/bussiness/components/form/editor/content/images/add-image-links"
import { ImageOrientationList } from "@/features/bussiness/components/form/editor/content/images/image-orientation-list"
import { ListImagesForm } from "@/features/bussiness/components/form/editor/content/images/list-images"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { IMAGE_VIEWS } from "@/features/bussiness/constants/home/image-views"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ImageTextLinksForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])

  const [descEnabled, setDescEnabled] = useSectionField<boolean>(index, ["description", "enabled"])
  const [descText, setDescText] = useSectionField<string>(index, ["description", "text"])

  const [imageView, setImageView] = useSectionField<ImageViewType>(index, ["imageView"])
  const [background, setBackground] = useSectionField<boolean>(index, ["background"])

  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector) ?? ""

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      onIsEnabledChange={setEnabled}
      itemTitle="Images + Texts + Links"
    >
      <FieldGroup className="p-5">
        <ToggleField
          label="Heading"
          value={headingText}
          enabled={headingEnabled}
          onValueChange={setHeadingText}
          onEnabledChange={setHeadingEnabled}
        />
        <ToggleTextareaField
          variant="gray"
          value={descText}
          label="Description"
          enabled={descEnabled}
          onValueChange={setDescText}
          onEnabledChange={setDescEnabled}
        />

        <Field>
          <FieldLabel>Image View Type</FieldLabel>
          <ImageOrientationList
            orientations={IMAGE_VIEWS}
            selectedOrientation={imageView}
            onOrientationChange={setImageView}
          />
        </Field>
        <FieldLabel>Images & Links</FieldLabel>
        <ListImagesForm index={index} />
        <AddImageLinksForm index={index} />
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
