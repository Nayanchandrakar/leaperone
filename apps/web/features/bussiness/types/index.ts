import type {
  ContactSchema,
  ContentEditorSchema,
  QrCodeEditorSchema,
  VideoSchema,
} from "@app/zod/types"
import type { IconProps } from "@/components/shared/icons"

export type ContactOption = {
  label: string
  value: ContactSchema["type"]
}

export type QrCodeColorType = QrCodeEditorSchema["fill"]["type"]

export type VideoType = VideoSchema["video"]["type"]

export type QrColorOptions = {
  title: string
  description: string
  value: QrCodeColorType
}

export type ContentEditorSortItem = ContentEditorSchema["sections"][number]

export type SelectOption<T extends string = string> = {
  label: string
  value: T
}

export type RadioOption<T extends string = string> = {
  label: string
  value: T
}

export type QrCodeShape = QrCodeEditorSchema["bodyShape"]

export type QrCodePatternStyle = QrCodeEditorSchema["patternStyle"]

export type QrCodeCornerStyle = QrCodeEditorSchema["cornerStyle"]

export type QrCodeItem<T extends string = string> = {
  value: T
  label: string
  icon: (props: IconProps) => React.JSX.Element
}
