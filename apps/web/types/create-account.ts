export type StatusState = "error" | "empty" | "pending" | "available"

export interface StatusConfig {
  className: string
  Icon?: React.ReactNode
  text: (error?: string) => string
}
