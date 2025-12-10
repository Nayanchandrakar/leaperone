import type {
  Contact,
  ContactItem,
  ContentEditor,
  ContentSectionType,
  ImageViewType as CoreImageViewType,
  QrCodeEditor,
  VideoSection,
} from "@app/core/types"
import type { IconProps } from "@/components/shared/icons"

export type ContactOption = {
  label: string
  value: ContactOptionType
}
export type ContactOptionType = Contact["type"]
export type ContactItemType = ContactItem["type"]

export type ContactItemOption = {
  label: string
  value: ContactItemType
}

export type QrCodeColorType = QrCodeEditor["fill"]["type"]
export type ImageViewType = CoreImageViewType
export type VideoType = VideoSection["video"]["type"]

// Re-export ContentSectionType for convenience
export type { ContentSectionType }

export type QrColorOptions = {
  title: string
  description: string
  value: QrCodeColorType
}

export type ContentEditorSortItem = ContentEditor["sections"][number]

export type SelectOption<T extends string = string> = {
  label: string
  value: T
}

export type RadioOption<T extends string = string> = {
  label: string
  value: T
}

export type QrCodeShape = QrCodeEditor["bodyShape"]

export type QrCodePatternStyle = QrCodeEditor["patternStyle"]

export type QrCodeCornerStyle = QrCodeEditor["cornerStyle"]

export type QrCodeItem<T extends string = string> = {
  value: T
  label: string
  icon: (props: IconProps) => React.JSX.Element
}

export type ImageView<T extends string = ImageViewType> = {
  label: string
  value: T
  icon: (props: IconProps) => React.JSX.Element
}
