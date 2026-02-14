import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { Button } from "@app/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown } from "lucide-react"
import type * as React from "react"
import { BusinessCardActions } from "@/features/dashboard/components/buttons/teams/business-card-actions"
import { DeleteMemberButton } from "@/features/dashboard/components/buttons/teams/delete-member-button"
import { ImpersonationButton } from "@/features/dashboard/components/buttons/teams/impersonation-button"
import { RestrictMemberButton } from "@/features/dashboard/components/buttons/teams/restrict-member-button"
import { getStatusColor } from "@/features/dashboard/utils/teams"
import type { InvitedMember } from "@/types/api-types"

export const MemberItem = ({
  memberId,
  name,
  image,
  jobRole,
  status,
  isRestricted,
  businessCardId,
}: InvitedMember) => {
  const statusColor = getStatusColor(status, isRestricted)

  return (
    <div className="border rounded-lg p-4 sm:p-5 xl:p-6 space-y-4">
      <div className="flex items-center gap-3.5">
        <Avatar className="size-12">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="capitalize">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3
              style={{ "--status-color": statusColor } as React.CSSProperties}
              className="capitalize font-medium text-base after:content-[''] after:inline-block after:size-2 after:bg-(--status-color) after:rounded-full after:ml-2"
            >
              {name}
            </h3>
          </div>
          <p className="capitalize text-sm font-normal text-muted-foreground">{jobRole}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="gray-outline">
            Actions for this member
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Member Actions</DropdownMenuLabel>
            <ImpersonationButton memberId={memberId} isRestricted={isRestricted} />
            <BusinessCardActions
              memberId={memberId}
              isRestricted={isRestricted}
              businessCardId={businessCardId}
            />
            <RestrictMemberButton memberId={memberId} isRestricted={isRestricted} />
            <DropdownMenuSeparator />
            <DeleteMemberButton />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
