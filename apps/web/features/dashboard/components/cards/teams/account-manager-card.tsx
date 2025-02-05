import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { Skeleton } from "@app/ui/components/skeleton"
import { useSession } from "@/features/auth/hooks/session/use-session"
import {
  TeamOverviewCard,
  TeamOverviewCardLabel,
} from "@/features/dashboard/components/cards/teams/team-overview-card"

export const AccountManagerCard = () => {
  const { data, isPending, isError } = useSession()

  if (isPending || isError) {
    return <Skeleton className="size-full" />
  }

  const { user } = data!

  return (
    <TeamOverviewCard className="col-span-2">
      <TeamOverviewCardLabel>Account Manager</TeamOverviewCardLabel>

      <div className="flex items-center gap-3">
        <Avatar className="size-14">
          <AvatarImage src={user.image!} alt={user.name} />
          <AvatarFallback className="text-primary font-semibold bg-green-50">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-0.5 text-muted-foreground">
          <p className="font-semibold text-base">{user.name}</p>
          <p className="text-sm font-normal">{user.email}</p>
        </div>
      </div>
    </TeamOverviewCard>
  )
}
