import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown, CreditCard, Edit, Eye, Trash2 } from "lucide-react"
import { AccessAsMemberButton } from "@/features/dashboard/components/buttons/teams/access-as-member-button"
import { RestrictMemberButton } from "@/features/dashboard/components/buttons/teams/restrict-member-button"
import { getStatusColor } from "@/features/dashboard/utils/teams"
import type { InvitedMember } from "@/types/api-types"

type MemberItemProps = {
  member: InvitedMember
}

export const MemberItem = ({ member }: MemberItemProps) => {
  const statusColor = getStatusColor(member.status, member.expiresAt)

  return (
    <div className="border rounded-lg p-4 sm:p-5 xl:p-6 space-y-4">
      <div className="flex items-center gap-3.5">
        <Avatar className="size-12">
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback className="capitalize">{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              style={{ "--status-color": statusColor } as React.CSSProperties}
              className="capitalize font-medium text-base after:content-[''] after:inline-block after:size-2 after:bg-(--status-color) after:rounded-full after:ml-2"
            >
              {member.name}
            </h3>
          </div>
          <p className="capitalize text-sm font-normal text-muted-foreground">{member.jobRole}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="gray-outline">
            Actions for this member <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <AccessAsMemberButton
            memberId={member.memberId}
            isRestricted={Boolean(member.isRestricted)}
          />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CreditCard className="size-4 mr-2" />
              Business Card Actions
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Eye className="size-4 mr-2" />
                View card
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="size-4 mr-2" />
                Create / Edit card
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4 mr-2" />
                Delete card
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <RestrictMemberButton
            memberId={member.memberId}
            isRestricted={Boolean(member.isRestricted)}
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2 className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
