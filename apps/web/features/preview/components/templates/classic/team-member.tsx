import { Avatar, AvatarImage } from "@app/ui/components/avatar"

interface TeamMemberProps {
  avatarUrl: string
  name: string
  jobTitle: string
}

export const TeamMember = ({ avatarUrl, name, jobTitle }: TeamMemberProps) => {
  return (
    <li className="py-6 px-8 rounded-3xl bg-white flex items-center gap-4">
      <Avatar className="size-12">
        <AvatarImage src={avatarUrl} />
      </Avatar>

      <div className="-space-y-0.5">
        <strong className="font-semibold text-sm text-muted-foreground">{name}</strong>
        <p className="font-normal text-xs text-muted-foreground">{jobTitle}</p>
      </div>
    </li>
  )
}
