import { isBot } from "ua-parser-js/bot-detection"
import { IP_BOTS, IP_RANGES_BOTS, UA_BOTS } from "@/constants/bots"
import { isIpInCidrRange } from "@/utils/ip"

export function detectBot(ua: string, ip: string) {
  // Check if UA is bot
  if (isBot(ua)) {
    return true
  }

  const uaLower = ua.toLowerCase()
  if (UA_BOTS.some((bot) => uaLower.includes(bot.toLowerCase()))) {
    return true
  }

  // Additional pattern checks for common bot indicators
  const suspiciousPatterns = [
    /\b(?:headless|selenium|puppeteer|playwright|phantom|casper)\b/i,
    /\b(?:crawler|spider|scraper|bot|robot)\b.*\//i,
    /^[^\w]*$/i,
  ]

  if (suspiciousPatterns.some((pattern) => pattern.test(ua))) {
    return true
  }

  // Remove port if present (IPv4:port format)
  const cleanIp = ip.split(",")[0]?.trim().split(":")[0]

  if (!cleanIp) {
    return true
  }

  if (IP_BOTS.includes(cleanIp)) {
    return true
  }

  // Check CIDR ranges
  if (IP_RANGES_BOTS.some((range) => isIpInCidrRange(cleanIp, range))) {
    return true
  }

  return false
}
