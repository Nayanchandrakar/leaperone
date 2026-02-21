import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"
import { useAnalayticsMembers } from "@/features/dashboard/hooks/analytics/use-analytics-members"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"
import type { AnalyticsMember } from "@/types/api-types"

interface MemberSwitcherProps {
  isDisabled: boolean
}

const SELF_MEMBER: AnalyticsMember = { memberId: "current_user_id", name: "Myself" }

export const MemberSwitcher = ({ isDisabled }: MemberSwitcherProps) => {
  const { memberId, setMemberId } = useAnalyticsStore(
    useShallow((state) => ({
      memberId: state.memberId,
      setMemberId: state.setMemberId,
    })),
  )

  const { data, isPending } = useAnalayticsMembers()

  let members: AnalyticsMember[] = [SELF_MEMBER]

  if (data?.members?.length && !isPending) {
    members = [...members, ...data.members]
  }

  const selectedName =
    members.find(({ memberId: id }) => (memberId ? id === memberId : id === SELF_MEMBER.memberId))
      ?.name ?? SELF_MEMBER.name

  const handleValueChange = useCallback(
    (value: string) => {
      setMemberId(value === SELF_MEMBER.memberId ? undefined : value)
    },
    [setMemberId],
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Whose Analytics?</SortFilterBarLabel>
      <Select
        disabled={isDisabled}
        onValueChange={handleValueChange}
        value={memberId ?? SELF_MEMBER.memberId}
      >
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue placeholder="Select Member">{selectedName}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {members.map(({ memberId, name }) => (
              <SelectItem key={memberId} value={memberId}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}
