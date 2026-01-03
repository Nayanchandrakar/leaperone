import type { ImagesTextLinksSection } from "@app/core/types"
import { memo, useMemo } from "react"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"
import { ImageGridRenderer } from "./image-grid-renderer"

type ImageTextLinkSection = {
  content: ImagesTextLinksSection
}

export const ImageTextLinkSection = memo(({ content }: ImageTextLinkSection) => {
  const { heading, description, images, imageView, background } = content

  const showHeading = useMemo(() => heading?.enabled && heading?.text, [heading])
  const showDescription = useMemo(() => description?.enabled && description?.text, [description])

  return (
    <SectionRoot background={background} className="space-y-6 pt-7 px-4 pb-4">
      <SectionHeader>
        {showHeading && <SectionTitle>{heading?.text}</SectionTitle>}
        {showDescription && <SectionDescription>{description?.text}</SectionDescription>}
      </SectionHeader>
      <ImageGridRenderer images={images} layout={imageView} />
    </SectionRoot>
  )
})
