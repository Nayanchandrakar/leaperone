import type { BusinessCardStatus } from "@app/database/types"
import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { Spinner } from "@app/ui/components/spinner"
import { useToogleCardStatus } from "@/features/dashboard/hooks/dashboard/use-toggle-business-card-status"

type ToogleCardStatusProps = {
  id: string
  status: BusinessCardStatus
}

export function ToogleCardStatus({ id, status }: ToogleCardStatusProps) {
  const { mutate, isPending } = useToogleCardStatus()

  const isActive = status === "active"
  const nextStatus: BusinessCardStatus = isActive ? "inactive" : "active"
  const actionLabel = isActive ? "Deactivate Card" : "Activate Card"

  return (
    <DropdownMenuItem disabled={isPending} onClick={() => mutate({ id, status: nextStatus })}>
      {isPending ? (
        <>
          <Spinner className="size-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <span>{actionLabel}</span>
      )}
    </DropdownMenuItem>
  )
}
