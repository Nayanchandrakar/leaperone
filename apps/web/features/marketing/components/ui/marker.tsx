import { cn } from "@app/ui/lib/utils"
import Image, { type ImageProps } from "next/image"

export const Marker = ({
  className,
  width = 50,
  height = 50,
  ...props
}: ImageProps) => {
  return (
    <Image
      priority
      width={width}
      height={height}
      className={cn(
        "absolute hidden sm:inline-block pointer-events-none",
        className,
      )}
      {...props}
    />
  )
}
