import { FieldGroup } from "@app/ui/components/field"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/ui/components/tabs"
import type { ContentEditorSchema, VideoSchema } from "@app/zod/types"
import { useCallback, useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import type { VideoType } from "@/features/bussiness/types"

interface VideoFormProps {
  index: number
  sectionId: string
}

export const VideoForm = withForm({
  props: {} as VideoFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    const handleVideoTypeChange = useCallback(
      (videoType: string) => {
        form.setFieldValue(`${sectionName}.video.type`, videoType as VideoType)
      },
      [form, sectionName],
    )

    return (
      <form.AppField
        name={`${sectionName}.enabled`}
        children={(sectionField) => (
          <EditorSortItem
            name="Video"
            id={sectionId}
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
                  name: `${sectionName}.heading.text`,
                  enabled: `${sectionName}.heading.enabled`,
                }}
              />

              <ToggleTextareaField
                form={form}
                variant="gray"
                label="Description"
                fields={{
                  name: `${sectionName}.description.text`,
                  enabled: `${sectionName}.description.enabled`,
                }}
              />

              <form.Subscribe
                selector={(state) => {
                  const formState = state.values?.sections?.[index] as VideoSchema
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
                        name={`${sectionName}.video.youtubeUrl`}
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
                        name={`${sectionName}.video.vimeoUrl`}
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
                name={`${sectionName}.background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
