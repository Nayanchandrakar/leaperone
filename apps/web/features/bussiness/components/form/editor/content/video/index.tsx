import { FieldGroup } from "@app/ui/components/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/ui/components/tabs"
import type { ContentEditorSchema, VideoSchema } from "@app/zod/types"
import { useCallback } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import type { VideoType } from "@/features/bussiness/types"

interface VideoFormProps {
  sectionIdx: number
  id: string
}

export const VideoForm = withForm({
  props: {} as VideoFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, id, sectionIdx }) => {
    const handleVideoTypeChange = useCallback(
      (videoType: string) => {
        form.setFieldValue(`sections[${sectionIdx}].video.type`, videoType as VideoType)
      },
      [form, sectionIdx],
    )

    return (
      <form.AppField
        name={`sections[${sectionIdx}].enabled`}
        children={(sectionField) => (
          <EditorSortItem
            name="Video"
            id={id}
            contentClassName="p-0"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <ToggleTextField
                form={form}
                variant="gray"
                label="Heading"
                fields={{
                  name: `sections[${sectionIdx}].heading.text`,
                  enabled: `sections[${sectionIdx}].heading.enabled`,
                }}
              />

              <ToggleTextareaField
                form={form}
                variant="gray"
                label="Description"
                fields={{
                  name: `sections[${sectionIdx}].description.text`,
                  enabled: `sections[${sectionIdx}].description.enabled`,
                }}
              />

              <form.Subscribe
                selector={(state) => {
                  const formState = state.values?.sections?.[sectionIdx] as VideoSchema
                  return formState?.video?.type
                }}
                children={(type) => (
                  <Tabs onValueChange={handleVideoTypeChange} value={type} defaultValue={type}>
                    <TabsList>
                      <TabsTrigger value="youtube">Youtube</TabsTrigger>
                      <TabsTrigger value="vimeo">Vimeo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="youtube">
                      <form.AppField
                        name={`sections[${sectionIdx}].video.youtubeUrl`}
                        children={(field) => (
                          <field.TextField
                            variant="gray"
                            placeholder="Enter YouTube video link here"
                          />
                        )}
                      />
                    </TabsContent>
                    <TabsContent value="vimeo">
                      <form.AppField
                        name={`sections[${sectionIdx}].video.vimeoUrl`}
                        children={(field) => (
                          <field.TextField
                            variant="gray"
                            placeholder="Enter Vimeo video link here"
                          />
                        )}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              />
            </FieldGroup>
            <EditorBlockFooter>
              <form.AppField
                name={`sections[${sectionIdx}].background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
