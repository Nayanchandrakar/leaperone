import type { CardSettings } from "@app/types"
import { Button } from "@app/ui/components/button"
import { memo } from "react"
import { Icons } from "@/components/shared/icons"

type BrandingButtonProps = {
  settings: CardSettings
}

export const BrandingButton = memo(({ settings }: BrandingButtonProps) => {
  if (!settings?.branding) return null

  return (
    <footer className="bg-template-primary rounded-full flex items-center justify-between gap-3 p-3 xs:p-4">
      <Icons.logo className="h-6 xs:w-15 xs:h-7.5" />
      <p className="text-base font-normal text-white shrink truncate">Create your smart card</p>
      <Button
        size="sm"
        variant="green-ghost"
        className="text-template-primary hover:text-template-primary/90"
      >
        Create
      </Button>
    </footer>
  )
})
