import type { DesignEditor } from "@app/core/types"
import { BACKGROUND_IMAGES } from "@/features/bussiness/constants/home/background-images"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"
import { MODERN_FONTS } from "@/features/bussiness/constants/home/fonts"

export const DEFAULT_DESIGN_SETTINGS: DesignEditor = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[0]!,
  font: MODERN_FONTS[0]!,
  sectionBackground: {
    enabled: true,
    color: "#FFFFFF",
    borderRadius: 24,
  },
  cardImage: {
    url: "https://images.pexels.com/photos/7004697/pexels-photo-7004697.jpeg",
  },
  settings: {
    branding: true,
  },
}
