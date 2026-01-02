import type { Contact } from "@app/core/types"
import { MapPin } from "lucide-react"
import { memo } from "react"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"

type QuickActionProps = {
  contacts: {
    list: Contact[]
    enabled: boolean
  }
}

export const QuickActions = memo(({ contacts }: QuickActionProps) => {
  if (!contacts.enabled || contacts?.list?.length === 0) return null

  return (
    <nav className="flex justify-center items-center gap-4 xs:gap-6 my-7">
      {contacts.list.map((_, index) => (
        <IconBadge
          key={index}
          Icon={MapPin}
          className="size-12 xs:size-15"
          iconClassName="size-4 xs:size-6"
        />
      ))}
    </nav>
  )
})
