import type { Font } from "@app/types"

/**
 * Generates a Google Fonts URL with optimized weights, Latin subset, and font-display swap
 * @param font - Font configuration with family and weights
 * @returns Google Fonts API URL with display=swap for FOIT prevention
 */
export function getGoogleFontsUrl(font: Font): string {
  // Collect unique weights needed for this font
  const weights = new Set<number>([font.bodyWeight, font.buttonWeight, font.headingWeight])

  const weightsParam = Array.from(weights)
    .sort((a, b) => a - b)
    .join(";")

  // Properly encode font family (handles spaces and special characters)
  const fontFamily = encodeURIComponent(font.family)

  // Include Latin subset to minimize bundle size
  return `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weightsParam}&subset=latin&display=swap`
}

/**
 * Checks if a font family is a system font (doesn't need to be loaded from Google Fonts)
 */
export function isSystemFont(fontFamily: string) {
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
