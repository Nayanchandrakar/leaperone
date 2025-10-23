import { Button } from "@app/ui/components/button"
import { Info } from "lucide-react"
import { TeamOverviewCard, TeamOverviewCardLabel } from "./team-overview-card"

export const TeamSeatAllocationCard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 col-span-3">
      <div className="space-y-4">
        <TeamOverviewCard className="flex items-center  justify-between">
          <TeamOverviewCardLabel className="flex items-center gap-x-2 m-0">
            Seats used <Info className="size-4" />
          </TeamOverviewCardLabel>
          <span className="font-normal text-xl text-muted-foreground">5/5</span>
        </TeamOverviewCard>

        <Button size="lg" variant="green-outline" className="w-full">
          Buy more Seats
        </Button>
      </div>

      <p className="font-normal text-muted-foreground text-start text-xs">
        Note: All invited users and the account manager each need a seat to use Leaper One.
      </p>
    </div>
  )
}
