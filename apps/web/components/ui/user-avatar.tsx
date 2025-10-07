import { Avatar, AvatarFallback, AvatarImage } from "@app/ui/components/avatar"
import { cn } from "@app/ui/lib/utils"

type Props = {
  name: string
  src: string
  className?: string
}

export const UserAvatar = ({ className, src, name }: Props) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="text-primary font-semibold bg-green-50">
        {name?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}
