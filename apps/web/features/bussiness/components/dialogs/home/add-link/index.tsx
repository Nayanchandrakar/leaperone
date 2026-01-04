import type { SocialLink } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@app/ui/components/dialog"
import { ScrollArea } from "@app/ui/components/scroll-area"
import { PlusIcon, X } from "lucide-react"
import { memo, useCallback } from "react"
import { toast } from "sonner"
import { SocialMediaSection } from "@/features/bussiness/components/dialogs/home/add-link/social-media-section"
import {
  BUSINESS_LISTING_LINKS,
  COMMUNICATION_LINKS,
  CREATIVE_PLATFORM_LINKS,
  MUSIC_LINKS,
  PAYMENT_LINKS,
  SOCIAL_NETWORK_LINKS,
  VIDEO_STREAMING_LINKS,
} from "@/features/bussiness/constants/home/social-links"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import { generateUUID } from "@/utils"

type AddLinkDialogProps = {
  index: number
}

export const AddLinkDialog = memo(({ index }: AddLinkDialogProps) => {
  const { addItem } = useSubSectionList<SocialLink>(index, ["links"])

  const handleSelect = useCallback(
    (link: SocialLink) => {
      addItem({ ...link, id: generateUUID() })
      toast.success(`Added "${link.label}"`)
    },
    [addItem],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="green-outline" className="w-fit">
          <PlusIcon />
          Add more link
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="sm:max-w-300 gap-2 px-8 py-6 sm:px-10 sm:py-8 data-[state=open]:animate-none"
      >
        <DialogHeader className="flex items-center justify-between flex-row">
          <DialogTitle className="text-[28px]">Add Links</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X />
            </Button>
          </DialogClose>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(100vh-250px)] sm:pr-4">
          <div className="space-y-10">
            <SocialMediaSection
              title="Social Networks"
              onSelect={handleSelect}
              links={SOCIAL_NETWORK_LINKS}
            />

            <SocialMediaSection
              onSelect={handleSelect}
              title="Video & Streaming"
              links={VIDEO_STREAMING_LINKS}
            />

            <SocialMediaSection
              onSelect={handleSelect}
              title="Creative Platforms"
              links={CREATIVE_PLATFORM_LINKS}
            />

            <SocialMediaSection
              onSelect={handleSelect}
              links={COMMUNICATION_LINKS}
              title="Communication & Messaging"
            />

            <SocialMediaSection
              onSelect={handleSelect}
              title="Business & Listings"
              links={BUSINESS_LISTING_LINKS}
            />

            <SocialMediaSection
              links={PAYMENT_LINKS}
              onSelect={handleSelect}
              title="Payment Services"
            />

            <SocialMediaSection
              links={MUSIC_LINKS}
              title="Music Platforms"
              onSelect={handleSelect}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
})
