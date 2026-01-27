import type { Context } from "hono"

function inetAton(ip: string) {
  const octets = ip.split(".").map(Number)
  return (octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]
}

export function isIpInCidrRange(ip: string, cidr: string) {
  // Validate CIDR format
  const cidrRegex = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/
  if (!cidrRegex.test(cidr)) {
    return false
  }

  const [rangeIp, prefix] = cidr.split("/")
  const prefixLength = Number.parseInt(prefix, 10)

  // Validate prefix length
  if (prefixLength < 0 || prefixLength > 32) {
    return false
  }

  // Validate IP format
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
  if (!ipRegex.test(ip) || !ipRegex.test(rangeIp)) {
    return false
  }

  const ipInt = inetAton(ip)
  const rangeInt = inetAton(rangeIp)
  const mask = (0xffffffff << (32 - prefixLength)) >>> 0

  return (ipInt & mask) === (rangeInt & mask)
}

export function getClientIp(c: Context) {
  // Prefer Cloudflare's connecting IP header for real client address
  const cfConnectingIP = c.req.header("CF-Connecting-IP")

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  // Fallback: check standard X-Forwarded-For header (can contain multiple IPs)
  const xForwardedFor = c.req.header("X-Forwarded-For")

  if (xForwardedFor) {
    const ip = xForwardedFor
      .split(",")
      .map((part) => part.trim())
      .find(Boolean)
    if (ip) {
      return ip
    }
  }

  return undefined
}
