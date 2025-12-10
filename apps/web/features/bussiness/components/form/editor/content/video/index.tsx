import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/ui/components/tabs"
import { Textarea } from "@app/ui/components/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { VideoType } from "@/features/bussiness/types"

interface VideoFormProps {
  sectionIdx: number
  id: string
}

export function VideoForm({ id, sectionIdx }: VideoFormProps) {
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
    if (section.type === "video") {
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
    if (section.type === "video") {
      updateSectionField(sectionIdx, ["description", "enabled"], !section.description.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleVideoTypeChange = useCallback(
    (videoType: string) => {
      updateSectionField(sectionIdx, ["video", "type"], videoType as VideoType)
    },
    [sectionIdx, updateSectionField],
  )

  const handleYoutubeUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["video", "youtubeUrl"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleVimeoUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["video", "vimeoUrl"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleBackgroundChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["background"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "video") return null

  return (
    <EditorSortItem
      name="Video"
      id={id}
      contentClassName="p-0"
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

        <Tabs
          onValueChange={handleVideoTypeChange}
          value={section.video.type}
          defaultValue={section.video.type}
        >
          <TabsList>
            <TabsTrigger value="youtube">Youtube</TabsTrigger>
            <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
          </TabsList>
          <TabsContent value="youtube">
            <Input
              variant="gray"
              placeholder="Enter YouTube video link here"
              value={section.video.youtubeUrl || ""}
              onChange={handleYoutubeUrlChange}
            />
          </TabsContent>
          <TabsContent value="vimeo">
            <Input
              variant="gray"
              placeholder="Enter Vimeo video link here"
              value={section.video.vimeoUrl || ""}
              onChange={handleVimeoUrlChange}
            />
          </TabsContent>
        </Tabs>
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
