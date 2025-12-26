import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { SectionRoot } from "@/features/preview/components/ui/section"

interface TeamMemberProps {
  avatarUrl: string
  name: string
  jobTitle: string
}

export const TeamMember = ({ avatarUrl, name, jobTitle }: TeamMemberProps) => {
  return (
    <SectionRoot className="py-6 px-8">
      <li className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} />
        </Avatar>

        <div className="-space-y-0.5">
          <strong className="font-semibold text-sm text-(--supporting-text-color)">{name}</strong>
          <p className="font-normal text-xs text-(--supporting-text-color)">{jobTitle}</p>
        </div>
      </li>
    </SectionRoot>
  )
}
