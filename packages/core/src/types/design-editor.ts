/**
 * Design Editor Types
 * Pure TypeScript types matching the design editor schema
 */

export interface Background {
  id: string
  url?: string
  type: "image"
}

export interface Color {
  background: string
  highlight: string
  mainText: string
  supportingText: string
}

export interface SectionBackground {
  enabled: boolean
  color: string
  borderRadius: number
}

export interface CardImage {
  url: string
}

export interface CardSettings {
  branding: boolean
}

export interface DesignEditor {
  background: Background[]
  color: Color
  sectionBackground: SectionBackground
  cardImage: CardImage
  settings: CardSettings
}
