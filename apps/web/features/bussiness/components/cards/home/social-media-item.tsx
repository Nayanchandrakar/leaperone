import type { SocialLink } from "@app/core/types"
import { Plus } from "lucide-react"
import { SocialIcons } from "@/features/bussiness/components/shared/social-icons"

type SocialMediaItemProps = {
  link: SocialLink
  onSelect: (link: SocialLink) => void
}

export const SocialMediaItem = ({ link, onSelect }: SocialMediaItemProps) => {
  const Icon = SocialIcons[link?.type]

  return (
    <li
      role="listitem"
      className="bg-muted p-2 rounded-2xl flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="size-9" /> : null}
        <span className="font-normal text-sm text-black">{link.label}</span>
      </div>

      <button
        type="button"
        onClick={() => onSelect(link)}
        className="transition-transform active:scale-105 flex-center size-7 border bg-white text-zinc-600 rounded-full cursor-pointer"
      >
        <Plus className="size-4" />
      </button>
    </li>
  )
}
