import { MemberStatusList } from "@/features/dashboard/components/cards/teams/member-status-list"
import { WorkspaceUsage } from "@/features/dashboard/components/cards/teams/workspace-usage"
import { AccountOwner } from "@/features/dashboard/components/pages/teams/account-owner"

export function TeamsInformation() {
  return (
    <section className="@container mt-8 max-w-5xl">
      <div className="grid @2xl:grid-cols-[repeat(2,auto)] @3xl:grid-cols-[repeat(3,auto)] @4xl:grid-cols-[repeat(4,auto)] gap-3.5 md:gap-4.5">
        <AccountOwner />
        <MemberStatusList />
        <WorkspaceUsage />
        <p className="font-normal text-muted-foreground text-start text-xs">
          Note: All invited users and the account manager each need a seat to use Leaper One.
        </p>
      </div>
    </section>
  )
}
