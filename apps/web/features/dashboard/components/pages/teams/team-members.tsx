"use client"

import { BuyMoreSeatsButton } from "@/features/dashboard/components/buttons/teams/buy-more-seats-button"
import { AddMemberItem } from "@/features/dashboard/components/cards/teams/add-member-item"
import { MemberItem } from "@/features/dashboard/components/cards/teams/member-item"
import { MemberItemSkeleton } from "@/features/dashboard/components/skeletons/teams/index"
import { DashboardSubtitle } from "@/features/dashboard/components/ui/dashboard-heading"
import { useFilteredMembers } from "@/features/dashboard/hooks/teams/use-filtered-members"
import { useMemberSearch } from "@/features/dashboard/hooks/teams/use-member-search"
import { useTeamMembers } from "@/features/dashboard/hooks/teams/use-team-members"
import type { InvitedMember } from "@/types/api-types"

// Types
interface MembersContentProps {
  isLoading: boolean
  isError: boolean
  isSearching: boolean
  hasSearchResults: boolean
  members: InvitedMember[]
}

interface MembersGridProps {
  showSkeleton: boolean
  members: InvitedMember[]
}

interface MembersListProps {
  members: InvitedMember[]
}

// Main component - orchestrates the members page
export const TeamMembers = () => {
  const query = useMemberSearch((state) => state.query)
  const { isLoading, isError, data } = useTeamMembers()

  const { filteredMembers, hasSearchResults, isSearching } = useFilteredMembers({
    query,
    members: data?.members ?? [],
  })

  return (
    <section className="@container/teams mt-8 space-y-5">
      <DashboardSubtitle>Your Team Members</DashboardSubtitle>
      <MembersContent
        isError={isError}
        isLoading={isLoading}
        isSearching={isSearching}
        members={filteredMembers}
        hasSearchResults={hasSearchResults}
      />
      <BuyMoreSeatsButton />
    </section>
  )
}

const MembersContent = ({
  isLoading,
  isError,
  isSearching,
  hasSearchResults,
  members,
}: MembersContentProps) => {
  const showSkeleton = isLoading || isError

  // If the user is searching and no results are found, show the no search results component
  if (isSearching && !hasSearchResults) return <NoSearchResults />

  // If the user is not searching and no results are found, show the no search results component
  return <MembersGrid showSkeleton={showSkeleton} members={members} />
}

const NoSearchResults = () => {
  return (
    <div className="flex-center h-79">
      <p className="text-muted-foreground text-sm font-normal">
        No members found matching your search.
      </p>
    </div>
  )
}

const MembersGrid = ({ showSkeleton, members }: MembersGridProps) => {
  return (
    <div className="grid auto-rows-fr grid-cols-1 @xl/teams:grid-cols-2 @4xl/teams:grid-cols-3 gap-4">
      {showSkeleton ? <MemberItemSkeleton /> : <MembersGridContent members={members} />}
    </div>
  )
}

const MembersGridContent = ({ members }: MembersListProps) => {
  return (
    <>
      <MembersList members={members} />
      <AddMemberItem />
    </>
  )
}

const MembersList = ({ members }: MembersListProps) => {
  if (!members.length) return null
  return members.map((member) => <MemberItem key={member.memberId} member={member} />)
}
