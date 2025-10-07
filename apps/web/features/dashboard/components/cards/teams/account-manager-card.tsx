import { UserAvatar } from "@/components/ui/user-avatar"
import {
  TeamOverviewCard,
  TeamOverviewCardLabel,
} from "@/features/dashboard/components/cards/teams/team-overview-card"
import type { User } from "@/types"

type Props = {
  user: User
}

export const AccountManagerCard = ({ user }: Props) => {
  return (
    <TeamOverviewCard className="col-span-2">
      <TeamOverviewCardLabel>Account Manager</TeamOverviewCardLabel>

      <div className="flex items-center gap-3">
        <UserAvatar name={user?.name} src={user?.image!} className="size-14" />

        <div className="space-y-0.5 text-muted-foreground">
          <p className="font-semibold text-base">Andrew Sain</p>
          <p className="text-sm font-normal">Marketing Manager</p>
        </div>
      </div>
    </TeamOverviewCard>
  )
}
