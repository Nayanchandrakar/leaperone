import { Button } from "@app/ui/components/button"
import { Info } from "lucide-react"
import { TeamOverview, TeamOverviewLabel } from "@/features/dashboard/components/ui/team-overview"

export function WorkspaceUsage() {
  return (
    <div className="space-y-3 min-w-59">
      <TeamOverview className="flex items-center justify-between">
        <TeamOverviewLabel className="flex items-center gap-x-2 m-0">
          Seats used <Info className="size-4" />
        </TeamOverviewLabel>
        <span className="font-normal text-xl text-muted-foreground">5/5</span>
      </TeamOverview>

      <Button variant="green-outline" className="w-full font-semibold">
        Buy more Seats
      </Button>
    </div>
  )
}
