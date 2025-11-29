import type { QrCodeEditorSchema } from "@app/zod/types"
import { Icons } from "@/components/shared/icons"
import type {
  QrCodeCornerStyle,
  QrCodeItem,
  QrCodePatternStyle,
  QrCodeShape,
} from "@/features/bussiness/types"

export const QR_CODE_SETTINGS: QrCodeEditorSchema = {
  data: "https://www.leaperone.com",
  bodyShape: "square",
  cornerStyle: "square",
  patternStyle: "square",
  fill: {
    type: "single",
    color: "#000000",
  },
}

export const QR_SHAPE_ITEMS: QrCodeItem<QrCodeShape>[] = [
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
