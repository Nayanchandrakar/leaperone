import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { getSession } from "@/actions/utils"
import { TeamOverview, TeamOverviewLabel } from "@/features/dashboard/components/ui/team-overview"

export async function AccountOwner() {
  const session = await getSession()
  return (
    <TeamOverview className="space-y-3">
      <TeamOverviewLabel>Account Manager</TeamOverviewLabel>

      <div className="flex items-center gap-3">
        <Avatar className="size-14">
          <AvatarImage src={session?.user?.image!} alt={session?.user?.name} />
          <AvatarFallback className="capitalize font-semibold text-primary bg-green-50">
            {session?.user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="text-muted-foreground">
          <p className="font-semibold text-base capitalize">{session?.user?.name}</p>
          <p className="text-sm font-normal">{session?.user?.email}</p>
        </div>
      </div>
    </TeamOverview>
  )
}
