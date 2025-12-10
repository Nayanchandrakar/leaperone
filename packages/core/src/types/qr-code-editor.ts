/**
 * QR Code Editor Types
 * Pure TypeScript types matching the QR code editor schema
 */

export type QrCodeBodyShape = "square" | "circle"
export type QrCodeCornerStyle = "square" | "dot" | "extra-rounded"
export type QrCodePatternStyle = "square" | "dots" | "classy-rounded"

export interface Gradient {
  type: "linear" | "radial"
  colorStops: [string, string]
  rotation: number
}

export interface SingleColorFill {
  type: "single"
  color?: string
}

export interface GradientFill {
  type: "gradient"
  fillGradient?: Gradient
}

export type QrCodeFill = SingleColorFill | GradientFill

export interface QrCodeEditor {
  data: string
  logo?: string
  frame?: string
  bodyShape: QrCodeBodyShape
  cornerStyle: QrCodeCornerStyle
  patternStyle: QrCodePatternStyle
  fill: QrCodeFill
}
