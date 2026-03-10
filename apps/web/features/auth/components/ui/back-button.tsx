"use client"

import { Button } from "@app/ui/components/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()
  return (
    <Button
      tabIndex={-1}
      onClick={() => router.back()}
      className="absolute"
      variant="green-outline"
      size="sm"
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  )
}
