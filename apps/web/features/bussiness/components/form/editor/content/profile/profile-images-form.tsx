import type { ProfileCardSection } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileImagesFormProps {
  index: number
}

export const ProfileImagesForm = memo(({ index }: ProfileImagesFormProps) => {
  const { section, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ProfileCardSection,
      updateSectionField: state.updateSectionField,
    })),
  )

  return (
    <div className="flex gap-5 @max-[260px]/editor-block-content:flex-col">
      <Field className="w-fit">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Profile Pic</FieldLabel>
          <Switch
            checked={section?.details?.profile?.enabled}
            onCheckedChange={(value) => {
              updateSectionField(index, ["details", "profile", "enabled"], value)
            }}
          />
        </Field>
        <EditorImageUploader src={section?.details?.profile?.imageSrc} />
      </Field>

      <Field className="w-fit">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Brand Logo</FieldLabel>
          <Switch
            checked={section?.details?.branding?.enabled}
            onCheckedChange={(value) => {
              updateSectionField(index, ["details", "branding", "enabled"], value)
            }}
          />
        </Field>
        <EditorImageUploader src={section?.details?.branding?.imageSrc} />
      </Field>
    </div>
  )
})
