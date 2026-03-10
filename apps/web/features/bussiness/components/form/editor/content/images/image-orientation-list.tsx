import type { ImageViewType } from "@app/types"
import { ListComponent } from "@/components/shared/list-component"
import { ImageOrientation } from "@/features/bussiness/components/cards/home/image-orientation"
import type { ImageView } from "@/features/bussiness/types"

interface ImageOrientationListProps {
  orientations: ImageView[]
  selectedOrientation: ImageViewType
  onOrientationChange: (orientation: ImageViewType) => void
}

export function ImageOrientationList({
  orientations,
  selectedOrientation,
  onOrientationChange,
}: ImageOrientationListProps) {
  return (
    <ListComponent
      items={orientations}
      className="flex flex-wrap gap-4"
      renderItem={(orientation) => (
        <ImageOrientation
          key={orientation.value}
          orientation={orientation}
          data-state={selectedOrientation === orientation.value}
          onClick={() => onOrientationChange(orientation.value)}
        />
      )}
    />
  )
}
