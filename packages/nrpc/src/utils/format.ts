const BYTE_UNIT = 1024

export function formatBytes(bytes: number) {
  if (bytes === 0) return "0 B"

  const units = ["B", "KB", "MB", "GB", "TB"]
  let value = bytes
  let i = 0

  while (value >= BYTE_UNIT && i < units.length - 1) {
    value /= BYTE_UNIT
    i++
  }

  const formatted = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(value)

  return `${formatted} ${units[i]}`
}
