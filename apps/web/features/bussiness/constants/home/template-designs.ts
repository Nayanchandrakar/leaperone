import type { DesignEditor, Template } from "@app/types"
import { BACKGROUND_IMAGES } from "@/features/bussiness/constants/home/background-images"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"
import { CLASSIC_FONTS, MODERN_FONTS } from "@/features/bussiness/constants/home/fonts"

/** Default classic template design. */
export const CLASSIC_DESIGN: DesignEditor = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[0],
  font: MODERN_FONTS[0],
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

/** Default premium template design. */
export const PREMIUM_DESIGN: DesignEditor = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[1],
  font: MODERN_FONTS[1],
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

/** Default modern template design. */
export const MODERN_DESIGN: DesignEditor = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[2],
  font: CLASSIC_FONTS[0],
  sectionBackground: {
    enabled: true,
    color: "#FFFFFF",
    borderRadius: 24,
  },
  cardImage: {
    url: "https://images.pexels.com/photos/9178761/pexels-photo-9178761.jpeg",
  },
  settings: {
    branding: true,
  },
}

/**
 * Maps template names to their respective design configurations.
 * Guarantees all Template variants have a configuration.
 */
export const TEMPLATE_DESIGN_MAP: Record<Template, DesignEditor> = {
  classic: CLASSIC_DESIGN,
  premium: PREMIUM_DESIGN,
  modern: MODERN_DESIGN,
}
