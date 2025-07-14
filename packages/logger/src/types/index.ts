export interface LoggerOptions {
  prefix?: string
  level?: string
  customLevels?: Record<string, number>
  customColors?: string
}

export interface LogMessage {
  msg?: string
  level?: unknown
  [key: string]: unknown
}
