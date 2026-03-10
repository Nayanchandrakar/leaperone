import { TeamManagementButtons } from "@/features/dashboard/components/buttons/teams/team-management-buttons"
import { TeamMemberSearchBar } from "@/features/dashboard/components/pages/teams/team-member-searchbar"

export function TeamsControlBar() {
  return (
    <div className="mt-8 grid grid-cols-1 min-[1100px]:grid-cols-2 gap-6">
      <TeamMemberSearchBar />
      <TeamManagementButtons />
    </div>
  )
}
