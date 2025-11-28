import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useContentEditor } from "@/features/bussiness/hooks/home/use-content-editor"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

export default function ContentEditor() {
  const { form, formRef, onSubmitCallback, initialSectionId } = useContentEditor()

  return (
    <form id="content-editor-form" ref={formRef} onSubmit={onSubmitCallback}>
      <form.AppForm>
        <EditorBlock defaultValue={initialSectionId}>
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
                      // @ts-expect-error - TODO: fix this
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
