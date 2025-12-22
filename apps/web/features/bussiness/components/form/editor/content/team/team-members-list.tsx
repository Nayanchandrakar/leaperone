import type { TeamMember } from "@app/core/types"
import { memo } from "react"
import { TeamMemberRenderer } from "@/features/bussiness/components/form/editor/content/team/team-member-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TeamMembersList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<TeamMember>(index, ["members"])

  if (!list?.length) {
    return null
  }

  return (
    <SortableList
      items={list}
      onReorder={moveItem}
      renderItem={(member, i) => (
        <TeamMemberRenderer
          subIndex={i}
          index={index}
          key={member?.id}
          itemId={member?.id}
          onDelete={() => removeItem(i)}
        />
      )}
    />
  )
})
