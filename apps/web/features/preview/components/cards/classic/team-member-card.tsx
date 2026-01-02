import type { TeamMember } from "@app/core/types"
import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { useMemo } from "react"
import { SectionRoot } from "@/features/preview/components/ui/section"

export const TeamMemberCard = ({ memberName, memberProfile, memberDesignation }: TeamMember) => {
  const profileImage = useMemo(
    () => (memberProfile.enabled && memberProfile?.imageSrc ? memberProfile?.imageSrc : null),
    [memberProfile],
  )

  return (
    <SectionRoot className="py-6 px-8">
      <li className="flex items-center gap-4">
        {profileImage && (
          <Avatar className="size-12">
            <AvatarImage src={profileImage} />
          </Avatar>
        )}
        <div className="-space-y-0.5">
          {memberName && (
            <strong className="font-semibold text-sm text-template-muted-foreground">
              {memberName}
            </strong>
          )}
          {memberDesignation && (
            <p className="font-template-body text-xs text-template-muted-foreground">
              {memberDesignation}
            </p>
          )}
        </div>
      </li>
    </SectionRoot>
  )
}
