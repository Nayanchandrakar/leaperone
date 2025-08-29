/**
 * Safely compare two buffers in constant time.
 * This helps prevent timing attacks by ensuring
 * the comparison takes the same amount of time
 * regardless of how much data matches.
 */
export function constantTimeEqual(
  a: ArrayBuffer | Uint8Array,
  b: ArrayBuffer | Uint8Array,
): boolean {
  const bufferA = new Uint8Array(a)
  const bufferB = new Uint8Array(b)

  let diff = bufferA.length ^ bufferB.length
  const maxLength = Math.max(bufferA.length, bufferB.length)

  for (let i = 0; i < maxLength; i++) {
    const valueA = Number(i < bufferA.length ? bufferA[i] : 0)
    const valueB = Number(i < bufferB.length ? bufferB[i] : 0)

    diff |= valueA ^ valueB
  }

  return diff === 0
}
