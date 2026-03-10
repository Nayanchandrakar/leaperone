"use client"

import { Button } from "@app/ui/components/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import { useSession } from "@/features/auth/hooks/session/use-session"
import { useExitImpersonation } from "@/features/dashboard/hooks/teams/use-exit-impersonation"

export function ExitImpersonation() {
  const { data, isPending, isError } = useSession()
  const { mutateAsync, isPending: isExiting } = useExitImpersonation()

  if (isPending || isError || !data?.session?.impersonatedBy) {
    return null
  }

  const handleExitImpersonation = () => {
    toast.promise(mutateAsync(), {
      loading: "Backing to your own account...",
    })
  }

  return (
    <div className="h-16 border-b border-border bg-muted">
      <div className="container flex items-center justify-between gap-4">
        <p className="text-sm font-normal text-muted-foreground truncate">
          You are currently using {data.user.name}'s account.
        </p>
        <Button
          size="icon-sm"
          variant="ghost"
          disabled={isExiting}
          onClick={handleExitImpersonation}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
