import type { ImagesTextLinksSection } from "@app/core/types/content-editor"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddImageLinksForm } from "@/features/bussiness/components/form/editor/content/images/add-image-links"
import { ImageOrientationList } from "@/features/bussiness/components/form/editor/content/images/image-orientation-list"
import { ListImagesForm } from "@/features/bussiness/components/form/editor/content/images/list-images"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { IMAGE_VIEWS } from "@/features/bussiness/constants/home/image-views"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ImageTextLinksForm = memo(({ index }: ContentSectionProps) => {
  const { id, enabled, heading, description, imageView, background, updateSectionField } =
    useContentEditorStore(
      useShallow((state) => {
        const section = state.sections[index] as ImagesTextLinksSection
        return {
          id: section?.id ?? "",
          enabled: section?.enabled ?? false,
          heading: section?.heading,
          description: section?.description,
          imageView: section?.imageView,
          background: section?.background,
          updateSectionField: state.updateSectionField,
        }
      }),
    )

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      itemTitle="Images + Texts + Links"
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

        <Field>
          <FieldLabel>Image View Type</FieldLabel>
          <ImageOrientationList
            orientations={IMAGE_VIEWS}
            selectedOrientation={imageView}
            onOrientationChange={(value) => updateSectionField(index, ["imageView"], value)}
          />
        </Field>
        <FieldLabel>Images & Links</FieldLabel>
        <ListImagesForm index={index} />
        <AddImageLinksForm index={index} />
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
