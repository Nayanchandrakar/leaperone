import { ArrowUpRight, type LucideIcon } from "lucide-react"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"

interface SocialLinkProps {
  icon: LucideIcon
  label: string
}

export const SocialLink = ({ icon, label }: SocialLinkProps) => {
  return (
    <li className="flex items-center justify-between gap-2 py-3 border-b border-border">
      <div className="flex items-center gap-3">
        <IconBadge icon={icon} />
        <span className="font-normal text-base text-muted-foreground">{label}</span>
      </div>

      <ArrowUpRight className="size-5 text-muted-foreground" />
    </li>
  )
}
