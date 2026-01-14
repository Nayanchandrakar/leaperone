import type { SocialLink } from "@app/types"
import { SocialMediaItem } from "@/features/bussiness/components/cards/home/social-media-item"

type SocialMediaSectionProps = {
  title: string
  links: SocialLink[]
  onSelect: (link: SocialLink) => void
}

export function SocialMediaSection({ title, links, onSelect }: SocialMediaSectionProps) {
  return (
    <div className="space-y-4">
      <p className="font-medium text-base text-muted-foreground">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {links.map((link) => (
          <SocialMediaItem key={link?.id} link={link} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}
