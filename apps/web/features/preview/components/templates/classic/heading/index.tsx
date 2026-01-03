import type { HeadingTextSection } from "@app/core/types"
import { memo, useMemo } from "react"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type HeadingSectionProps = {
  content: HeadingTextSection
}

export const HeadingSection = memo(({ content }: HeadingSectionProps) => {
  const { heading, description, background } = content

  const showHeading = useMemo(() => heading?.enabled && heading?.text, [heading])
  const showDescription = useMemo(() => description?.enabled && description?.text, [description])

  return (
    <SectionRoot background={background} className="space-y-3 p-8 pt-7 text-center">
      <SectionHeader>
        {showHeading && <SectionTitle>{heading.text}</SectionTitle>}
        {showDescription && <SectionDescription>{description.text}</SectionDescription>}
      </SectionHeader>
    </SectionRoot>
  )
})
