import type { BussinessHourSection as Content } from "@app/types"
import { useMemo } from "react"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"
import { BussinessHourList } from "./bussiness-hour-list"

type BussinessHourSectionProps = {
  content: Content
}

export const BussinessHourSection = ({ content }: BussinessHourSectionProps) => {
  const { heading, description, background, timing } = content

  const headingContent = useMemo(
    () => (heading?.enabled && heading?.text ? heading.text : null),
    [heading?.enabled, heading?.text],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description.text : null),
    [description?.enabled, description?.text],
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
      <BussinessHourList background={background} timing={timing} />
    </article>
  )
}
