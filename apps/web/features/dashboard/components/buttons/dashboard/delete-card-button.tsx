import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { Trash2 } from "lucide-react"
import { useDeleteCard } from "@/features/dashboard/hooks/dashboard/use-delete-business-card"

type DeleteCardButtonProps = {
  businessCardId: string | null
}

export function DeleteCardButton({ businessCardId }: DeleteCardButtonProps) {
  const { mutate, isPending } = useDeleteCard()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={isPending || !businessCardId}
      onClick={() => mutate({ id: businessCardId! })}
    >
      <Trash2 />
      Delete Card
    </DropdownMenuItem>
  )
}
