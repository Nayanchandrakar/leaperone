import type { Period } from "@app/types"
import { memo } from "react"
import { BussinessHoursItem } from "@/features/bussiness/components/form/editor/content/bussiness-hours/bussiness-hours-item"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const BussinessHoursList = memo(({ index }: ContentSectionProps) => {
  const { list } = useSubSectionList<Period>(index, ["timing", "periods"])

  return list.map((item, subIndex) => (
    <BussinessHoursItem index={index} key={item?.id} subIndex={subIndex} />
  ))
})
