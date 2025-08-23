import { cn } from "@myleaper/ui/lib/utils"
import Image from "next/image"

export const MarkerText = ({
  alt,
  src,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"span"> & {
  alt: string
  src: string
}) => {
  return (
    <span className={cn("relative", className)} {...props}>
      <Image
        fill
        priority
        src={src}
        alt={alt}
        style={style}
        className="absolute"
      />
      {children}
    </span>
  )
}
