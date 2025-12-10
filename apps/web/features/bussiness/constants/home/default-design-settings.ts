import type { Color, DesignEditor } from "@app/core/types"
import { BACKGROUND_IMAGES } from "@/features/bussiness/constants/home/background-images"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"

export const DEFAULT_DESIGN_SETTINGS: DesignEditor = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[0] as Color,
  sectionBackground: {
    enabled: true,
    color: "#FFFFFF",
    borderRadius: 10,
  },
  cardImage: {
    url: "https://images.pexels.com/photos/7004697/pexels-photo-7004697.jpeg",
  },
  settings: {
    branding: true,
  },
}
