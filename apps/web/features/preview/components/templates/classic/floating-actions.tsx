import { Button } from "@app/ui/components/button"
import { Plus, QrCode, Share2 } from "lucide-react"

export const FloatingActions = () => {
  return (
    <>
      {/* Social media section */}
      <nav className="fixed bottom-4 left-4 flex gap-4" aria-label="Share actions">
        <Button size="icon-xl">
          <QrCode className="size-5" />
        </Button>

        <Button size="icon-xl">
          <Share2 className="size-5" />
        </Button>
      </nav>

      {/* Save contact section */}
      <aside className="fixed bottom-4 right-4">
        <Button className="px-5" size="lg">
          <Plus />
          Save Contact
        </Button>
      </aside>
    </>
  )
}
