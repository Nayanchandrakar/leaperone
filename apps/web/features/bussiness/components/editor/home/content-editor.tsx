import { ContentFormRenderer } from "@/features/bussiness/components/form/editor/content/content-form-renderer"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortGroup, EditorSortProvider } from "@/features/bussiness/components/ui/editor-sort"
import { useContentEditor } from "@/features/bussiness/hooks/home/use-content-editor"
import type { ContentEditorSortItem } from "@/features/bussiness/types"

export default function ContentEditor() {
  const { form, formRef, onSubmitCallback, initialSectionId } = useContentEditor()

  return (
    <form id="content-form" ref={formRef} onSubmit={onSubmitCallback}>
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
                  {(item: ContentEditorSortItem, sectionIdx) => (
                    <ContentFormRenderer
                      // @ts-expect-error - TODO: fix this
                      form={form}
                      id={item.id}
                      key={item.id}
                      type={item.type}
                      sectionIdx={sectionIdx}
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
