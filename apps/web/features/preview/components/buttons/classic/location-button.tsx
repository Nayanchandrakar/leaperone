import { buttonVariants } from "@app/ui/components/button"
import { MapPin } from "lucide-react"

export function LocationButton() {
  return (
    <div className="flex-center">
      <a
        href="*"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          className: "bg-template-primary! font-template-button hover:bg-template-primary/90",
        })}
      >
        <MapPin />
        Check Location
      </a>
    </div>
  )
}
