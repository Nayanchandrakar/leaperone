import type { Period } from "@app/types"
import { BussinessHourCard } from "@/features/preview/components/cards/classic/bussiness-hour-card"
import { SectionRoot } from "@/features/preview/components/ui/section"

interface BussinessHourListProps {
  background: boolean
  timing: {
    enabled: boolean
    periods: Period[]
  }
}

export const BussinessHourList = ({ timing, background }: BussinessHourListProps) => {
  if (!timing?.enabled || timing?.periods?.length === 0) return null

  const activePeriods = timing.periods.filter((period) => Boolean(period?.active))
  if (activePeriods.length === 0) return null

  return (
    <SectionRoot background={background} className="py-6 px-7">
      {activePeriods.map((period) => (
        <BussinessHourCard key={period.id} {...period} />
      ))}
    </SectionRoot>
  )
}
