import { BadgeCheck } from "lucide-react"
import { ListComponent } from "@/components/shared/list-component"

interface IRenderPlanFeatures {
  feature: {
    title: string
    details: Array<string>
  }
}

export function RenderPlanFeatures({ feature }: IRenderPlanFeatures) {
  return (
    <ListComponent
      items={feature.details}
      className="space-y-3 mt-5"
      renderItem={(feature) => (
        <div key={feature} className="flex gap-3 items-start">
          <BadgeCheck className="size-7 shrink-0 -mt-0.5 fill-primary stroke-white " />
          <p className="font-normal text-base text-gray-600">{feature}</p>
        </div>
      )}
    />
  )
}
