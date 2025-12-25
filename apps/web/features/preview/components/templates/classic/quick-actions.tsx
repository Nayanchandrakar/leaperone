import { MapPin } from "lucide-react"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"

export const QuickActions = () => {
  return (
    <nav className="flex justify-center items-center gap-6 my-7" aria-label="Quick actions">
      {Array.from({ length: 4 }).map((_, index) => (
        <IconBadge key={index} icon={MapPin} className="size-15" iconClassName="size-6" />
      ))}
    </nav>
  )
}
