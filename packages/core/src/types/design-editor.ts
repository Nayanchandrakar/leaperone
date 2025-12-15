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
  sectionBackground: SectionBackground
  cardImage: CardImage
  settings: CardSettings
}
