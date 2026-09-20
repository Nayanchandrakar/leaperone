"use client"

import { Button } from "@app/ui/components/button"
import { useState } from "react"
import { AssetPickerDialog } from "@/features/dashboard/components/dialogs/asset-manager/asset-picker-dialog"

export default function TestPage() {
  const [open, setOpen] = useState(false)

  const handleUpload = (assetUrls: string[]) => {
    setOpen(false)
    console.log(assetUrls)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <AssetPickerDialog
        isOpen={open}
        fileType="image"
        title="Select an image"
        uploadActionLabel="Upload Selected Image"
        searchPlaceholder="Search your uploaded images"
        onOpenChange={setOpen}
        onUpload={handleUpload}
      />
    </>
  )
}
