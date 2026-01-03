import type { TeamMember } from "@app/core/types"
import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { useMemo } from "react"
import { Member, MemberDescription, MemberName } from "@/features/preview/components/ui/member"
import { SectionRoot } from "@/features/preview/components/ui/section"

type TeamMemberCardProps = {
  member: TeamMember
  background: boolean
}

export const TeamMemberCard = ({ member, background }: TeamMemberCardProps) => {
  const { designation, name, profile, description } = member

  const profileImage = useMemo(
    () => (profile?.enabled && profile?.imageSrc ? profile.imageSrc : null),
    [profile?.enabled, profile?.imageSrc],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description?.text : null),
    [description?.enabled, description?.text],
  )
  return (
    <SectionRoot role="listitem" background={background} className="py-6 px-8 space-y-4">
      <Member>
        {profileImage && (
          <Avatar className="size-12">
            <AvatarImage alt="member-proifle" src={profileImage} />
          </Avatar>
        )}
        <div className="-space-y-0.5 break-all">
          {name && <MemberName>{name}</MemberName>}
          {designation && <MemberDescription>{designation}</MemberDescription>}
        </div>
      </Member>
      {descriptionContent && <MemberDescription>{descriptionContent}</MemberDescription>}
    </SectionRoot>
  )
}
