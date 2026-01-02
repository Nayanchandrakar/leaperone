import { MapPin } from "lucide-react"
import { memo } from "react"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"

export const QuickActions = memo(() => {
  return (
    <nav className="flex justify-center items-center gap-4 xs:gap-6 my-7">
      {Array.from({ length: 4 }).map((_, index) => (
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
