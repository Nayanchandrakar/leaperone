import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface RenderLinksFormProps {
  sectionIdx: number
}

export function RenderLinksForm({ sectionIdx }: RenderLinksFormProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["links"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleLabelChange = useCallback(
    (linkIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "social-links") {
        const currentLink = section.links[linkIdx]
        updateItem(sectionIdx, ["links"], linkIdx, {
          ...currentLink,
          label: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleUrlChange = useCallback(
    (linkIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "social-links") {
        const currentLink = section.links[linkIdx]
        updateItem(sectionIdx, ["links"], linkIdx, {
          ...currentLink,
          url: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDelete = useCallback(
    (linkIdx: number) => {
      removeItem(sectionIdx, ["links"], linkIdx)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "social-links") return null

  return (
    <EditorSortProvider data={section.links} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(link: any, linkIdx: number) => (
          <EditorSubSortItem id={link.id} key={link.id} onDelete={() => handleDelete(linkIdx)}>
            <EditorSubSortTwoColumnGrid>
              <Field>
                <FieldLabel htmlFor={`section-${sectionIdx}-link-${linkIdx}-label`}>
                  Link Label
                </FieldLabel>
                <Input
                  id={`section-${sectionIdx}-link-${linkIdx}-label`}
                  value={link.label}
                  onChange={(e) => handleLabelChange(linkIdx, e)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor={`section-${sectionIdx}-link-${linkIdx}-url`}>
                  Profile Link
                </FieldLabel>
                <Input
                  id={`section-${sectionIdx}-link-${linkIdx}-url`}
                  value={link.url}
                  onChange={(e) => handleUrlChange(linkIdx, e)}
                />
              </Field>
            </EditorSubSortTwoColumnGrid>
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
