import { ENV } from "@app/env/server"
import { resend } from "../../../config/resend"

type SendMailProps = {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: SendMailProps) {
  await resend.emails.send({
    to,
    html,
    subject,
    from: ENV.RESEND_MAIL,
  })
}
