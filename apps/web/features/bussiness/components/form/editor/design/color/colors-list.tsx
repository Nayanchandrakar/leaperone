import type { Color } from "@app/types"
import { useCallback } from "react"
import { ListComponent } from "@/components/shared/list-component"
import { CardColorSwatch } from "@/features/bussiness/components/cards/home/card-color-swatch"

interface ColorsListProps {
  colors: Color[]
  selectedColor: Color
  onColorChange: (color: Color) => void
}

export function ColorsList({ colors, selectedColor, onColorChange }: ColorsListProps) {
  const isColorSelected = useCallback(
    (color: Color) =>
      selectedColor?.background === color?.background &&
      selectedColor?.highlight === color?.highlight,
    [selectedColor],
  )

  return (
    <ListComponent
      items={colors}
      className="flex flex-wrap gap-3"
      renderItem={(color, index) => (
        <CardColorSwatch
          key={`${color.background}-${index}`}
          highlightColor={color.highlight}
          backgroundColor={color.background}
          data-state={isColorSelected(color)}
          onClick={() => onColorChange(color)}
        />
      )}
    />
  )
}
