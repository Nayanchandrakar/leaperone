import type { BusinessCard } from "@app/database/types"
import { Button, buttonVariants } from "@app/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { cn } from "@app/ui/lib/utils"
import { Edit, Eye, MoreVertical, Share2 } from "lucide-react"
import Link from "next/link"
import { CopyCardLink } from "@/features/dashboard/components/buttons/dashboard/copy-card-link"
import { DeleteCardButton } from "@/features/dashboard/components/buttons/dashboard/delete-card-button"
import { DownloadQRMenu } from "@/features/dashboard/components/buttons/dashboard/download-qr-menu"
import { ToogleCardStatus } from "@/features/dashboard/components/buttons/dashboard/toogle-card-status"
import { STAUS_TOOLTIP_CONTENT } from "@/features/dashboard/constants/dashboard/bussiness-tooltip"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"
import { createBusinessCardLink } from "@/features/dashboard/utils"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

type BusinessCardItemProps = {
  item: Pick<BusinessCard, "id" | "status" | "identifier" | "qrCode">
}

export function BusinessCardItem({
  item: { id, status, identifier, qrCode },
}: BusinessCardItemProps) {
  const isInactive = status === "inactive"
  const openDialog = useShareBusinessCard((state) => state.openDialog)

  return (
    <div className="border rounded-xl divide-y min-[1290px]:divide-x divide-border grid min-[1290px]:grid-cols-[auto_auto]">
      <div className="p-6 space-y-2">
        <CopyCardLink link={createBusinessCardLink(identifier)} />
        <div className="flex items-center gap-2 w-fit">
          <p className="font-normal text-sm text-muted-foreground">
            Card Status: &nbsp;
            <span className={cn("capitalize", isInactive ? "text-destructive" : "text-primary")}>
              {status}
            </span>
          </p>
          <ToolTipProvider content={STAUS_TOOLTIP_CONTENT[status]} />
        </div>
      </div>

      <div className="w-full p-6 flex items-center gap-3 flex-wrap">
        <Link
          target="_blank"
          href={`/card/${id}`}
          className={buttonVariants({ variant: "gray-outline" })}
        >
          <Eye />
          View Card
        </Link>

        <Link
          href={{ pathname: "/", query: { edit: "true" } }}
          className={buttonVariants({ variant: "gray-outline" })}
        >
          <Edit />
          Edit Card
        </Link>

        <Button variant="gray-outline" onClick={() => openDialog({ identifier, qrCode })}>
          <Share2 />
          Share
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="gray-outline" aria-label="More actions">
              <MoreVertical />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-40">
            <DownloadQRMenu identifier={identifier} qrCodeOptions={qrCode} />
            <ToogleCardStatus id={id} status={status} />
            <DropdownMenuItem>Change Card Link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DeleteCardButton businessCardId={id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
