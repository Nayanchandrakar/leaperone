import { cn } from "@app/ui/lib/utils"
import type { ImageProps } from "next/image"
import Image from "next/image"

export const ShopNfcProductCard = ({
  className,
  ...imageProps
}: Omit<ImageProps, "sizes" | "width" | "height" | "priority">) => {
  return (
    <div className={cn("border rounded-[20px] bg-white p-3 sm:p-5 relative", className)}>
      <Image priority width={1000} height={1000} sizes="100vw" {...imageProps} />
    </div>
  )
}
