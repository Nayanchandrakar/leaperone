import type { SocialLink } from "@app/core/types"
import { ArrowUpRight } from "lucide-react"

interface SocialLinkRowProps {
  link: SocialLink
}

export const SocialLinkRow = ({ link }: SocialLinkRowProps) => {
  return (
    <a
      href={link?.href}
      className="flex items-center justify-between gap-2 py-4 border-b border-border text-(--supporting-text-color) hover:text-(--highlight-color) transition-colors"
    >
      <div className="flex items-center gap-3">
        {/* <IconBadge Icon={icon} /> */}
        {link?.label && <span className="font-(--font-body-weight) text-base">{link.label}</span>}
      </div>
      <ArrowUpRight className="size-4.5" />
    </a>
  )
}
