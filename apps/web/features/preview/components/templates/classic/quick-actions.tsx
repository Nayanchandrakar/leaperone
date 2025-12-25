import { MapPin } from "lucide-react"

export const QuickActions = () => {
  return (
    <nav className="flex justify-center items-center gap-6 my-7" aria-label="Quick actions">
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className="size-15 shrink-0 flex-center rounded-full bg-primary text-white"
        >
          <MapPin className="size-6" />
        </span>
      ))}
    </nav>
  )
}
