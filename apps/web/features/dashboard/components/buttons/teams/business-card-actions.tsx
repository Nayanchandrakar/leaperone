import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@app/ui/components/dropdown-menu"
import { CreditCard, Edit, Eye, PlusCircle } from "lucide-react"
import Link from "next/link"
import { DeleteCardButton } from "@/features/dashboard/components/buttons/dashboard/delete-card-button"
import { useImpersonateMember } from "@/features/dashboard/hooks/teams/use-impersonate-member"

type BusinessCardActionsProps = {
  memberId: string
  isRestricted: boolean
  businessCardId: string | null
}

export const BusinessCardActions = ({
  memberId,
  isRestricted,
  businessCardId,
}: BusinessCardActionsProps) => {
  const { mutate, isPending } = useImpersonateMember()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <CreditCard />
        Business Card Actions
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-40">
          <DropdownMenuItem disabled={!businessCardId} asChild>
            <Link href={`/card/${businessCardId}`}>
              <Eye />
              View card
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isPending || isRestricted}
            onClick={() => mutate({ memberId, path: "/" })}
          >
            <PlusCircle />
            Create card
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isPending || !businessCardId}
            onClick={() => mutate({ memberId, path: "/?edit=true" })}
          >
            <Edit />
            Edit card
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DeleteCardButton businessCardId={businessCardId} />
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
