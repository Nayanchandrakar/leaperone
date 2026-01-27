import { UAParser } from "ua-parser-js"
import { capitalize } from "@/utils/string"

export function parseUA(ua: string) {
  const result = UAParser(ua)
  const device = result.device.type ? capitalize(result.device.type) : "Desktop"

  return {
    ua,
    device,
    deviceVendor: result.device.vendor || "Unknown",
    deviceModel: result.device.model || "Unknown",
    browser: result.browser.name || "Unknown",
    browserVersion: result.browser.version || "Unknown",
    engine: result.engine.name || "Unknown",
    engineVersion: result.engine.version || "Unknown",
    os: result.os.name || "Unknown",
    osVersion: result.os.version || "Unknown",
    cpuArchitecture: result.cpu.architecture || "Unknown",
  }
}
