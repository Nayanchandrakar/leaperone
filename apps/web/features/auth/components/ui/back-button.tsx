"use client"

import { Button } from "@myleaper/ui/components/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()
  return (
    <Button
      tabIndex={-1}
      onClick={() => router.back()}
      className="w-fit absolute"
      variant="secondary"
      size="sm"
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  )
}
