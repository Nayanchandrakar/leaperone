"use client"

import { Button } from "@app/ui/components/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@app/ui/components/dialog"
import { Spinner } from "@app/ui/components/spinner"
import { VisuallyHidden } from "@app/ui/components/visually-hidden"
import { X } from "lucide-react"
import Image from "next/image"
import { useDeleteFiles } from "@/features/dashboard/hooks/asset-manager/use-delete-files"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import { getAssetUrl, getIconForMime } from "@/features/dashboard/utils/asset-manager"

export function FilePreviewDialog() {
  const Icon = getIconForMime("image/jpeg")

  const { mutate, isPending } = useDeleteFiles()
  const { isOpen, setIsOpen, asset, setAsset } = useFilePreviewStore()

  function handleDelete() {
    if (!asset || isPending) return

    mutate([asset.id], {
      onSuccess() {
        setIsOpen(false)
        setAsset(null)
      },
    })
  }

  function handleClose() {
    if (!isPending) {
      setIsOpen(false)
      setAsset(null)
    }
  }

  if (!asset) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] p-0" showCloseButton={false}>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle />
          </DialogHeader>
        </VisuallyHidden>

        {/* File preview header */}
        <div className="flex items-center justify-between gap-2 px-6 sm:px-8 py-4 h-fit border-b">
          <div className="flex items-center gap-2.5">
            <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm max-w-24 min-[470px]:max-w-40 truncate font-normal text-muted-foreground">
              {asset.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="min-w-24"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending || !asset}
            >
              {isPending && <Spinner />}
              Delete
            </Button>

            <Button variant="ghost" size="icon" disabled={isPending} onClick={handleClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* File preview image */}
        <Image
          width={1000}
          sizes="100vw"
          height={1000}
          alt={asset?.name}
          src={getAssetUrl(asset?.key)}
          className="w-full h-100 object-contain"
        />
      </DialogContent>
    </Dialog>
  )
}
