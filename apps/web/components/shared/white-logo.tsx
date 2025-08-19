import { cn } from "@myleaper/ui/lib/utils"
import Image from "next/image"
import Link from "next/link"

type LogoProps = {
  className?: string
  svgClassName?: string
}

export const WhiteLogo = ({ className, svgClassName }: LogoProps) => {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-medium", className)}
    >
      <Image
        src="/assets/white-logo.svg"
        className={cn(svgClassName)}
        alt="logo"
        width={20}
        height={20}
      />
    </Link>
  )
}
