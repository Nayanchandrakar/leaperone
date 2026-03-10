import type { Font } from "@app/types"
import { ListComponent } from "@/components/shared/list-component"
import { FontSwatch } from "@/features/bussiness/components/cards/home/font-swatch"
import type { FontOption } from "@/features/bussiness/types"

type FontsListProps = {
  selectedFontId: string
  fontOptions: FontOption[]
  onFontChange: (font: Font) => void
}

export function FontsList({ selectedFontId, fontOptions, onFontChange }: FontsListProps) {
  return (
    <ListComponent
      items={fontOptions}
      className="flex flex-wrap gap-3"
      renderItem={(font) => (
        <FontSwatch
          key={font.id}
          onClick={() => onFontChange(font)}
          data-state={font.id === selectedFontId}
        >
          <font.Icon className="size-full" />
        </FontSwatch>
      )}
    />
  )
}
