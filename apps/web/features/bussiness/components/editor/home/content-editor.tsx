import { useMemo } from "react"
import { useAppForm } from "@/components/ui/app-form"
import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useContentFormOptions } from "@/features/bussiness/hooks/home/use-content-form-options"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

export default function ContentEditor() {
  const formOptions = useContentFormOptions()
  const form = useAppForm(formOptions)

  const onSubmitCallback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    void form.handleSubmit()
  }

  const defaultValue = useMemo(
    () => formOptions?.defaultValues?.sections[0]?.id!,
    [formOptions.defaultValues],
  )

  return (
    <form onSubmit={onSubmitCallback}>
      <form.AppForm>
        <EditorBlock defaultValue={defaultValue}>
          <form.AppField
            mode="array"
            name="sections"
            children={(sectionField) => (
              <EditorSortProvider
                data={sectionField.state.value}
                onDataChange={sectionField.moveValue}
              >
                <EditorSortGroup>
                  {(item: ContentEditorSortItem, index) => (
                    <ContentFormRenderer
                      form={form}
                      key={item.id}
                      index={index}
                      sectionId={item.id}
                      sectionType={item.type}
                    />
                  )}
                </EditorSortGroup>
              </EditorSortProvider>
            )}
          />
        </EditorBlock>
      </form.AppForm>
    </form>
  )
}
