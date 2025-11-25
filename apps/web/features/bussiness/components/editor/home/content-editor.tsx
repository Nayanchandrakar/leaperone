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
            children={(field) => (
              <EditorSortProvider data={field.state.value} onDataChange={field.handleChange}>
                <EditorSortGroup>
                  {(item: ContentEditorSortItem, index) => (
                    <ContentFormRenderer key={index} form={form} item={item} index={index} />
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
