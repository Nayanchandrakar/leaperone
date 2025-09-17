import { ENV } from "@app/env/server"

export const isDevelopment = ENV.NODE_ENV === "development"
