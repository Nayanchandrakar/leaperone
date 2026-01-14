import type { QrCodeBodyShape, QrCodeEditor } from "@app/types"
import { Icons } from "@/components/shared/icons"
import type { QrCodeCornerStyle, QrCodeItem, QrCodePatternStyle } from "@/features/bussiness/types"

export const QR_CODE_SETTINGS: QrCodeEditor = {
  data: "https://www.leaperone.com",
  bodyShape: "square",
  cornerStyle: "square",
  patternStyle: "square",
  fill: {
    type: "gradient",
    fillGradient: {
      colorStops: ["#000000", "#1ba124"],
      rotation: 120,
      type: "linear",
    },
  },
}

export const QR_SHAPE_ITEMS: QrCodeItem<QrCodeBodyShape>[] = [
  {
    value: "square",
    label: "Standard",
    icon: Icons.standardQrCode,
  },
  {
    value: "circle",
    label: "Circle",
    icon: Icons.circleShapeQrCode,
  },
]

export const QR_PATTERN_ITEMS: QrCodeItem<QrCodePatternStyle>[] = [
  {
    value: "square",
    label: "Standard",
    icon: Icons.standardQrCode,
  },
  {
    value: "dots",
    label: "Circle",
    icon: Icons.circlePatternQrCode,
  },
  {
    label: "Star",
    value: "classy-rounded",
    icon: Icons.starPatternQrCode,
  },
]

export const QR_FRAME_ITEMS: QrCodeItem<QrCodeCornerStyle>[] = [
  {
    value: "square",
    label: "Standard",
    icon: Icons.standardQrCode,
  },
  {
    value: "dot",
    label: "Circles",
    icon: Icons.circleCornerQrCode,
  },
  {
    value: "extra-rounded",
    label: "Modern",
    icon: Icons.modernQrCode,
  },
]
