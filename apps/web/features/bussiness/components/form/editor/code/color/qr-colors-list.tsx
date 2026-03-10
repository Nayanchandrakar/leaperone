import { ListComponent } from "@/components/shared/list-component"
import { QrColorSwatch } from "@/features/bussiness/components/cards/home/qr-color-swatch"

interface QrColorsListProps {
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
}

export function QrColorsList({ colors, selectedColor, onColorChange }: QrColorsListProps) {
  return (
    <ListComponent
      items={colors}
      className="flex flex-wrap gap-3"
      renderItem={(color) => (
        <QrColorSwatch
          key={color}
          color={color}
          data-state={selectedColor === color}
          onClick={() => onColorChange(color)}
        />
      )}
    />
  )
}
