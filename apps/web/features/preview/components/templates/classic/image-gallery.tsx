import Image from "next/image"

interface ImageGalleryProps {
  title: string
  images: string[]
  description: string
  layout: "list" | "grid-two" | "featured" | "carousel"
}

export const ImageGallery = ({ title, description, images, layout }: ImageGalleryProps) => {
  return (
    <article className="space-y-6 bg-white pt-7 px-4 pb-4 rounded-3xl">
      <header className="space-y-3 text-center">
        <h2 className="text-[28px] font-semibold text-primary">{title}</h2>
        <p className="text-base font-normal text-muted-foreground ">{description}</p>
      </header>

      <div
        data-layout={layout}
        className="group grid data-[layout=carousel]:flex data-[layout=carousel]:overflow-x-scroll data-[layout=carousel]:no-scrollbar data-[layout=featured]:grid-cols-2 data-[layout=grid-two]:grid-cols-2 gap-4"
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
    </article>
  )
}
