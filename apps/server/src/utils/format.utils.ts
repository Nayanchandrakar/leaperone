export class SystemFormatter {
  private static readonly BYTE_UNIT = 1024
  private static readonly SECONDS = 1_000_000_000n
  private static readonly MILLI_SECONDS = 1_000_000n
  private static readonly UNITS = ["B", "KB", "MB", "GB", "TB"]

  private constructor() {}

  static formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B"
    let value = bytes
    let i = 0

    while (value >= SystemFormatter.BYTE_UNIT && i < SystemFormatter.UNITS.length - 1) {
      value /= SystemFormatter.BYTE_UNIT
      i++
    }

    const formatted = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: 2,
    }).format(value)

    return `${formatted} ${SystemFormatter.UNITS[i]}`
  }

  static formatTime(time: bigint): string {
    if (time < SystemFormatter.SECONDS) {
      return `${Number(time / SystemFormatter.MILLI_SECONDS)}ms`
    }
    return `${(Number(time) / Number(SystemFormatter.SECONDS)).toFixed(2)}s`
  }
}
