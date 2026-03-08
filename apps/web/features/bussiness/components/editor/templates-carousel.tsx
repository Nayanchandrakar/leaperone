import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@app/ui/components/carousel"
import { memo, useEffect, useState } from "react"
import { TemplateCard } from "@/features/bussiness/components/cards/home/template-card"
import { TEMPLATES } from "@/features/bussiness/constants/home/templates"

export const TemplatesCarousel = memo(() => {
  const [count, setCount] = useState(0)
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="space-y-4 animate-in fade-in transition-opacity duration-400 will-change-[opacity]">
      <div className="text-muted-foreground">
        <span className="text-base font-semibold">Card Templates</span>
        <span className="mx-2 text-xs">───</span>
        <span className="text-sm font-normal">Browse and select a template to get started</span>
      </div>
      <Carousel
        setApi={setApi}
        opts={{ align: "start" }}
        data-fade-right={current !== 1}
        data-fade-left={current !== count}
        className="after:content-[''] data-[fade-right=true]:after:absolute after:inset-0 after:w-20 after:bg-linear-90 after:from-white after:from-15% after:to-transparent after:pointer-events-none before:z-1 before:content-[''] data-[fade-left=true]:before:absolute before:right-0 before:w-20 before:h-full before:bg-linear-270 before:from-white before:from-15% before:to-transparent before:pointer-events-none"
      >
        <CarouselContent>
          {TEMPLATES.map((item, idx) => (
            <TemplateCard key={idx} item={item} />
          ))}
        </CarouselContent>
        <CarouselPrevious variant="default" className="left-0 z-1" />
        <CarouselNext variant="default" className="right-0 z-1" />
      </Carousel>
    </div>
  )
})
