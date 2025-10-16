import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  casing: "snake_case",
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
})
