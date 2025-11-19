"use client"

import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type EditorFooterProps = {
  hasNextStep: boolean
  selectedStep: number
  onNextAction: () => void
  onPreviousAction: () => void
}

export const EditorFooter = ({
  selectedStep,
  hasNextStep,
  onNextAction,
  onPreviousAction,
}: EditorFooterProps) => {
  return (
    <div className="flex items-center justify-between">
      {selectedStep > 0 ? (
        <Button variant="green-outline" onClick={onPreviousAction}>
          <ArrowLeft />
          Previous Step
        </Button>
      ) : (
        <span />
      )}

      {hasNextStep && (
        <Button onClick={onNextAction}>
          Next Step
          <ArrowRight />
        </Button>
      )}
    </div>
  )
}
