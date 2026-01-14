import type { FontFamily, FontWeight } from "./common"

export type Background = {
  id: string
  url: string
}

export type Color = {
  background: string
  highlight: string
  mainText: string
  supportingText: string
}

export type Font = {
  id: string
  family: FontFamily
  bodyWeight: FontWeight
  buttonWeight: FontWeight
  headingWeight: FontWeight
}

export type SectionBackground = {
  enabled: boolean
  color: string
  borderRadius: number
}

export type CardImage = {
  url: string
}

export type CardSettings = {
  branding: boolean
}

export type DesignEditor = {
  background: Background[]
  color: Color
  font: Font
  sectionBackground: SectionBackground
  cardImage: CardImage
  settings: CardSettings
}
