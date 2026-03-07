import type { ImageLink, ImageViewType } from "@app/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui/components/carousel"
import { ImageGridCard } from "@/features/preview/components/cards/classic/image-grid-card"

type ImageGridRendererProps = {
  images: ImageLink[]
  layout: ImageViewType
}

export const ImageGridRenderer = ({ images, layout }: ImageGridRendererProps) => {
  if (layout === "carousel") {
    return (
      <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="w-full">
        <CarouselContent className="-ml-4">
          {Array.isArray(images) &&
            images.map((image) => (
              <CarouselItem key={image.id} className="pl-4 basis-full">
                <ImageGridCard
                  layout={layout}
                  href={image.link}
                  title={image.title}
                  imageSrc={image.imageSrc}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    )
  }

  if (layout === "slideshow") {
    return (
      <Carousel opts={{ align: "start", containScroll: "trimSnaps" }} className="relative w-full">
        <CarouselContent className="-ml-4">
          {Array.isArray(images) &&
            images.map((image) => (
              <CarouselItem key={image.id} className="pl-4 basis-full">
                <ImageGridCard
                  layout={layout}
                  href={image.link}
                  title={image.title}
                  imageSrc={image.imageSrc}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious variant="default" className="left-0 z-1" />
        <CarouselNext variant="default" className="right-0 z-1" />
      </Carousel>
    )
  }

  return (
    <div
      data-layout={layout}
      className="grid data-[layout=featured]:grid-cols-2 data-[layout=grid]:grid-cols-2 gap-4"
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
