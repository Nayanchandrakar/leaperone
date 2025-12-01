import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface RenderLinksFormProps {
  sectionName: `sections[${number}]`
}

export const RenderLinksForm = withForm({
  props: {} as RenderLinksFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionName }) => {
    return (
      <form.AppField
        mode="array"
        name={`${sectionName}.links`}
        children={(field) => (
          <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
            <EditorSortGroup
              children={(link, linkIdx) => (
                <EditorSubSortItem
                  id={link.id}
                  key={link.id}
                  onDelete={() => field.removeValue(linkIdx)}
                >
                  <EditorSubSortTwoColumnGrid>
                    <form.AppField
                      name={`${sectionName}.links[${linkIdx}].label`}
                      children={(field) => <field.TextField label="Link Label" />}
                    />
                    <form.AppField
                      name={`${sectionName}.links[${linkIdx}].url`}
                      children={(field) => <field.TextField label="Profile Link" />}
                    />
                  </EditorSubSortTwoColumnGrid>
                </EditorSubSortItem>
              )}
            />
          </EditorSortProvider>
        )}
      />
    )
  },
})
