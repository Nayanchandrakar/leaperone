import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { Spinner } from "@app/ui/components/spinner"
import { Trash2 } from "lucide-react"
import { useDeleteCard } from "@/features/dashboard/hooks/dashboard/use-delete-business-card"

type DeleteCardButtonProps = {
  id: string
}

export const DeleteCardButton = ({ id }: DeleteCardButtonProps) => {
  const { mutate, isPending } = useDeleteCard()

  return (
    <DropdownMenuItem variant="destructive" disabled={isPending} onClick={() => mutate({ id })}>
      {isPending ? (
        <>
          <Spinner className="size-4 animate-spin" />
          <span>Deleting...</span>
        </>
      ) : (
        <>
          <Trash2 className="size-4" />
          <span>Delete Card</span>
        </>
      )}
    </DropdownMenuItem>
  )
}
