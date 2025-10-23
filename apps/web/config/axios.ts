import { CLIENT_ENV } from "@app/env/web/client"
import axios from "axios"

export const API = axios.create({
  timeout: 5000,
  withCredentials: true,
  baseURL: `${CLIENT_ENV.NEXT_PUBLIC_SERVER_URL}/api`,
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message
    throw new Error(message || "Something went wrong")
  },
)
