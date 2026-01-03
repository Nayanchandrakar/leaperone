import type { ImageViewType } from "@app/core/types"
import Image from "next/image"

type ImageGridCardProps = {
  imageSrc: string
  layout: ImageViewType
  href: string | undefined
  title: string | undefined
}

export const ImageGridCard = ({ href, title, layout, imageSrc }: ImageGridCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      data-layout={layout}
      className="flex-none w-full first:data-[layout=featured]:col-span-2 space-y-2 font-normal text-center text-xs text-template-muted-foreground"
    >
      <Image
        width={1000}
        height={1000}
        sizes="100vw"
        src={imageSrc}
        alt="bussiness-images"
        className="aspect-square object-cover rounded-2xl w-full"
      />
      {title && <span className="break-all">{title}</span>}
    </a>
  )
}
