import { Field, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"

interface ImageToggleFieldProps {
  label: string
  enabled: boolean
  imageSrc: string
  onEnabledChange: (checked: boolean) => void
}

export function ImageToggleField({
  label,
  enabled,
  imageSrc,
  onEnabledChange,
}: ImageToggleFieldProps) {
  return (
    <Field className="w-fit">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel>{label}</FieldLabel>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </Field>
      <EditorImageUploader src={imageSrc!} />
    </Field>
  )
}
