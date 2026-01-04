import type { SocialLinkType } from "@app/core/types"
import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback, useMemo } from "react"
import { SocialIcons } from "@/features/bussiness/components/shared/social-icons"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface LinkItemRendererProps {
  index: number
  itemId: string
  subIndex: number
  onDelete: (index: number) => void
}

export const LinkItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: LinkItemRendererProps) => {
    const [type] = useSubSectionField<SocialLinkType>(index, subIndex, ["links"], ["type"])
    const [label, setLabel] = useSubSectionField<string>(index, subIndex, ["links"], ["label"])
    const [href, setHref] = useSubSectionField<string>(index, subIndex, ["links"], ["href"])

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleLabelChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e?.target?.value)
      },
      [setLabel],
    )

    const handleUrlChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setHref(e?.target?.value)
      },
      [setHref],
    )

    const IconComponent = useMemo(() => SocialIcons[type], [type])

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <EditorSubSortTwoColumnGrid className="w-full @lg/editor-sub-sort:grid-cols-[minmax(280px,0.3fr)_1.7fr]">
          <div className="flex items-center gap-4 sm:gap-6">
            {IconComponent && <IconComponent className="size-15 shrink-0" />}
            <Field>
              <FieldLabel>Link Label</FieldLabel>
              <Input value={label} onChange={handleLabelChange} />
            </Field>
          </div>
          <Field>
            <FieldLabel>Profile Link</FieldLabel>
            <Input value={href} onChange={handleUrlChange} />
          </Field>
        </EditorSubSortTwoColumnGrid>
      </SortableSubListItem>
    )
  },
)
