import type { LinkSection } from "@app/types"
import { memo, useMemo } from "react"
import { SocialLinkRow } from "@/features/preview/components/templates/classic/links/social-link-row"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type SocialLinksSectionProps = {
  content: LinkSection
}

export const SocialLinksSection = memo(({ content }: SocialLinksSectionProps) => {
  const { heading, description, links, background } = content

  const headingContent = useMemo(
    () => (heading?.enabled && heading?.text ? heading.text : null),
    [heading],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description.text : null),
    [description],
  )

  return (
    <SectionRoot background={background} className="space-y-6 py-9 px-10">
      {(headingContent || descriptionContent) && (
        <SectionHeader>
          {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
          {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
        </SectionHeader>
      )}
      <ul>{links?.length > 0 && links.map((link) => <SocialLinkRow key={link.id} {...link} />)}</ul>
    </SectionRoot>
  )
})
