export async function hashStringSHA256(str: string) {
  // Encode the input string as a Uint8Array of UTF-8 bytes
  const encoder = new TextEncoder()
  const data = encoder.encode(str)

  // Compute the SHA-256 hash using the SubtleCrypto API
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)

  // Convert the ArrayBuffer to an array of byte values (numbers)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // Convert each byte to a 2-digit hexadecimal string and join them into a single string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return hashHex
}

export async function getIdentityHash(ip: string, ua: string) {
  return await hashStringSHA256(`${ip}-${ua}`)
}
