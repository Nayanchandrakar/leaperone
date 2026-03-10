import { Button, buttonVariants } from "@app/ui/components/button"
import { Plus, Settings } from "lucide-react"
import Link from "next/link"

export function TeamManagementButtons() {
  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 min-[1100px]:w-fit">
      <Button type="button">
        <Plus className="size-4" />
        <span>Add Team Member</span>
      </Button>

      <Link
        href="/dashboard/team-settings"
        className={buttonVariants({ variant: "green-outline" })}
      >
        <Settings />
        Team Settings
      </Link>
    </div>
  )
}
