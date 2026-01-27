/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param retries Number of retry attempts (default: 3)
 * @param delayMs Initial delay in milliseconds (default: 100)
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 100,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === retries - 1) {
        throw error
      }
      // Exponential backoff: 100ms, 200ms, 400ms
      await new Promise((resolve) => setTimeout(resolve, delayMs * (i + 1)))
    }
  }
  throw new Error("Retry failed")
}
