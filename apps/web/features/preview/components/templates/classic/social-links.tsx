import { ArrowUpRight, type LucideIcon } from "lucide-react"

interface SocialLinkProps {
  icon: LucideIcon
  label: string
}

export const SocialLink = ({ icon: Icon, label }: SocialLinkProps) => {
  return (
    <li className="flex items-center justify-between gap-2 py-3 border-b border-border">
      <div className="flex items-center gap-3">
        <span className="bg-primary size-8 flex-center rounded-full">
          <Icon className="stroke-none size-4 fill-white" />
        </span>
        <span className="font-normal text-base text-muted-foreground">{label}</span>
      </div>

      <ArrowUpRight className="size-5 text-muted-foreground" />
    </li>
  )
}
