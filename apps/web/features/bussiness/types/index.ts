import type {
  Contact,
  ContactItem,
  ContentSectionType,
  ImageViewType,
  QrCodeFill,
} from "@app/core/types"
import type * as React from "react"
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

export type QrColorOptions = {
  title: string
  description: string
  value: QrCodeFill["type"]
}

export type SelectOption<T extends string = string> = {
  label: string
  value: T
}

export type RadioOption<T extends string = string> = {
  label: string
  value: T
}

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

export type ContentSectionProps = {
  index: number
}

export type ContentSectionMap = Record<ContentSectionType, React.ComponentType<ContentSectionProps>>
