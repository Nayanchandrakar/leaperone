export function getRootDomain(url: string) {
  try {
    const { hostname } = new URL(url)
    const parts = hostname.split(".")

    if (parts.length < 2) return null
    const multiLevelTlds = new Set(["co.in", "com.au", "co.uk", "org.in", "net.in"])

    if (parts.length >= 3 && multiLevelTlds.has(parts.slice(-2).join("."))) {
      return `.${parts.slice(-3).join(".")}`
    }

    return `.${parts.slice(-2).join(".")}`
  } catch {
    return null
  }
}
