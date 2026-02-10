"use client"

import { buttonVariants } from "@app/ui/components/button"
import { Dialog, DialogContent, DialogTitle } from "@app/ui/components/dialog"
import { Label } from "@app/ui/components/label"
import Link from "next/link"
import { useShallow } from "zustand/react/shallow"
import { FeedBackIcons } from "@/components/shared/feeedback-icons"
import { QrCodeProvider } from "@/features/bussiness/components/ui/qr-code"
import { DownloadQRCode } from "@/features/dashboard/components/buttons/dashboard/download-qr-code"
import { CopyInput } from "@/features/dashboard/components/ui/copy-input"
import { SHARE_LINKS } from "@/features/dashboard/constants/dashboard/share-links"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"
import { createBusinessCardLink, createEmbedCode } from "@/features/dashboard/utils"

interface ShareBusinessCardDialogProps {
  title: string
  showCheck?: boolean
}

export function ShareBusinessCardDialog({ title, showCheck }: ShareBusinessCardDialogProps) {
  const { closeDialog, identifier, isOpen, qrCodeOptions } = useShareBusinessCard(
    useShallow((state) => ({
      isOpen: state.isOpen,
      identifier: state.identifier!,
      closeDialog: state.closeDialog,
      qrCodeOptions: state.qrCodeOptions!,
    })),
  )

  const cardLink = createBusinessCardLink(identifier!)

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="md:max-w-220 p-0 grid grid-cols-1 md:grid-cols-[1fr_0.65fr] gap-0">
        {/* Share Section */}
        <section className="flex-center md:border-border md:border-r">
          <div className="space-y-7.5 p-8 md:p-9 xl:p-10">
            {showCheck && <FeedBackIcons.success className="mx-auto size-14.5" />}
            <DialogTitle className="leading-normal">{title}</DialogTitle>

            <div className="space-y-4.5">
              <div className="space-y-2">
                <Label className="text-muted-foreground">Digital business card's link</Label>
                <CopyInput defaultValue={new URL(cardLink).href} tabIndex={-1} />
              </div>
              <div className="space-y-2">
                <Label className="text-muted-foreground">Embed code of the card</Label>
                <CopyInput defaultValue={createEmbedCode(cardLink)} tabIndex={-1} />
              </div>
            </div>

            <div className="space-y-4.5">
              <p className="text-sm font-normal text-muted-foreground">Share the card on:</p>

              <div className="flex-center flex-wrap gap-3">
                {SHARE_LINKS.map(({ name, href, Icon }) => {
                  const linkHref = href(cardLink)
                  return (
                    <Link
                      key={name}
                      target="_blank"
                      href={linkHref}
                      rel="noopener noreferrer"
                      className={buttonVariants({ variant: "gray-outline" })}
                    >
                      <Icon className="size-3.5" />
                      {name}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="flex-center p-8 md:p-9 xl:p-10 border-border border-t md:border-none">
          <div className="space-y-3">
            <p className="text-sm font-normal text-muted-foreground text-center">Card's QR code</p>
            <QrCodeProvider options={qrCodeOptions}>
              <DownloadQRCode name={identifier} />
            </QrCodeProvider>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
