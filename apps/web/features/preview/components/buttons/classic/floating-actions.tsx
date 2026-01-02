import type { FloatingButtonSection } from "@app/core/types"
import { Plus, QrCode, Share2 } from "lucide-react"
import { Fragment, memo, useMemo } from "react"
import { BussinessButton } from "@/features/preview/components/ui/bussines-button"

type FloatingActionProps = {
  content: FloatingButtonSection
}

export const FloatingActions = memo(({ content }: FloatingActionProps) => {
  const { showQrButton, showShareButton, label } = content

  const buttonContent = useMemo(() => {
    return label?.enabled && label?.text ? label.text : null
  }, [label?.enabled, label?.text])

  return (
    <Fragment>
      {(showQrButton || showShareButton) && (
        <nav className="fixed bottom-2 left-2 xs:bottom-4 xs:left-4 flex gap-2 xs:gap-4">
          {showQrButton && (
            <BussinessButton size="icon">
              <QrCode aria-hidden="true" focusable="false" />
            </BussinessButton>
          )}

          {showShareButton && (
            <BussinessButton size="icon">
              <Share2 aria-hidden="true" focusable="false" />
            </BussinessButton>
          )}
        </nav>
      )}
      {buttonContent && (
        <aside className="fixed bottom-2 right-2 xs:bottom-4 xs:right-4">
          <BussinessButton type="button">
            <Plus aria-hidden="true" focusable="false" />
            <span>{buttonContent}</span>
          </BussinessButton>
        </aside>
      )}
    </Fragment>
  )
})
