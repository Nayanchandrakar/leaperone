import { ENV } from "@app/env/server"
import { Resend } from "resend"

export const resend = new Resend(ENV.RESEND_API_KEY)
