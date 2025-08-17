import { z } from "zod"

// Regex patterns
export const patterns = {
  username: /^[a-zA-Z]+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
}

// utils
export const username = z
  .string()
  .min(3)
  .max(20)
  .toLowerCase()
  .regex(patterns.username, {
    message:
      "Username can only contain letters, no numbers, special characters, or symbols",
  })

export const password = z
  .string()
  .min(1, { message: "Must have at least 1 character" })
  .regex(patterns.password, {
    message: "Password: 8+ chars, 1 upper, 1 lower, 1 number, 1 special",
  })
  .max(12)
