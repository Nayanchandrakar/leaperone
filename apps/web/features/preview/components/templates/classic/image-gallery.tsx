import Image from "next/image"
import { SectionDescription, SectionHeader, SectionRoot, SectionTitle } from "../../ui/section"

interface ImageGalleryProps {
  title: string
  images: string[]
  description: string
  layout: "list" | "grid-two" | "featured" | "carousel"
}

export const ImageGallery = ({ title, description, images, layout }: ImageGalleryProps) => {
  return (
    <SectionRoot className="space-y-6 pt-7 px-4 pb-4">
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <div
        data-layout={layout}
        className="grid data-[layout=carousel]:flex data-[layout=carousel]:overflow-x-scroll data-[layout=carousel]:no-scrollbar data-[layout=featured]:grid-cols-2 data-[layout=grid-two]:grid-cols-2 gap-4"
      >
        {images.map((src, index) => (
          <Image
            src={src}
            key={index}
            width={1000}
            height={1000}
            sizes="100vw"
            alt="pexels-image"
            data-layout={layout}
            className="aspect-square object-cover rounded-2xl first:data-[layout=featured]:col-span-2"
          />
        ))}
      </div>
    </SectionRoot>
  )
}
