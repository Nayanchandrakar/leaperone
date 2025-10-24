export class DateUtils {
  private constructor() {}

  static getDate(duration: number, unit: "sec" | "ms" = "ms") {
    return new Date(Date.now() + (unit === "sec" ? duration * 1000 : duration))
  }
}
