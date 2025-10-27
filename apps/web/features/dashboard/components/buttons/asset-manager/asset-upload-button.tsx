"use client"

import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

export const AssetUploadButton = () => {
  return (
    <Button
      type="button"
      variant="green-outline"
      onClick={() => {
        toast.promise(
          () => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),
          {
            loading: "Loading...",
            success: () => "Event has been created",
            error: "Error",
          },
        )
      }}
    >
      <PlusIcon className="size-4" />
      <span>New Upload</span>
      <input type="file" hidden />
    </Button>
  )
}
