// import type { FloatingButtonSection } from "@app/core/types"
import { Plus, QrCode, Share2 } from "lucide-react"
import { memo } from "react"
import { BussinessButton } from "@/features/preview/components/ui/bussines-button"

// type FloatingActionsProps = {
//   content: FloatingButtonSection
// }

export const FloatingActions = memo(() => {
  return (
    <>
      <nav className="fixed bottom-2 left-2 xs:bottom-4 xs:left-4 flex gap-2 xs:gap-4">
        <BussinessButton size="icon">
          <QrCode />
        </BussinessButton>
        <BussinessButton size="icon">
          <Share2 />
        </BussinessButton>
      </nav>

      <aside className="fixed bottom-2 right-2 xs:bottom-4 xs:right-4">
        <BussinessButton>
          <Plus />
          Save Contact
        </BussinessButton>
      </aside>
    </>
  )
})
