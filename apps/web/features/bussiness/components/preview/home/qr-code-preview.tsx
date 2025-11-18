import { Button } from "@app/ui/components/button"
import { Skeleton } from "@app/ui/components/skeleton"

export const QrCodePreview = () => {
  return (
    <div className="space-y-8">
      <Skeleton className="aspect-square" />
      <Button className="w-full font-semibold">Save Card & Download QR</Button>
    </div>
  )
}
