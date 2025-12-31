import type { LinkSection } from "@app/core/types"
import { memo } from "react"

type SocialLinksSectionProps = {
  content: LinkSection
}

export const SocialLinksSection = memo(({ content }: SocialLinksSectionProps) => {
  if (!content?.enabled) return

  return <div>Classic Cta Button Section</div>
})
