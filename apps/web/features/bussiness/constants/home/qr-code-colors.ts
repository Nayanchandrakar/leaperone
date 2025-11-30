import type { QrColorOptions } from "@/features/bussiness/types"

export const QR_COLORS = [
  "#00692D",
  "#59AF2B",
  "#009688",
  "#08C0D4",
  "#2564EB",
  "#702CDB",
  "#F562AB",
  "#D42A2F",
  "#F58625",
  "#F5C60A",
  "#F5EFD3",
  "#000000",
]

export const QR_COLOR_OPTIONS: QrColorOptions[] = [
  {
    value: "single",
    title: "Single Color",
    description: "Apply a uniform color to the entire QR code for a classic and clean look.",
  },
  {
    value: "gradient",
    title: "Gradient Color",
    description: "Blend two or more colors together for a dynamic QR code effect.",
  },
]

export const QR_GRADIENT_TYPES = [
  { value: "linear", label: "Linear (side to side)" },
  { value: "radial", label: "Radial (center out)" },
]
