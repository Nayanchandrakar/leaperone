/**
 * Returns a new `Date` object offset by a given duration.
 *
 * @param duration - The time offset to add to the current timestamp.
 * @param unit - The unit of the `duration`. Can be `"sec"` (seconds) or `"ms"` (milliseconds).
 *               Defaults to `"ms"`.
 *
 * @returns A new `Date` object representing the future time.
 *
 * @example
 * ```ts
 * getDate(60, "sec") // returns Date object 60 seconds from now
 * getDate(5000)      // returns Date object 5000 ms (5 sec) from now
 * ```
 */
export function getDate(duration: number, unit: "sec" | "ms" = "ms") {
  return new Date(Date.now() + (unit === "sec" ? duration * 1000 : duration))
}
