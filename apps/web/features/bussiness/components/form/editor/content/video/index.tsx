import { FieldGroup } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/ui/components/tabs"
import { memo, useMemo } from "react"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const VideoForm = memo(({ index }: ContentSectionProps) => {
  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector)!

  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])
  const [descEnabled, setDescEnabled] = useSectionField<boolean>(index, ["description", "enabled"])

  const [videoType, setVideoType] = useSectionField<string>(index, ["video", "type"])
  const [background, setBackground] = useSectionField<boolean>(index, ["background"])
  const [vimeoUrl, setVimeoUrl] = useSectionField<string>(index, ["video", "vimeoUrl"])
  const [descText, setDescText] = useSectionField<string>(index, ["description", "text"])
  const [youtubeUrl, setYoutubeUrl] = useSectionField<string>(index, ["video", "youtubeUrl"])

  return (
    <SortableListItem
      itemId={id}
      itemTitle="Video"
      isEnabled={enabled}
      onIsEnabledChange={setEnabled}
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
        <Tabs value={videoType} defaultValue={videoType} onValueChange={setVideoType}>
          <TabsList>
            <TabsTrigger value="youtube">Youtube</TabsTrigger>
            <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
          </TabsList>
          <TabsContent value="youtube">
            <Input
              variant="gray"
              value={youtubeUrl}
              placeholder="Enter YouTube video link here"
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </TabsContent>
          <TabsContent value="vimeo">
            <Input
              variant="gray"
              value={vimeoUrl}
              placeholder="Enter Vimeo video link here"
              onChange={(e) => setVimeoUrl(e.target.value)}
            />
          </TabsContent>
        </Tabs>
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
