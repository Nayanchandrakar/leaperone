"use client"

import { Button } from "@app/ui/components/button"
import { useState } from "react"
import { SingleFileDialog } from "@/features/dashboard/components/dialogs/asset-manager/single-file-dialog"

export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false)

  const handleBulkUpload = ([assets]: string[]) => {
    // We will update somthing on the state here
    console.log(assets)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <SingleFileDialog
        isOpen={isOpen}
        fileType="image"
        setIsOpen={setIsOpen}
        title="Select an image"
        onBulkUpload={handleBulkUpload}
        uploadButtonLabel="Upload Selected Image"
        meta={{ inputPlaceholder: "Search your uploaded images" }}
      />
    </>
  )
}
