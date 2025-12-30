import type { Font } from "@app/core/types"

/**
 * Generates a Google Fonts URL with optimized weights for the given font
 * Uses only the weights needed (body, button, heading) to minimize download size
 */
export function getGoogleFontsUrl(font: Font) {
  // Collect unique weights needed for this font
  const weights = new Set<number>([font.bodyWeight, font.buttonWeight, font.headingWeight])

  const weightsParam = Array.from(weights)
    .sort((a, b) => a - b)
    .join(";")

  const fontFamily = encodeURIComponent(font.family)

  return `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightsParam}&display=swap`
}

/**
 * Checks if a font family is a system font (doesn't need to be loaded from Google Fonts)
 */
export function isSystemFont(fontFamily: string): boolean {
  const systemFonts = [
    "Times New Roman",
    "Arial",
    "Helvetica",
    "Courier New",
    "Verdana",
    "Georgia",
    "Palatino",
    "Garamond",
    "Bookman",
    "Comic Sans MS",
    "Trebuchet MS",
    "Impact",
  ]

  return systemFonts.includes(fontFamily)
}
