"use client"

import { Button } from "@app/ui/components/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@app/ui/components/dialog"
import { Spinner } from "@app/ui/components/spinner"
import { VisuallyHidden } from "@app/ui/components/visually-hidden"
import { X } from "lucide-react"
import Image from "next/image"
import { useCallback } from "react"
import { useFileDelete } from "@/features/dashboard/hooks/asset-manager/use-delete-file"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import { getAssetUrl, getIconForMime } from "@/features/dashboard/utils/asset-manager"

export function FilePreviewDialog() {
  const Icon = getIconForMime("image/jpeg")
  const { isOpen, setIsOpen, asset, setAsset } = useFilePreviewStore()
  const { mutateAsync, isPending } = useFileDelete({
    onSuccess() {
      setIsOpen(false)
      setAsset(null)
    },
  })

  const handleClose = useCallback(() => {
    if (!isPending) {
      setIsOpen(false)
      setAsset(null)
    }
  }, [setIsOpen, setAsset, isPending])

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
            <Icon className="size-4 text-muted-foreground" />
            <p className="text-sm max-w-24 min-[470px]:max-w-40 truncate font-normal text-muted-foreground">
              {asset?.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              disabled={isPending}
              className="min-w-24"
              variant="destructive"
              onClick={async () => await mutateAsync(asset?.id)}
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
