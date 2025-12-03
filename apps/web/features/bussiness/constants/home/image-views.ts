import { Icons } from "@/components/shared/icons"
import type { ImageView } from "@/features/bussiness/types"

export const IMAGE_VIEWS: ImageView[] = [
  {
    label: "List",
    value: "list",
    icon: Icons.listView,
  },
  {
    label: "Grid 1",
    value: "grid-1",
    icon: Icons.grid1View,
  },
  {
    label: "Grid 2",
    value: "grid-2",
    icon: Icons.grid2View,
  },
  {
    label: "Carousel",
    value: "carousel",
    icon: Icons.carouselView,
  },
  {
    label: "Slideshow",
    value: "slideshow",
    icon: Icons.slideshowView,
  },
]
