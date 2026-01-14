import type { SocialLink } from "@app/types"
import { ArrowUpRight } from "lucide-react"
import { type FC, useCallback } from "react"
import { ContactIcons } from "@/features/preview/components/shared/contact-icons"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"
import { contactLinkFormatter } from "@/features/preview/utils/contact-link-formatter"

interface SocialLinkRowProps extends SocialLink {}

export const SocialLinkRow: FC<SocialLinkRowProps> = ({ href, label, type }) => {
  const getFormattedHref = useCallback(() => {
    // @ts-expect-error - social types may not be in the formatter, fallback to href
    return (contactLinkFormatter?.[type]?.(href) as string | undefined) ?? href
  }, [type, href])

  return (
    <a
      target="_blank"
      href={getFormattedHref()}
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 py-3.5 border-b border-border text-template-muted-foreground hover:text-template-primary transition-colors"
    >
      <span className="flex items-center gap-3">
        {ContactIcons[type] && <IconBadge Icon={ContactIcons[type]} />}
        {label && <span className="font-template-body text-base">{label}</span>}
      </span>
      <ArrowUpRight className="size-4.5" aria-hidden="true" />
    </a>
  )
}
