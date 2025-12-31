import { buttonVariants } from "@app/ui/components/button"
import { MapPin } from "lucide-react"

export const LocationButton = () => {
  return (
    <div className="flex-center">
      <a
        href="*"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({
          className:
            "bg-(--highlight-color) font-(--font-button-weight) hover:bg-(--highlight-color)/90",
        })}
      >
        <MapPin />
        Check Location
      </a>
    </div>
  )
}
