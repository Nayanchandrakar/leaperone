import type { TeamMember } from "@app/core/types"
import { memo, useCallback } from "react"
import { TeamMemberRenderer } from "@/features/bussiness/components/form/editor/content/team/team-member-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TeamMembersList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<TeamMember>(index, ["members"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (member: TeamMember, i: number) => (
      <TeamMemberRenderer
        subIndex={i}
        index={index}
        key={member?.id}
        itemId={member?.id}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})
