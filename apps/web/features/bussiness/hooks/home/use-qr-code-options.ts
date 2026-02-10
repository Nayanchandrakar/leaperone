import type { QrCodeEditor } from "@app/types"
import type { Gradient, Options } from "qr-code-styling"
import { useMemo } from "react"

/**
 * React hook to generate QR code options for qr-code-styling based on user/editor settings.
 *
 * @param settings - Partial QR code editor schema from form or state.
 * @returns Options for qr-code-styling QRCodeStyling instance.
 */
export const useQrCodeOptions = (settings: Partial<QrCodeEditor>) => {
  return useMemo<Options>(() => {
    const options: Options = {
      width: 260,
      height: 260,
      type: "svg",
      data: "http://qr-code-styling.com",
      margin: 5,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      imageOptions: {
        margin: 5,
        imageSize: 0.3,
        hideBackgroundDots: true,
        crossOrigin: "anonymous",
        saveAsBlob: true,
      },
      backgroundOptions: {
        color: "white",
      },
    }

    let dotsColor: string | undefined
    let dotsGradient: Gradient | undefined

    if (settings.fill) {
      if (settings.fill.type === "single") {
        dotsColor = settings.fill.color
      } else if (settings.fill.type === "gradient") {
        const colorStopsCount = settings.fill.fillGradient.colorStops.length
        const colorStops = settings.fill.fillGradient.colorStops.map((color, index) => ({
          offset: colorStopsCount > 1 ? index / (colorStopsCount - 1) : 0,
          color,
        }))

        dotsGradient = {
          colorStops,
          type: settings.fill.fillGradient.type,
          rotation: settings.fill.fillGradient.rotation,
        }
      }
    }

    // Configure body shape if provided
    if (settings.bodyShape) {
      options.shape = settings.bodyShape
    }

    // Add data if provided
    if (settings.data) {
      options.data = settings.data
    }

    // Add image/logo if provided
    if (settings.logo) {
      options.image = settings.logo
    }

    if (settings.patternStyle || dotsColor || dotsGradient) {
      options.dotsOptions = {
        ...(dotsColor && { color: dotsColor }),
        ...(dotsGradient && { gradient: dotsGradient }),
        ...(settings.patternStyle && { type: settings.patternStyle }),
      }
    }

    if (settings.cornerStyle) {
      options.cornersSquareOptions = { type: settings.cornerStyle }
      options.cornersDotOptions = { type: settings.cornerStyle }
    }

    return options
  }, [settings])
}
