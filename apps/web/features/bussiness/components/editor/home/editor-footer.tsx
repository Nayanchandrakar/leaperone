"use client"
import { Button } from "@app/ui/components/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type EditorFooterProps = {
  onNextAction: () => void
  onPreviousAction: () => void
}

export const EditorFooter = ({ onNextAction, onPreviousAction }: EditorFooterProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="green-outline" onClick={onPreviousAction}>
        <ArrowLeft />
        Previous Step
      </Button>

      <Button onClick={onNextAction}>
        Next Step
        <ArrowRight />
      </Button>
    </div>
  )
}
