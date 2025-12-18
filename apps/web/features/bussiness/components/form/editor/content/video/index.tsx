import type { VideoSection, VimeoVideo, YoutubeVideo } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/ui/components/tabs"
import { Textarea } from "@app/ui/components/textarea"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const VideoForm = memo(({ index }: ContentSectionProps) => {
  const { video, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      updateSectionField: state.updateSectionField,
      video: state.sections[index] as VideoSection,
    })),
  )

  return (
    <SortableListItem
      itemTitle="Video"
      itemId={video?.id}
      isEnabled={video?.enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={video?.heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={video?.heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Description"
            isActive={video?.description?.enabled}
            onToggle={(value) => updateSectionField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={video?.description?.text}
            onChange={(e) => {
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>
        <Tabs
          value={video?.video?.type}
          defaultValue={video?.video?.type}
          onValueChange={(value) => updateSectionField(index, ["video", "type"], value)}
        >
          <TabsList>
            <TabsTrigger value="youtube">Youtube</TabsTrigger>
            <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
          </TabsList>
          <TabsContent value="youtube">
            <Input
              variant="gray"
              placeholder="Enter YouTube video link here"
              value={(video?.video as YoutubeVideo)?.youtubeUrl ?? ""}
              onChange={(e) => {
                updateSectionField(index, ["video", "youtubeUrl"], e?.target?.value ?? "")
              }}
            />
          </TabsContent>
          <TabsContent value="vimeo">
            <Input
              variant="gray"
              placeholder="Enter Vimeo video link here"
              value={(video?.video as VimeoVideo)?.vimeoUrl ?? ""}
              onChange={(e) => {
                updateSectionField(index, ["video", "vimeoUrl"], e?.target?.value ?? "")
              }}
            />
          </TabsContent>
        </Tabs>
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={video?.background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
