import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { AddImageLinksForm } from "@/features/bussiness/components/form/editor/content/images/add-image-links"
import { ImageOrientationList } from "@/features/bussiness/components/form/editor/content/images/image-orientation-list"
import { ListImagesForm } from "@/features/bussiness/components/form/editor/content/images/list-images"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import { IMAGE_VIEWS } from "@/features/bussiness/constants/home/image-views"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ImageTextLinksFormProps {
  sectionIdx: number
  id: string
}

export function ImageTextLinksForm({ sectionIdx, id }: ImageTextLinksFormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleHeadingTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["heading", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleHeadingEnabledToggle = useCallback(() => {
    if (section.type === "image-text-links") {
      updateSectionField(sectionIdx, ["heading", "enabled"], !section.heading.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleDescriptionTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateSectionField(sectionIdx, ["description", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleDescriptionEnabledToggle = useCallback(() => {
    if (section.type === "image-text-links") {
      updateSectionField(sectionIdx, ["description", "enabled"], !section.description.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleImageViewChange = useCallback(
    (value: string) => {
      updateSectionField(sectionIdx, ["imageView"], value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleBackgroundChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["background"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "image-text-links") return null

  return (
    <EditorSortItem
      id={id}
      contentClassName="p-0"
      name="Images + Texts + Links"
      checked={section.enabled}
      onCheckedChange={handleEnabledChange}
    >
      <FieldGroup className="p-5">
        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Heading</span>
            <button
              type="button"
              onClick={handleHeadingEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.heading.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Input variant="gray" value={section.heading.text} onChange={handleHeadingTextChange} />
        </Field>

        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Description</span>
            <button
              type="button"
              onClick={handleDescriptionEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.description.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Textarea
            variant="gray"
            value={section.description.text}
            onChange={handleDescriptionTextChange}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={`section-${sectionIdx}-imageView`}>Image View Type</FieldLabel>
          <ImageOrientationList
            orientations={IMAGE_VIEWS}
            selectedOrientation={section.imageView}
            onOrientationChange={handleImageViewChange}
          />
        </Field>

        <FieldLabel htmlFor={`sections-${sectionIdx}-images`}>Images & Links</FieldLabel>
        <ListImagesForm sectionIdx={sectionIdx} />
        <AddImageLinksForm sectionIdx={sectionIdx} />
      </FieldGroup>
      <EditorBlockFooter>
        <FieldLabel htmlFor={`section-${sectionIdx}-background`} className="flex-row gap-2">
          <span>Section Background</span>
          <Switch
            id={`section-${sectionIdx}-background`}
            checked={section.background}
            onCheckedChange={handleBackgroundChange}
          />
        </FieldLabel>
      </EditorBlockFooter>
    </EditorSortItem>
  )
}
