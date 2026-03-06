import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui/components/carousel"
import { memo } from "react"
import { TemplateCard } from "@/features/bussiness/components/cards/home/template-card"
import { TEMPLATES } from "@/features/bussiness/constants/home/templates"

export const TemplatesCarousel = memo(() => {
  return (
    <div className="space-y-4 animate-in fade-in transition-opacity duration-400 will-change-[opacity]">
      <div className="text-muted-foreground">
        <span className="font-semibold text-base">Card Templates</span>
        <span className="mx-2 text-xs">───</span>
        <span className="font-normal text-sm">Browse and select a template to get started</span>
      </div>
      <Carousel
        opts={{ align: "start" }}
        className="after:content-[''] after:absolute after:inset-0 after:w-20 after:h-full after:bg-linear-90 after:from-white after:from-15% after:to-transparent before:content-[''] before:absolute before:right-0 before:z-1 before:w-20 before:h-full before:bg-linear-270 before:from-white before:from-15% before:to-transparent"
      >
        <CarouselContent>
          {TEMPLATES.map((item) => (
            <TemplateCard key={item.template} item={item} />
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" className="left-0 z-1" />
        <CarouselNext variant="default" className="right-0 z-1" />
      </Carousel>
    </div>
  )
})
