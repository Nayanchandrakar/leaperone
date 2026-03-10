import { CarouselItem } from "@app/ui/components/carousel"
import { Check } from "lucide-react"
import Image from "next/image"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import type { Template as TemplateItem } from "@/features/bussiness/types"

type TemplateCardProps = {
  item: TemplateItem
}

export function TemplateCard({ item }: TemplateCardProps) {
  const { setTemplate, template } = useContentEditorStore(
    useShallow((state) => ({
      template: state.template,
      setTemplate: state.setTemplate,
    })),
  )
  const resetConfig = useDesignEditorStore((state) => state.resetConfig)

  return (
    <CarouselItem
      onClick={() => {
        setTemplate(item.template)
        resetConfig(item.template)
      }}
      className="cursor-pointer relative basis-1/2 min-[500px]:basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/3 xl:basis-1/5"
    >
      <Image
        priority
        width={288}
        height={424}
        sizes="100vw"
        src={item.imageSrc}
        alt="bussiness-template"
        className="rounded-xl object-cover"
      />
      {item.template === template && (
        <span className="absolute top-2.5 right-2.5 flex-center size-5.5 rounded-full bg-primary">
          <Check className="size-3 stroke-5 text-white" />
        </span>
      )}
    </CarouselItem>
  )
}
