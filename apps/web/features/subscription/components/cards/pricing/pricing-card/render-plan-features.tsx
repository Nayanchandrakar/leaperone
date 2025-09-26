import { BadgeCheck } from "lucide-react"
import { ListComponent } from "@/components/shared/list-component"

interface IRenderPlanFeatures {
  feature: {
    title: string
    details: Array<string>
  }
}

export const RenderPlanFeatures = ({ feature }: IRenderPlanFeatures) => {
  return (
    <ListComponent
      items={feature.details}
      className="space-y-3 mt-5 -ml-1.5"
      renderItem={(feature) => (
        <div key={feature} className="flex gap-2.5 items-start">
          <BadgeCheck className="size-7 shrink-0 -mt-0.5 fill-primary stroke-white " />
          <p className="text-muted-foreground text-sm text-left font-normal tracking-tight">
            {feature}
          </p>
        </div>
      )}
    />
  )
}
