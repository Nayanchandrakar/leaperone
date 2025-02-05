import { AccountManagerCard } from "@/features/dashboard/components/cards/teams/account-manager-card"
import { MemberStatusCard } from "@/features/dashboard/components/cards/teams/member-status-card"
import { TeamSeatAllocationCard } from "@/features/dashboard/components/cards/teams/team-seat-allocation-card"

export const TeamDashboardOverview = () => {
  return (
    <section className="mt-8 grid grid-cols-6 gap-5">
      <AccountManagerCard />
      <MemberStatusCard />
      <TeamSeatAllocationCard />
    </section>
  )
}
