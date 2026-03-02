import type { Font } from "@app/types"

export function getGoogleFontsUrl(font: Font | undefined | null) {
  if (!font) return null

  const weights = new Set<number>([font.bodyWeight, font.buttonWeight, font.headingWeight])
  const weightsParam = Array.from(weights)
    .sort((a, b) => a - b)
    .join(";")

  // Google Fonts CSS2 API: spaces → "+", not "%20"
  const familyParam = font.family.replace(/ /g, "+")

  return `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=swap`
}
