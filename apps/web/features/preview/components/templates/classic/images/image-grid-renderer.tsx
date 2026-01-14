import type { ImageLink, ImageViewType } from "@app/types"
import { ImageGridCard } from "@/features/preview/components/cards/classic/image-grid-card"

type ImageGridRendererProps = {
  images: ImageLink[]
  layout: ImageViewType
}

export const ImageGridRenderer = ({ images, layout }: ImageGridRendererProps) => {
  return (
    <div
      data-layout={layout}
      className="grid data-[layout=carousel]:flex data-[layout=carousel]:overflow-x-scroll data-[layout=carousel]:no-scrollbar data-[layout=featured]:grid-cols-2 data-[layout=grid]:grid-cols-2 gap-4"
    >
      {Array.isArray(images) &&
        images.map((image) => (
          <ImageGridCard
            key={image.id}
            layout={layout}
            href={image.link}
            title={image.title}
            imageSrc={image.imageSrc}
          />
        ))}
    </div>
  )
}
