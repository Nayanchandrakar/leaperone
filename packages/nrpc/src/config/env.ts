import { ENV } from "@app/env/server"

// Environment flags
export const isDevelopment = ENV.NODE_ENV === "development"
export const isProduction = ENV.NODE_ENV === "production"
export const isTest = ENV.NODE_ENV === "test"
