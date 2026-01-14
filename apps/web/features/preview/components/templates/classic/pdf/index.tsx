import type { PdfFileSection as Content } from "@app/types"
import { memo, useMemo } from "react"
import { FilesList } from "@/features/preview/components/templates/classic/pdf/files-list"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type PdfFileSectionProps = {
  content: Content
}

export const PdfFileSection = memo(({ content }: PdfFileSectionProps) => {
  const { heading, description, background, files } = content

  const headingContent = useMemo(
    () => (heading?.enabled && heading?.text ? heading.text : null),
    [heading],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description.text : null),
    [description],
  )

  return (
    <article className="space-y-2">
      {(headingContent || descriptionContent) && (
        <SectionRoot background={background} className="py-7 px-8">
          <SectionHeader>
            {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
            {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
          </SectionHeader>
        </SectionRoot>
      )}
      <FilesList files={files} background={background} />
    </article>
  )
})
